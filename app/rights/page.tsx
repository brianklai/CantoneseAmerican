import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { submissionContactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rights & Takedown",
  description:
    "How Cantonese American handles clip hosting, commentary, educational use, and rights-holder review requests.",
  alternates: {
    canonical: "/rights",
  },
};

export default function RightsPage() {
  return (
    <main className="relative bg-paper">
      <Header />
      <section className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-4">
              <div className="text-[10px] uppercase tracking-ultra text-muted">
                Rights
              </div>
              <h1 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.01em] sm:text-5xl lg:text-[68px]">
                Editorial archive,
                <br />
                <span className="italic">with review on request.</span>
              </h1>
            </div>

            <div className="col-span-12 space-y-6 text-[17px] leading-[1.7] text-ink/82 text-pretty lg:col-span-7 lg:col-start-6">
              <p className="font-serif text-2xl leading-[1.35] text-ink">
                Cantonese American is an educational and editorial archive built
                for commentary, criticism, translation, and cultural
                documentation.
              </p>
              <p>
                The site exists to preserve context around scenes where
                Cantonese-speaking culture appears in American life. That means
                we may host short excerpts, link to official releases, publish
                transcripts, and write editorial commentary about what a scene
                documents and why it matters.
              </p>
              <p>
                Copyright remains with the original rights holders. We do not
                claim ownership over films, television episodes, broadcast
                footage, or other source material discussed in the archive.
              </p>
              <p>
                When a rights issue is raised, a scene can move into one of
                several states: active clip, official-link-only, removed, or
                hidden. The goal is to preserve the archive record even if the
                hosted media changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-4">
              <div className="text-[10px] uppercase tracking-ultra text-muted">
                What stays
              </div>
            </div>
            <div className="col-span-12 grid gap-5 sm:grid-cols-2 lg:col-span-8">
              <PolicyCard
                title="Commentary and criticism"
                body="Editorial analysis, cultural framing, and contextual notes remain core to each archive entry."
              />
              <PolicyCard
                title="Translation and transcript"
                body="Where possible, the archive preserves original lines, jyutping, translations, and confidence notes."
              />
              <PolicyCard
                title="Source attribution"
                body="Each scene page records the work title, known credits, rights holder, and publication status."
              />
              <PolicyCard
                title="Takedown-ready states"
                body="If a clip cannot stay hosted, the entry can switch to an official link, removal notice, or hidden-media state."
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-4">
              <div className="text-[10px] uppercase tracking-ultra text-muted">
                Review requests
              </div>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.01em] sm:text-5xl">
                Rights holders can request review or removal.
              </h2>
            </div>
            <div className="col-span-12 space-y-5 text-[17px] leading-[1.7] text-ink/82 text-pretty lg:col-span-7 lg:col-start-6">
              <p>
                If you represent a rights holder and want an entry reviewed,
                corrected, link-adjusted, or removed, contact the site with the
                scene URL, the work involved, and the requested action.
              </p>
              <p>
                The archive is designed so a page can remain useful to readers
                even after a hosting change. That means a review request does not
                have to erase the cultural record in order to address the media
                concern.
              </p>
              <div className="border border-rule p-6">
                <div className="text-[10px] uppercase tracking-ultra text-muted">
                  Contact
                </div>
                <p className="mt-3 font-serif text-2xl text-ink">
                  {submissionContactEmail}
                </p>
                <p className="mt-3 text-sm leading-[1.7] text-ink/70">
                  Include the scene URL and the nature of the request so the
                  archive can review it promptly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function PolicyCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-rule p-5">
      <div className="font-serif text-2xl">{title}</div>
      <p className="mt-3 text-[15px] leading-[1.65] text-ink/75">{body}</p>
    </div>
  );
}
