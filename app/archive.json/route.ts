import { NextResponse } from "next/server";
import {
  formatSceneSource,
  getSceneMetaDescription,
  getSceneSearchTitle,
  publishedScenes,
} from "@/data/scenes";
import { absoluteUrl, archiveFeedPath } from "@/lib/site";

export function GET() {
  return NextResponse.json({
    title: "Cantonese American archive",
    url: absoluteUrl(archiveFeedPath),
    updatedAt: new Date().toISOString(),
    items: publishedScenes.map((scene) => ({
      id: scene.id,
      slug: scene.slug,
      url: absoluteUrl(`/archive/${scene.slug}`),
      title: getSceneSearchTitle(scene),
      description: getSceneMetaDescription(scene),
      workTitle: scene.workTitle,
      sourceLine: formatSceneSource(scene),
      category: scene.category,
      workType: scene.workType ?? null,
      confidenceStatus: scene.confidenceStatus,
      editorialStatus: scene.editorialStatus,
      publishedAt: scene.publishedAt,
      lastVerifiedAt: scene.lastVerifiedAt ?? null,
      languageTags: scene.languageTags,
      locationTags: scene.locationTags,
    })),
  });
}
