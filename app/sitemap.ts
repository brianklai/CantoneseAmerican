import type { MetadataRoute } from "next";
import { publishedScenes } from "@/data/scenes";
import { categoryPages } from "@/lib/categories";
import { absoluteUrl, staticPaths } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
  }));

  const sceneEntries = publishedScenes.map((scene) => ({
    url: absoluteUrl(`/archive/${scene.slug}`),
    lastModified: new Date(`${scene.lastVerifiedAt ?? scene.publishedAt}T00:00:00`),
  }));

  const categoryEntries = categoryPages.map((page) => ({
    url: absoluteUrl(`/archive/${page.slug}`),
    lastModified: new Date(),
  }));

  return [...staticEntries, ...categoryEntries, ...sceneEntries];
}
