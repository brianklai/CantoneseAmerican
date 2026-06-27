import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { submissionContactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Cantonese American handles nomination details, optional contact info, and privacy requests.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="relative bg-paper">
      <Header />
      <section className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-4">
              <div className="text-[10px] uppercase tracking-ultra text-muted">
                Privacy
              </div>
              <h1 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.01em] sm:text-5xl lg:text-[68px]">
                Human-scale privacy,
                <br />
                <span className="italic">for a public archive.</span>
              </h1>
            </div>
            <div className="col-span-12 space-y-6 text-[17px] leading-[1.7] text-ink/82 text-pretty lg:col-span-7 lg:col-start-6">
              <p className="font-serif text-2xl leading-[1.35] text-ink">
                Cantonese American collects only the information needed to read,
                review, and follow up on scene nominations.
              </p>
              <p>
                When you use the nomination form, the archive may receive the
                scene description, source link, timestamp, language guess,
                notes, category guess, and an optional offer to help translate
                or verify the material.
              </p>
              <p>
                You can also include an optional name or email if you want a
                reply. That contact information is for editorial follow-up. It
                will not be published in the public candidate queue or on the
                archive without permission.
              </p>
              <p>
                Submissions may be used to research future archive entries,
                verify public scenes, or shape editorial commentary. They may
                also be summarized internally so the weekly queue can move from
                nomination to review to publication.
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
                What stays private
              </div>
            </div>
            <div className="col-span-12 grid gap-5 sm:grid-cols-2 lg:col-span-8">
              <PolicyCard
                title="Optional contact info"
                body="If you include a name or email, it stays in the submission workflow unless you explicitly agree to be credited publicly."
              />
              <PolicyCard
                title="Public candidate queue"
                body="The candidate list on the site is editorially curated and does not expose private emails or unpublished personal details."
              />
              <PolicyCard
                title="Submission use"
                body="Nominations help the archive research scenes, plan verification work, and decide what to publish next."
              />
              <PolicyCard
                title="Removal requests"
                body="If you submitted something and want your contact details or nomination removed from the workflow, you can ask."
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
                Contact
              </div>
              <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.01em] sm:text-5xl">
                Privacy or removal questions can stay simple.
              </h2>
            </div>
            <div className="col-span-12 space-y-5 text-[17px] leading-[1.7] text-ink/82 text-pretty lg:col-span-7 lg:col-start-6">
              <p>
                If you want a nomination reviewed, corrected, or removed from
                the archive workflow, contact the site with the details you sent
                and what you want changed.
              </p>
              <div className="border border-rule p-6">
                <div className="text-[10px] uppercase tracking-ultra text-muted">
                  Privacy contact
                </div>
                <p className="mt-3 font-serif text-2xl text-ink">
                  {submissionContactEmail}
                </p>
                <p className="mt-3 text-sm leading-[1.7] text-ink/70">
                  Include enough context for the archive to find the submission
                  and respond without guesswork.
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
