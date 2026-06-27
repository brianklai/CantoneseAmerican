import SocialLinks from "@/components/SocialLinks";

export default function Follow() {
  return (
    <section id="follow" className="border-b border-rule">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10 items-end">
          <div className="col-span-12 lg:col-span-5">
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              Public Channels
            </div>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl leading-[1.05] tracking-[-0.01em]">
              The archive lives{" "}
              <span className="italic">in public.</span>
            </h2>
            <p className="mt-5 text-ink/70 max-w-prose-tight">
              New scenes every week. Subtitled, sourced, and pulled apart.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <SocialLinks
              location="follow_section"
              surface="homepage"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
