# Manual QA Checklist

## Commands

- `npm run validate:scenes`
- `npm run build`

## Homepage

- Check desktop layout and spacing.
- Check mobile layout and tap targets.
- Verify homepage archive preview still feels editorial, not utility-first.
- Verify footer links work: `Archive`, `Rights & Takedown`, `Privacy`, `Nominate a Scene`.

## Archive Index

- Check `/archive` on desktop.
- Check `/archive` on mobile.
- Test search by work title and person name.
- Test filters for category, language, confidence, editorial status, year/decade, and work type.
- Verify zero-results state points to nomination flow.

## Category Pages

- Check `/archive/media`.
- Check `/archive/business`.
- Check `/archive/politics`.
- Check empty-state behavior on categories without entries.
- Verify category pages keep the magazine/archive look.

## Scene Pages

- Check a published scene on desktop.
- Check a published scene on mobile.
- Verify previous/next navigation appears correctly.
- Verify related scenes fail gracefully if none exist.
- Verify “Nominate the next scene” CTA appears.
- Verify social packaging box reads cleanly and does not overwhelm the page.

## Media States

- Verify active media state.
- Verify `official-link-only` state.
- Verify `removed` state.
- Verify `hidden` state.
- Verify no-transcript fallback state.
- Verify verification / unclear-audio notices appear cleanly.

## Nomination Flow

- Check `/nominate` on desktop and mobile.
- Confirm the form explains that exact wording is not required.
- Confirm honeypot field is not visible.
- Verify success state after a valid submission.
- Verify invalid source-link error.
- Verify invalid email error when email is provided.

## Policy Pages

- Check `/rights`.
- Check `/privacy`.
- Verify tone stays plain and human.

## Sharing / Metadata

- Verify each scene has a strong page title in the built HTML/head.
- Verify each scene has canonical metadata.
- Verify OG image route loads for each scene.
- Verify `/sitemap.xml`, `/robots.txt`, and `/archive.json`.

## Known Intentional Warning

- `scene 002` may warn about lacking an official source until one is added in-repo.
