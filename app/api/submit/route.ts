import { NextResponse } from "next/server";
import { Resend } from "resend";
import { submissionContactEmail } from "@/lib/site";

export const runtime = "nodejs";

const FROM_EMAIL =
  process.env.SUBMISSION_FROM_EMAIL ||
  "Cantonese American <onboarding@resend.dev>";
const SUBMISSION_WEBHOOK_URL = process.env.SUBMISSION_WEBHOOK_URL?.trim();

const FIELDS: Array<{ key: string; label: string }> = [
  { key: "scene", label: "Scene / movie / show / person" },
  { key: "sourceLink", label: "Source link" },
  { key: "timestamp", label: "Timestamp" },
  { key: "languageGuess", label: "Language guess" },
  { key: "rememberedLine", label: "What they remember being said" },
  { key: "why", label: "Why it matters" },
  { key: "categoryGuess", label: "Category guess" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "canHelpTranslateOrVerify", label: "Can help translate or verify" },
];

const REQUIRED = ["scene", "sourceLink", "languageGuess", "why", "categoryGuess"];

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeBody(body: Record<string, unknown>) {
  return {
    scene: toStringValue(body.scene),
    sourceLink: toStringValue(body.sourceLink || body.link),
    timestamp: toStringValue(body.timestamp),
    languageGuess: toStringValue(body.languageGuess || body.culture),
    rememberedLine: toStringValue(body.rememberedLine || body.quote),
    why: toStringValue(body.why),
    categoryGuess: toStringValue(body.categoryGuess),
    name: toStringValue(body.name),
    email: toStringValue(body.email),
    canHelpTranslateOrVerify: toBooleanString(body.canHelpTranslateOrVerify),
    company: toStringValue(body.company),
  };
}

function toStringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function toBooleanString(value: unknown) {
  if (value === true || value === "true" || value === "on") return "Yes";
  return "";
}

export async function POST(req: Request) {
  let rawBody: Record<string, unknown>;

  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const body = normalizeBody(rawBody);

  if (body.company) {
    return NextResponse.json({ ok: true, delivered: "ignored" });
  }

  for (const key of REQUIRED) {
    const value = body[key as keyof typeof body];
    if (typeof value !== "string" || !value.trim()) {
      return NextResponse.json(
        { ok: false, error: `Missing field: ${key}` },
        { status: 400 },
      );
    }
  }

  let sourceHost = "";

  try {
    const parsed = new URL(body.sourceLink);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("Invalid protocol");
    }
    sourceHost = parsed.host;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid source link" },
      { status: 400 },
    );
  }

  if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email" },
      { status: 400 },
    );
  }

  const debugContext = {
    receivedAt: new Date().toISOString(),
    scene: body.scene,
    categoryGuess: body.categoryGuess,
    languageGuess: body.languageGuess,
    sourceHost,
    timestampProvided: Boolean(body.timestamp),
    rememberedLineProvided: Boolean(body.rememberedLine),
    whyProvided: Boolean(body.why),
    nameProvided: Boolean(body.name),
    emailProvided: Boolean(body.email),
    canHelpTranslateOrVerify: body.canHelpTranslateOrVerify === "Yes",
  };

  const deliveries: string[] = [];
  const errors: string[] = [];

  if (SUBMISSION_WEBHOOK_URL) {
    try {
      const response = await fetch(SUBMISSION_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "cantonese-american-nomination",
          receivedAt: debugContext.receivedAt,
          payload: body,
        }),
        cache: "no-store",
      });

      if (!response.ok) {
        errors.push(`webhook:${response.status}`);
        console.error("[cantonese-american:submission:webhook-error]", {
          ...debugContext,
          status: response.status,
        });
      } else {
        deliveries.push("webhook");
      }
    } catch (error) {
      errors.push("webhook:exception");
      console.error("[cantonese-american:submission:webhook-exception]", {
        ...debugContext,
        error,
      });
    }
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: submissionContactEmail,
        subject: `New nomination: ${body.scene.slice(0, 80)}`,
        html: renderEmailHtml(body),
        text: renderEmailText(body),
        replyTo: body.email.includes("@") ? body.email : undefined,
      });

      if (error) {
        errors.push("email:provider");
        console.error("[cantonese-american:submission:email-error]", {
          ...debugContext,
          error,
        });
      } else {
        deliveries.push("email");
      }
    } catch (error) {
      errors.push("email:exception");
      console.error("[cantonese-american:submission:email-exception]", {
        ...debugContext,
        error,
      });
    }
  }

  if (deliveries.length > 0) {
    return NextResponse.json({ ok: true, delivered: deliveries.join("+") });
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[cantonese-american:submission:dev-log]", {
      ...debugContext,
      payload: body,
    });
    return NextResponse.json({ ok: true, delivered: "log" });
  }

  console.error("[cantonese-american:submission:unconfigured]", {
    ...debugContext,
    errors,
  });

  return NextResponse.json(
    {
      ok: false,
      error:
        "Nomination delivery is not configured yet. Set SUBMISSION_WEBHOOK_URL or RESEND_API_KEY in production.",
    },
    { status: 503 },
  );
}

function renderEmailHtml(body: ReturnType<typeof normalizeBody>) {
  const rows = FIELDS.map(({ key, label }) => {
    const value = body[key as keyof typeof body];
    if (typeof value !== "string" || !value.trim()) return "";
    return `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #E5E1D8;vertical-align:top;width:200px;color:#6B6660;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-family:-apple-system,sans-serif;">${escapeHtml(label)}</td>
        <td style="padding:14px 0;border-bottom:1px solid #E5E1D8;color:#0B0B0B;font-size:16px;line-height:1.55;font-family:Georgia,serif;">${escapeHtml(value).replace(/\n/g, "<br/>")}</td>
      </tr>`;
  }).join("");

  return `
    <div style="background:#FAF8F4;padding:40px 24px;font-family:-apple-system,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background:#FAF8F4;">
        <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#E85D2C;margin-bottom:8px;">New Nomination</div>
        <h1 style="font-family:Georgia,serif;font-size:28px;line-height:1.15;color:#0B0B0B;margin:0 0 24px 0;font-weight:400;">Cantonese American · weekly queue intake</h1>
        <table style="width:100%;border-collapse:collapse;border-top:1px solid #E5E1D8;">${rows}</table>
        <p style="margin-top:24px;color:#6B6660;font-size:12px;">Received ${new Date().toUTCString()}</p>
      </div>
    </div>`;
}

function renderEmailText(body: ReturnType<typeof normalizeBody>) {
  return FIELDS.map(({ key, label }) => {
    const value = body[key as keyof typeof body];
    return typeof value === "string" && value.trim() ? `${label}\n${value}\n` : "";
  }).join("\n");
}
