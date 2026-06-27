"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FeaturedScene from "./FeaturedScene";
import {
  formatSceneSource,
  getSceneDisplayNumber,
  type Scene,
} from "@/data/scenes";

interface Props {
  scenes: Scene[];
}

export default function Archive({ scenes }: Props) {
  const [activeId, setActiveId] = useState<string>(scenes[0]?.id ?? "");
  const activeIndex = Math.max(
    0,
    scenes.findIndex((scene) => scene.id === activeId),
  );
  const active = scenes[activeIndex];

  const cardRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  function go(delta: number) {
    if (scenes.length < 2) return;
    const next = (activeIndex + delta + scenes.length) % scenes.length;
    setActiveId(scenes[next].id);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      go(dx < 0 ? 1 : -1);
    }

    touchStartX.current = null;
    touchStartY.current = null;
  }

  useEffect(() => {
    const el = cardRefs.current[activeId];
    if (!el) return;
    el.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeId]);

  if (scenes.length === 0) return null;

  return (
    <section id="archive" className="border-b border-rule bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mb-10 flex items-end justify-between gap-6 sm:mb-12">
          <div>
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              The Archive
            </div>
            <h2 className="mt-4 font-serif text-3xl leading-[1.05] tracking-[-0.01em] sm:text-4xl">
              A weekly record of Cantonese,
              <span className="italic"> where it has always been.</span>
            </h2>
          </div>
          <div className="whitespace-nowrap text-[10px] uppercase tracking-ultra text-muted">
            {scenes.length} {scenes.length === 1 ? "entry" : "entries"} · 52+ per year
          </div>
        </div>
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-rule pb-6">
          <p className="max-w-prose-tight text-sm leading-[1.7] text-ink/72">
            The homepage keeps a moving editorial preview. The full archive index
            adds search, filters, and verification context across every
            published scene.
          </p>
          <Link
            href="/archive"
            className="shrink-0 text-[10px] uppercase tracking-ultra text-muted transition-colors hover:text-accent"
          >
            Browse full archive →
          </Link>
        </div>

        <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
          <ul className="flex gap-5 snap-x snap-mandatory sm:gap-6">
            {scenes.map((scene) => (
              <li
                key={scene.id}
                ref={(el) => {
                  cardRefs.current[scene.id] = el;
                }}
                className="w-[260px] shrink-0 snap-start sm:w-[320px]"
              >
                <ArchiveCard
                  scene={scene}
                  active={scene.id === activeId}
                  onClick={() => setActiveId(scene.id)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="mt-16 border-t border-rule pt-10 sm:mt-20 sm:pt-12"
        >
          <NavBar
            current={activeIndex + 1}
            total={scenes.length}
            onPrev={() => go(-1)}
            onNext={() => go(1)}
            activeScene={active}
            disabled={scenes.length < 2}
          />
          <div className="mt-8 sm:mt-10">
            <FeaturedScene scene={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function NavBar({
  current,
  total,
  onPrev,
  onNext,
  activeScene,
  disabled,
}: {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  activeScene: Scene;
  disabled: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="font-mono text-[11px] uppercase tracking-ultra text-muted">
        <span className="text-ink">{String(current).padStart(3, "0")}</span>
        <span className="mx-2 text-rule">/</span>
        <span>{String(total).padStart(3, "0")}</span>
        <span className="ml-3 hidden sm:inline">Swipe or use arrows</span>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href={`/archive/${activeScene.slug}`}
          className="text-[10px] uppercase tracking-ultra text-muted transition-colors hover:text-accent"
        >
          Open scene page →
        </Link>
        <div className="flex items-center gap-2">
          <ArrowButton onClick={onPrev} disabled={disabled} dir="prev" />
          <ArrowButton onClick={onNext} disabled={disabled} dir="next" />
        </div>
      </div>
    </div>
  );
}

function ArrowButton({
  onClick,
  disabled,
  dir,
}: {
  onClick: () => void;
  disabled: boolean;
  dir: "prev" | "next";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous scene" : "Next scene"}
      className="flex h-11 w-11 items-center justify-center border border-rule text-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-4 w-4 ${dir === "prev" ? "rotate-180" : ""}`}
        aria-hidden
      >
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}

function ArchiveCard({
  scene,
  active,
  onClick,
}: {
  scene: Scene;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group block w-full text-left transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        active ? "" : "opacity-75 hover:opacity-100"
      }`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink text-paper">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 20% 20%, rgba(232,93,44,0.45) 0%, rgba(232,93,44,0) 55%), linear-gradient(180deg, #1a1410 0%, #0b0b0b 100%)",
          }}
        />
        <div className="absolute inset-0 grain" />

        <div className="absolute -left-2 top-2 whitespace-nowrap font-serif text-[110px] leading-none text-paper/[0.08] pointer-events-none select-none sm:text-[140px]">
          {scene.poster.decoration ?? "廣東話"}
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="text-[10px] uppercase tracking-ultra text-paper/60">
              No. {getSceneDisplayNumber(scene)}
            </div>
            <div className="text-right text-[10px] uppercase tracking-ultra text-paper/40">
              {scene.category}
            </div>
          </div>
          <div className="font-serif text-2xl leading-[1.05] tracking-[-0.01em] sm:text-3xl">
            {scene.poster.title}
            <br />
            <span className="italic text-accent">{scene.poster.subtitle}</span>
          </div>
        </div>

        {active && (
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-accent" />
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted">
        <span className="truncate">{formatSceneSource(scene)}</span>
        <span
          className={`transition-colors ${
            active ? "text-accent" : "group-hover:text-ink"
          }`}
        >
          {active ? "Reading" : "Preview →"}
        </span>
      </div>
    </button>
  );
}
