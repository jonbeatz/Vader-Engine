# Release v2.5.0 — Tailwind / shadcn Path B Sandbox

**Released:** May 25, 2026  
**Tag:** v2.5.0  
**Previous:** v2.4.0 — 60-Point Grader & Ecosystem Hardening

---

## Summary

Opt-in **Path B** hybrid sandbox: Tailwind 3 + shadcn-style components bridged to Vader Protocol tokens in `ui/msc-shield.css`, isolated under `examples/nextjs-tailwind/` on port **3002** (Lean Boundary Rule).

## What shipped

### Tailwind sandbox (`examples/nextjs-tailwind/`)

- `npm run msc:dev:tailwind` — dev server on port **3002**
- `tailwind.config.ts` — full Vader token map (`msc-bg-main`, `msc-surface`, `msc-text-*`, `msc-accent`, `msc-accent-hover`)
- `MscButton` / `MscCard` primitives — no inline styles, no CSS modules
- `/sandbox-test` — component stress-test route
- Biome Tailwind CSS parser override for sandbox styles

### Documentation & security

- [SECURITY.md](../../SECURITY.md) — private advisory reporting, zero-leak policy
- README / DOCS / HOW-TO / Code-Jedi sync for v2.5.0
- [DOCS.md](../../DOCS.md) — **Testing the Tailwind Sandbox** section

### CI / release automation

- [.github/workflows/release.yml](../../.github/workflows/release.yml) — tag `v*` → published GitHub Release with generated notes

## Quality gate

```bash
npm run msc:lint && npm run grade && npm run msc:test:root
```

- `msc:lint` — 0 errors
- `grade` — **60/60 (100%)**
- `msc:test:root` — 8/8 passing · production audit 0 vulnerabilities

## Verify locally

```bash
npm run msc:dev:tailwind
# http://127.0.0.1:3002
# http://127.0.0.1:3002/sandbox-test
```
