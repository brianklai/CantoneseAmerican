# Public Site Design Audit

Date: 2026-06-27

## Summary

CantoneseAmerican.com is strongest when it reads as a cultural archive first: invitation on the homepage, depth on scene pages, browsing on the archive index, action on nomination, argument on `/why`, and trust on rights/privacy. The cleanup pass reduced public workflow language, moved internal-feeling controls out of primary surfaces, and kept the takedown-ready scene model intact.

## P0 Findings

- Homepage: the full nomination form should not render on the homepage. Current homepage now uses a compact nomination CTA only.
- Header: Rights should not sit in primary navigation. Current header is Archive / Why / Nominate; Rights remains in the footer.
- Nomination form: the honeypot leaked a visible/parseable “Company” label near the volunteer checkbox. The bot field is now visually hidden, `aria-hidden`, not keyboard-focusable, and label-free.
- Archive index: public filters exposed too much internal workflow state. Editorial status was removed from public filters and cards; Search, Category, and Language are primary, with Confidence, Decade, Year, and Work Type behind More filters.
- Kill Bill: transcript state needed one consistent message. The page now says the transcript is mostly verified, manually subtitled, not official subtitles, and lists only specific uncertain lines.

## P1 Findings

- Scene pages: shared scene pages exposed raw record fields such as archive file, editorial status, last verified, social hook, short caption, call to action, and hashtags. These now stay out of the public article flow.
- Rights/takedown copy: rights language was necessary but over-weighted. Scene pages now use compact rights notes and link to `/rights` for full policy.
- Public candidate queue: status labels should read as public editorial labels, not internal kanban states. The nominate page now uses New lead, In research, Needs audio review, Needs transcript, Ready to film, and Nearly ready.
- Category pages: cards should browse like archive entries, not studio records. Editorial status tags were removed.

## P2 Findings

- Consider a future compact “Share this scene” module if social captions need to be public, but do not show raw cover title/social hook/hashtags as record fields.
- Consider small screenshots or generated stills for category empty states only when there is enough published density to justify more visual treatment.
- Consider public labels for confidence statuses later if “Mostly clear” or “Needs review” begins to feel too workflow-oriented.

## Route Notes

- `/`: Clear editorial invitation. Preserves concise hero, Don Cheadle default carousel, Why teaser, pillars, compact nomination CTA, and social/footer.
- `/archive`: Now reads as browsing. Primary controls are Search, Category, Language; advanced filters are secondary; editorial workflow status is removed.
- `/archive/don-cheadle-rush-hour-2`: Keeps media, transcript, cultural notes, verification, rights, commentary, and related records. Raw social packaging removed.
- `/archive/larry-david-curb-your-enthusiasm`: Same shared-scene cleanup as Don Cheadle; public reader no longer sees internal share kit or archive-file fields.
- `/archive/kill-bill-vol-2-pai-mei-training-sequence`: Uses custom article hierarchy. Media and transcript state are consistent; R2 source links are shown only when hosted media is active.
- `/nominate`: Full form remains here only. Copy emphasizes that exact wording is not required. Candidate queue remains public-safe and does not expose private contact details.
- `/why`: Keeps the argument separate from homepage so the homepage can stay invitational.
- `/rights` and `/privacy`: Remain trust-layer pages linked from footer and scene media captions.
- `/studio`: Remains the internal workflow surface for editorial statuses, candidate stages, and production tracking.

## Mobile Findings

- Archive filters needed less density on small screens; moving advanced filters into `details` reduces first-screen clutter.
- Header keeps only the strongest mobile CTA visible.
- Nomination form fields retain full-width mobile layout and tap targets.
- Scene pages retain stacked section order: hero/media, argument, transcript, cultural notes, verification, commentary.

## Accessibility Findings

- Carousel remains non-autoplay and button-driven.
- Archive More filters uses a native disclosure control.
- Honeypot is not keyboard-focusable and is hidden from assistive tech.
- Form fields retain labels and visible focus states.
- Media and commentary play buttons retain accessible labels through existing components.
- No visible debug/anchor “N” marker was found in the public component scan.

## Copy Density Findings

- Homepage no longer carries a full form.
- Scene pages no longer show raw social caption fields.
- Rights copy is compact on scene pages and points to `/rights`.
- Archive index intro no longer explains backend verification workflow.

## Public / Private Data Concerns

- Editorial statuses belong in `/studio`, not public archive filters.
- Social packaging fields remain in data for production use but are no longer public record modules.
- Candidate queue does not show submitter labels or private contact details.
- R2 media source links are conditional on active public hosted media.

## Components Changed

- `components/ArchiveIndex.tsx`
- `components/CategoryArchivePage.tsx`
- `components/FeaturedScene.tsx`
- `components/Hero.tsx`
- `components/KillBillSceneRecord.tsx`
- `components/NominationForm.tsx`
- `components/SceneRecord.tsx`
- `app/archive/page.tsx`
- `app/nominate/page.tsx`
