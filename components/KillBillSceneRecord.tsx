import CommentaryVideo from "@/components/CommentaryVideo";
import MediaBlock from "@/components/MediaBlock";
import SceneViewTracker from "@/components/SceneViewTracker";
import TrackedLink from "@/components/TrackedLink";
import {
  formatSceneSource,
  formatSourceType,
  getRelatedScenes,
  getSceneDisplayNumber,
  type MediaStatus,
  type Scene,
  type TranscriptStatus,
} from "@/data/scenes";
import Link from "next/link";

const mediaStatusLabel: Record<MediaStatus, string> = {
  active: "Clip active",
  "official-link-only": "Official link only",
  removed: "Clip removed",
  hidden: "Media hidden",
};

const transcriptStatusLabel: Record<TranscriptStatus, string> = {
  verified: "Verified",
  "mostly-verified": "Mostly verified",
  "in-review": "In review",
  "not-started": "Not started",
};

const contextCards = [
  {
    title: "Pai Mei / Bak Mei / 白眉",
    body:
      "Pai Mei is the Hollywood-facing spelling attached to Bak Mei / Pak Mei / Bai Mei, written 白眉, or White Eyebrow. The figure is best treated here as legendary and folkloric rather than securely historical.",
  },
  {
    title: "Hong Kong kung fu cinema",
    body:
      "The sequence is built from Hong Kong martial-arts cinema memory, including Shaw Brothers-style training ritual, theatrical hierarchy, and Gordon Liu's own screen history.",
  },
  {
    title: "Rick and Morty bridge",
    body:
      "The newer animated reference is useful because it points backward. Rick and Morty leads to Kill Bill; Kill Bill leads back to Cantonese-speaking martial-arts worlds.",
  },
];

