import FilmStill from "./FilmStill";

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
