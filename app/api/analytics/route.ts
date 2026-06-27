import { NextResponse } from "next/server";
import {
  analyticsEventNames,
  sanitizeAnalyticsPayload,
  type AnalyticsEventName,
} from "@/lib/analytics";

export const runtime = "nodejs";

const ANALYTICS_WEBHOOK_URL = process.env.ANALYTICS_WEBHOOK_URL?.trim();

export async function POST(req: Request) {
  let rawBody: Record<string, unknown>;

  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const event = normalizeEvent(rawBody.event);
  if (!event) {
    return NextResponse.json(
      { ok: false, error: "Unsupported analytics event" },
      { status: 400 },
    );
  }

  const payload = sanitizeAnalyticsPayload(
    typeof rawBody.payload === "object" && rawBody.payload !== null
      ? (rawBody.payload as Record<string, unknown>)
      : {},
  );

  const record = {
    event,
    payload,
    occurredAt: new Date().toISOString(),
  };

  if (!ANALYTICS_WEBHOOK_URL) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[cantonese-american:analytics]", record);
    }

    return NextResponse.json({ ok: true, delivered: "noop" }, { status: 202 });
  }

  try {
    const response = await fetch(ANALYTICS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("[cantonese-american:analytics:webhook-error]", {
        event,
        status: response.status,
      });
      return NextResponse.json(
        { ok: false, error: "Analytics delivery failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: "webhook" }, { status: 202 });
  } catch (error) {
    console.error("[cantonese-american:analytics:webhook-exception]", {
      event,
      error,
    });
    return NextResponse.json(
      { ok: false, error: "Analytics delivery failed" },
      { status: 502 },
    );
  }
}

function normalizeEvent(value: unknown): AnalyticsEventName | null {
  if (typeof value !== "string") {
    return null;
  }

  return analyticsEventNames.includes(value as AnalyticsEventName)
    ? (value as AnalyticsEventName)
    : null;
}
