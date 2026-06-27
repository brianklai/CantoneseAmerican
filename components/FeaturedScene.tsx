import Link from "next/link";
import CommentaryVideo from "./CommentaryVideo";
import MediaBlock from "./MediaBlock";
import {
  formatEditorialStatus,
  formatSceneSource,
  getSceneDisplayNumber,
  type Scene,
} from "@/data/scenes";

interface Props {
  scene: Scene;
  eyebrow?: string;
}

export default function FeaturedScene({
  scene,
  eyebrow = `Featured Scene · No. ${getSceneDisplayNumber(scene)}`,
}: Props) {
  const transcriptLead = scene.transcriptLines[0];
  const transcriptLeadText = transcriptLead
    ? transcriptLead.original ?? transcriptLead.text ?? "Transcript text pending"
    : "";
  const editorialVideo = scene.socialEmbeds.find((embed) => embed.hostedUrl);

  return (
    <article className="relative">
      <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="text-[10px] uppercase tracking-ultra text-muted">
            {eyebrow}
          </div>
          <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.01em] text-balance sm:text-5xl">
            {renderTitleWithItalicTail(scene.title)}
          </h2>
          <p className="mt-5 text-lg leading-[1.5] text-ink/78 text-pretty">
            {scene.subtitle}
          </p>
          <div className="mt-6 text-sm text-muted">{formatSceneSource(scene)}</div>
          <div className="mt-8 flex flex-wrap gap-2">
            <Tag>{scene.category}</Tag>
            {scene.workType && <Tag>{scene.workType}</Tag>}
            {scene.languageTags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
            {scene.locationTags.slice(0, 2).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
            <Tag>{scene.confidenceStatus}</Tag>
            <Tag>{formatEditorialStatus(scene.editorialStatus)}</Tag>
          </div>
          <div className="mt-10">
            <Link
              href={`/archive/${scene.slug}`}
              className="inline-flex items-center gap-3 text-sm text-ink/75 underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              Read the permanent archive page
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <MediaBlock scene={scene} />
        </div>
      </div>

      <div className="mt-14 grid grid-cols-12 gap-y-10 sm:mt-16 lg:gap-x-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="text-[10px] uppercase tracking-ultra text-muted">
            Pull quote
          </div>
          <blockquote className="mt-4 font-serif text-2xl leading-[1.25] text-pretty sm:text-[28px]">
            &ldquo;{scene.pullQuote}&rdquo;
          </blockquote>
        </div>

        <div className="col-span-12 space-y-5 text-[17px] leading-[1.6] text-ink/85 text-pretty lg:col-span-7 lg:col-start-6">
          <p className="font-serif text-2xl leading-[1.35] text-ink">
            {scene.description}
          </p>
          {scene.commentary.slice(0, 2).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {scene.commentary.length > 2 && (
            <p className="text-[10px] uppercase tracking-ultra text-muted">
              Full transcript, notes, and archive context on the scene page.
            </p>
          )}
        </div>
      </div>

      {(transcriptLead || editorialVideo?.hostedUrl) && (
        <div className="mt-16 grid grid-cols-12 items-start gap-y-10 sm:mt-20 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              {transcriptLead ? "The line" : "Transcript"}
            </div>
            {transcriptLead ? (
              <>
                <div className="mt-4 font-serif text-[40px] leading-[1.1] tracking-[-0.01em] text-balance sm:text-[56px] lg:text-[64px]">
                  {transcriptLeadText}
                </div>
                {transcriptLead.jyutping && (
                  <div className="mt-3 font-mono text-sm tracking-wide text-muted sm:text-base">
                    {transcriptLead.jyutping}
                  </div>
                )}
                {transcriptLead.translation && (
                  <div className="mt-3 font-serif text-xl italic text-ink/80 sm:text-2xl">
                    {transcriptLead.translation}
                  </div>
                )}
                <div className="mt-4 text-[10px] uppercase tracking-ultra text-muted">
                  {transcriptLead.timestamp ?? "Timestamp pending"} ·{" "}
                  {scene.confidenceStatus}
                </div>
              </>
            ) : (
              <div className="mt-4 border border-dashed border-rule p-6">
                <div className="font-serif text-2xl text-ink">
                  Commentary preview.
                </div>
                <p className="mt-3 max-w-prose-tight text-[15px] leading-[1.7] text-ink/72">
                  The full archive record carries the durable notes, media
                  status, and transcript layer.
                </p>
              </div>
            )}
          </div>

          {editorialVideo?.hostedUrl && (
            <div className="col-span-12 flex lg:col-span-4 lg:col-start-9 lg:justify-end">
              <CommentaryVideo
                videoSrc={editorialVideo.hostedUrl}
                caption={editorialVideo.label}
              />
            </div>
          )}
        </div>
      )}
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

function renderTitleWithItalicTail(title: string) {
  // Italicize the final word after a comma or em dash to keep the editorial cadence.
  const m = title.match(/^(.*[,—])\s+(\S.+)$/);
  if (!m) return title;
  return (
    <>
      {m[1]}{" "}
      <span className="italic text-accent">{m[2]}</span>
    </>
  );
}
