import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SceneRecord from "@/components/SceneRecord";
import { getSceneBySlug, publishedScenes } from "@/data/scenes";
import { buildSceneMetadata } from "@/lib/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return publishedScenes.map((scene) => ({
    slug: scene.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const scene = getSceneBySlug(slug);

  if (!scene) {
    return {
      title: "Scene not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  if (scene.status !== "published") {
    return {
      title: `${scene.title} | Cantonese American`,
      description: scene.description || scene.subtitle,
      alternates: {
        canonical: `/archive/${scene.slug}`,
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildSceneMetadata(scene);
}

export default async function ArchiveScenePage({ params }: Props) {
  const { slug } = await params;
  const scene = getSceneBySlug(slug);

  if (!scene || scene.status !== "published") {
    notFound();
  }

  return (
    <main className="relative bg-paper">
      <Header />
      <SceneRecord scene={scene} />
      <Footer />
    </main>
  );
}
