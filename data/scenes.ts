import {
  killBillPaiMeiTranscriptNotes,
  killBillPaiMeiTranscript,
} from "./transcripts/kill-bill-pai-mei.ts";

export const sceneCategories = [
  "Media",
  "Business",
  "Politics",
  "Everyday",
  "History",
  "Other",
] as const;

export type SceneCategory = (typeof sceneCategories)[number];

export const confidenceStatuses = [
  "Verified",
  "Mostly clear",
  "Unclear audio",
  "Community submitted",
  "Needs review",
] as const;

export type ConfidenceStatus = (typeof confidenceStatuses)[number];

export const editorialStatuses = [
  "candidate",
  "researching",
  "needs-transcription",
  "needs-native-review",
  "ready-to-film",
  "ready-to-publish",
  "published",
] as const;

export type EditorialStatus = (typeof editorialStatuses)[number];

export type SceneStatus = "draft" | "published" | "hidden";

export const workTypes = [
  "Film",
  "Television",
  "Documentary",
  "Advertisement",
  "Interview",
  "Speech",
  "Music",
  "Other",
] as const;

export type WorkType = (typeof workTypes)[number];

export type MediaStatus =
  | "active"
  | "official-link-only"
  | "removed"
  | "hidden";

export const sourceTypes = [
  "official",
  "database",
  "article",
  "community",
  "video",
  "other",
] as const;

export type SourceType = (typeof sourceTypes)[number];

export interface TranscriptLine {
  id?: string;
  timestampStart?: string;
  timestampEnd?: string;
  speaker?: string;
  original?: string;
  text?: string;
  scriptVariant?: "traditional" | "simplified" | "mixed" | "unknown";
  jyutping?: string;
  translation?: string;
  timestamp?: string;
  notes?: string[];
  confidence:
    | "high"
    | "medium"
    | "low"
    | "verified"
    | "mostly-clear"
    | "uncertain"
    | "needs-audio-check"
    | "needs-native-review";
  flags?: Array<
    | "derogatory-language"
    | "unclear-audio"
    | "translation-choice"
    | "sensitive-language"
  >;
}

export interface SceneSource {
  label: string;
  url: string;
  type: SourceType;
  supports: string[];
  accessedAt?: string;
}

export interface SceneMedia {
  hostedUrl?: string;
  embedUrl?: string;
  officialUrl?: string;
  replacementStill?: string;
  rightsHolder: string;
  rightsNotes?: string;
  takedownNotes?: string;
  removedNotice?: string;
  sourceTimestampStart?: string;
  sourceTimestampEnd?: string;
  mediaStatus: MediaStatus;
  removalNote?: string;
}

export interface SocialEmbed {
  platform: string;
  label: string;
  url?: string;
  hostedUrl?: string;
}

export interface ScenePoster {
  title: string;
  subtitle: string;
  topMeta: string;
  decoration?: string;
}

export interface SceneContextSection {
  title: string;
  body: string[];
}

const killBillPaiMeiMediaKey =
  "archive/kill-bill/pai-mei-subtitled-v1.mp4";
const killBillPaiMeiCommentaryKey =
  "archive/kill-bill/pai-mei-commentary-v1.mp4";

function buildPublicMediaUrl(key: string) {
  const baseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL?.replace(/\/+$/, "");
  if (!baseUrl) return undefined;

  return `${baseUrl}/${key.replace(/^\/+/, "")}`;
}

function buildR2Media(
  key: string,
  media: Omit<SceneMedia, "hostedUrl" | "mediaStatus">,
): SceneMedia {
  const hostedUrl = buildPublicMediaUrl(key);

  if (!hostedUrl) {
    return {
      ...media,
      mediaStatus: "official-link-only",
    };
  }

  return {
    ...media,
    hostedUrl,
    mediaStatus: "active",
  };
}

export interface Scene {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: SceneCategory;
  workType?: WorkType;
  workTitle: string;
  year?: number;
  creator?: string;
  director?: string;
  network?: string;
  studio?: string;
  languageTags: string[];
  locationTags: string[];
  description: string;
  pullQuote: string;
  transcriptLines: TranscriptLine[];
  commentary: string[];
  contextSections?: SceneContextSection[];
  culturalSignificance: string[];
  accuracyNotes: string[];
  contentWarnings?: string[];
  confidenceStatus: ConfidenceStatus;
  editorialStatus: EditorialStatus;
  sources: SceneSource[];
  lastVerifiedAt?: string;
  verificationNotes: string[];
  transcriptReviewNotes?: string[];
  media: SceneMedia;
  socialEmbeds: SocialEmbed[];
  relatedScenes: string[];
  publishedAt: string;
  status: SceneStatus;
  poster: ScenePoster;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  socialPreviewTitle?: string;
  socialHook?: string;
  shortCaption?: string;
  longCaption?: string;
  hashtags?: string[];
  coverTitle?: string;
  callToAction?: string;
  tiktokUrl?: string;
  instagramUrl?: string;
  youtubeShortsUrl?: string;
}

