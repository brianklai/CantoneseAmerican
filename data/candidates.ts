import type { EditorialStatus, SceneCategory } from "@/data/scenes";

export interface CandidateScene {
  id: string;
  title: string;
  submittedBy?: string;
  sourceLink: string;
  timestamp?: string;
  categoryGuess: SceneCategory;
  languageGuess: string;
  notes: string;
  status: Exclude<EditorialStatus, "published">;
  createdAt: string;
  canHelpTranslateOrVerify?: boolean;
}

export const candidates: CandidateScene[] = [
  {
    id: "cand-001",
    title: "Cantonese auntie radio caller in local Bay Area traffic coverage",
    submittedBy: "Reader nomination",
    sourceLink: "https://example.com/bay-area-radio-call",
    timestamp: "approx. 00:14:00",
    categoryGuess: "Everyday",
    languageGuess: "Cantonese",
    notes:
      "Caller switches between English and Cantonese while giving real-time commute updates. Worth checking whether the station archive is still public.",
    status: "researching",
    createdAt: "2026-06-15",
    canHelpTranslateOrVerify: true,
  },
  {
    id: "cand-002",
    title: "Campaign-stop exchange between a Cantonese-speaking elder and a mayoral candidate",
    sourceLink: "https://example.com/campaign-stop-video",
    categoryGuess: "Politics",
    languageGuess: "Cantonese",
    notes:
      "Public video exists, but the audio under crowd noise likely needs a native speaker pass before any transcript is attempted.",
    status: "needs-native-review",
    createdAt: "2026-06-12",
  },
  {
    id: "cand-003",
    title: "Restaurant training video with back-of-house Cantonese directions",
    submittedBy: "Archive tipline",
    sourceLink: "https://example.com/training-video",
    timestamp: "01:08",
    categoryGuess: "Business",
    languageGuess: "Cantonese and English",
    notes:
      "Looks strong for a future scene if provenance and usage rights are clear enough for editorial citation.",
    status: "ready-to-film",
    createdAt: "2026-06-10",
  },
];

export function getCandidateStatusCounts() {
  return candidates.reduce<Record<CandidateScene["status"], number>>(
    (counts, candidate) => {
      counts[candidate.status] += 1;
      return counts;
    },
    {
      candidate: 0,
      researching: 0,
      "needs-transcription": 0,
      "needs-native-review": 0,
      "ready-to-film": 0,
      "ready-to-publish": 0,
    },
  );
}
