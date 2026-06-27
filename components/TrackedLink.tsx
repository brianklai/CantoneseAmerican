"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics-client";
import type { AnalyticsEventName, AnalyticsPayload } from "@/lib/analytics";

interface Props {
  href: string;
  event: AnalyticsEventName;
  payload?: AnalyticsPayload;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

export default function TrackedLink({
  href,
  event,
  payload,
  className,
  children,
  target,
  rel,
}: Props) {
  const isExternal = href.startsWith("http");

  function handleClick() {
    trackEvent(event, { ...payload, href });
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={className}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
