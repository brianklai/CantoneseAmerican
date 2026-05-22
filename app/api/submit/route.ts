import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL =
  process.env.SUBMISSION_TO_EMAIL || "speakingamericanorg@gmail.com";
const FROM_EMAIL =
  process.env.SUBMISSION_FROM_EMAIL ||
  "Cantonese American <onboarding@resend.dev>";

const FIELDS: Array<{ key: string; label: string }> = [
  { key: "scene", label: "Scene / movie / show" },
  { key: "culture", label: "Culture or language" },
  { key: "link", label: "Link or timestamp" },
  { key: "quote", label: "What was said?" },
  { key: "why", label: "Why did it matter?" },
  { key: "email", label: "Email" },
];

const REQUIRED = ["scene", "culture", "why"];

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  for (const key of REQUIRED) {
    const v = body?.[key];
    if (typeof v !== "string" || !v.trim()) {
      return NextResponse.json(
        { ok: false, error: `Missing field: ${key}` },
        { status: 400 },
      );
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No key configured — log so it shows in Vercel runtime logs.
    console.log("[cantonese-american:submission]", {
      receivedAt: new Date().toISOString(),
      ...body,
    });
    return NextResponse.json({ ok: true, delivered: "log" });
  }

  const resend = new Resend(apiKey);

  const rows = FIELDS.map(({ key, label }) => {
    const v = body?.[key];
    if (typeof v !== "string" || !v.trim()) return "";
    return `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #E5E1D8;vertical-align:top;width:200px;color:#6B6660;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-family:-apple-system,sans-serif;">${escapeHtml(label)}</td>
        <td style="padding:14px 0;border-bottom:1px solid #E5E1D8;color:#0B0B0B;font-size:16px;line-height:1.55;font-family:Georgia,serif;">${escapeHtml(v).replace(/\n/g, "<br/>")}</td>
      </tr>`;
  }).join("");

  const html = `
    <div style="background:#FAF8F4;padding:40px 24px;font-family:-apple-system,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background:#FAF8F4;">
        <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#E85D2C;margin-bottom:8px;">New Submission</div>
        <h1 style="font-family:Georgia,serif;font-size:28px;line-height:1.15;color:#0B0B0B;margin:0 0 24px 0;font-weight:400;">Cantonese American · archive entry</h1>
        <table style="width:100%;border-collapse:collapse;border-top:1px solid #E5E1D8;">${rows}</table>
        <p style="margin-top:24px;color:#6B6660;font-size:12px;">Received ${new Date().toUTCString()}</p>
      </div>
    </div>`;

  const text = FIELDS.map(({ key, label }) => {
    const v = body?.[key];
    return typeof v === "string" && v.trim() ? `${label}\n${v}\n` : "";
  }).join("\n");

  const subject = `New submission: ${String(body.scene).slice(0, 80)}`;
  const replyTo =
    typeof body.email === "string" && body.email.includes("@")
      ? body.email
      : undefined;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject,
      html,
      text,
      replyTo,
    });
    if (error) {
      console.error("[resend:error]", error);
      return NextResponse.json(
        { ok: false, error: "Email delivery failed" },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, delivered: "email" });
  } catch (err) {
    console.error("[resend:exception]", err);
    return NextResponse.json(
      { ok: false, error: "Email delivery failed" },
      { status: 502 },
    );
  }
}
