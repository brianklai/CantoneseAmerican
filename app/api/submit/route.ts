import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const required = ["scene", "culture", "why"];
    for (const key of required) {
      if (!body?.[key] || typeof body[key] !== "string" || !body[key].trim()) {
        return NextResponse.json(
          { ok: false, error: `Missing field: ${key}` },
          { status: 400 },
        );
      }
    }

    // In production, forward to email / Airtable / Notion / DB here.
    console.log("[cantonese-american:submission]", {
      receivedAt: new Date().toISOString(),
      ...body,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid payload" },
      { status: 400 },
    );
  }
}
