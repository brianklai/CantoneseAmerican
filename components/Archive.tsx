"use client";

import { useState } from "react";
import FeaturedScene from "./FeaturedScene";
import { type Scene } from "@/data/scenes";

interface Props {
  scenes: Scene[];
}

export default function Archive({ scenes }: Props) {
  const [activeId, setActiveId] = useState<string>(scenes[0]?.id ?? "");

  if (scenes.length === 0) return null;

  const active = scenes.find((s) => s.id === activeId) ?? scenes[0];

  return (
    <section id="archive" className="border-b border-rule bg-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
        <div className="flex items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              The Archive
            </div>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl leading-[1.05] tracking-[-0.01em]">
              More scenes,{" "}
              <span className="italic">already American.</span>
            </h2>
          </div>
          <div className="text-[10px] uppercase tracking-ultra text-muted whitespace-nowrap">
            {scenes.length} {scenes.length === 1 ? "entry" : "entries"} · growing
          </div>
        </div>

        <div className="-mx-5 sm:-mx-8 lg:-mx-12 px-5 sm:px-8 lg:px-12 overflow-x-auto pb-2">
          <ul className="flex gap-5 sm:gap-6 snap-x snap-mandatory">
            {scenes.map((scene) => (
              <li
                key={scene.id}
                className="snap-start shrink-0 w-[260px] sm:w-[320px]"
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

        <div className="mt-16 sm:mt-20 border-t border-rule pt-12 sm:pt-16">
          <FeaturedScene
            scene={active}
            eyebrow={`Archive · No. ${active.number}`}
          />
        </div>
      </div>
    </section>
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

        <div className="absolute -left-2 top-2 font-serif text-[110px] sm:text-[140px] leading-none text-paper/[0.08] select-none pointer-events-none whitespace-nowrap">
          {scene.poster.decoration ?? "廣東話"}
        </div>

        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="text-[10px] uppercase tracking-ultra text-paper/60">
              No. {scene.number}
            </div>
            <div className="text-[10px] uppercase tracking-ultra text-paper/40 text-right">
              {scene.category}
            </div>
          </div>
          <div className="font-serif text-2xl sm:text-3xl leading-[1.05] tracking-[-0.01em]">
            {scene.poster.title}
            <br />
            <span className="italic text-accent">
              {scene.poster.subtitle}
            </span>
          </div>
        </div>

        {active && (
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1 bg-accent"
          />
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted">
        <span className="truncate">{scene.source}</span>
        <span
          className={`transition-colors ${
            active ? "text-accent" : "group-hover:text-ink"
          }`}
        >
          {active ? "Reading" : "Open →"}
        </span>
      </div>
    </button>
  );
}
