import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NominationForm from "@/components/NominationForm";
import { candidates, getCandidateStatusCounts } from "@/data/candidates";
import type { EditorialStatus } from "@/data/scenes";

export const metadata: Metadata = {
  title: "Nominate a Scene",
  description:
    "Send a scene into the Cantonese American weekly archive queue with source links, notes, and verification help.",
  alternates: {
    canonical: "/nominate",
  },
};

export default function NominatePage() {
  const statusCounts = getCandidateStatusCounts();

  return (
    <main className="relative bg-paper">
      <Header />
      <section className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="grid grid-cols-12 gap-y-12 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-4">
              <div className="text-[10px] uppercase tracking-ultra text-muted">
                Nomination desk
              </div>
              <h1 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.01em] sm:text-5xl lg:text-[68px]">
                Help the archive
                <br />
                <span className="italic">find its next scene.</span>
              </h1>
              <p className="mt-5 max-w-prose-tight text-lg leading-[1.55] text-ink/78 text-pretty">
                Send a scene, a source trail, and whatever you remember. Exact
                wording is welcome, but not required; a good lead is enough to
                start the archive pass.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-5">
                <StatCard label="In research" value={String(statusCounts.researching)} />
                <StatCard
                  label="Needs audio review"
                  value={String(statusCounts["needs-native-review"])}
                />
                <StatCard
                  label="Ready to film"
                  value={String(statusCounts["ready-to-film"])}
                />
                <StatCard
                  label="Needs transcript"
                  value={String(statusCounts["needs-transcription"])}
                />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <div className="border border-rule p-6 sm:p-8">
                <div className="text-[10px] uppercase tracking-ultra text-muted">
                  Intake form
                </div>
                <div className="mt-6">
                  <NominationForm theme="light" compact />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-12 gap-y-10 border-t border-rule pt-10 sm:mt-20 sm:pt-12 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-4">
              <div className="text-[10px] uppercase tracking-ultra text-muted">
                Public candidate queue
              </div>
            </div>
            <div className="col-span-12 grid gap-4 lg:col-span-8">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="border border-rule p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-[10px] uppercase tracking-ultra text-muted">
                      {candidate.categoryGuess} · {candidate.languageGuess}
                    </div>
                    <div className="text-[10px] uppercase tracking-ultra text-accent">
                      {formatPublicStatus(candidate.status)}
                    </div>
                  </div>
                  <div className="mt-4 font-serif text-2xl leading-[1.15] text-ink">
                    {candidate.title}
                  </div>
                  <p className="mt-3 max-w-prose-tight text-[15px] leading-[1.7] text-ink/72">
                    {candidate.notes}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
                    <span>Added {formatShortDate(candidate.createdAt)}</span>
                    {candidate.timestamp && <span>{candidate.timestamp}</span>}
                    {candidate.canHelpTranslateOrVerify && (
                      <span>Volunteer follow-up available</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function formatPublicStatus(status: Exclude<EditorialStatus, "published">) {
  const labels: Record<Exclude<EditorialStatus, "published">, string> = {
    candidate: "New lead",
    researching: "In research",
    "needs-transcription": "Needs transcript",
    "needs-native-review": "Needs audio review",
    "ready-to-film": "Ready to film",
    "ready-to-publish": "Nearly ready",
  };

  return labels[status];
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-rule p-4">
      <div className="font-serif text-3xl leading-none">{value}</div>
      <div className="mt-2 text-[10px] uppercase tracking-ultra text-muted">
        {label}
      </div>
    </div>
  );
}

function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}
