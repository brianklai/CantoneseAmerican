"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import TrackedLink from "@/components/TrackedLink";
import {
  formatEditorialStatus,
  getSceneDisplayNumber,
  type MediaStatus,
  type Scene,
} from "@/data/scenes";

interface Props {
  scene: Scene;
}

const statusLabel: Record<MediaStatus, string> = {
  active: "Clip active",
  "official-link-only": "Official link only",
  removed: "Clip removed",
  hidden: "Media hidden",
};

export default function MediaBlock({ scene }: Props) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const displayNumber = getSceneDisplayNumber(scene);
  const hasHostedVideo =
    scene.media.mediaStatus === "active" && Boolean(scene.media.hostedUrl);

  useEffect(() => {
    setPlaying(false);
  }, [scene.slug, scene.media.hostedUrl]);

  function play() {
    setPlaying(true);
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {
        /* controls remain visible if autoplay is blocked */
      });
    });
  }

  return (
    <figure className="relative">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink text-paper">
        {scene.media.mediaStatus === "active" && scene.media.embedUrl ? (
          <iframe
            src={scene.media.embedUrl}
            title={`${scene.title} embed`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : hasHostedVideo ? (
          playing ? (
            <video
              ref={videoRef}
              src={scene.media.hostedUrl}
              controls
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full bg-black"
            />
          ) : (
            <Poster scene={scene} displayNumber={displayNumber} onPlay={play} />
          )
        ) : (
          <FallbackPanel scene={scene} displayNumber={displayNumber} />
        )}
      </div>

      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
        <span>
          {statusLabel[scene.media.mediaStatus]} · Copyright remains with{" "}
          {scene.media.rightsHolder}.
          {scene.confidenceStatus === "Unclear audio" && " Audio under review."}
        </span>
        <span className="flex flex-wrap items-center gap-3">
          {scene.editorialStatus !== "published" && (
            <span>{formatEditorialStatus(scene.editorialStatus)}</span>
          )}
          {scene.media.officialUrl && (
            <TrackedLink
              href={scene.media.officialUrl}
              event="official_source_click"
              payload={{
                sceneId: scene.id,
                sceneSlug: scene.slug,
                sourceLabel: "media_footer",
                location: "media_block",
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Official source →
            </TrackedLink>
          )}
          <Link href="/rights" className="hover:text-accent transition-colors">
            Rights policy →
          </Link>
        </span>
      </figcaption>
    </figure>
  );
}

function Poster({
  scene,
  displayNumber,
  onPlay,
}: {
  scene: Scene;
  displayNumber: string;
  onPlay: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play scene ${displayNumber}: ${scene.title}`}
      className="group absolute inset-0 h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Backdrop decoration={scene.poster.decoration} />

      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
        <div className="mt-2 flex items-start justify-between gap-6">
          <div className="text-[10px] uppercase tracking-ultra text-paper/60">
            No. {displayNumber}
          </div>
          <div className="text-right text-[10px] uppercase tracking-ultra text-paper/50">
            {scene.poster.topMeta}
          </div>
        </div>

        <div>
          <div className="max-w-2xl font-serif text-3xl leading-[1.02] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
            {scene.poster.title}
            <br />
            <span className="italic text-accent">{scene.poster.subtitle}</span>
          </div>
          <div className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-ultra text-paper/60">
            <span className="inline-block h-px w-6 bg-paper/40" />
            <span>Play clip</span>
          </div>
        </div>
      </div>

      <span
        aria-hidden
        className="absolute bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full bg-paper text-ink shadow-lg transition-transform group-hover:scale-105 group-active:scale-95 sm:bottom-10 sm:right-10 sm:h-20 sm:w-20"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6 translate-x-[2px] sm:h-7 sm:w-7"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}

function FallbackPanel({
  scene,
  displayNumber,
}: {
  scene: Scene;
  displayNumber: string;
}) {
  const copy = {
    "official-link-only": {
      label: "Clip withheld on this site",
      body:
        "This archive entry currently points to an official source rather than hosting a local clip.",
    },
    removed: {
      label: "Clip removed after review",
      body:
        scene.media.removalNote ??
        "The media has been removed, but the transcript, commentary, and archive context remain available below.",
    },
    hidden: {
      label: "Media intentionally hidden",
      body:
        "This scene page preserves the editorial record without displaying the source clip.",
    },
    active: {
      label: "Clip unavailable",
      body:
        "A playable source is not attached yet, but the archive record is live and ready for review.",
    },
  }[scene.media.mediaStatus];

  return (
    <div className="absolute inset-0">
      <Backdrop decoration={scene.poster.decoration} />
      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
        <div className="mt-2 flex items-start justify-between gap-6">
          <div className="text-[10px] uppercase tracking-ultra text-paper/60">
            No. {displayNumber}
          </div>
          <div className="text-right text-[10px] uppercase tracking-ultra text-paper/50">
            {scene.poster.topMeta}
          </div>
        </div>

        <div className="max-w-2xl">
          <div className="text-[10px] uppercase tracking-ultra text-paper/60">
            {copy.label}
          </div>
          <div className="mt-4 font-serif text-3xl leading-[1.05] tracking-[-0.01em] sm:text-5xl">
            {scene.poster.title}
            <br />
            <span className="italic text-accent">{scene.poster.subtitle}</span>
          </div>
          <p className="mt-5 max-w-prose-tight text-sm leading-[1.7] text-paper/78 sm:text-base">
            {copy.body}
          </p>
          {scene.media.officialUrl && (
            <TrackedLink
              href={scene.media.officialUrl}
              event="official_source_click"
              payload={{
                sceneId: scene.id,
                sceneSlug: scene.slug,
                sourceLabel: "fallback_panel",
                location: "media_block",
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-sm text-paper/80 underline underline-offset-4 decoration-paper/25 transition-colors hover:text-accent hover:decoration-accent"
            >
              Go to official source →
            </TrackedLink>
          )}
        </div>
      </div>
    </div>
  );
}

function Backdrop({ decoration = "廣東話" }: { decoration?: string }) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 20%, rgba(232,93,44,0.55) 0%, rgba(232,93,44,0) 55%), radial-gradient(80% 70% at 85% 95%, rgba(255,180,90,0.28) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #1a1410 0%, #0b0b0b 100%)",
        }}
      />
      <div className="absolute inset-0 grain" />
      <div className="absolute -left-2 top-2 whitespace-nowrap font-serif text-[120px] leading-none text-paper/[0.08] pointer-events-none select-none sm:-left-4 sm:top-6 sm:text-[200px] lg:text-[260px]">
        {decoration}
      </div>
      <div className="absolute left-0 right-0 top-0 flex h-2.5" aria-hidden>
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 border-r border-paper/15 last:border-r-0"
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex h-2.5" aria-hidden>
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 border-r border-paper/15 last:border-r-0"
          />
        ))}
      </div>
    </>
  );
}
