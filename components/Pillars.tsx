import Link from "next/link";

const pillars = [
  {
    label: "MEDIA",
    href: "/archive/media",
    body: "Film, TV, music, sports, comedy, and internet culture.",
    action: "Browse media",
  },
  {
    label: "BUSINESS",
    href: "/nominate",
    body: "Restaurants, Chinatowns, signage, menus, and family businesses.",
    action: "Nominate business",
  },
  {
    label: "POLITICS",
    href: "/nominate",
    body: "Campaigns, speeches, civic life, immigration, and public service.",
    action: "Nominate politics",
  },
];

export default function Pillars() {
  return (
    <section className="border-b border-rule bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="text-[10px] uppercase tracking-ultra text-muted">
          The Pillars
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {pillars.map((pillar) => (
            <Link
              key={pillar.label}
              href={pillar.href}
              className="group border border-rule p-5 transition-colors hover:border-ink"
            >
              <div className="text-[10px] uppercase tracking-ultra text-accent">
                {pillar.label}
              </div>
              <p className="mt-4 text-[16px] leading-[1.6] text-ink/78">
                {pillar.body}
              </p>
              <div className="mt-5 text-sm text-muted transition-colors group-hover:text-accent">
                {pillar.action ?? `Browse ${pillar.label.toLowerCase()}`} →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
