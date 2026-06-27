import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";

export default function Header() {
  return (
    <header className="sticky top-0 relative z-30 border-b border-rule bg-paper/80 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="group flex items-baseline gap-3">
            <span className="font-serif text-[15px] tracking-tight">
              Cantonese American
            </span>
            <span className="hidden h-3 w-px bg-rule sm:inline-block" aria-hidden />
            <span className="hidden text-[10px] uppercase tracking-ultra text-muted transition-colors group-hover:text-ink sm:inline-block">
              A Speaking American Project
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/archive"
              className="hidden text-[10px] uppercase tracking-ultra text-muted transition-colors hover:text-ink md:inline-block"
            >
              Archive
            </Link>
            <Link
              href="/rights"
              className="hidden text-[10px] uppercase tracking-ultra text-muted transition-colors hover:text-ink md:inline-block"
            >
              Rights
            </Link>
            <Link
              href="/#why"
              className="hidden text-[10px] uppercase tracking-ultra text-muted transition-colors hover:text-ink md:inline-block"
            >
              Why
            </Link>
            <TrackedLink
              href="/nominate"
              event="nominate_click"
              payload={{ location: "header_nav", surface: "site_chrome" }}
              className="text-[10px] uppercase tracking-ultra text-ink transition-colors hover:text-accent"
            >
              Nominate
            </TrackedLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
