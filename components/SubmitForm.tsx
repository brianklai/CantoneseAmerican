import NominationForm from "@/components/NominationForm";
import TrackedLink from "@/components/TrackedLink";

export default function SubmitForm() {
  return (
    <section
      id="submit"
      className="relative overflow-hidden border-b border-rule bg-ink text-paper"
    >
      <div
        aria-hidden
        className="absolute -right-8 -top-16 hidden select-none font-serif text-[260px] leading-none text-paper/[0.04] pointer-events-none md:block sm:-right-12 sm:text-[360px]"
      >
        廣
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-[10px] uppercase tracking-ultra text-paper/60">
              Nominate
            </div>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.01em] text-balance sm:text-5xl">
              Send the next scene
              <span className="italic text-accent"> into the queue.</span>
            </h2>
            <p className="mt-6 max-w-prose-tight text-[16px] leading-[1.6] text-paper/70">
              We&apos;re building for fifty-two plus scenes a year, which means every
              good lead matters. If a clip, broadcast moment, or everyday
              exchange stayed with you, send it in with whatever details you know.
            </p>
            <div className="mt-8 text-[10px] uppercase tracking-ultra text-paper/50">
              Static-first workflow · source trail required
            </div>
            <div className="mt-8">
              <TrackedLink
                href="/nominate"
                event="nominate_click"
                payload={{ location: "homepage_submit_section", surface: "homepage" }}
                className="text-sm text-paper/72 underline decoration-paper/25 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Open the full nomination page →
              </TrackedLink>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <NominationForm theme="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
