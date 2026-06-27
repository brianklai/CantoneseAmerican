# Takedown Playbook

If a rights holder reaches out, preserve the archive record first and change media state second.

## Media status options

- `active`: keep hosted clip or embed live
- `official-link-only`: remove local playback, point readers to an official source
- `removed`: show a removal notice while keeping transcript, commentary, and source trail visible
- `hidden`: preserve the page without showing media

## Recommended response flow

1. Log who contacted the project and what asset they flagged.
2. Confirm which scene record and media asset are involved.
3. Decide whether the immediate change should be `official-link-only`, `removed`, or `hidden`.
4. Add or update `rightsNotes`.
5. If media is removed, add a plain-language `removalNote`.
6. Keep transcript, commentary, verification notes, and cultural framing intact unless there is a specific reason not to.
7. Update `lastVerifiedAt` if the takedown changes the public state of the entry.

## Editing checklist

- Change `scene.media.mediaStatus`
- Keep `scene.media.officialUrl` if readers can still be pointed to a legitimate source
- Add `scene.media.removalNote` for `removed`
- Keep `sources` and `verificationNotes` visible
- Re-run `npm run validate:scenes`
- Re-run `npm run build`

## Principle

The archive is commentary-first. A clip coming down should not erase the record of why the scene mattered.
