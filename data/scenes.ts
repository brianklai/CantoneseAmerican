export type SceneCategory =
  | "Film & TV"
  | "Politics"
  | "Business"
  | "Sport"
  | "Music"
  | "Everyday";

export interface Scene {
  id: string;
  number: string;
  title: string;
  source: string;
  category: SceneCategory;
  year?: number;
  rawVideoSrc?: string;
  commentaryVideoSrc?: string;
  tiktokUrl?: string;
  externalUrl?: string;
  cantonesePhrase: string;
  romanization?: string;
  translation: string;
  pullQuote: string;
  body: string[];
  tags: string[];
  poster: {
    title: string;
    subtitle: string;
    topMeta: string;
    decoration?: string;
  };
}

export const scenes: Scene[] = [
  {
    id: "rush-hour-2",
    number: "001",
    title: "Don Cheadle, in Cantonese.",
    source: "Rush Hour 2 · 2001 · dir. Brett Ratner",
    category: "Film & TV",
    year: 2001,
    rawVideoSrc: "/rush-hour.mp4",
    commentaryVideoSrc: "/rush-hour-commentary.mp4",
    externalUrl: "https://www.youtube.com/watch?v=U0Cky9b6mHY",
    cantonesePhrase: "佢識講廣東話㗎。",
    romanization: "keoi5 sik1 gong2 gwong2 dung1 waa2 gaa3",
    translation: "He knows how to speak Cantonese.",
    pullQuote:
      "He didn't do Cantonese. He spoke it — fluent, casual, like a regular Tuesday in Los Angeles.",
    body: [
      "Halfway through Rush Hour 2, in a Los Angeles soul-food restaurant, a Black American actor leans over the counter and starts trading Cantonese with Jackie Chan and Chris Tucker. Not subtitled-for-laughs Cantonese. Not phonetic Cantonese. Cantonese.",
      "The joke is that nothing about it is a joke. Don Cheadle's character, Kenny, runs the place, knows the menu, knows the regulars, knows the language. The film treats this as ordinary — which is the radical part.",
      "For a generation of Cantonese-American kids watching at home, it was the first time a major American movie put our grandmother's language in the mouth of an American who looked nothing like our grandmother — and made it land as American.",
    ],
    tags: ["Film", "Cantonese", "Los Angeles", "2001"],
    poster: {
      title: "Don Cheadle,",
      subtitle: "in Cantonese.",
      topMeta: "Rush Hour 2 · New Line · 2001",
      decoration: "廣東話",
    },
  },
  {
    id: "curb-your-enthusiasm",
    number: "002",
    title: "Larry David, meet the Cantonese auntie.",
    source: "Curb Your Enthusiasm · HBO",
    category: "Film & TV",
    rawVideoSrc: "/curb-your-enthusiasm.mp4",
    commentaryVideoSrc: "/curb-your-enthusiasm-commentary.mp4",
    cantonesePhrase: "你坐嗰度。",
    romanization: "nei5 co5 go2 dou6",
    translation: '"You sit there."',
    pullQuote:
      "She isn't a guest character in someone else's America. She's just in Los Angeles, speaking her language, telling Larry David off.",
    body: [
      "On a Curb Your Enthusiasm bus ride, Larry tries to sit next to an elderly Cantonese woman. Her purse is on the seat. She isn't moving it. What unfolds is a full-volume Cantonese argument — pointed fingers, indignant tone, lines like 「你成日咁多嘢講」 (\"you always have so much to say\") — entirely in Cantonese, almost entirely unsubtitled.",
      "Anyone who grew up around Cantonese aunties recognizes it instantly. The cadence, the indignation, the purse-as-territorial-claim. This isn't Hollywood Cantonese — phonetic, exaggerated, played for laughs. It's auntie Cantonese — the way it actually sounds at the back of an LA bus, at a wet market, at a family banquet when someone says the wrong thing.",
      "HBO lets it play without subtitles. The show treats her Cantonese as part of the Los Angeles texture — no exposition, no winking at the camera. She isn't a guest character in someone else's America. She's just in Los Angeles, speaking her language, telling Larry David off. The Cantonese-American kid watching reads it without subtitles — and has always been part of the audience HBO writes for, even when no one says it out loud.",
      "One phrase carries the scene: 你坐嗰度 — nei co go dou — \"you sit there.\" Two words, a finger point, and a level of attitude no English equivalent can match. If you grew up in a Cantonese household, you've heard it. If you didn't, this is the scene that teaches you.",
    ],
    tags: ["TV", "Cantonese", "Los Angeles", "HBO"],
    poster: {
      title: "Larry David,",
      subtitle: "meets the auntie.",
      topMeta: "Curb Your Enthusiasm · HBO",
      decoration: "你坐嗰度",
    },
  },
];

export const leadScene = scenes[0];
export const archiveScenes = scenes.slice(1);
