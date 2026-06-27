import { ImageResponse } from "next/og";
import {
  getSceneBySlug,
  getSceneDisplayNumber,
  getSceneSocialTitle,
} from "@/data/scenes";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const scene = getSceneBySlug(slug);

  if (!scene) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            background: "#0b0b0b",
            color: "#faf8f4",
            fontSize: 48,
          }}
        >
          Cantonese American
        </div>
      ),
      size,
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 18% 22%, rgba(232,93,44,0.75), rgba(232,93,44,0) 36%), linear-gradient(180deg, #1a1410 0%, #0b0b0b 100%)",
          color: "#faf8f4",
          padding: "56px 64px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "-24px",
            top: "20px",
            opacity: 0.09,
            fontSize: 220,
            whiteSpace: "nowrap",
          }}
        >
          {scene.poster.decoration ?? "廣東話"}
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 22,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              opacity: 0.72,
            }}
          >
            <span>Cantonese American</span>
            <span>{scene.category} · No. {getSceneDisplayNumber(scene)}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 74, lineHeight: 0.95, maxWidth: 960 }}>
              {getSceneSocialTitle(scene)}
            </div>
            <div
              style={{
                maxWidth: 860,
                fontSize: 30,
                lineHeight: 1.35,
                opacity: 0.84,
              }}
            >
              {scene.ogDescription ?? scene.subtitle}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 21,
              opacity: 0.72,
            }}
          >
            <span>{scene.poster.topMeta}</span>
            <span>{scene.confidenceStatus}</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
