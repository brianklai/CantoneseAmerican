import TrackedLink from "@/components/TrackedLink";
import { socialChannels, type SocialChannel } from "@/lib/site";

interface Props {
  location: string;
  surface: string;
  variant?: "list" | "inline";
}

export default function SocialLinks({
  location,
  surface,
  variant = "list",
}: Props) {
  if (socialChannels.length === 0) return null;

  if (variant === "inline") {
    return (
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {socialChannels.map((channel) => (
          <SocialLink
            key={channel.name}
            channel={channel}
            location={location}
            surface={surface}
            className="transition-colors hover:text-accent"
          >
            {channel.name}
          </SocialLink>
        ))}
      </div>
    );
  }

  return (
    <ul className="divide-y divide-rule border-y border-rule">
      {socialChannels.map((channel) => (
        <li key={channel.name}>
          <SocialLink
            channel={channel}
            location={location}
            surface={surface}
            className="group flex items-center gap-5 py-4 transition-colors hover:text-accent sm:py-5"
          >
            <SocialIcon
              channel={channel.name}
              className="h-5 w-5 flex-shrink-0"
            />
            <span className="font-serif text-2xl sm:text-3xl">
              {channel.name}
            </span>
            <span className="hidden text-sm text-muted transition-colors group-hover:text-accent sm:inline">
              {channel.description}
            </span>
            <span className="ml-auto text-sm text-muted transition-colors group-hover:text-accent">
              {channel.handle}
            </span>
            <span className="text-sm transition-transform group-hover:translate-x-1">
              →
            </span>
          </SocialLink>
        </li>
      ))}
    </ul>
  );
}

function SocialLink({
  channel,
  location,
  surface,
  className,
  children,
}: {
  channel: SocialChannel;
  location: string;
  surface: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <TrackedLink
      href={channel.href}
      event="social_click"
      payload={{ platform: channel.name, location, surface }}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </TrackedLink>
  );
}

function SocialIcon({
  channel,
  className,
}: {
  channel: SocialChannel["name"];
  className: string;
}) {
  if (channel === "TikTok") return <TikTokIcon className={className} />;
  if (channel === "Instagram") return <InstagramIcon className={className} />;
  if (channel === "YouTube") return <YouTubeIcon className={className} />;
  return <FacebookIcon className={className} />;
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

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.24 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2V8.6h-1.25c-1.24 0-1.63.77-1.63 1.56v1.9h2.77l-.44 2.91h-2.33V22C18.34 21.24 22 17.08 22 12.06Z" />
    </svg>
  );
}
