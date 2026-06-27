import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import TrackedLink from "@/components/TrackedLink";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="grid grid-cols-12 items-end gap-y-6">
          <div className="col-span-12 sm:col-span-6">
            <div className="font-serif text-2xl">Cantonese American</div>
            <div className="mt-2 text-[10px] uppercase tracking-ultra text-muted">
              A Speaking American Project · Series 001 · Weekly cultural archive
            </div>
          </div>
          <div className="col-span-12 text-[12px] text-muted sm:col-span-6 sm:text-right">
            <div>
              © {year} Speaking American. Clips remain the property of their
              rights holders.
            </div>
            <div className="mt-2 flex gap-5 sm:justify-end">
              <Link href="/archive" className="transition-colors hover:text-accent">
                Archive
              </Link>
              <Link href="/rights" className="transition-colors hover:text-accent">
                Rights & Takedown
              </Link>
              <Link href="/privacy" className="transition-colors hover:text-accent">
                Privacy
              </Link>
              <TrackedLink
                href="/nominate"
                event="nominate_click"
                payload={{ location: "footer_nav", surface: "site_chrome" }}
                className="transition-colors hover:text-accent"
              >
                Nominate a Scene
              </TrackedLink>
              <Link href="/#follow" className="transition-colors hover:text-accent">
                Follow
              </Link>
            </div>
            <div className="mt-3 sm:flex sm:justify-end">
              <SocialLinks
                location="footer_social"
                surface="site_chrome"
                variant="inline"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
