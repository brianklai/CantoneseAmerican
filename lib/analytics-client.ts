"use client";

import {
  sanitizeAnalyticsPayload,
  type AnalyticsEventName,
  type AnalyticsPayload,
} from "@/lib/analytics";

export function trackEvent(
  event: AnalyticsEventName,
  payload: AnalyticsPayload = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  const body = JSON.stringify({
    event,
    payload: sanitizeAnalyticsPayload({
      ...payload,
      path: payload.path ?? window.location.pathname,
    }),
  });

  try {
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/analytics", blob);
      return;
    }

    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    // Analytics should never break the archive experience.
  }
}
