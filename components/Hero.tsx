export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-24">
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="rise rise-1 flex items-center gap-3 text-[10px] uppercase tracking-ultra text-muted">
              <span className="inline-block w-6 h-px bg-ink" />
              <span>Issue 001 — American, In Cantonese</span>
            </div>
            <h1 className="rise rise-2 mt-6 font-serif font-light text-[44px] sm:text-[72px] lg:text-[104px] leading-[0.95] tracking-[-0.02em] text-balance">
              Cantonese <span className="italic font-normal">is</span>
              <br />
              <span className="text-accent">American.</span>
            </h1>
            <p className="rise rise-3 mt-8 max-w-prose-tight text-lg sm:text-xl leading-[1.45] text-ink/80 text-pretty">
              A living archive of Cantonese-speaking culture in American movies,
              TV, history, and everyday life — starting with the scenes that
              made us feel at home.
            </p>
            <div className="rise rise-4 mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#submit"
                className="group inline-flex items-center gap-3 bg-ink text-paper px-6 py-3.5 text-sm font-medium hover:bg-accent transition-colors"
              >
                Nominate a scene
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#featured"
                className="text-sm text-ink/70 hover:text-ink underline underline-offset-4 decoration-rule hover:decoration-ink transition-colors"
              >
                Read the first feature
              </a>
            </div>
          </div>

          <aside className="rise rise-4 col-span-12 lg:col-span-5 lg:pl-10 lg:border-l lg:border-rule self-end">
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              The thesis
            </div>
            <p className="mt-4 font-serif text-[22px] sm:text-[26px] leading-[1.3] text-pretty">
              Cantonese is not foreign to America. It's in the kitchens, the
              films, the streets, the songs —
              <span className="text-accent">
                {" "}
                already here, already ours.
              </span>
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              <Stat label="Series" value="001" />
              <Stat label="Scenes" value="01" />
              <Stat label="Open" value="∞" />
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