export const scenes: Scene[] = [
  {
    id: "001",
    slug: "don-cheadle-rush-hour-2",
    title: "Don Cheadle, in Cantonese.",
    subtitle:
      "A Los Angeles counter scene where fluency lands as casual, lived-in American fact.",
    category: "Media",
    workType: "Film",
    workTitle: "Rush Hour 2",
    year: 2001,
    director: "Brett Ratner",
    studio: "New Line Cinema",
    languageTags: ["Cantonese", "English"],
    locationTags: ["Los Angeles", "California"],
    description:
      "In a soul-food restaurant in Los Angeles, Don Cheadle's Kenny slips into Cantonese with Jackie Chan so naturally that the scene stops feeling like a novelty and starts feeling like documentation.",
    pullQuote:
      "He didn't do Cantonese. He spoke it — fluent, casual, like a regular Tuesday in Los Angeles.",
    transcriptLines: [
      {
        original: "點解你會同 7-11 一齊嘅？",
        jyutping: "dim2 gaai2 nei5 wui5 tung4 7-11 jat1 cai4 ge3",
        translation: "Why are you together with 7-11?",
        timestamp: "approx. 01:20",
        confidence: "high",
      },
    ],
    commentary: [
      "Halfway through Rush Hour 2, a Black American actor leans over the counter and starts trading Cantonese with Jackie Chan. He points at Chris Tucker, calls him a 7-11, and the joke lands without the movie treating the language itself as the joke.",
      "What makes the moment endure is its texture. Kenny knows the room, the menu, the regulars, the rhythm. The film stages Cantonese not as an exotic interruption but as part of Los Angeles being Los Angeles.",
      "For a lot of Cantonese-American kids, this was the first time a major American studio movie let our home language sound ordinary in someone else's mouth and still feel completely American.",
    ],
    culturalSignificance: [
      "The scene expands who gets to sound fluent in Cantonese on screen and who gets to count as part of a Cantonese-speaking neighborhood.",
      "It preserves a version of Los Angeles multiculturalism that mainstream American film often flattens into stereotype or translation-dependent comedy.",
    ],
    accuracyNotes: [
      "Timing is approximate and may vary across home-video, streaming, and clipped versions of the scene.",
      "Transcript line is drawn from the hosted clip and should still be checked against an official print if the archive later publishes shot-by-shot annotations.",
    ],
    confidenceStatus: "Mostly clear",
    editorialStatus: "published",
    sources: [
      {
        label: "Official clip link",
        url: "https://www.youtube.com/watch?v=U0Cky9b6mHY",
        type: "official",
        supports: ["scene identification", "dialogue excerpt", "rights attribution"],
        accessedAt: "2026-06-18",
      },
      {
        label: "On-site archive excerpt",
        url: "/rush-hour.mp4",
        type: "video",
        supports: ["transcript hearing", "timing approximation"],
        accessedAt: "2026-06-18",
      },
    ],
    lastVerifiedAt: "2026-06-18",
    verificationNotes: [
      "The work title, release year, and director are consistent with the film release and the editorial clip currently attached in-repo.",
      "The Cantonese line and approximate timestamp are verified against the hosted excerpt, but a future frame-accurate pass could tighten the timestamp for shot-level annotation.",
    ],
    media: {
      hostedUrl: "/rush-hour.mp4",
      officialUrl: "https://www.youtube.com/watch?v=U0Cky9b6mHY",
      rightsHolder: "New Line Cinema",
      rightsNotes:
        "Hosted as a short editorial excerpt for commentary, translation, and cultural documentation.",
      mediaStatus: "active",
    },
    socialEmbeds: [
      {
        platform: "Site video",
        label: "Editor commentary",
        hostedUrl: "/rush-hour-commentary.mp4",
      },
    ],
    relatedScenes: ["002"],
    publishedAt: "2026-06-18",
    status: "published",
    poster: {
      title: "Don Cheadle,",
      subtitle: "in Cantonese.",
      topMeta: "Rush Hour 2 · New Line Cinema · 2001",
      decoration: "廣東話",
    },
    ogTitle: "Don Cheadle speaking Cantonese in Rush Hour 2",
    ogDescription:
      "An archive entry on Don Cheadle's Cantonese scene in Rush Hour 2 and what it meant in Los Angeles and beyond.",
    socialPreviewTitle: "Don Cheadle speaking Cantonese in Rush Hour 2",
    socialHook:
      "A major American studio movie let Cantonese sound casual, local, and fully at home in Los Angeles.",
    shortCaption:
      "Don Cheadle's Rush Hour 2 scene still lands because the movie treats Cantonese as ordinary LA texture, not a novelty act.",
    longCaption:
      "This scene from Rush Hour 2 holds because Don Cheadle doesn't perform Cantonese as an exotic detour. He speaks it like he belongs in the room. For a lot of Cantonese-American viewers, that small shift was huge: the language wasn't framed as foreign to America, but as part of the city and part of the film's social world.",
    hashtags: ["#CantoneseAmerican", "#RushHour2", "#DonCheadle", "#Cantonese", "#Archive"],
    coverTitle: "Don Cheadle spoke Cantonese like it was ordinary LA.",
    callToAction: "Read the full archive notes at cantoneseamerican.com",
  },
  {
    id: "002",
    slug: "larry-david-curb-your-enthusiasm",
    title: "Larry David, meet the Cantonese auntie.",
    subtitle:
      "A transit-seat standoff that plays Cantonese as part of Los Angeles texture, not a translation exercise.",
    category: "Media",
    workType: "Television",
    workTitle: "Curb Your Enthusiasm",
    creator: "Larry David",
    network: "HBO",
    studio: "HBO Entertainment",
    languageTags: ["Cantonese", "English"],
    locationTags: ["Los Angeles", "California", "Public transit"],
    description:
      "Larry David sits next to an elderly Cantonese woman on a bus and gets an all-too-familiar burst of auntie energy: territorial, unsentimental, and almost entirely unsubtitled.",
    pullQuote:
      "She isn't a guest character in someone else's America. She's just in Los Angeles, speaking her language, telling Larry David off.",
    transcriptLines: [
      {
        original: "你坐嗰度。",
        jyutping: "nei5 co5 go2 dou6",
        translation: "You sit there.",
        timestamp: "approx. 00:21",
        confidence: "medium",
      },
      {
        original: "你成日咁多嘢講。",
        jyutping: "nei5 seng4 jat6 gam3 do1 je5 gong2",
        translation: "You always have so much to say.",
        timestamp: "approx. 00:34",
        confidence: "low",
      },
    ],
    commentary: [
      "Anyone who grew up around Cantonese aunties recognizes the cadence instantly: the clipped directives, the public annoyance, the sense that the seat already has a social order whether Larry understands it or not.",
      "The power of the bit is that HBO lets the exchange breathe. The scene trusts the language to live on screen without pausing to explain itself for an English-only audience.",
      "That matters for archive purposes. It means the clip documents Cantonese not as a lesson and not as a punchline, but as ambient American speech in a city that has always contained it.",
    ],
    culturalSignificance: [
      "The scene captures a kind of everyday Cantonese public life that rarely survives into prestige-American TV without being flattened into caricature.",
      "It is also a useful archive object precisely because the emotional meaning of the exchange travels through cadence, gesture, and social familiarity as much as through translation.",
    ],
    accuracyNotes: [
      "The hosted site clip clearly shows the bus scene, but the exact season, episode, and original air year have not yet been verified against an official source print.",
      "The second transcript line reflects the current editorial hearing and should be treated as provisional until a source-verified transcript is added.",
    ],
    confidenceStatus: "Needs review",
    editorialStatus: "published",
    sources: [
      {
        label: "Current public clip link",
        url: "https://www.youtube.com/watch?v=FQ_gVYpwI68",
        type: "video",
        supports: ["scene identification", "dialogue excerpt"],
        accessedAt: "2026-06-18",
      },
      {
        label: "On-site archive excerpt",
        url: "/curb-your-enthusiasm.mp4",
        type: "video",
        supports: ["transcript hearing", "scene continuity review"],
        accessedAt: "2026-06-18",
      },
    ],
    lastVerifiedAt: "2026-06-18",
    verificationNotes: [
      "The repo clip confirms the bus-seat exchange with Larry David and an elderly Cantonese woman, but it does not identify the exact Curb Your Enthusiasm season, episode title, episode number, or original air year.",
      "An official HBO or Max episode listing, a licensed transcript, or a production database entry that directly matches the bus scene would resolve the missing episode and year details.",
      "Until one of those sources is added in-repo, this page stays published with confidence marked as Needs review and the line-level transcript should be treated as provisional.",
    ],
    media: {
      hostedUrl: "/curb-your-enthusiasm.mp4",
      officialUrl: "https://www.youtube.com/watch?v=FQ_gVYpwI68",
      rightsHolder: "HBO",
      rightsNotes:
        "Hosted as a short editorial excerpt while the exact episode attribution remains under verification.",
      mediaStatus: "active",
    },
    socialEmbeds: [
      {
        platform: "Site video",
        label: "Editor commentary",
        hostedUrl: "/curb-your-enthusiasm-commentary.mp4",
      },
    ],
    relatedScenes: ["001"],
    publishedAt: "2026-06-18",
    status: "published",
    poster: {
      title: "Larry David,",
      subtitle: "meets the auntie.",
      topMeta: "Curb Your Enthusiasm · HBO",
      decoration: "你坐嗰度",
    },
    ogTitle: "Larry David Cantonese bus scene in Curb Your Enthusiasm",
    ogDescription:
      "An archive entry on the Cantonese bus exchange in Curb Your Enthusiasm, with verification notes on what still needs confirming.",
    socialPreviewTitle: "Larry David Cantonese bus scene in Curb Your Enthusiasm",
    socialHook:
      "The scene works because HBO lets the auntie's Cantonese live on screen without translating away the city's texture.",
    shortCaption:
      "A Cantonese bus argument in Curb Your Enthusiasm lands as ambient Los Angeles, not as a translation exercise.",
    longCaption:
      "This archive entry stays public because the scene matters even while some details remain under verification. The bus exchange captures a kind of everyday Cantonese public life that prestige American TV rarely leaves intact. The exact episode and year still need an official source, but the cultural reality of the scene is already there in the clip.",
    hashtags: ["#CantoneseAmerican", "#CurbYourEnthusiasm", "#LarryDavid", "#Cantonese", "#Archive"],
    coverTitle: "Larry David met the Cantonese auntie on the bus.",
    callToAction: "Read the verification notes and full archive entry online.",
  },
  {
    id: "003",
    slug: "kill-bill-vol-2-pai-mei-training-sequence",
    title: "Kill Bill Vol. 2 — Pai Mei Training Sequence",
    subtitle:
      "One of the longest Cantonese-heavy sequences I have found in mainstream Hollywood.",
    category: "Media",
    workType: "Film",
    workTitle: "Kill Bill Vol. 2",
    year: 2004,
    director: "Quentin Tarantino",
    studio: "Miramax Films",
    languageTags: ["Cantonese", "English"],
    locationTags: ["American cinema", "Hong Kong cinema homage", "martial arts folklore"],
    description:
      "The Pai Mei training sequence does not just borrow kung fu imagery. It puts a roughly fifteen-minute, Cantonese-heavy training passage inside a mainstream Hollywood revenge film, creating a bridge from American pop culture back through Hong Kong kung fu cinema, Southern Chinese martial arts folklore, and Bak Mei / 白眉 legend.",
    pullQuote:
      "Rick and Morty points back to Kill Bill, Kill Bill points back to Hong Kong kung fu cinema, and the trail eventually lands on Bak Mei / 白眉.",
    transcriptLines: killBillPaiMeiTranscript,
    commentary: [
      "This is the kind of scene the archive was built to hold: famous enough to feel obvious, long enough to matter structurally, and specific enough that the language is part of the scene's architecture.",
      "The working thesis is simple: Rick and Morty -> Kill Bill -> Hong Kong kung fu cinema -> Bak Mei / 白眉 folklore -> Cantonese. A modern animated reference can feel like the beginning of the thread, but the thread is older, stranger, and more Cantonese than the meme version usually admits.",
      "The local source clip currently attached to this entry runs about 14 minutes and 58 seconds. That is close enough to describe the Pai Mei training material as about fifteen minutes of a 137-minute film, or roughly ten percent of the movie, but not precise enough to turn into a frame-locked runtime claim yet.",
    ],
    contextSections: [
      {
        title: "Why this belongs in the archive",
        body: [
          "Kill Bill Vol. 2 places a sustained Chinese-language martial-arts training sequence inside a major American studio revenge film. The scene is not a passing greeting or a single punchline; it is a long training passage that depends on the sound, authority, and theatrical register of the language.",
          "That makes it a useful archive object. It shows how Hollywood can repackage Cantonese and Hong Kong martial-arts traditions while still carrying traces of the worlds it borrows from.",
        ],
      },
      {
        title: "Who is Pai Mei / Bak Mei?",
        body: [
          "Pai Mei is the English and Hollywood-facing spelling attached to Bak Mei / Pak Mei / Bai Mei, written 白眉, meaning White Eyebrow. In Cantonese, the name is closer to Bak Mei or Pak Mei than to the Mandarin-facing Bai Mei.",
          "This archive should frame Bak Mei as legendary, semi-mythical, and folkloric rather than as a securely verified historical person. The figure moves through Southern Chinese martial-arts folklore, oral traditions, wuxia-inflected storytelling, and Hong Kong kung fu cinema before arriving in Kill Bill.",
        ],
      },
      {
        title: "Rick and Morty connection",
        body: [
          "A recent Rick and Morty reference to a Pai Mei-style kung fu master is useful here as a cultural bridge, not as the source of the lineage. It points back toward Kill Bill, which itself points back toward older Hong Kong kung fu cinema and Cantonese-speaking martial arts worlds.",
        ],
      },
      {
        title: "Gordon Liu and the full-circle effect",
        body: [
          "Kill Bill's Pai Mei is played by Gordon Liu, whose screen presence already carries decades of Hong Kong martial-arts cinema memory. That casting gives the sequence a full-circle feeling: a Hollywood homage asks an older Hong Kong cinema body to embody the tradition being remixed.",
          "The result feels full circle: a Hollywood homage asks an older Hong Kong cinema body to embody the tradition being remixed.",
        ],
      },
    ],
    culturalSignificance: [
      "The sequence makes Cantonese-heavy speech structurally important inside a mainstream American film rather than treating it as a one-line flourish.",
      "It documents how American pop culture routes Cantonese and Southern Chinese martial-arts folklore through Hong Kong cinema memory, Hollywood homage, and later animated reference culture.",
      "It also creates a useful case study in how admiration, stylization, racialized insults, gendered training discipline, and translation uncertainty can all live inside one culturally important scene.",
    ],
    accuracyNotes: [
      "The local R2-hosted source file runs 14:58.50 according to ffprobe.",
      "The film's commonly listed runtime is 137 minutes; the page therefore phrases the scene as about fifteen minutes or roughly ten percent of the movie, not as a frame-accurate analytic claim.",
      "No line-by-line transcript is published yet. The attached video is manually subtitled, and a cleaner structured transcript can be added later.",
      "The scene includes racist, sexist, and ableist insults. They belong in the source record only with context, not celebration.",
    ],
    contentWarnings: [
      "The scene includes racist, sexist, and ableist insults in the source material.",
      "Any future transcript should preserve source-language accuracy while clearly marking derogatory language and translation choices.",
    ],
    confidenceStatus: "Mostly clear",
    editorialStatus: "published",
    sources: [
      {
        label: "R2-hosted archive excerpt",
        url: "https://media.cantoneseamerican.com/archive/kill-bill/pai-mei-subtitled-v1.mp4",
        type: "video",
        supports: ["source clip", "runtime check", "manual subtitles"],
        accessedAt: "2026-06-27",
      },
      {
        label: "Kill Bill: Volume 2 reference listing",
        url: "https://www.imdb.com/title/tt0378194/",
        type: "database",
        supports: ["work identification", "release year", "cast reference"],
        accessedAt: "2026-06-27",
      },
      {
        label: "Bak Mei background reference",
        url: "https://en.wikipedia.org/wiki/Bak_Mei",
        type: "article",
        supports: ["name variants", "白眉 meaning", "folkloric framing"],
        accessedAt: "2026-06-27",
      },
    ],
    lastVerifiedAt: "2026-06-27",
    verificationNotes: [
      "The video source is pinned and hosted outside the repo on Cloudflare R2 so the archive page can remain portable and takedown-ready.",
      "The line-by-line transcript is not published yet; this record currently prioritizes the clip, commentary, cultural framing, and known transcript notes.",
      "The Rick and Morty connection is included as cultural framing. A later source pass can add the exact episode citation.",
    ],
    transcriptReviewNotes: killBillPaiMeiTranscriptNotes,
    media: buildR2Media(killBillPaiMeiMediaKey, {
      officialUrl: "https://www.imdb.com/title/tt0378194/",
      rightsHolder: "Miramax Films",
      rightsNotes:
        "Hosted as an educational archive excerpt for commentary, criticism, translation review, and cultural documentation. Source media is stored outside the repository and deployment artifact; if NEXT_PUBLIC_MEDIA_BASE_URL is unset, this record falls back to an official-link-only state.",
      takedownNotes:
        "If rights concerns arise, set mediaStatus to removed and keep the transcript scaffold, commentary, source trail, and rights note visible.",
      sourceTimestampStart: "approx. Pai Mei training sequence start",
      sourceTimestampEnd: "approx. Pai Mei training sequence end",
    }),
    socialEmbeds: [
      {
        platform: "Site video",
        label: "Editor commentary",
        hostedUrl: buildPublicMediaUrl(killBillPaiMeiCommentaryKey),
      },
    ],
    relatedScenes: ["001", "002"],
    publishedAt: "2026-06-27",
    status: "published",
    poster: {
      title: "Kill Bill +",
      subtitle: "Rick & Morty = Cantonese?",
      topMeta: "Kill Bill: Volume 2 · Miramax Films · 2004",
      decoration: "白眉",
    },
    ogTitle: "Kill Bill Vol. 2 Pai Mei training sequence in Cantonese",
    ogDescription:
      "A Cantonese American archive entry on Pai Mei / Bak Mei, Cantonese in Kill Bill Vol. 2, and the bridge from Rick and Morty back to Hong Kong kung fu cinema.",
    socialPreviewTitle: "Kill Bill Vol. 2 Pai Mei training sequence in Cantonese",
    socialHook:
      "Rick and Morty just brought back a Pai Mei-style kung fu master. Kill Bill did it first — and the training sequence is Cantonese-heavy.",
    shortCaption:
      "Kill Bill's Pai Mei training sequence is one of the longest Cantonese-heavy moments I have found in mainstream Hollywood.",
    longCaption:
      "Rick and Morty points back to Kill Bill. Kill Bill points back to Hong Kong kung fu cinema. Hong Kong kung fu cinema points back toward Bak Mei / 白眉 folklore and Cantonese-speaking martial arts worlds. The Pai Mei training sequence in Kill Bill Vol. 2 is about fifteen minutes of Cantonese-heavy Hollywood homage, and it deserves an archive record careful enough to hold both the cultural lineage and the unresolved transcript work.",
    hashtags: [
      "#Cantonese",
      "#CantoneseAmerican",
      "#KillBill",
      "#PaiMei",
      "#BakMei",
      "#RickAndMorty",
      "#HongKongCinema",
      "#KungFuCinema",
      "#ChineseAmerican",
      "#廣東話",
      "#粵語",
    ],
    coverTitle: "Kill Bill + Rick & Morty = Cantonese?",
    callToAction:
      "Comment what culturally iconic American scene with Cantonese or Chinese we should archive next.",
  },
  {
    id: "004",
    slug: "waynes-world-cantonese-memory",
    title: "The Wayne's World Cantonese memory that still needs proving.",
    subtitle:
      "A durable public recollection with enough smoke to investigate, but not enough evidence yet to publish as fact.",
    category: "Media",
    workType: "Film",
    workTitle: "Wayne's World",
    year: 1992,
    director: "Penelope Spheeris",
    studio: "Paramount Pictures",
    languageTags: ["Chinese dialect under review", "English"],
    locationTags: ["American comedy", "public memory"],
    description:
      "People keep bringing up a Wayne's World moment as possible archive material, but the repo does not yet have a stable clip, transcript, or source trail tying the memory to an exact scene.",
    pullQuote:
      "Some scenes belong in the backlog precisely because everybody swears they remember them.",
    transcriptLines: [],
    commentary: [
      "The archive should be strong enough to hold collective memory without mistaking memory for verification.",
      "This record keeps the lead alive while making it visible that the scene still needs clip identification, language review, and context before it becomes a published entry.",
    ],
    culturalSignificance: [
      "Capturing rumors and recurring memories can help show which Cantonese-adjacent moments actually lingered in U.S. pop culture.",
      "A transparent candidate record prevents the archive from flattening uncertainty into false authority.",
    ],
    accuracyNotes: [
      "No transcript should be attached until the exact scene is identified.",
      "If the language turns out not to be Cantonese, the entry should be recategorized or removed from the weekly queue.",
    ],
    confidenceStatus: "Needs review",
    editorialStatus: "candidate",
    sources: [],
    verificationNotes: [
      "The work itself is verified, but the archive does not yet have an in-repo source proving which specific scene belongs here.",
      "A public clip, script reference, or licensed transcript would move this from rumor to research.",
    ],
    media: {
      rightsHolder: "Paramount Pictures",
      rightsNotes:
        "No media attached until the candidate scene is positively identified.",
      mediaStatus: "hidden",
    },
    socialEmbeds: [],
    relatedScenes: [],
    publishedAt: "",
    status: "draft",
    poster: {
      title: "Wayne's World,",
      subtitle: "maybe in the queue.",
      topMeta: "Wayne's World · Paramount Pictures · 1992",
      decoration: "未證實",
    },
  },
  {
    id: "005",
    slug: "paul-rudd-cantonese-rumor",
    title: "The Paul Rudd Cantonese rumor is in the queue.",
    subtitle:
      "A candidate record for a frequently mentioned scene that still needs the most basic thing: a stable source.",
    category: "Media",
    workType: "Other",
    workTitle: "Paul Rudd scene under verification",
    languageTags: ["Chinese dialect under review", "English"],
    locationTags: ["American screen comedy", "public memory"],
    description:
      "This record exists because people keep naming a Paul Rudd scene as archive material, but the repo cannot yet verify the title, year, or exact clip that the memory refers to.",
    pullQuote:
      "The archive should hold leads without pretending they are findings.",
    transcriptLines: [],
    commentary: [
      "A good weekly workflow needs room for scenes that are still foggy but clearly worth chasing.",
      "Until the source appears, the archive's job is to log the lead, note the uncertainty, and keep moving without overstating what it knows.",
    ],
    culturalSignificance: [
      "This entry models how the archive can treat community memory as a research lead rather than as a citation.",
      "It also helps keep the backlog broad enough to catch scenes that live more in recollection than in easy-to-find clips.",
    ],
    accuracyNotes: [
      "Work title, year, and clip identity are all still unresolved.",
      "No transcript or quote should be attached until a source trail is established.",
    ],
    confidenceStatus: "Community submitted",
    editorialStatus: "candidate",
    sources: [],
    verificationNotes: [
      "Current in-repo knowledge is limited to the existence of repeated public memory around a Paul Rudd scene.",
      "A concrete source link is required before this candidate can move into research with any precision.",
    ],
    media: {
      rightsHolder: "Rights holder under review",
      rightsNotes:
        "The production and rights chain are still unconfirmed because the underlying work has not been pinned down.",
      mediaStatus: "hidden",
    },
    socialEmbeds: [],
    relatedScenes: [],
    publishedAt: "",
    status: "draft",
    poster: {
      title: "Paul Rudd,",
      subtitle: "still a rumor.",
      topMeta: "Candidate scene · Work title pending",
      decoration: "傳聞",
    },
  },
  {
    id: "006",
    slug: "everything-everywhere-language-switches",
    title: "Everything Everywhere is already an American language archive.",
    subtitle:
      "A draft entry centered on family language-switching, with clip selection in place but transcription still not publication-ready.",
    category: "Media",
    workType: "Film",
    workTitle: "Everything Everywhere All at Once",
    year: 2022,
    director: "Daniel Kwan and Daniel Scheinert",
    studio: "A24",
    languageTags: ["Cantonese", "English", "Mandarin"],
    locationTags: ["California", "laundromat", "family"],
    description:
      "The archive needs at least one entry that treats multilingual family argument not as garnish but as the actual social engine of an American film. The exact line list is still being prepared.",
    pullQuote:
      "Sometimes the whole movie is the point, and the archive still has to choose one scene.",
    transcriptLines: [],
    commentary: [
      "This draft exists because the archive should not wait years to acknowledge one of the clearest modern examples of Chinese-language family texture inside American cinema.",
      "The open question is editorial rather than thematic: which scene best carries the language-switching, family hierarchy, and everyday American stakes in one durable clip.",
    ],
    culturalSignificance: [
      "The eventual entry can show how a recent American hit made Asian family multilingualism legible without sanding down its emotional complexity.",
      "It would also anchor the archive in the present rather than letting it read only as recovery work on older clips.",
    ],
    accuracyNotes: [
      "Specific transcript lines are pending a final clip decision.",
      "A future pass should note which lines are Cantonese, which are Mandarin, and where the scene moves into English.",
    ],
    confidenceStatus: "Mostly clear",
    editorialStatus: "needs-transcription",
    sources: [],
    lastVerifiedAt: "2026-06-18",
    verificationNotes: [
      "Work title, year, directors, and studio are stable, but the archive has not yet locked the exact scene excerpt for publication.",
      "Once the clip selection is fixed, the transcript needs a line-by-line language pass before this can move to filming.",
    ],
    media: {
      rightsHolder: "A24",
      rightsNotes:
        "No clip is attached publicly while the draft is still selecting its definitive scene.",
      mediaStatus: "hidden",
    },
    socialEmbeds: [],
    relatedScenes: ["001", "002"],
    publishedAt: "",
    status: "draft",
    poster: {
      title: "Everything Everywhere,",
      subtitle: "scene selection pending.",
      topMeta: "Everything Everywhere All at Once · A24 · 2022",
      decoration: "家",
    },
  },
  {
    id: "007",
    slug: "chinatown-window-signage-ledger",
    title: "The Chinatown storefront is speaking before anyone hits play.",
    subtitle:
      "A business-entry draft about handwritten signs, pricing boards, and visual Cantonese presence in American street commerce.",
    category: "Business",
    workType: "Other",
    workTitle: "Chinatown storefront signage record",
    languageTags: ["Written Chinese", "English"],
    locationTags: ["San Francisco Chinatown", "small business"],
    description:
      "Not every scene in the archive needs a movie star. Some belong here because a storefront window, service counter, or signboard records Cantonese commercial life in plain sight.",
    pullQuote:
      "Sometimes the archive object is not the line. It's the window.",
    transcriptLines: [],
    commentary: [
      "A business pillar matters because Cantonese America is not only what happened on screen. It is also what has been visible on streets, menus, notices, and service windows for decades.",
      "This draft is pointed at the kind of scene that can hold commentary, translation, and neighborhood texture even if the only 'dialogue' is signage and ambient speech.",
    ],
    culturalSignificance: [
      "A storefront-based entry widens the archive beyond entertainment and gives business life equal editorial weight.",
      "It also creates room for documenting written language, not just spoken clips.",
    ],
    accuracyNotes: [
      "Final location and image set are still being selected.",
      "If audio is included, the transcript status should be revisited after capture.",
    ],
    confidenceStatus: "Mostly clear",
    editorialStatus: "ready-to-film",
    sources: [],
    lastVerifiedAt: "2026-06-18",
    verificationNotes: [
      "The editorial concept is stable, but the exact storefront and source material have not been pinned in-repo yet.",
      "Before publication, the archive should attach a source trail for the image or footage set and confirm whether the written text needs romanization notes.",
    ],
    media: {
      rightsHolder: "Rights holder under review",
      rightsNotes:
        "Draft record for a future business entry; source capture and permissions trail still need to be attached.",
      mediaStatus: "hidden",
    },
    socialEmbeds: [],
    relatedScenes: [],
    publishedAt: "",
    status: "draft",
    poster: {
      title: "The storefront,",
      subtitle: "already speaking.",
      topMeta: "Business entry · Chinatown signage record",
      decoration: "招牌",
    },
  },
  {
    id: "008",
    slug: "campaign-stop-cantonese-greeting",
    title: "Campaign Cantonese is always louder on paper than in the field.",
    subtitle:
      "A politics-entry draft built around a campaign stop where crowd noise and partial hearing still need native-speaker review.",
    category: "Politics",
    workType: "Speech",
    workTitle: "Campaign stop footage under review",
    languageTags: ["Cantonese", "English"],
    locationTags: ["Bay Area", "campaign event"],
    description:
      "Political outreach footage often gets remembered for a greeting, a slogan, or a single public exchange. This draft keeps that kind of scene in play while admitting the audio is not yet clean enough for publication.",
    pullQuote:
      "The archive can log the political performance before it can fully hear it.",
    transcriptLines: [],
    commentary: [
      "A politics pillar should not depend on perfect audio to know that a scene matters. It should, however, wait for verification before claiming exact words.",
      "This draft keeps the door open for documenting how candidates perform ethnic fluency, respectability, or neighborhood belonging in front of Cantonese-speaking voters.",
    ],
    culturalSignificance: [
      "Politics entries help show that Cantonese America is part of public power, not just entertainment and nostalgia.",
      "They also create a useful record of how campaigns address Chinese-speaking elders in different American cities.",
    ],
    accuracyNotes: [
      "Exact wording is not yet verified.",
      "Crowd noise and overlapping speech make this a poor candidate for publication until native review is complete.",
    ],
    confidenceStatus: "Unclear audio",
    editorialStatus: "needs-native-review",
    sources: [],
    lastVerifiedAt: "2026-06-18",
    verificationNotes: [
      "The current lead points to campaign footage with audible Cantonese, but the clip has not yet been stabilized into a transcript-ready source in-repo.",
      "A native-speaker listen and a cleaner source file are both needed before this advances.",
    ],
    media: {
      rightsHolder: "Rights holder under review",
      rightsNotes:
        "No hosted media until the archive has a cleaner source and a verified dialogue pass.",
      mediaStatus: "hidden",
    },
    socialEmbeds: [],
    relatedScenes: [],
    publishedAt: "",
    status: "draft",
    poster: {
      title: "Campaign Cantonese,",
      subtitle: "audio still rough.",
      topMeta: "Politics entry · Campaign footage under review",
      decoration: "選舉",
    },
  },
  {
    id: "009",
    slug: "older-hollywood-chinatown-sequence",
    title: "Old Hollywood Chinatown, before the archive lets it narrate itself.",
    subtitle:
      "A history-entry draft that needs scene selection and context so the archive can separate atmosphere from stereotype.",
    category: "History",
    workType: "Film",
    workTitle: "Older Hollywood Chinatown sequence under review",
    languageTags: ["Chinese dialect under review", "English"],
    locationTags: ["Hollywood", "Chinatown", "period representation"],
    description:
      "The archive should eventually hold at least one older Hollywood Chinatown scene, but it should do so with context strong enough to explain what the clip gets wrong, what it accidentally preserves, and why it still belongs in the record.",
    pullQuote:
      "History entries should show the archive thinking, not just collecting.",
    transcriptLines: [],
    commentary: [
      "A history pillar is useful because some scenes belong in the archive not as celebration, but as evidence of how American media staged Chinese neighborhoods for outside viewers.",
      "The real editorial work here will be in framing: what exactly is being spoken, who gets subtitled, and how much of the cultural meaning survives underneath the stereotype machinery.",
    ],
    culturalSignificance: [
      "The eventual entry can document how Chinatown functioned as a recurring American set-piece, often flattening actual language communities into visual shorthand.",
      "Handled carefully, it would give the archive historical depth without romanticizing the source material.",
    ],
    accuracyNotes: [
      "A specific film and scene have not been locked.",
      "Do not attach quotes or line translations until the candidate clip is confirmed.",
    ],
    confidenceStatus: "Needs review",
    editorialStatus: "researching",
    sources: [],
    verificationNotes: [
      "This is a thematic placeholder for a future history entry rather than a verified scene record.",
      "Before publication, the archive should identify the exact film, source clip, and dialect question at stake.",
    ],
    media: {
      rightsHolder: "Rights holder under review",
      rightsNotes:
        "No media attached while the historical source record is still being identified.",
      mediaStatus: "hidden",
    },
    socialEmbeds: [],
    relatedScenes: [],
    publishedAt: "",
    status: "draft",
    poster: {
      title: "Old Hollywood,",
      subtitle: "Chinatown pending.",
      topMeta: "History entry · Source film pending",
      decoration: "舊",
    },
  },
  {
    id: "010",
    slug: "community-submitted-restaurant-window",
    title: "The restaurant window scene someone swears changed their ear.",
    subtitle:
      "A community-submitted everyday-life draft with vivid memory attached and almost no verification yet.",
    category: "Everyday",
    workType: "Other",
    workTitle: "Community-submitted restaurant window clip",
    languageTags: ["Cantonese", "English"],
    locationTags: ["restaurant", "family outing", "community memory"],
    description:
      "This draft protects a community lead that might otherwise disappear: a restaurant-window or order-counter moment remembered for the sound of Cantonese landing in public, ordinary American space.",
    pullQuote:
      "The archive should be porous enough to catch the scenes people carry around for years.",
    transcriptLines: [],
    commentary: [
      "Everyday entries matter because not every formative scene comes from a major studio or prestige network.",
      "Sometimes what belongs in the archive is a minor local clip that made Cantonese feel public, unhidden, and fully American to the people who heard it.",
    ],
    culturalSignificance: [
      "Community-submitted scenes widen the archive beyond professional media pipelines.",
      "They also give the project a way to document public memory before platforms delete or bury the source.",
    ],
    accuracyNotes: [
      "Current details come from a nomination rather than a verified source file.",
      "Private contact information related to the nomination should stay out of public records.",
    ],
    confidenceStatus: "Community submitted",
    editorialStatus: "candidate",
    sources: [],
    verificationNotes: [
      "The current record is based on community memory and does not yet have a stable public source attached in-repo.",
      "If no source can be recovered, this should remain a nomination lead rather than a published scene.",
    ],
    media: {
      rightsHolder: "Rights holder under review",
      rightsNotes:
        "No clip attached while the nomination is still being confirmed and sourced.",
      mediaStatus: "hidden",
    },
    socialEmbeds: [],
    relatedScenes: [],
    publishedAt: "",
    status: "draft",
    poster: {
      title: "The window scene,",
      subtitle: "still from memory.",
      topMeta: "Everyday entry · Community nomination",
      decoration: "記憶",
    },
  },
  {
    id: "011",
    slug: "supermarket-pa-cantonese-announcement",
    title: "The supermarket PA announcement belongs in the archive too.",
    subtitle:
      "A business-everyday crossover draft centered on overhead announcements, aisle instructions, and ambient Cantonese commerce.",
    category: "Business",
    workType: "Other",
    workTitle: "Chinese supermarket PA announcement",
    languageTags: ["Cantonese", "English"],
    locationTags: ["supermarket", "retail", "neighborhood commerce"],
    description:
      "Ambient store announcements are easy to ignore and exactly the kind of thing a cultural archive should remember. They document who a business imagines its public to be and what language everyday commerce actually sounds like.",
    pullQuote:
      "The archive should be able to hear the overhead speaker as culture, not just background.",
    transcriptLines: [],
    commentary: [
      "A supermarket announcement scene would let the archive capture the ordinary infrastructure of Cantonese-speaking life in America.",
      "It also gives the business pillar a scene that is clearly American, clearly local, and not dependent on celebrity recognition.",
    ],
    culturalSignificance: [
      "The entry could document how language shapes commercial belonging in public retail space.",
      "It would also broaden the archive's definition of what counts as a memorable scene.",
    ],
    accuracyNotes: [
      "Store, location, and source recording still need to be attached.",
      "If the final source includes customer speech, privacy review may be needed before publication.",
    ],
    confidenceStatus: "Mostly clear",
    editorialStatus: "ready-to-film",
    sources: [],
    lastVerifiedAt: "2026-06-18",
    verificationNotes: [
      "The scene concept is editorially solid, but the archive still needs a concrete source asset and rights trail.",
      "A final pass should confirm whether the announcement is scripted, improvised, or recurring store infrastructure.",
    ],
    media: {
      rightsHolder: "Rights holder under review",
      rightsNotes:
        "Draft record only; no public media attached until source asset and privacy considerations are checked.",
      mediaStatus: "hidden",
    },
    socialEmbeds: [],
    relatedScenes: ["007"],
    publishedAt: "",
    status: "draft",
    poster: {
      title: "Over the speaker,",
      subtitle: "Cantonese commerce.",
      topMeta: "Business entry · Supermarket PA announcement",
      decoration: "廣播",
    },
  },
  {
    id: "012",
    slug: "local-news-street-interview-cantonese",
    title: "A local-news street interview, with the city still audible underneath it.",
    subtitle:
      "A media-entry draft for the kind of local television moment where Cantonese appears as neighborhood reality rather than special event.",
    category: "Media",
    workType: "Interview",
    workTitle: "Local TV street interview under review",
    languageTags: ["Cantonese", "English"],
    locationTags: ["local television", "street interview", "city reporting"],
    description:
      "Local television often catches the most honest language texture in the quickest way: a street interview, a reaction shot, a clipped answer that never expected to become archive material.",
    pullQuote:
      "The archive should stay open to small broadcast moments with big documentary value.",
    transcriptLines: [],
    commentary: [
      "A local-news entry would help the archive track Cantonese in American civic life outside film and prestige TV.",
      "It also reinforces the magazine side of the project by letting a short public-media clip carry a larger argument about city texture and who counts as the public.",
    ],
    culturalSignificance: [
      "Such scenes show Cantonese as part of everyday American news reality rather than as a marked ethnic aside.",
      "They can also preserve neighborhood voices that rarely remain searchable once a local station reorganizes its website.",
    ],
    accuracyNotes: [
      "Station, date, and speaker identity are still being verified.",
      "Any translation should note if only a partial answer is audible.",
    ],
    confidenceStatus: "Needs review",
    editorialStatus: "needs-transcription",
    sources: [],
    verificationNotes: [
      "The archive has the editorial shape of the entry but not yet the verified station/date/source chain needed for publication.",
      "Once the source is fixed, the clip needs transcription and a check on whether the speaker should be identified or kept general.",
    ],
    media: {
      rightsHolder: "Rights holder under review",
      rightsNotes:
        "No hosted media attached until the local-news source and usage trail are documented.",
      mediaStatus: "hidden",
    },
    socialEmbeds: [],
    relatedScenes: [],
    publishedAt: "",
    status: "draft",
    poster: {
      title: "Local news,",
      subtitle: "city still audible.",
      topMeta: "Media entry · Local TV interview under review",
      decoration: "街訪",
    },
  },
];

