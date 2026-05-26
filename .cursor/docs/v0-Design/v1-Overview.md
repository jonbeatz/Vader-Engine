# Vader Protocol — Overview & Design Tokens

**Module:** `v1-Overview.md`  
**Product:** Vader Protocol · MSC Universal Boilerplate **v2.5.0-Engine**  
**Branch:** `main` (stable) · active implementation: `feat/vader-construct-dashboard`

**Blueprint modules:** [v1-Overview.md](v1-Overview.md) · [v2-Layout-Components.md](v2-Layout-Components.md) · [v3-State-Data.md](v3-State-Data.md) · [v4-Operations.md](v4-Operations.md) · [v5-Implementation.md](v5-Implementation.md) · [v6-Master-Prompt.md](v6-Master-Prompt.md)

**Role:** Canonical synthesis, product definition, look/feel, and `--msc-*` token contract.  
**Baseline:** [jonbeatz/Boilerplate](https://github.com/jonbeatz/Boilerplate) · **Status:** Modular master blueprint (module 1 of 6)

---

## 0. Synthesis Notes (Conflict Resolution)

| Topic | Prior variants | **Resolved decision (Engine)** |
| --- | --- | --- |
| Accent / brand color | Neon `#00ffcc` · indigo SaaS · `#e02b20` | **`--msc-accent` (`#e02b20`)** — `ui/msc-shield.css` + Path B `tailwind.config.ts` |
| Visual tone | Cyberpunk · generic admin | **Premium dev-tool** (Linear + Vercel + Railway). No neon overload |
| Product naming | Boilerplate Studio · Control Plane · Master Dashboard | **Vader Protocol** — canonical interface product name (UI, nav, v0 prompt, chrome copy) |
| Home layout | Bento · Mission Control | **Bento grid** inside **Mission Control** shell (sidebar + header + log drawer) |
| Navigation IA | Tools/System split · flat sandboxes | **Dashboard → Projects → Templates → Sandboxes → Integrity → Operations → Protocols → Settings** |
| Grader score | Stale 52/52 | **61/61** — current grader contract |
| Code location | `ui/dashboard/` | Isolated package · port **3010** · **Lean Boundary** |
| Theme | Dark-only · OLED toggle | **Default `dark`** · optional **`oled`** slice in Zustand — **no light mode in P0** |
| Command Palette | P1 defer · P0 basic | **P0 first-class** — global **Cmd+K** (navigation + scripts + scaffold + kill + protocols) |
| Primary interaction | Mouse-first panels | **Keyboard-first** — Cmd+K parity with Linear/Raycast |
| Env Manager | Full CRUD table | **P0 read-only** `validate-env` + docs link · **P1** EnvTable/EnvTabs CRUD |
| Log transport | WebSocket generic | **P0 SSE** stdout stream · **POST** `/api/run-script` for spawn + input |
| Destructive UX | Toast only | **`AlertDialog`** required before kill port, stop sandbox, kill-all |
| MVP screens | 12+ areas | P0 scope in [v4-Operations.md](v4-Operations.md) §5 — Operations groups Scripts, Ports, Env |

---

## 1. Executive UI Vision

### 1.1 Product definition

**Vader Protocol** is the visual command center (interface product) for the MSC Universal Boilerplate ecosystem. The CLI (`msc:*` npm scripts) remains the **execution engine**; the **`ui/dashboard`** app on port **3010** is the **primary operator face** for humans and Cursor agents who should not memorize sixty-plus commands.

**One-line positioning (canonical):**

> Bootstrap a production-hardened, Cursor-native ecosystem in minutes: the v2.5.0 Vader Protocol foundation features an autonomous **61-point** integrity grader, **triple-sandbox** modularity (Payload CMS + Tailwind/shadcn + WordPress shield), and **zero-leak** security — engineered for absolute environmental consistency.

**Brand references:** [jonbeatz/Boilerplate](https://github.com/jonbeatz/Boilerplate) · design tone [vaderlabz.com](https://vaderlabz.com/) — disciplined industrial dark, not decorative sci-fi.

### 1.2 Look and feel

| Dimension | Specification |
| --- | --- |
| **Mood** | Industrial terminal meets premium developer product — disciplined, authoritative, fast |
| **References** | Linear (density, keyboard-first) · Vercel Dashboard (restraint) · Railway (sandbox cards) · Raycast (command palette) |
| **Theme modes** | **`dark`** (Vader Protocol dark / `msc-shield` tokens, default) · **`oled`** (true black surfaces) — toggle in Settings; **no light mode in P0** |
| **Density** | High information density; **~30% less decorative noise** than generic admin templates — operational clarity over ornament |
| **Motion** | 150–200ms transitions · subtle green pulse for **running** sandboxes · skeleton shimmer for async blocks |
| **Signature** | Header: `// VADER_PROTOCOL :: CONTROL_PLANE` · grade badge **61/61** always visible in chrome |

**OLED mode tokens (applied via `data-theme="oled"` or class on `html`):**

| Token | Dark (default) | OLED |
| --- | --- | --- |
| `--msc-bg-main` | `#121212` | `#000000` |
| `--msc-bg-surface` | `#1c1c1c` | `#0a0a0a` |

All other `--msc-*` tokens unchanged; accent remains `#e02b20`.

### 1.4 Design tokens (mandatory — Vader bridge)

All UI consumes tokens from **`ui/msc-shield.css`** via Tailwind extension (pattern: `examples/nextjs-tailwind/tailwind.config.ts`):

| Token | CSS variable | Hex (baseline) | Usage |
| --- | --- | --- | --- |
| Canvas | `--msc-bg-main` | `#121212` | Page background |
| Surface | `--msc-bg-surface` | `#1c1c1c` | Cards, sidebar |
| Raised | `--msc-surface-raised` | `#242424` | Modals, hover |
| Border | `--msc-border` | `#2a2a2a` | Dividers |
| Text primary | `--msc-text-primary` | `#e0e0e0` | Body |
| Text secondary | `--msc-text-secondary` | `#888888` | Labels |
| Accent | `--msc-accent` | `#e02b20` | CTAs, active nav |
| Accent hover | `--msc-accent-hover` | `#c41e14` | Hover |
| Success | `--msc-success` | `#1D9E75` | PASS, running |
| Warning | `--msc-warning` | `#BA7517` | Degraded |
| Info | `--msc-info` | `#185FA5` | Neutral actions |

**Rejected for P0:** `#00ffcc` as primary accent — log syntax highlight only.

---

*Module 1 of 6 · Bento layout → [v2-Layout-Components.md](v2-Layout-Components.md) §1.3*
