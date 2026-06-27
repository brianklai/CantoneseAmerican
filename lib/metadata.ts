import type { Metadata } from "next";
import {
  getSceneMetaDescription,
  getSceneSearchTitle,
  type Scene,
} from "@/data/scenes";
import { absoluteUrl } from "@/lib/site";

export function buildSceneMetadata(scene: Scene): Metadata {
  const title = `${getSceneSearchTitle(scene)} | Cantonese American`;
  const description = getSceneMetaDescription(scene);
  const image = absoluteUrl(
    scene.ogImage ?? `/archive/${scene.slug}/opengraph-image`,
  );

  return {
    title,
    description,
    alternates: {
      canonical: `/archive/${scene.slug}`,
    },
    openGraph: {
      title: scene.socialPreviewTitle ?? getSceneSearchTitle(scene),
      description,
      type: "article",
      url: absoluteUrl(`/archive/${scene.slug}`),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: scene.socialPreviewTitle ?? getSceneSearchTitle(scene),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: scene.socialPreviewTitle ?? getSceneSearchTitle(scene),
      description,
      images: [image],
    },
  };
}
