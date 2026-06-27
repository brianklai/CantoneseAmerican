export const analyticsEventNames = [
  "scene_view",
  "nominate_click",
  "nomination_start",
  "nomination_submit",
  "nomination_success",
  "nomination_error",
  "official_source_click",
  "social_click",
  "category_filter",
  "related_scene_click",
] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];

export interface AnalyticsPayload {
  href?: string;
  location?: string;
  sceneId?: string;
  sceneSlug?: string;
  relatedSceneId?: string;
  relatedSceneSlug?: string;
  category?: string;
  platform?: string;
  filter?: string;
  value?: string;
  status?: string;
  surface?: string;
  sourceLabel?: string;
  workTitle?: string;
  path?: string;
}

const ALLOWED_KEYS = new Set<keyof AnalyticsPayload>([
  "href",
  "location",
  "sceneId",
  "sceneSlug",
  "relatedSceneId",
  "relatedSceneSlug",
  "category",
  "platform",
  "filter",
  "value",
  "status",
  "surface",
  "sourceLabel",
  "workTitle",
  "path",
]);

export function sanitizeAnalyticsPayload(payload: Record<string, unknown>) {
  return Object.entries(payload).reduce<AnalyticsPayload>((safe, [key, value]) => {
    if (!ALLOWED_KEYS.has(key as keyof AnalyticsPayload)) {
      return safe;
    }

    if (typeof value !== "string") {
      return safe;
    }

    const trimmed = value.trim();
    if (!trimmed) {
      return safe;
    }

    safe[key as keyof AnalyticsPayload] = trimmed.slice(0, 240);
    return safe;
  }, {});
}
