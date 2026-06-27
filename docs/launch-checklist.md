# Launch Checklist

## Production setup

- Production domain is configured.
- `NEXT_PUBLIC_SITE_URL` matches the production domain.
- `sitemap.xml` is accessible.
- `robots.txt` is correct.
- `/studio` behavior is confirmed in production.
  If internal backlog notes should stay private, `ENABLE_STUDIO` remains off.

## Public QA

- Homepage mobile QA
- Archive mobile QA
- Scene page mobile QA
- Rights page QA
- Privacy page QA
- Nominate page QA
- Successful test nomination
- OG preview check
- Analytics event check

## Validation

- `npm run build`
- `npm run validate:scenes`

## Content checks

- Canonical URLs verified on homepage, archive, scene pages, rights, privacy, and nominate
- Scene 001 and 002 metadata look correct
- Archive feed only exposes published scenes
- Footer links are present and working
- Rights and privacy contact details are correct
