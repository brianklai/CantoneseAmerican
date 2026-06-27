import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import {
  formatEditorialStatus,
  formatSceneSource,
  getSceneDisplayNumber,
  type Scene,
} from "@/data/scenes";

interface Props {
  title: string;
  dek: string;
  intro: string;
  scenes: Scene[];
}

export default function CategoryArchivePage({
  title,
  dek,
  intro,
  scenes,
}: Props) {
  return (
    <section className="border-b border-rule bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              Category archive
            </div>
            <h1 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.01em] sm:text-5xl lg:text-[68px]">
              {title}
            </h1>
            <p className="mt-5 max-w-prose-tight text-lg leading-[1.55] text-ink/78 text-pretty">
              {dek}
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <p className="font-serif text-2xl leading-[1.35] text-ink">{intro}</p>
            <div className="mt-8 text-[10px] uppercase tracking-ultra text-muted">
              {scenes.length} published {scenes.length === 1 ? "scene" : "scenes"}
            </div>
          </div>
        </div>

        {scenes.length > 0 ? (
          <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 xl:grid-cols-3">
            {scenes.map((scene) => (
              <Link
                key={scene.id}
                href={`/archive/${scene.slug}`}
                className="group border border-rule bg-paper p-5 transition-colors hover:border-ink"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-ultra text-muted">
                  <span>No. {getSceneDisplayNumber(scene)}</span>
                  <span>{scene.workType ?? "Work type pending"}</span>
                </div>
                <div className="mt-4 font-serif text-3xl leading-[1.05] tracking-[-0.01em] text-ink">
                  {scene.title}
                </div>
                <p className="mt-3 text-[15px] leading-[1.7] text-ink/74">
                  {scene.subtitle}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Tag>{scene.confidenceStatus}</Tag>
                  <Tag>{formatEditorialStatus(scene.editorialStatus)}</Tag>
                  {scene.languageTags.slice(0, 2).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <div className="mt-5 text-sm text-muted">{formatSceneSource(scene)}</div>
                <div className="mt-5 text-sm text-ink/72 transition-transform group-hover:translate-x-1">
                  Read archive entry →
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-12 border border-dashed border-rule px-6 py-10 sm:mt-16 sm:px-8">
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              Still building
            </div>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-ink">
              This category has more memory than entries, for now.
            </h2>
            <p className="mt-4 max-w-prose-tight text-[16px] leading-[1.7] text-ink/72">
              The archive does not need a full shelf before it can open a room.
              If you know a scene that belongs here, send it in and help shape
              the next issue.
            </p>
            <div className="mt-6">
              <TrackedLink
                href="/nominate"
                event="nominate_click"
                payload={{ location: "category_empty_state", surface: "category_archive" }}
                className="text-sm text-ink/75 underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Nominate a scene for this category →
              </TrackedLink>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block border border-rule px-2.5 py-1 text-[10px] uppercase tracking-ultra text-muted">
      {children}
    </span>
  );
}
