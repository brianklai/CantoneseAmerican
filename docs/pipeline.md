# Weekly Publishing Pipeline

This project should be shippable by one person, one scene per week.

## Weekly rhythm

### Monday

- Pick one scene from `ready-to-film` or `needs-transcription`
- Confirm source trail
- Lock the editorial angle

### Tuesday

- Finish transcript pass
- Add confidence labels
- Update verification notes

### Wednesday

- Draft archive copy
- Draft short-video script from `docs/tiktok-template.md`
- Prepare cover title and caption options

### Thursday

- Finish edit, subtitles, and stills
- Confirm rights holder, official link, and media state
- Run `npm run validate:scenes`

### Friday

- Publish the scene
- Post video and link back to archive entry
- Move next scene into active production

## Studio stages

- `candidate`: public lead or internal hunch
- `researching`: source hunt or factual cleanup
- `needs-transcription`: good clip, unfinished transcript
- `needs-native-review`: language or hearing still uncertain
- `ready-to-film`: archive argument is stable
- `ready-to-publish`: packaging and verification nearly complete
- `published`: live in the archive

## Scaffolding a new scene

Run:

```bash
npm run new:scene
```

The script writes a typed draft to `data/stubs/` so the main archive file stays safe.

## Asset organization

Keep per-scene assets together:

- `public/scenes/001/cover.png`
- `public/scenes/001/og.png`
- `public/scenes/001/still.jpg`
- `public/scenes/001/clip.mp4`
- `public/scenes/001/commentary.mp4`
- `public/scenes/001/subtitles.vtt`

## Release gate

Before publish:

- validator passes
- build passes
- clip state is correct
- rights note is visible
- captions, cover title, hashtags, and CTA are filled in
- scene still reads well if the clip later becomes `removed`
