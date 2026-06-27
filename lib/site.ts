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

function normalizePublicUrl(value: string | undefined) {
  if (!value) return null;

  try {
    return new URL(value.trim()).toString();
  } catch {
    return null;
  }
}

export const siteUrl =
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  (process.env.NODE_ENV === "development"
    ? DEFAULT_DEVELOPMENT_SITE_URL
    : DEFAULT_PRODUCTION_SITE_URL);

export const submissionContactEmail =
  process.env.SUBMISSION_TO_EMAIL || "speakingamericanorg@gmail.com";

export const archiveFeedPath = "/archive.json";

export interface SocialChannel {
  name: "TikTok" | "Instagram" | "YouTube" | "Facebook";
  href: string;
  handle: string;
  description: string;
}

const facebookUrl = normalizePublicUrl(
  process.env.FACEBOOK_URL ?? process.env.NEXT_PUBLIC_FACEBOOK_URL,
);

export const socialChannels: SocialChannel[] = [
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@cantoneseamerican",
    handle: "@cantoneseamerican",
    description: "short commentary, clips, and weekly archive drops",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/cantoneseamerica",
    handle: "@cantoneseamerica",
    description: "visual archive notes, reels, and public updates",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@cantoneseamerican",
    handle: "@cantoneseamerican",
    description: "commentary videos and longer archive material",
  },
  ...(facebookUrl
    ? [
        {
          name: "Facebook" as const,
          href: facebookUrl,
          handle: "Facebook",
          description:
            "community memory, nominations, and sharing with family/community networks",
        },
      ]
    : []),
];

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
  "/why",
  "/rights",
  "/privacy",
  "/nominate",
] as const;
