# Release v2.3.0 — VaderLabz Template

**Released:** May 24, 2026
**Tag:** v2.3.0
**Previous:** v2.2.0 — Template Scaffolding CLI

---

## Why This Release Matters

v2.3.0 marks the shift from a developer scaffolding tool to a **production-proven, animation-rich, static-first deployment protocol**.

The VaderLabz template is the first full proof-of-concept for the Vader Engine's end-to-end capability:

- Template factory → scaffold → local dev → deploy in one workflow
- Cursor-native skills as living design system documentation
- CSS architecture (`vader.css`) that scales without drift
- Hostinger-ready static builds with optional Payload CMS upgrade path
- Live deployment at https://vaderlabz.com

---

## What Shipped

### Template
A complete Next.js 15 site template implementing the Vader Protocol design system — deep black, crimson accents, Rajdhani + Share Tech Mono typography, terminal/command-center aesthetic.

### CSS Architecture
`vader.css` replaces all CSS modules and inline styles. One file, all component styles, prefixed with `vader-*`. Zero inline `style={{}}` props anywhere.

### Animation System
Full keyframe library: `flicker`, `fadeInUp`, `fadeInLeft`, `pulse-red`, `pulse-green`, `bootReveal`, `borderMarch`, `glitch-1/2`, `shake`, `scaleIn`, `countUp`. All applied per-element per the `vader_animations_skill.md` reference.

### Deployment Tooling
Three new scripts handle the full Hostinger deploy pipeline. `DEPLOY_TO_HOSTINGER.md` documents every click. Verified working on production.

### Cursor Skills
Two permanent `.cursor/skills/` files ensure every future AI-assisted build stays on-brand automatically.

---

## Upgrade from v2.2.0

No breaking changes to the Vader Engine core.

To scaffold the new template:

```bash
npm run msc:template -- apply full-stack/vader-site --name=your-site
```

To deploy to Hostinger, follow `DEPLOY_TO_HOSTINGER.md`.

---

## Live Proof
https://vaderlabz.com — built and deployed entirely using this boilerplate template.
