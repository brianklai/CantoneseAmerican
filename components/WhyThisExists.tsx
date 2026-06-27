import Link from "next/link";

export default function WhyThisExists() {
  return (
    <section id="why" className="border-b border-rule bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid grid-cols-12 items-end gap-y-8 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              The Mission
            </div>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.01em] sm:text-5xl">
              An archive,
              <span className="italic"> and an argument.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <p className="max-w-3xl text-[19px] leading-[1.55] text-ink/82 text-pretty">
              This archive documents Cantonese where it has always been: inside
              American films, neighborhoods, politics, businesses, and everyday
              life.
            </p>
            <Link
              href="/why"
              className="mt-6 inline-flex text-sm text-ink/75 underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              Read why this exists →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
