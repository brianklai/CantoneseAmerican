import TrackedLink from "@/components/TrackedLink";

export default function SubmitForm() {
  return (
    <section
      id="submit"
      className="relative overflow-hidden border-b border-rule bg-ink text-paper"
    >
      <div
        aria-hidden
        className="absolute -right-8 -top-16 hidden select-none font-serif text-[240px] leading-none text-paper/[0.04] pointer-events-none md:block sm:-right-12 sm:text-[320px]"
      >
        廣
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid grid-cols-12 items-end gap-y-8 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-[10px] uppercase tracking-ultra text-paper/60">
              Nominate
            </div>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.01em] text-balance sm:text-5xl">
              Seen a scene we should archive?
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <p className="max-w-3xl text-[18px] leading-[1.6] text-paper/76 text-pretty">
              Send it into the queue. Movies, shows, campaign videos,
              restaurants, signs, speeches, songs, and everyday moments all
              count.
            </p>
            <TrackedLink
              href="/nominate"
              event="nominate_click"
              payload={{ location: "homepage_submit_section", surface: "homepage" }}
              className="mt-7 inline-flex bg-paper px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-paper"
            >
              Nominate a scene
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
