# Release v2.3.1 — Polish & Zero Warnings

**Released:** May 25, 2026  
**Tag:** v2.3.1  
**Previous:** v2.3.0 — VaderLabz Template

---

## Summary

Polish release after v2.3.0: README live proof, zero Biome warnings, pre-tag documentation, and operator UX improvements.

## What shipped (Phase A)

- **README:** Hero image (`media/readme/vaderlabz-hero-reference.jpg`), Version + Live demo badges, Live proof section, vaderlabz.com in documentation map
- **Lint:** All Biome warnings cleared (5 files; `--unsafe` fixes reviewed before apply)
- **Docs:** Pre-tag gate in HOW-TO + CONTRIBUTING; `.env.example` PORT comments
- **GitHub About:** Website https://vaderlabz.com; documentation link in repo description

## Quality

- `npm run msc:lint` — 0 errors, 0 warnings
- `npm run grade` — 60/60 (100%) after Phase B grader expansion
- `npm run msc:test:root` — 8/8 tests passing

## Live proof

https://vaderlabz.com — built from `templates/full-stack/vader-site`.
