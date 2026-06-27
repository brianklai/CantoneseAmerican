import Link from "next/link";
import { candidates } from "@/data/candidates";
import {
  editorialStatuses,
  formatEditorialStatus,
  formatSceneSource,
  getSceneDisplayNumber,
  type EditorialStatus,
  type Scene,
} from "@/data/scenes";

interface Props {
  scenes: Scene[];
}

export default function StudioBoard({ scenes }: Props) {
  const groupedScenes = editorialStatuses.map((status) => ({
    status,
    scenes: scenes
      .filter((scene) => scene.editorialStatus === status)
      .sort((left, right) => left.id.localeCompare(right.id)),
  }));

  const draftCount = scenes.filter((scene) => scene.status === "draft").length;
  const publishedCount = scenes.filter((scene) => scene.status === "published").length;

  return (
    <section className="border-b border-rule bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              Internal studio
            </div>
            <h1 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.01em] sm:text-5xl lg:text-[68px]">
              One scene a week,
              <br />
              <span className="italic">without a CMS.</span>
            </h1>
            <p className="mt-5 max-w-prose-tight text-lg leading-[1.55] text-ink/78 text-pretty">
              This board keeps the backlog legible: what is still a lead, what
              needs ears, what is ready to film, and what is already in the
              archive.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-5">
              <StatCard label="Draft backlog" value={String(draftCount)} />
              <StatCard label="Published" value={String(publishedCount)} />
              <StatCard label="Public nominations" value={String(candidates.length)} />
              <StatCard
                label="Ready to film"
                value={String(
                  scenes.filter((scene) => scene.editorialStatus === "ready-to-film")
                    .length,
                )}
              />
            </div>

            <div className="mt-10 border border-rule p-5">
              <div className="text-[10px] uppercase tracking-ultra text-muted">
                Workflow docs
              </div>
              <div className="mt-4 space-y-3 text-sm leading-[1.7] text-ink/75">
                <p>`docs/editorial-guide.md` keeps the voice and framing tight.</p>
                <p>`docs/research-checklist.md` covers verification before publish.</p>
                <p>`docs/scene-template.md` and `docs/tiktok-template.md` speed up packaging.</p>
                <p>`docs/takedown-playbook.md` covers media-state changes without deleting context.</p>
                <p>`docs/content-calendar.md` maps the next 12 weekly releases.</p>
              </div>
            </div>
          </div>

          <div className="col-span-12 space-y-6 lg:col-span-8">
            {groupedScenes.map((group) => (
              <section key={group.status} className="border border-rule p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-ultra text-muted">
                      Editorial status
                    </div>
                    <h2 className="mt-2 font-serif text-3xl leading-tight text-ink">
                      {toTitleCase(formatEditorialStatus(group.status))}
                    </h2>
                  </div>
                  <div className="text-[10px] uppercase tracking-ultra text-muted">
                    {group.scenes.length} scene{group.scenes.length === 1 ? "" : "s"}
                  </div>
                </div>

                {group.scenes.length > 0 ? (
                  <div className="mt-6 grid gap-4">
                    {group.scenes.map((scene) => (
                      <SceneWorkflowCard key={scene.id} scene={scene} />
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 border border-dashed border-rule p-5 text-[15px] leading-[1.7] text-ink/72">
                    No scenes are sitting in this stage right now.
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-y-10 border-t border-rule pt-10 sm:mt-20 sm:pt-12 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              Incoming nominations
            </div>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.01em] sm:text-5xl">
              Public memory,
              <span className="italic"> still in intake.</span>
            </h2>
          </div>

          <div className="col-span-12 grid gap-4 lg:col-span-8">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="border border-rule p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[10px] uppercase tracking-ultra text-muted">
                    {candidate.categoryGuess} · {candidate.languageGuess}
                  </div>
                  <div className="text-[10px] uppercase tracking-ultra text-accent">
                    {toTitleCase(formatEditorialStatus(candidate.status))}
                  </div>
                </div>
                <div className="mt-4 font-serif text-2xl leading-[1.15] text-ink">
                  {candidate.title}
                </div>
                <p className="mt-3 max-w-prose-tight text-[15px] leading-[1.7] text-ink/72">
                  {candidate.notes}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
                  <span>Added {formatShortDate(candidate.createdAt)}</span>
                  {candidate.timestamp && <span>{candidate.timestamp}</span>}
                  {candidate.canHelpTranslateOrVerify && (
                    <span>Volunteer follow-up available</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SceneWorkflowCard({ scene }: { scene: Scene }) {
  const summary = scene.verificationNotes[0] ?? scene.accuracyNotes[0] ?? "Editorial note pending.";
  const meta = [
    scene.confidenceStatus,
    scene.media.mediaStatus,
    scene.lastVerifiedAt ? `Verified ${formatShortDate(scene.lastVerifiedAt)}` : null,
    scene.sources.length > 0 ? `${scene.sources.length} source(s)` : "No sources yet",
    scene.transcriptLines.length > 0
      ? `${scene.transcriptLines.length} transcript line(s)`
      : "No transcript yet",
  ].filter((item): item is string => Boolean(item));

  return (
    <div className="border border-rule p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-[10px] uppercase tracking-ultra text-muted">
          No. {getSceneDisplayNumber(scene)} · {scene.category}
        </div>
        <div className="text-[10px] uppercase tracking-ultra text-muted">
          {scene.status}
        </div>
      </div>

      <div className="mt-4 font-serif text-2xl leading-[1.15] text-ink">
        {scene.status === "published" ? (
          <Link
            href={`/archive/${scene.slug}`}
            className="transition-colors hover:text-accent"
          >
            {scene.title}
          </Link>
        ) : (
          scene.title
        )}
      </div>

      <div className="mt-3 text-sm text-muted">{formatSceneSource(scene)}</div>
      <p className="mt-4 max-w-prose-tight text-[15px] leading-[1.7] text-ink/74">
        {summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {meta.map((item) => (
          <span
            key={item}
            className="inline-block border border-rule px-2.5 py-1 text-[10px] uppercase tracking-ultra text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-rule p-4">
      <div className="font-serif text-3xl leading-none">{value}</div>
      <div className="mt-2 text-[10px] uppercase tracking-ultra text-muted">
        {label}
      </div>
    </div>
  );
}

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function toTitleCase(value: string) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}
