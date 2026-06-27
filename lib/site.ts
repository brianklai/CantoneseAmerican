const DEFAULT_PRODUCTION_SITE_URL = "https://cantoneseamerican.com";
const DEFAULT_DEVELOPMENT_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(value: string | undefined) {
  if (!value) return null;

  try {
    const normalized = new URL(value.trim());
    return normalized.origin;
  } catch {
    return null;
  }
}

function readBooleanFlag(value: string | undefined) {
  return /^(1|true|yes|on)$/i.test(value ?? "");
}

export const siteUrl =
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  (process.env.NODE_ENV === "development"
    ? DEFAULT_DEVELOPMENT_SITE_URL
    : DEFAULT_PRODUCTION_SITE_URL);

export const submissionContactEmail =
  process.env.SUBMISSION_TO_EMAIL || "speakingamericanorg@gmail.com";

export const archiveFeedPath = "/archive.json";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function isStudioEnabled() {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  return readBooleanFlag(
    process.env.ENABLE_STUDIO ?? process.env.NEXT_PUBLIC_ENABLE_STUDIO,
  );
}

export const staticPaths = [
  "/",
  "/archive",
  "/rights",
  "/privacy",
  "/nominate",
] as const;
