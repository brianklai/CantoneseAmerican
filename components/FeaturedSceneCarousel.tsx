"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import CommentaryVideo from "./CommentaryVideo";
import MediaBlock from "./MediaBlock";
import {
  formatSceneSource,
  getSceneDisplayNumber,
  type Scene,
} from "@/data/scenes";

interface Props {
  scenes: Scene[];
  sceneIds: string[];
}

const summaries: Record<string, string> = {
  "001":
    "Don Cheadle's Cantonese scene is funny, unexpected, and one of the clearest examples of Cantonese showing up inside mainstream American pop culture — not as something foreign, but as part of the world the movie is already borrowing from.",
  "002":
    "Larry David's bus standoff works because Cantonese is treated as part of ordinary Los Angeles texture: sharp, public, and immediately legible to anyone who grew up around that auntie cadence.",
  "003":
    "Rick and Morty's recent kung fu riff points back to Kill Bill, and Kill Bill points back to Hong Kong cinema, Bak Mei folklore, and Cantonese. This entry tracks one of the longest Cantonese-heavy sequences I've found in mainstream Hollywood.",
};

export default function FeaturedSceneCarousel({ scenes, sceneIds }: Props) {
  const featuredScenes = useMemo(
    () =>
      sceneIds
        .map((id) => scenes.find((scene) => scene.id === id && scene.status === "published"))
        .filter((scene): scene is Scene => Boolean(scene)),
    [sceneIds, scenes],
  );
  const [index, setIndex] = useState(0);
  const [activeMedia, setActiveMedia] = useState<"scene" | "commentary">("scene");
  const scene = featuredScenes[index];

  useEffect(() => {
    setActiveMedia("scene");
  }, [scene?.id]);

  if (!scene) return null;

  const commentary = scene.socialEmbeds.find((embed) => embed.hostedUrl);
  const hasTranscript = scene.transcriptLines.length > 0;

  function go(delta: number) {
    setIndex((current) => (current + delta + featuredScenes.length) % featuredScenes.length);
  }

  return (
    <div className="mt-14 border-t border-rule pt-10 sm:mt-16 sm:pt-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="text-[10px] uppercase tracking-ultra text-muted">
          Featured Record · No. {getSceneDisplayNumber(scene)}
        </div>
        <div className="flex items-center gap-2">
          <ArrowButton
            label="Previous featured record"
            onClick={() => go(-1)}
            disabled={featuredScenes.length < 2}
            direction="prev"
          />
          <ArrowButton
            label="Next featured record"
            onClick={() => go(1)}
            disabled={featuredScenes.length < 2}
            direction="next"
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-y-8 lg:gap-x-10">
        <div className="col-span-12 lg:col-span-4">
          <h3 className="font-serif text-4xl leading-[1.05] tracking-[-0.01em] text-balance sm:text-5xl">
            {getHomepageTitle(scene)}
          </h3>
          <p className="mt-5 text-[17px] leading-[1.65] text-ink/82 text-pretty">
            {summaries[scene.id] ?? scene.subtitle}
          </p>
          <div className="mt-5 text-[10px] uppercase tracking-ultra text-muted">
            {hasTranscript
              ? "Transcript: available · Cantonese: reviewed"
              : "Transcript: manually subtitled · Structured layer coming later"}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/archive/${scene.slug}`}
              className="inline-flex bg-ink px-5 py-3 text-sm text-paper transition-colors hover:bg-accent"
            >
              View archive record
            </Link>
            {scene.tiktokUrl && (
              <a
                href={scene.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex border border-rule px-5 py-3 text-sm text-ink/75 transition-colors hover:border-accent hover:text-accent"
              >
                Watch TikTok
              </a>
            )}
          </div>
          <div className="mt-6 text-sm text-muted">{formatSceneSource(scene)}</div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <FeaturedMedia
            scene={scene}
            commentarySrc={commentary?.hostedUrl}
            activeMedia={activeMedia}
            onShowScene={() => setActiveMedia("scene")}
          />
          {commentary?.hostedUrl && (
            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
              <div className="border border-rule p-5">
                <div className="text-[10px] uppercase tracking-ultra text-muted">
                  Creator commentary
                </div>
                <p className="mt-3 max-w-prose-tight text-[15px] leading-[1.6] text-ink/72">
                  {scene.socialHook ??
                    "A short companion video adds the editor's angle without replacing the archive record."}
                </p>
              </div>
              <CommentaryVideo
                videoSrc={commentary.hostedUrl}
                caption={commentary.label}
                onPlayRequest={() => setActiveMedia("commentary")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FeaturedMedia({
  scene,
  commentarySrc,
  activeMedia,
  onShowScene,
}: {
  scene: Scene;
  commentarySrc?: string;
  activeMedia: "scene" | "commentary";
  onShowScene: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const showCommentary = activeMedia === "commentary" && Boolean(commentarySrc);

  useEffect(() => {
    if (!showCommentary) return;
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {});
    });
  }, [showCommentary, commentarySrc]);

  if (!showCommentary) {
    return <MediaBlock scene={scene} />;
  }

  return (
    <figure className="relative">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black text-paper">
        <video
          ref={videoRef}
          src={commentarySrc}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full bg-black object-contain"
        />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
        <span>Creator commentary · Playing in the main viewer.</span>
        <button
          type="button"
          onClick={onShowScene}
          className="transition-colors hover:text-accent"
        >
          Back to archive clip →
        </button>
      </figcaption>
    </figure>
  );
}

function ArrowButton({
  label,
  onClick,
  disabled,
  direction,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  direction: "prev" | "next";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-10 w-10 items-center justify-center border border-rule text-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <span aria-hidden>{direction === "prev" ? "<" : ">"}</span>
    </button>
  );
}

function getHomepageTitle(scene: Scene) {
  if (scene.id === "001") return "Rush Hour 2 — Don Cheadle Speaking Cantonese";
  return scene.title;
}
