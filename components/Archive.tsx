import Link from "next/link";
import FeaturedSceneCarousel from "./FeaturedSceneCarousel";
import {
  formatSceneSource,
  getSceneDisplayNumber,
  type Scene,
} from "@/data/scenes";

interface Props {
  scenes: Scene[];
}

export default function Archive({ scenes }: Props) {
  if (scenes.length === 0) return null;

  const previewScenes = scenes.filter((scene) =>
    homepageFeaturedSceneIds.includes(scene.id),
  );

  return (
    <section id="archive" className="border-b border-rule bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-8">
          <div>
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              The Archive
            </div>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-[1.05] tracking-[-0.01em] sm:text-4xl">
              Three entries in, built for the long haul.
            </h2>
          </div>
          <Link
            href="/archive"
            className="text-[10px] uppercase tracking-ultra text-muted transition-colors hover:text-accent"
          >
            Browse full archive →
          </Link>
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-3">
          {previewScenes.map((scene) => (
            <li key={scene.id}>
              <ArchiveCard scene={scene} />
            </li>
          ))}
        </ul>

        <FeaturedSceneCarousel scenes={scenes} sceneIds={homepageFeaturedSceneIds} />
      </div>
    </section>
  );
}

const homepageFeaturedSceneIds = ["001", "002", "003"];

function ArchiveCard({ scene }: { scene: Scene }) {
  return (
    <Link
      href={`/archive/${scene.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink text-paper">
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
          <div className="flex items-start justify-between gap-3 text-[10px] uppercase tracking-ultra text-paper/55">
            <span>No. {getSceneDisplayNumber(scene)}</span>
            <span>{scene.category}</span>
          </div>
          <div className="font-serif text-2xl leading-[1.05] tracking-[-0.01em] sm:text-3xl">
            {scene.poster.title}
            <br />
            <span className="italic text-accent">{scene.poster.subtitle}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 text-xs text-muted">
        <div className="truncate">{formatSceneSource(scene)}</div>
        <div className="mt-1 text-ink/70 transition-colors group-hover:text-accent">
          View archive record →
        </div>
      </div>
    </Link>
  );
}
