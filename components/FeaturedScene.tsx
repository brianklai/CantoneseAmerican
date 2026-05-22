export default function FeaturedScene() {
  return (
    <section id="featured" className="border-b border-rule">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              Featured Scene · No. 001
            </div>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl leading-[1.05] tracking-[-0.01em] text-balance">
              The day Don Cheadle spoke{" "}
              <span className="italic text-accent">Cantonese.</span>
            </h2>
            <div className="mt-6 text-sm text-muted">
              <span className="font-medium text-ink">Rush Hour 2</span> · 2001 ·
              dir. Brett Ratner
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <Tag>Film</Tag>
              <Tag>Cantonese</Tag>
              <Tag>Los Angeles</Tag>
              <Tag>2001</Tag>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <FilmStill />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-y-10 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              Pull quote
            </div>
            <blockquote className="mt-4 font-serif text-2xl sm:text-[28px] leading-[1.25] text-pretty">
              "He didn't <span className="italic">do</span> Cantonese. He{" "}
              <span className="italic">spoke</span> it — fluent, casual, like a
              regular Tuesday in Los Angeles."
            </blockquote>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6 space-y-5 text-[17px] leading-[1.6] text-ink/85 text-pretty">
            <p>
              Halfway through Rush Hour 2, in a Los Angeles soul-food
              restaurant, a Black American actor leans over the counter and
              starts trading Cantonese with Jackie Chan and Chris Tucker. Not
              subtitled-for-laughs Cantonese. Not phonetic Cantonese.{" "}
              <em>Cantonese.</em>
            </p>
            <p>
              The joke is that nothing about it is a joke. Don Cheadle's
              character, Kenny, runs the place, knows the menu, knows the
              regulars, knows the language. The film treats this as ordinary —
              which is the radical part.
            </p>
            <p>
              For a generation of Cantonese-American kids watching at home, it
              was the first time a major American movie put our grandmother's
              language in the mouth of an American who looked nothing like our
              grandmother — and made it land as American.
            </p>
            <p className="text-muted text-[14px] pt-3">
              — Filed under <em>American, In Cantonese</em>. Series 001.
            </p>
          </div>
        </div>
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

function FilmStill() {
  return (
    <figure className="relative">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink text-paper">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 20% 20%, rgba(232,93,44,0.55) 0%, rgba(232,93,44,0) 55%), radial-gradient(80% 70% at 85% 95%, rgba(255,180,90,0.28) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #1a1410 0%, #0b0b0b 100%)",
          }}
        />
        <div className="absolute inset-0 grain" />

        <div className="absolute -left-2 sm:-left-4 top-2 sm:top-6 font-serif text-[180px] sm:text-[280px] lg:text-[340px] leading-none text-paper/[0.08] select-none pointer-events-none">
          廣東話
        </div>

        <div
          className="absolute top-0 left-0 right-0 h-2.5 flex"
          aria-hidden
        >
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-paper/15 last:border-r-0"
            />
          ))}
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-2.5 flex"
          aria-hidden
        >
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-paper/15 last:border-r-0"
            />
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
          <div className="flex items-start justify-between gap-6 mt-2">
            <div className="text-[10px] uppercase tracking-ultra text-paper/60">
              Featured · 001
            </div>
            <div className="text-right text-[10px] uppercase tracking-ultra text-paper/50">
              Rush Hour 2<br />
              New Line · 2001
            </div>
          </div>

          <div>
            <div className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.01em] max-w-2xl">
              Don Cheadle,
              <br />
              <span className="italic text-accent">in Cantonese.</span>
            </div>
            <div className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-ultra text-paper/60">
              <span className="inline-block w-6 h-px bg-paper/40" />
              <span>Scene reconstruction · go watch the original</span>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-xs text-muted">
        Editorial treatment. All footage belongs to its makers.
      </figcaption>
    </figure>
  );
}
