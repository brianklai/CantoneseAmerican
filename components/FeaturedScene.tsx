import FilmStill from "./FilmStill";
import CommentaryVideo from "./CommentaryVideo";
import { type Scene } from "@/data/scenes";

interface Props {
  scene: Scene;
  eyebrow?: string;
}

export default function FeaturedScene({
  scene,
  eyebrow = `Featured Scene · No. ${scene.number}`,
}: Props) {
  return (
    <article className="relative">
      <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="text-[10px] uppercase tracking-ultra text-muted">
            {eyebrow}
          </div>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl leading-[1.05] tracking-[-0.01em] text-balance">
            {renderTitleWithItalicTail(scene.title)}
          </h2>
          <div className="mt-6 text-sm text-muted">{scene.source}</div>
          <div className="mt-8 flex flex-wrap gap-2">
            {scene.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          {scene.rawVideoSrc ? (
            <FilmStill
              videoSrc={scene.rawVideoSrc}
              posterTitle={scene.poster.title}
              posterSubtitle={scene.poster.subtitle}
              posterTopMeta={scene.poster.topMeta}
              posterNumber={scene.number}
              decoration={scene.poster.decoration}
              externalUrl={scene.externalUrl}
            />
          ) : (
            <CommentaryOnlyPoster scene={scene} />
          )}
        </div>
      </div>

      <div className="mt-14 sm:mt-16 grid grid-cols-12 gap-y-10 lg:gap-x-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="text-[10px] uppercase tracking-ultra text-muted">
            Pull quote
          </div>
          <blockquote className="mt-4 font-serif text-2xl sm:text-[28px] leading-[1.25] text-pretty">
            &ldquo;{scene.pullQuote}&rdquo;
          </blockquote>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6 space-y-5 text-[17px] leading-[1.6] text-ink/85 text-pretty">
          {scene.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <div className="mt-16 sm:mt-20 grid grid-cols-12 gap-y-10 lg:gap-x-10 items-start">
        <div className="col-span-12 lg:col-span-7">
          <div className="text-[10px] uppercase tracking-ultra text-muted">
            The line
          </div>
          <div className="mt-4 font-serif text-[40px] sm:text-[56px] lg:text-[64px] leading-[1.1] tracking-[-0.01em] text-balance">
            {scene.cantonesePhrase}
          </div>
          {scene.romanization && (
            <div className="mt-3 font-mono text-sm sm:text-base text-muted tracking-wide">
              {scene.romanization}
            </div>
          )}
          <div className="mt-3 font-serif text-xl sm:text-2xl italic text-ink/80">
            {scene.translation}
          </div>
        </div>

        {scene.commentaryVideoSrc && (
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex lg:justify-end">
            <CommentaryVideo
              videoSrc={scene.commentaryVideoSrc}
              tiktokUrl={scene.tiktokUrl}
            />
          </div>
        )}
      </div>
    </article>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block border border-rule px-2.5 py-1 text-[10px] uppercase tracking-ultra text-muted">
      {children}
    </span>
  );
}

function CommentaryOnlyPoster({ scene }: { scene: Scene }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink text-paper">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 30% 20%, rgba(232,93,44,0.5) 0%, rgba(232,93,44,0) 60%), linear-gradient(180deg, #1a1410 0%, #0b0b0b 100%)",
        }}
      />
      <div className="absolute inset-0 grain" />
      <div className="absolute -left-2 sm:-left-4 top-2 sm:top-6 font-serif text-[120px] sm:text-[200px] lg:text-[260px] leading-none text-paper/[0.08] select-none pointer-events-none whitespace-nowrap">
        {scene.poster.decoration ?? "廣東話"}
      </div>
      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
        <div className="flex items-start justify-between gap-6 mt-2">
          <div className="text-[10px] uppercase tracking-ultra text-paper/60">
            No. {scene.number}
          </div>
          <div className="text-right text-[10px] uppercase tracking-ultra text-paper/50">
            {scene.poster.topMeta}
          </div>
        </div>
        <div>
          <div className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.01em] max-w-2xl">
            {scene.poster.title}
            <br />
            <span className="italic text-accent">
              {scene.poster.subtitle}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-ultra text-paper/60">
            <span className="inline-block w-6 h-px bg-paper/40" />
            <span>Commentary only · see editor's video below</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderTitleWithItalicTail(title: string) {
  // Italicize the final word after a comma or em-dash to add editorial rhythm.
  const m = title.match(/^(.*[,—])\s+(\S.+)$/);
  if (!m) return title;
  return (
    <>
      {m[1]}{" "}
      <span className="italic text-accent">{m[2]}</span>
    </>
  );
}
