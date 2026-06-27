import TrackedLink from "@/components/TrackedLink";

const links = [
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@cantoneseamerican",
    handle: "@cantoneseamerican",
    Icon: TikTokIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/cantoneseamerica",
    handle: "@cantoneseamerica",
    Icon: InstagramIcon,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@cantoneseamerican",
    handle: "@cantoneseamerican",
    Icon: YouTubeIcon,
  },
];

export default function Follow() {
  return (
    <section id="follow" className="border-b border-rule">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10 items-end">
          <div className="col-span-12 lg:col-span-5">
            <div className="text-[10px] uppercase tracking-ultra text-muted">
              Public Channels
            </div>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl leading-[1.05] tracking-[-0.01em]">
              The archive lives{" "}
              <span className="italic">in public.</span>
            </h2>
            <p className="mt-5 text-ink/70 max-w-prose-tight">
              New scenes every week. Subtitled, sourced, and pulled apart.
            </p>
          </div>

          <ul className="col-span-12 lg:col-span-6 lg:col-start-7 divide-y divide-rule border-y border-rule">
            {links.map(({ name, href, handle, Icon }) => (
              <li key={name}>
                <TrackedLink
                  href={href}
                  event="social_click"
                  payload={{ platform: name, location: "follow_section", surface: "homepage" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 py-4 sm:py-5 hover:text-accent transition-colors"
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-serif text-2xl sm:text-3xl">
                    {name}
                  </span>
                  <span className="text-sm text-muted group-hover:text-accent transition-colors">
                    {handle}
                  </span>
                  <span className="ml-auto text-sm transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </TrackedLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21 8.5a7.5 7.5 0 0 1-5-1.9V16a6 6 0 1 1-6-6c.34 0 .67.03 1 .09v3.1a3 3 0 1 0 2 2.81V2h3a4.5 4.5 0 0 0 5 4.5v2z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21.58 7.2a2.73 2.73 0 0 0-1.92-1.93C17.96 4.8 12 4.8 12 4.8s-5.96 0-7.66.47A2.73 2.73 0 0 0 2.42 7.2 28.5 28.5 0 0 0 2 12a28.5 28.5 0 0 0 .42 4.8 2.73 2.73 0 0 0 1.92 1.93c1.7.47 7.66.47 7.66.47s5.96 0 7.66-.47a2.73 2.73 0 0 0 1.92-1.93A28.5 28.5 0 0 0 22 12a28.5 28.5 0 0 0-.42-4.8ZM10 15.2V8.8l5.2 3.2L10 15.2Z" />
    </svg>
  );
}
