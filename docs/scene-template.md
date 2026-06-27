# Scene Template

Use `npm run new:scene` to generate a typed stub in `data/stubs/`. Move the draft into `data/scenes.ts` when it is ready to enter the editorial queue.

## Scene checklist

- `id`: next numeric scene ID
- `slug`: durable URL slug
- `title`: magazine headline
- `subtitle`: one-line archive deck
- `category`: Media, Business, Politics, Everyday, History, or Other
- `workTitle` and `year`: verify before publish
- `languageTags` and `locationTags`: make discovery easier
- `description`: what happens
- `pullQuote`: sharp editorial framing line
- `commentary`: interpretation first
- `culturalSignificance`: why the archive should keep it
- `accuracyNotes`: what is uncertain
- `verificationNotes`: what still needs sourcing or review
- `media`: current takedown-ready state
- `sources`: source trail
- `social packaging`: cover title, captions, CTA, hashtags

## Asset conventions

Recommended paths for scene assets:

- `public/scenes/001/cover.png`
- `public/scenes/001/og.png`
- `public/scenes/001/still.jpg`
- `public/scenes/001/clip.mp4`
- `public/scenes/001/commentary.mp4`
- `public/scenes/001/subtitles.vtt`

Not every scene needs every asset. The convention exists so future weekly publishing does not turn into a scavenger hunt.

## Scene skeleton

```ts
{
  id: "013",
  slug: "example-scene",
  title: "Example title.",
  subtitle: "One-line deck.",
  category: "Media",
  workTitle: "Work Title",
  year: 2026,
  languageTags: ["Cantonese", "English"],
  locationTags: ["Los Angeles"],
  description: "What happens and why it matters.",
  pullQuote: "A line that frames the archive argument.",
  transcriptLines: [],
  commentary: [],
  culturalSignificance: [],
  accuracyNotes: [],
  confidenceStatus: "Needs review",
  editorialStatus: "candidate",
  sources: [],
  verificationNotes: [],
  media: {
    rightsHolder: "TODO",
    mediaStatus: "hidden",
  },
  socialEmbeds: [],
  relatedScenes: [],
  publishedAt: "",
  status: "draft",
  poster: {
    title: "Example title.",
    subtitle: "draft stub.",
    topMeta: "Work Title · Draft stub",
  },
}
```