export const draftScenes = scenes.filter((scene) => scene.status === "draft");
export const publishedScenes = scenes.filter((scene) => scene.status === "published");
export const leadScene = publishedScenes[0];
export const archiveScenes = publishedScenes.slice(1);

export function getSceneDisplayNumber(scene: Pick<Scene, "id">) {
  return scene.id.padStart(3, "0");
}

export function getSceneBySlug(slug: string) {
  return scenes.find((scene) => scene.slug === slug);
}

export function getPublishedSceneBySlug(slug: string) {
  return publishedScenes.find((scene) => scene.slug === slug);
}

export function getRelatedScenes(scene: Scene) {
  return scene.relatedScenes
    .map((relatedId) => scenes.find((candidate) => candidate.id === relatedId))
    .filter((candidate): candidate is Scene => Boolean(candidate))
    .filter((candidate) => candidate.status === "published");
}

export function getSceneDecade(scene: Pick<Scene, "year">) {
  if (!scene.year) return undefined;
  return Math.floor(scene.year / 10) * 10;
}

export function formatSceneDecade(scene: Pick<Scene, "year">) {
  const decade = getSceneDecade(scene);
  return decade ? `${decade}s` : "Year unverified";
}

export function formatSceneSource(scene: Scene) {
  const parts = [scene.workTitle];

  if (scene.year) {
    parts.push(String(scene.year));
  }

  if (scene.director) {
    parts.push(`dir. ${scene.director}`);
  } else if (scene.creator) {
    parts.push(`created by ${scene.creator}`);
  } else if (scene.network) {
    parts.push(scene.network);
  }

  return parts.join(" · ");
}

