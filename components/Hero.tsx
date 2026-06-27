export default function Hero({ sceneCount = 1 }: { sceneCount?: number }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:px-12 lg:pb-24 lg:pt-32">
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="rise rise-1 flex items-center gap-3 text-[10px] uppercase tracking-ultra text-muted">
              <span className="inline-block h-px w-6 bg-ink" />
              <span>Issue 001 — American, In Cantonese · Weekly archive</span>
            </div>
            <h1 className="rise rise-2 mt-6 font-serif text-[44px] font-light leading-[0.95] tracking-[-0.02em] text-balance sm:text-[72px] lg:text-[104px]">
              Cantonese <span className="italic font-normal">is</span>
              <br />
              <span className="text-accent">American.</span>
            </h1>
            <p className="rise rise-3 mt-8 max-w-prose-tight text-lg leading-[1.45] text-ink/80 text-pretty sm:text-xl">
              A weekly archive of Cantonese-speaking culture in American media,
              business, politics, history, and everyday life, built scene by
              scene for the long haul.
            </p>
            <div className="rise rise-4 mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="/archive"
                className="group inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
              >
                Browse the archive
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="/nominate"
                className="text-sm text-ink/70 underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
              >
                Nominate a future scene
              </a>
            </div>
          </div>

          <aside className="rise rise-4 col-span-12 self-end lg:col-span-5 lg:border-l lg:border-rule lg:pl-10">
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              The thesis
            </div>
            <p className="mt-4 font-serif text-[22px] leading-[1.3] text-pretty sm:text-[26px]">
              Cantonese is not foreign to America. It's in the kitchens, the
              films, the streets, the boardrooms, the songs —
              <span className="text-accent"> already here, already ours.</span>
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              <Stat label="Series" value="001" />
              <Stat label="Scenes" value={String(sceneCount).padStart(2, "0")} />
              <Stat label="Yearly pace" value="52+" />
            </div>
          </aside>
        </div>
      </div>
      <div className="border-t border-rule" />
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-serif text-3xl leading-none">{value}</div>
      <div className="mt-2 text-[10px] uppercase tracking-ultra text-muted">
        {label}
      </div>
    </div>
  );
}
