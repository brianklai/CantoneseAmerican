import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import {
  HeadObjectCommand,
  S3Client,
  type HeadObjectCommandOutput,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

type Mode = "upload" | "head";

const mode = parseMode(process.argv[2]);
loadLocalEnv();

const args = parseArgs(process.argv.slice(3));
const bucket = requiredEnv("R2_BUCKET");
const key = requiredArg(args, "key");
const mediaBaseUrl = trimTrailingSlash(process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "");
const client = createR2Client();

if (mode === "upload") {
  await uploadObject();
} else {
  await headObject();
}

async function uploadObject() {
  const file = requiredArg(args, "file");
  const filePath = path.resolve(process.cwd(), file);

  if (!existsSync(filePath)) {
    throw new Error(`File does not exist: ${file}`);
  }

  const stats = statSync(filePath);
  const contentType = args["content-type"] ?? inferContentType(filePath);
  const cacheControl =
    args["cache-control"] ?? "public, max-age=31536000, immutable";

  console.log(`Uploading ${file}`);
  console.log(`Bucket: ${bucket}`);
  console.log(`Key: ${key}`);
  console.log(`Size: ${formatBytes(stats.size)}`);
  console.log(`Content-Type: ${contentType}`);
  console.log(`Cache-Control: ${cacheControl}`);

  const upload = new Upload({
    client,
    params: {
      Bucket: bucket,
      Key: key,
      Body: createReadStream(filePath),
      ContentLength: stats.size,
      ContentType: contentType,
      CacheControl: cacheControl,
    },
    queueSize: Number(args["queue-size"] ?? 4),
    partSize: Number(args["part-size"] ?? 16 * 1024 * 1024),
    leavePartsOnError: false,
  });

  upload.on("httpUploadProgress", (progress) => {
    if (!progress.loaded || !progress.total) return;
    const percent = ((progress.loaded / progress.total) * 100).toFixed(1);
    process.stdout.write(
      `\rUploaded ${formatBytes(progress.loaded)} / ${formatBytes(
        progress.total,
      )} (${percent}%)`,
    );
  });

  const result = await upload.done();
  process.stdout.write("\n");
  console.log(`Upload complete. ETag: ${result.ETag ?? "unknown"}`);
  printPublicUrl();
}

async function headObject() {
  const result = await client.send(
    new HeadObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
  );

  printHeadObject(result);
  printPublicUrl();
}

function createR2Client() {
  const accountId = requiredEnv("CLOUDFLARE_ACCOUNT_ID");
  const accessKeyId = requiredEnv("R2_ACCESS_KEY_ID");
  const secretAccessKey = requiredEnv("R2_SECRET_ACCESS_KEY");

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    forcePathStyle: true,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

function printHeadObject(result: HeadObjectCommandOutput) {
  console.log(`Object exists: ${bucket}/${key}`);
  console.log(`Size: ${formatBytes(result.ContentLength ?? 0)}`);
  console.log(`Content-Type: ${result.ContentType ?? "unknown"}`);
  console.log(`Cache-Control: ${result.CacheControl ?? "unknown"}`);
  console.log(`ETag: ${result.ETag ?? "unknown"}`);
  console.log(`Last modified: ${result.LastModified?.toISOString() ?? "unknown"}`);
}

function printPublicUrl() {
  if (!mediaBaseUrl) {
    console.log(
      "Public URL: unavailable because NEXT_PUBLIC_MEDIA_BASE_URL is not set.",
    );
    return;
  }

  console.log(`Public URL: ${mediaBaseUrl}/${key}`);
}

function parseMode(value: string | undefined): Mode {
  if (value === "upload" || value === "head") return value;
  throw new Error(
    'Usage: npm run media:upload -- --file "local.mp4" --key "archive/path.mp4"\n' +
      '   or: npm run media:head -- --key "archive/path.mp4"',
  );
}

function parseArgs(argv: string[]) {
  const parsed: Record<string, string> = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) continue;

    const [rawKey, inlineValue] = arg.slice(2).split("=", 2);
    const nextValue = argv[index + 1];
    const value =
      inlineValue ?? (nextValue && !nextValue.startsWith("--") ? nextValue : "");

    if (!rawKey || !value) continue;
    parsed[rawKey] = value;

    if (value === nextValue) {
      index += 1;
    }
  }

  return parsed;
}

function loadLocalEnv() {
  for (const fileName of [".env.local", ".env"]) {
    const filePath = path.resolve(process.cwd(), fileName);
    if (!existsSync(filePath)) continue;

    const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const match = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(trimmed);
      if (!match) continue;

      const [, key, rawValue] = match;
      if (process.env[key]) continue;
      process.env[key] = unquoteEnvValue(rawValue);
    }
  }
}

function unquoteEnvValue(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is required in the environment or .env.local`);
  }

  return value;
}

function requiredArg(args: Record<string, string>, name: string) {
  const value = args[name]?.trim();
  if (!value) {
    throw new Error(`--${name} is required`);
  }

  return value;
}

function inferContentType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === ".mp4") return "video/mp4";
  if (extension === ".webm") return "video/webm";
  if (extension === ".mov") return "video/quicktime";
  if (extension === ".m4v") return "video/x-m4v";
  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  if (extension === ".png") return "image/png";
  return "application/octet-stream";
}

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function formatBytes(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = value;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}
