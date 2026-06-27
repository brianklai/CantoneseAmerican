export default function WhyThisExists() {
  return (
    <section id="why" className="border-b border-rule bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              Why this exists
            </div>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.01em] text-balance sm:text-5xl">
              An archive,
              <br />
              <span className="italic">and an argument.</span>
            </h2>
          </div>

          <div className="col-span-12 space-y-6 text-[18px] leading-[1.6] text-ink/85 text-pretty sm:text-[19px] lg:col-span-7 lg:col-start-6">
            <p className="font-serif text-2xl leading-[1.25] text-ink sm:text-3xl">
              There's a moment, if you grew up Cantonese-American, when you
              realize your culture was already inside American culture.
            </p>
            <p>
              It was on the screen. It was in the kitchen of someone else's
              movie. It was a Black actor in 2001 speaking your grandmother's
              tongue, and the joke was that it wasn't a joke.
            </p>
            <p>
              <strong className="font-medium">Cantonese American</strong> is a
              living archive of those moments — the films, the shows, the
              lyrics, the slang, the small bits of everyday life — where
              Cantonese-speaking culture shows up not as foreign, but as
              American. The archive is built scene by scene, with durable pages
              that can survive even when a clip has to come down.
            </p>
            <p>
              It's also an argument: that what counts as "American" has always
              been larger and stranger and more interesting than the brochure
              version. We're starting with the scenes that made us feel at home,
              and we're documenting them in a form that can be cited, corrected,
              and kept.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 border-t border-rule pt-8 sm:grid-cols-2 lg:grid-cols-3">
              <Meta
                eyebrow="Umbrella"
                title="Speaking American"
                body="A project about who gets to count as American, told through language, culture, and the everyday."
              />
              <Meta
                eyebrow="First series"
                title="American, In Cantonese"
                body="Scenes from American media and public life where Cantonese-speaking culture shows up, belongs, and leaves a durable record."
              />
              <Meta
                eyebrow="Archive method"
                title="Takedown-ready"
                body="Each entry keeps its transcript, commentary, and cultural notes even if hosted media has to shift to an official link or come down."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Meta({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-ultra text-muted">
        {eyebrow}
      </div>
      <div className="mt-2 font-serif text-xl">{title}</div>
      <p className="mt-2 text-[15px] leading-[1.55] text-ink/75">{body}</p>
    </div>
  );
}
