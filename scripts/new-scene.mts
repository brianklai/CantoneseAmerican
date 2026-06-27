import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createInterface } from "node:readline/promises";
import {
  sceneCategories,
  scenes,
  type EditorialStatus,
  type SceneCategory,
} from "../data/scenes.ts";

const args = parseArgs(process.argv.slice(2));
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

try {
  const title = await promptRequired(
    "Scene title",
    args.title,
  );
  const category = await promptEnum<SceneCategory>(
    "Category",
    sceneCategories,
    args.category,
  );
  const workTitle = await promptRequired(
    "Work title",
    args["work-title"] ?? args.workTitle,
  );
  const yearInput = await promptOptional("Year (optional)", args.year);
  const languageGuess = await promptOptional(
    "Language guess (optional)",
    args.language,
  );
  const editorialStatus = await promptEnum<EditorialStatus>(
    "Editorial status",
    ["candidate", "researching"] as const,
    args["editorial-status"] ?? args.editorialStatus ?? "candidate",
  );

  const nextId = getNextSceneId();
  const slug = uniqueSlug(slugify(args.slug ?? title));
  const year = parseOptionalYear(yearInput);
  const fileName = `scene-${nextId}-${slug}.ts`;
  const outDir = path.resolve(
    process.cwd(),
    args["out-dir"] ?? process.env.SCENE_STUB_DIR ?? path.join("data", "stubs"),
  );
  const outPath = path.join(outDir, fileName);
  const stubConstName = `scene${nextId}${toPascalCase(slug)}`;
  const topMeta = [workTitle, year ? String(year) : null, "Draft stub"]
    .filter((item): item is string => Boolean(item))
    .join(" · ");

  const fileContents = `import type { Scene } from "../scenes";

export const ${stubConstName} = {
  id: "${nextId}",
  slug: "${slug}",
  title: ${toLiteral(title)},
  subtitle: "TODO: add a one-line magazine-style scene deck.",
  category: "${category}",
  workType: "Other",
  workTitle: ${toLiteral(workTitle)},
  ${year ? `year: ${year},` : "// year: undefined,"}
  languageTags: ${JSON.stringify(languageGuess ? [languageGuess] : [])},
  locationTags: [],
  description: "TODO: explain what happens in the scene and why it belongs in the archive.",
  pullQuote: "TODO: add an editorial pull quote.",
  transcriptLines: [],
  commentary: [
    "TODO: add commentary-first framing before any clip language becomes the whole point.",
  ],
  culturalSignificance: [
    "TODO: explain why this belongs in the archive.",
  ],
  accuracyNotes: [
    "TODO: note what is still uncertain, provisional, or unverified.",
  ],
  confidenceStatus: "Needs review",
  editorialStatus: "${editorialStatus}",
  sources: [],
  verificationNotes: [
    "TODO: confirm exact clip, source trail, and factual details before publication.",
  ],
  media: {
    rightsHolder: "TODO: add rights holder",
    rightsNotes: "TODO: add official link and rights trail.",
    mediaStatus: "hidden",
  },
  socialEmbeds: [],
  relatedScenes: [],
  publishedAt: "",
  status: "draft",
  poster: {
    title: ${toLiteral(title)},
    subtitle: "draft stub.",
    topMeta: ${toLiteral(topMeta)},
    decoration: "待補",
  },
  ogTitle: "",
  ogDescription: "",
  socialPreviewTitle: "",
  socialHook: "",
  shortCaption: "",
  longCaption: "",
  hashtags: [],
  coverTitle: "",
  callToAction: "",
} satisfies Scene;
`;

  await mkdir(outDir, { recursive: true });
  await writeFile(outPath, fileContents, { flag: "wx" });

  console.log(`Created ${path.relative(process.cwd(), outPath)}`);
  console.log(`Next step: move the stub into data/scenes.ts after verification work begins.`);
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error(`new:scene failed - ${message}`);
  process.exitCode = 1;
} finally {
  rl.close();
}

function parseArgs(argv: string[]) {
  const parsed: Record<string, string> = {};

  for (const arg of argv) {
    if (!arg.startsWith("--")) continue;
    const [rawKey, ...rawValue] = arg.slice(2).split("=");
    const value = rawValue.join("=").trim();
    if (!rawKey || !value) continue;
    parsed[rawKey] = value;
  }

  return parsed;
}

async function promptRequired(label: string, preset?: string) {
  const value = (preset ?? (await rl.question(`${label}: `))).trim();
  if (!value) {
    throw new Error(`${label} is required`);
  }
  return value;
}

async function promptOptional(label: string, preset?: string) {
  return (preset ?? (await rl.question(`${label}: `))).trim();
}

async function promptEnum<T extends string>(
  label: string,
  options: readonly T[],
  preset?: string,
): Promise<T> {
  const display = options.join(" | ");
  const fallback = options[0];
  const rawValue =
    preset ?? (await rl.question(`${label} (${display}) [${fallback}]: `));
  const value = rawValue.trim() || fallback;

  if (options.includes(value as T)) {
    return value as T;
  }

  throw new Error(`${label} must be one of: ${display}`);
}

function getNextSceneId() {
  const highest = scenes.reduce((max, scene) => {
    const numericId = Number.parseInt(scene.id, 10);
    return Number.isFinite(numericId) ? Math.max(max, numericId) : max;
  }, 0);

  return String(highest + 1).padStart(3, "0");
}

function parseOptionalYear(value: string) {
  if (!value) return undefined;
  const numericYear = Number.parseInt(value, 10);

  if (!Number.isFinite(numericYear)) {
    throw new Error(`Year must be numeric if provided, received "${value}"`);
  }

  return numericYear;
}

function uniqueSlug(baseSlug: string) {
  const existing = new Set(scenes.map((scene) => scene.slug));
  if (!existing.has(baseSlug)) {
    return baseSlug;
  }

  let counter = 2;
  let candidate = `${baseSlug}-${counter}`;

  while (existing.has(candidate)) {
    counter += 1;
    candidate = `${baseSlug}-${counter}`;
  }

  return candidate;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function toLiteral(value: string) {
  return JSON.stringify(value);
}

function toPascalCase(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");
}