export default function KillBillSceneRecord({ scene }: { scene: Scene }) {
  const relatedScenes = getRelatedScenes(scene);
  const commentaryVideo = scene.socialEmbeds.find((embed) => embed.hostedUrl);
  const transcriptStatus = scene.transcriptStatus ?? "mostly-verified";
  const reviewFlagCount =
    scene.reviewFlagCount ?? scene.transcriptReviewNotes?.length ?? 0;

  return (
    <article className="relative bg-paper">
      <SceneViewTracker
        sceneId={scene.id}
        sceneSlug={scene.slug}
        category={scene.category}
        workTitle={scene.workTitle}
      />

      <section className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-4">
              <div className="flex flex-wrap items-center gap-2">
                <MetaTag>{scene.category}</MetaTag>
                <span className="text-[10px] uppercase tracking-ultra text-muted">
                  No. {getSceneDisplayNumber(scene)}
                </span>
              </div>
              <h1 className="mt-5 font-serif text-4xl leading-[1.02] tracking-[-0.01em] text-balance sm:text-5xl lg:text-[64px]">
                {scene.title}
              </h1>
              <p className="mt-6 max-w-prose-tight text-lg leading-[1.6] text-ink/78 text-pretty">
                {scene.description}
              </p>
              <div className="mt-6 text-sm text-muted">
                {formatSceneSource(scene)}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#transcript"
                  className="inline-flex min-h-11 items-center border border-ink bg-ink px-4 text-sm text-paper transition-colors hover:bg-accent hover:border-accent"
                >
                  View transcript
                </a>
                {commentaryVideo?.hostedUrl && (
                  <a
                    href="#commentary"
                    className="inline-flex min-h-11 items-center border border-rule px-4 text-sm text-ink transition-colors hover:border-ink"
                  >
                    Watch commentary
                  </a>
                )}
                {scene.media.officialUrl && (
                  <TrackedLink
                    href={scene.media.officialUrl}
                    event="official_source_click"
                    payload={{
                      sceneId: scene.id,
                      sceneSlug: scene.slug,
                      sourceLabel: "hero_official_source",
                      location: "kill_bill_hero",
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center border border-rule px-4 text-sm text-ink transition-colors hover:border-ink"
                  >
                    Official source
                  </TrackedLink>
                )}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <MediaBlock scene={scene} />
            </div>
          </div>

          <div className="mt-10 grid gap-3 border-t border-rule pt-6 sm:grid-cols-3">
            <StatusBlock
              label="Transcript"
              value={transcriptStatusLabel[transcriptStatus]}
            />
            <StatusBlock
              label="Media"
              value={mediaStatusLabel[scene.media.mediaStatus]}
            />
            <StatusBlock
              label={reviewFlagCount > 0 ? "Review flags" : "Sources"}
              value={
                reviewFlagCount > 0
                  ? String(reviewFlagCount)
                  : String(scene.sources.length)
              }
            />
          </div>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="Work" value={scene.workTitle} />
            <Fact label="Year" value={scene.year ? String(scene.year) : "Unknown"} />
            <Fact label="Category" value={scene.category} />
            <Fact label="Language" value="Cantonese-heavy" />
            <Fact label="Sequence length" value="About 15 minutes" />
            <Fact
              label="Transcript status"
              value={transcriptStatusLabel[transcriptStatus]}
            />
            <Fact label="Review flags" value={String(reviewFlagCount)} />
            <Fact label="Rights holder" value={scene.media.rightsHolder} />
          </div>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-4">
              <Kicker>Why this belongs in the archive</Kicker>
              <h2 className="mt-4 font-serif text-4xl leading-[1.08] tracking-[-0.01em] text-balance sm:text-5xl">
                Cantonese as structure,
                <span className="italic"> not ornament.</span>
              </h2>
            </div>
            <div className="col-span-12 space-y-5 text-[18px] leading-[1.75] text-ink/82 text-pretty lg:col-span-7 lg:col-start-6">
              <p className="font-serif text-2xl leading-[1.35] text-ink">
                This sequence does not just borrow kung fu imagery. It places a
                long Cantonese-heavy training scene inside a mainstream Hollywood
                revenge film, creating a bridge from American pop culture back
                through Hong Kong kung fu cinema, Southern Chinese martial arts
                folklore, and Bak Mei / 白眉.
              </p>
              {scene.commentary.slice(0, 2).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
          <Kicker>Context</Kicker>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {contextCards.map((card) => (
              <section key={card.title} className="border border-rule p-5 sm:p-6">
                <h3 className="font-serif text-2xl leading-tight text-ink">
                  {card.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-ink/76 text-pretty">
                  {card.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section id="transcript" className="scroll-mt-24 border-b border-rule">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-4">
              <Kicker>Transcript & translation</Kicker>
              <h2 className="mt-4 font-serif text-4xl leading-[1.08] tracking-[-0.01em] sm:text-5xl">
                Mostly verified,
                <span className="italic"> line by line.</span>
              </h2>
              <p className="mt-5 text-[15px] leading-[1.7] text-ink/72">
                {scene.transcriptVerificationNote ??
                  "Manually subtitled by Cantonese American; uncertain lines are flagged individually."}{" "}
                Not official subtitles. Line-level confidence labels are
                provided where structured transcript data is available.
              </p>
              {scene.transcriptVerifiedBy && (
                <p className="mt-4 text-xs uppercase tracking-ultra text-muted">
                  {scene.transcriptVerifiedBy}
                </p>
              )}
            </div>

            <div className="col-span-12 lg:col-span-8">
              {scene.transcriptLines.length > 0 ? (
                <div className="grid gap-4">
                  {scene.transcriptLines.map((line, index) => (
                    <TranscriptLineCard
                      key={line.id ?? `${getTranscriptText(line)}-${index}`}
                      line={line}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="border border-rule p-6 sm:p-8">
                  <div className="text-[10px] uppercase tracking-ultra text-accent">
                    Transcript preview
                  </div>
                  <p className="mt-4 max-w-prose text-[17px] leading-[1.7] text-ink/78">
                    Full structured transcript coming soon. Current notes
                    identify the lines still under audio/native review.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {scene.transcriptReviewNotes && scene.transcriptReviewNotes.length > 0 && (
        <section className="border-b border-rule">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
            <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
              <div className="col-span-12 lg:col-span-4">
                <Kicker>Lines still under review</Kicker>
                <p className="mt-4 max-w-prose-tight text-[15px] leading-[1.7] text-ink/72">
                  These are the remaining audio or wording questions. They do
                  not make the whole entry provisional.
                </p>
              </div>
              <div className="col-span-12 lg:col-span-8">
                <ul className="grid gap-3">
                  {scene.transcriptReviewNotes.map((note) => (
                    <li
                      key={note}
                      className="border-l-2 border-accent pl-4 text-[16px] leading-[1.7] text-ink/82"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-4">
              <Kicker>Cultural notes</Kicker>
              <h2 className="mt-4 font-serif text-4xl leading-[1.08] tracking-[-0.01em] sm:text-5xl">
                Homage, memory,
                <span className="italic"> and repackaging.</span>
              </h2>
            </div>
            <div className="col-span-12 grid gap-5 lg:col-span-7 lg:col-start-6">
              {scene.culturalSignificance.map((item) => (
                <div
                  key={item}
                  className="border border-rule p-5 text-[16px] leading-[1.7] text-ink/82 text-pretty"
                >
                  {item}
                </div>
              ))}
              {scene.contentWarnings && scene.contentWarnings.length > 0 && (
                <div className="border border-rule p-5 text-[15px] leading-[1.7] text-ink/72">
                  <div className="text-[10px] uppercase tracking-ultra text-accent">
                    Source language note
                  </div>
                  <p className="mt-3">
                    The scene includes racist, sexist, and ableist insults from
                    the source material. They are preserved only where needed for
                    accuracy and context, not celebrated.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-4">
              <Kicker>Sources & rights</Kicker>
              <p className="mt-4 max-w-prose-tight text-[15px] leading-[1.7] text-ink/72">
                Sources stay visible, but the clip can be removed or replaced
                without removing the transcript, commentary, or cultural record.
              </p>
              <Link
                href="/rights"
                className="mt-5 inline-block text-sm text-ink/75 underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Rights policy →
              </Link>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {scene.sources.map((source) => (
                  <SourceCard key={`${source.label}-${source.url}`} scene={scene} source={source} />
                ))}
              </div>
              {scene.media.rightsNotes && (
                <p className="mt-5 border-t border-rule pt-5 text-[14px] leading-[1.7] text-ink/68">
                  {scene.media.rightsNotes}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {(commentaryVideo?.hostedUrl || relatedScenes.length > 0) && (
        <section id="commentary" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
            <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
              {commentaryVideo?.hostedUrl && (
                <div className="col-span-12 sm:max-w-xs lg:col-span-4">
                  <CommentaryVideo
                    videoSrc={commentaryVideo.hostedUrl}
                    tiktokUrl={commentaryVideo.url}
                    caption={commentaryVideo.label}
                  />
                </div>
              )}

              {relatedScenes.length > 0 && (
                <div className="col-span-12 lg:col-span-7 lg:col-start-6">
                  <Kicker>Related records</Kicker>
                  <div className="mt-5 grid gap-4">
                    {relatedScenes.map((relatedScene) => (
                      <TrackedLink
                        key={relatedScene.id}
                        href={`/archive/${relatedScene.slug}`}
                        event="related_scene_click"
                        payload={{
                          sceneId: scene.id,
                          sceneSlug: scene.slug,
                          relatedSceneId: relatedScene.id,
                          relatedSceneSlug: relatedScene.slug,
                          location: "kill_bill_related_records",
                        }}
                        className="group border border-rule p-5 transition-colors hover:border-ink"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="text-[10px] uppercase tracking-ultra text-muted">
                            No. {getSceneDisplayNumber(relatedScene)} ·{" "}
                            {relatedScene.category}
                          </div>
                          <div className="text-sm text-muted transition-transform group-hover:translate-x-1">
                            Read record →
                          </div>
                        </div>
                        <div className="mt-4 font-serif text-2xl leading-[1.15] text-ink">
                          {relatedScene.title}
                        </div>
                        <p className="mt-3 max-w-prose-tight text-sm leading-[1.7] text-ink/70">
                          {relatedScene.subtitle}
                        </p>
                      </TrackedLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] uppercase tracking-ultra text-muted">
      {children}
    </div>
  );
}

function MetaTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block border border-rule px-2.5 py-1 text-[10px] uppercase tracking-ultra text-muted">
      {children}
    </span>
  );
}

function StatusBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-rule px-4 py-3">
      <div className="text-[10px] uppercase tracking-ultra text-muted">
        {label}
      </div>
      <div className="mt-1 font-serif text-xl leading-tight text-ink">
        {value}
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-rule p-4">
      <div className="text-[10px] uppercase tracking-ultra text-muted">
        {label}
      </div>
      <div className="mt-2 text-[15px] leading-[1.45] text-ink/82">
        {value}
      </div>
    </div>
  );
}

function SourceCard({
  scene,
  source,
}: {
  scene: Scene;
  source: Scene["sources"][number];
}) {
  const isExternal = source.url.startsWith("http");
  const className =
    "mt-3 block break-all text-sm leading-[1.5] text-ink/72 underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

  return (
    <div className="border border-rule p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-serif text-xl leading-tight text-ink">
          {source.label}
        </h3>
        <span className="text-[10px] uppercase tracking-ultra text-muted">
          {formatSourceType(source.type)}
        </span>
      </div>
      {source.type === "official" ? (
        <TrackedLink
          href={source.url}
          event="official_source_click"
          payload={{
            sceneId: scene.id,
            sceneSlug: scene.slug,
            sourceLabel: source.label,
            location: "kill_bill_sources",
          }}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={className}
        >
          {source.url}
        </TrackedLink>
      ) : (
        <a
          href={source.url}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={className}
        >
          {source.url}
        </a>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {source.supports.map((support) => (
          <MetaTag key={support}>{support}</MetaTag>
        ))}
      </div>
    </div>
  );
}

function TranscriptLineCard({
  line,
  index,
}: {
  line: Scene["transcriptLines"][number];
  index: number;
}) {
  const text = getTranscriptText(line);
  const timestamp = getTranscriptTimestamp(line);

  return (
    <div className="border border-rule p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-[10px] uppercase tracking-ultra text-muted">
          {line.speaker ? `${line.speaker} · ` : ""}
          Line {String(index + 1).padStart(2, "0")}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <MetaTag>{timestamp}</MetaTag>
          <MetaTag>{formatTranscriptConfidence(line.confidence)}</MetaTag>
        </div>
      </div>

      {line.flags && line.flags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {line.flags.map((flag) => (
            <MetaTag key={flag}>{flag.replace(/-/g, " ")}</MetaTag>
          ))}
        </div>
      )}

      <div className="mt-4 font-serif text-2xl leading-[1.2] text-ink sm:text-3xl">
        {text}
      </div>
      {line.jyutping && (
        <div className="mt-3 font-mono text-sm tracking-wide text-muted">
          {line.jyutping}
        </div>
      )}
      {line.translation && (
        <div className="mt-3 text-base leading-[1.6] text-ink/80">
          {line.translation}
        </div>
      )}
      {line.notes && line.notes.length > 0 && (
        <div className="mt-4 grid gap-2 border-t border-rule pt-4 text-sm leading-[1.6] text-muted">
          {line.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function getTranscriptText(line: Scene["transcriptLines"][number]) {
  return (
    line.textTraditional ??
    line.original ??
    line.textSimplified ??
    line.text ??
    "Transcript text pending"
  );
}

function getTranscriptTimestamp(line: Scene["transcriptLines"][number]) {
  if (line.timestampStart && line.timestampEnd) {
    return `${line.timestampStart}-${line.timestampEnd}`;
  }

  return line.timestampStart ?? line.timestamp ?? "Timestamp pending";
}

function formatTranscriptConfidence(
  confidence: Scene["transcriptLines"][number]["confidence"],
) {
  return confidence.replace(/-/g, " ");
}
