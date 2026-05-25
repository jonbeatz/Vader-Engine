# Release v2.4.0 — 60-Point Grader & Ecosystem Hardening

**Released:** May 24, 2026  
**Tag:** v2.4.0  
**Previous:** v2.3.1 — Polish & Zero Warnings

---

## Summary

Phase B completion: structural grader expanded to **60/60**, standardized sandbox and template documentation, Dependabot coverage for the Next.js/Payload stack, and GitHub issue/PR templates for the Vader Protocol contributor workflow.

## What shipped

### Grader (60-point)

- Eight new checks (#53–60): Vader `vader.css`, Vader Protocol skills, version-matched `RELEASE_v*.md`, `DEPLOY_TO_HOSTINGER.md`, `ENABLE_PAYLOAD=false` default, no CSS modules in vader-site, Biome `!templates` (no deprecated `!templates/**`)
- Operational docs and README badges aligned to **60/60**

### Documentation

- [examples/README.md](examples/README.md) — sandbox index vs `templates/`
- Standard headers + setup blocks on all `templates/*` and `examples/*` READMEs
- [CONTRIBUTING.md](CONTRIBUTING.md) — issue/PR templates, template factory guide, Dependabot review ritual

### Security & automation

- [.github/dependabot.yml](.github/dependabot.yml) — weekly npm updates (root, `examples/nextjs-minimal`, `examples/nextjs-payload`)
- [.github/ISSUE_TEMPLATE/](.github/ISSUE_TEMPLATE/) — bug report + feature request (YAML)
- [.github/pull_request_template.md](.github/pull_request_template.md) — Vader Protocol pre-merge checklist

## Quality gate

```bash
npm run msc:lint && npm run grade && npm run msc:test:root
```

- `msc:lint` — 0 errors
- `grade` — **60/60 (100%)**
- `msc:test:root` — 8/8 passing

## Live proof

https://vaderlabz.com — built from `templates/full-stack/vader-site`.

---

## Maintainer notes (2026-05-25, post-tag)

- GitHub repository renamed to **[jonbeatz/Boilerplate](https://github.com/jonbeatz/Boilerplate)** (internal doc URL sweep; this file’s release body unchanged)
- Remote hygiene: Dependabot branches cleared; obsolete `phase-*` tags removed; semver tags `v2.1.0`–`v2.4.0` retained
- Details: [CHANGELOG.md](../../CHANGELOG.md) `[Unreleased]` · [project-log.md](../../.cursor/docs/project-log.md)
