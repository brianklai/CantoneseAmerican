import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Why This Exists",
  description:
    "The editorial argument behind Cantonese American, a weekly archive of Cantonese and Chinese-language moments in American life.",
  alternates: {
    canonical: "/why",
  },
};

export default function WhyPage() {
  return (
    <main className="relative bg-paper">
      <Header />
      <section className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="grid grid-cols-12 gap-y-12 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-4">
              <div className="text-[10px] uppercase tracking-ultra text-muted">
                The Mission
              </div>
              <h1 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.01em] sm:text-5xl lg:text-[68px]">
                An archive,
                <br />
                <span className="italic">and an argument.</span>
              </h1>
            </div>

            <div className="col-span-12 space-y-6 text-[18px] leading-[1.65] text-ink/85 text-pretty sm:text-[19px] lg:col-span-7 lg:col-start-6">
              <p className="font-serif text-2xl leading-[1.3] text-ink sm:text-3xl">
                There is a moment, if you grew up Cantonese-American, when you
                realize your culture was already inside American culture.
              </p>
              <p>
                It was on the screen. It was in the kitchen of someone else's
                movie. It was a Black actor in 2001 speaking your grandmother's
                tongue, and the joke was that it was not a joke.
              </p>
              <p>
                <strong className="font-medium">Cantonese American</strong> is a
                living archive of those moments: films, shows, lyrics, slang,
                storefronts, campaign stops, signs, and everyday bits of public
                life where Cantonese-speaking culture shows up not as foreign,
                but as American.
              </p>
              <p>
                It is also an argument: that what counts as American has always
                been larger and stranger and more interesting than the brochure
                version. The archive starts with scenes that made us feel at
                home, and keeps them in a form that can be cited, corrected, and
                kept.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-6 border-t border-rule pt-10 sm:grid-cols-3 sm:pt-12">
            <Meta
              title="Speaking American"
              body="A project about who gets to count as American, told through language, culture, and the everyday."
            />
            <Meta
              title="American, In Cantonese"
              body="The first series: scenes from American media and public life where Cantonese-speaking culture shows up and belongs."
            />
            <Meta
              title="Takedown-ready"
              body="Each entry keeps its commentary and cultural notes even if hosted media shifts to an official link or comes down."
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Meta({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-rule p-5">
      <div className="font-serif text-2xl leading-tight">{title}</div>
      <p className="mt-3 text-[15px] leading-[1.65] text-ink/72">{body}</p>
    </div>
  );
}
