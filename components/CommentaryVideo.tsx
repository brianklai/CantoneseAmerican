"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  videoSrc: string;
  tiktokUrl?: string;
  caption?: string;
}

export default function CommentaryVideo({
  videoSrc,
  tiktokUrl,
  caption = "From the editor",
}: Props) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setPlaying(false);
  }, [videoSrc]);

  function play() {
    setPlaying(true);
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {});
    });
  }

  return (
    <figure className="relative">
      <div className="text-[10px] uppercase tracking-ultra text-muted mb-3">
        {caption}
      </div>
      <div className="relative aspect-[9/16] max-w-[260px] sm:max-w-[280px] overflow-hidden bg-ink rounded-[28px] shadow-2xl ring-[3px] ring-ink/90">
        <video
          ref={videoRef}
          src={videoSrc}
          preload="metadata"
          playsInline
          controls={playing}
          className="absolute inset-0 w-full h-full object-cover bg-black"
        />
        {!playing && (
          <button
            type="button"
            onClick={play}
            aria-label="Play commentary"
            className="absolute inset-0 group flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25"
            />
            <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-paper text-ink shadow-lg transition-transform group-hover:scale-105 group-active:scale-95">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 translate-x-[2px]"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      {tiktokUrl && (
        <figcaption className="mt-3 text-xs">
          <a
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
          >
            Originally on TikTok →
          </a>
        </figcaption>
      )}
    </figure>
  );
}
