"use client";

import { useRef, useState } from "react";

const YOUTUBE_URL = "https://www.youtube.com/watch?v=U0Cky9b6mHY";

export default function FilmStill() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function play() {
    setPlaying(true);
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {
        /* autoplay may be blocked; controls remain visible */
      });
    });
  }

  return (
    <figure className="relative">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink text-paper">
        {playing ? (
          <video
            ref={videoRef}
            src="/rush-hour.mp4"
            controls
            playsInline
            className="absolute inset-0 w-full h-full bg-black"
          />
        ) : (
          <Poster onPlay={play} />
        )}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
        <span>Editorial treatment. All footage belongs to its makers.</span>
        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          Watch on YouTube →
        </a>
      </figcaption>
    </figure>
  );
}

function Poster({ onPlay }: { onPlay: () => void }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label="Play the Rush Hour 2 Cantonese scene"
      className="group absolute inset-0 w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 20% 20%, rgba(232,93,44,0.55) 0%, rgba(232,93,44,0) 55%), radial-gradient(80% 70% at 85% 95%, rgba(255,180,90,0.28) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #1a1410 0%, #0b0b0b 100%)",
        }}
      />
      <div className="absolute inset-0 grain" />

      <div className="absolute -left-2 sm:-left-4 top-2 sm:top-6 font-serif text-[180px] sm:text-[280px] lg:text-[340px] leading-none text-paper/[0.08] select-none pointer-events-none">
        廣東話
      </div>

      <div className="absolute top-0 left-0 right-0 h-2.5 flex" aria-hidden>
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 border-r border-paper/15 last:border-r-0"
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-2.5 flex" aria-hidden>
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 border-r border-paper/15 last:border-r-0"
          />
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
        <div className="flex items-start justify-between gap-6 mt-2">
          <div className="text-[10px] uppercase tracking-ultra text-paper/60">
            Featured · 001
          </div>
          <div className="text-right text-[10px] uppercase tracking-ultra text-paper/50">
            Rush Hour 2<br />
            New Line · 2001
          </div>
        </div>

        <div>
          <div className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.01em] max-w-2xl">
            Don Cheadle,
            <br />
            <span className="italic text-accent">in Cantonese.</span>
          </div>
          <div className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-ultra text-paper/60">
            <span className="inline-block w-6 h-px bg-paper/40" />
            <span>Tap to play the scene</span>
          </div>
        </div>
      </div>

      <span
        aria-hidden
        className="absolute right-6 bottom-6 sm:right-10 sm:bottom-10 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-paper text-ink shadow-lg transition-transform group-hover:scale-105 group-active:scale-95"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 sm:w-7 sm:h-7 translate-x-[2px]"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
