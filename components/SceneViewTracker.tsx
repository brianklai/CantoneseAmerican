"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics-client";

interface Props {
  sceneId: string;
  sceneSlug: string;
  category: string;
  workTitle: string;
}

export default function SceneViewTracker({
  sceneId,
  sceneSlug,
  category,
  workTitle,
}: Props) {
  useEffect(() => {
    trackEvent("scene_view", {
      sceneId,
      sceneSlug,
      category,
      workTitle,
      location: "scene_page",
    });
  }, [category, sceneId, sceneSlug, workTitle]);

  return null;
}