export function formatSceneCredits(scene: Scene) {
  return [
    scene.creator ? `Creator: ${scene.creator}` : null,
    scene.director ? `Director: ${scene.director}` : null,
    scene.network ? `Network: ${scene.network}` : null,
    scene.studio ? `Studio: ${scene.studio}` : null,
  ].filter((item): item is string => Boolean(item));
}

export function formatEditorialStatus(status: EditorialStatus) {
  return status.replace(/-/g, " ");
}

export function formatSourceType(type: SourceType) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function getScenesByCategory(category: SceneCategory) {
  return publishedScenes.filter((scene) => scene.category === category);
}

export function getScenesByEditorialStatus(status: EditorialStatus) {
  return scenes.filter((scene) => scene.editorialStatus === status);
}

export function getPreviousScene(scene: Scene) {
  const index = publishedScenes.findIndex((item) => item.id === scene.id);
  if (index <= 0) return null;
  return publishedScenes[index - 1];
}

export function getNextScene(scene: Scene) {
  const index = publishedScenes.findIndex((item) => item.id === scene.id);
  if (index === -1 || index >= publishedScenes.length - 1) return null;
  return publishedScenes[index + 1];
}

export function getSceneSearchTitle(scene: Scene) {
  if (scene.ogTitle?.trim()) return scene.ogTitle;

  if (scene.workTitle && scene.title) {
    return `${scene.title.replace(/[.,]/g, "")} in ${scene.workTitle}`;
  }

  return scene.title;
}

export function getSceneMetaDescription(scene: Scene) {
  return scene.ogDescription?.trim() || scene.description || scene.subtitle;
}

export function getSceneSocialTitle(scene: Scene) {
  return scene.socialPreviewTitle?.trim() || getSceneSearchTitle(scene);
}

export function getSceneSocialLinks(scene: Scene) {
  return [
    scene.tiktokUrl
      ? { label: "TikTok", href: scene.tiktokUrl }
      : null,
    scene.instagramUrl
      ? { label: "Instagram", href: scene.instagramUrl }
      : null,
    scene.youtubeShortsUrl
      ? { label: "YouTube Shorts", href: scene.youtubeShortsUrl }
      : null,
  ].filter(
    (item): item is { label: string; href: string } => Boolean(item),
  );
}
