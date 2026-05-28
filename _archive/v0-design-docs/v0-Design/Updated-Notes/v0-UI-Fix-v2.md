@.cursor/skills/vader_protocol_skill.md @.cursor/skills/studio-dark-shield.md @.cursor/docs/v0-Design/README.md @.cursor/docs/v0-Design/v1-Overview.md @.cursor/docs/v0-Design/v2-Layout-Components.md @.cursor/docs/v0-Design/v3-State-Data.md @.cursor/docs/v0-Design/v4-Operations.md @.cursor/docs/v0-Design/v5-Implementation.md @.cursor/docs/v0-Design/v6-Master-Prompt.md @.cursor/docs/v0-Design/Updated-Notes/v0-UI-Fix-v1.md

I have a bunch of new notes, updates, feedback and suggestions and fixes in my v0-UI-Fix-v1.md file. I want you to go through all of the docs I have refrenced here in the current chant to overhaul everything into a fully updated worklow v1-v6. Be sure to focus on the v6-Master-Prompt.md file and section 9. the v0 prompt section. I want to be as thourough and percise with instructions so when i run the prompt it has the best chance of giving me a full fledge working UI/UX system design we can then impliment into this project. Add any notes or upgrades you see fit to make this the very best it can be. After you have had a look athis whoole project and what would be useful then impliment all the chnages in these docs. After all that tell me the exact files I can attach to the v0.app agent to guide it to create our UI/UX. You can make a new Promt-v0.md file that I can use to give v0 as the first default prompt to have it begin. 

Review this prompt and give me green light to run or give me any other tweaks before i run it



--------------------------------------------------
Final Prompt – Stage 1 (v0, no images)
**Role:** Lead UI Engineer for **Vader Engine v2.5.0-Engine**.

**Critical instruction:** You are building a **developer dashboard**, not a CRM. The images you will see in stage 2 are for **visual style only** (colors, card backgrounds, green pulse dots, footer placement). **Ignore their layout entirely.** Do not add a Kanban board, do not add project steps (Domain, Hosting, Collab, Theme, Launch), and do not add a "My Tasks" list.

---

## Mandatory Layout Schema (follow this exactly)

**Shell:** 220px sidebar (left) + 48px header (top). Persistent across all routes. Use Next.js 15 App Router, TypeScript, Tailwind CSS 3, shadcn/ui.

**Dashboard Page – Bento Grid (4 columns):**

- **Row 1 (3 columns):** Metric cards
  - Card 1: **Vader Velocity** (+12% trend indicator)
  - Card 2: **Engine Capacity** (2/3 active sandboxes: Minimal :3000, Payload :3001, Tailwind :3002)
  - Card 3: **Integrity** (61/61 score – green badge)

- **Row 2 (3 columns):** Sandbox cards
  - Each card: name (`Minimal`, `Payload CMS`, `Tailwind / shadcn`), port (monospace `:3000`, `:3001`, `:3002`), green pulse dot if running, buttons: `START` / `STOP` / `OPEN`.
  - The `STOP` button must trigger an `AlertDialog` confirmation.

- **Row 3 (2 columns):**
  - Left (2/3): **Activity feed** with relative timestamps (`2m ago`, `15m ago`, `45m ago`, `2h ago`).
  - Right (1/3): **Support tickets** with status badges (`Open`, `Pending`).

**Other Pages (placeholders):**
`/projects`, `/templates`, `/sandboxes`, `/integrity`, `/operations/scripts`, `/operations/ports`, `/operations/env`, `/protocols`, `/settings`.
Each placeholder must use a **Protocol Readiness** card (page title + readiness status / short metric) – not a generic "Coming Soon".

**Branding Zones (fixed position):**
- Footer: `Powered by Vader Engine` – fixed to bottom of viewport.
- Command bar: `Type / for commands` – fixed 16px above footer, opens Command Palette (⌘K also opens palette).

**Styling (Path B – Tailwind + shadcn):**
- Page background: `#121212`, cards: `#1c1c1c`.
- Accent: `#e02b20`, success: `#1D9E75`, warning: `#BA7517`.
- Typography: Geist/Inter UI, Geist Mono for logs/ports/values.
- No inline styles, no CSS modules.
- All destructive actions (kill port, stop sandbox) must use `AlertDialog`.

**Accessibility safeguard:** Include a `prefers-reduced-motion` media query in your global CSS that disables or reduces all animations for users who request it.

**Playwright `data-testid` attributes (required):**
- `command-palette-trigger` – the `Type / for commands` bar
- `footer-brand` – footer text
- `run-grader-button` – Integrity Run Grader
- `kill-port-confirm` – AlertDialog confirm for port kill
- `stop-sandbox-confirm` – AlertDialog confirm for sandbox stop
- `sandbox-card-3000`, `sandbox-card-3001`, `sandbox-card-3002`
- `activity-feed` – dashboard activity strip
- `protocol-readiness-card` – placeholder route cards

---

**First, generate the complete shell (`layout.tsx`) and the Dashboard page with the Bento grid described above. Do not add any images yet. After the shell is perfect, I will attach images for styling only.**


Stage 2 prompt (after Stage 1 generates)
Once v0 produces the clean Bento layout, click "Edit" or "Add/Modify", attach your 6 reference images, and paste:

**Keep the exact layout from the previous generation.** Do not change the sidebar, Bento row arrangement, footer position, or component hierarchy.

Now apply **only** the visual vocabulary from these attached images:
- Card background `#1c1c1c`
- Green pulse indicators for active services
- Monospace font for logs, ports, PIDs
- Footer text `Powered by Vader Engine` (bottom of every page)
- Command bar `Type / for commands` (bottom-left)

**Do NOT change any component positions or page structure. Do NOT add CRM elements (client project steps, Kanban board, "My Tasks" list).**
What you attach to v0
Stage	Attachments
Stage 1	Nothing – just paste the first prompt
Stage 2	The 6 reference images (MSC-CRM_Mock_v1.jpg … MSC-Media-Pro-VideoTutorialz-Main.jpg)
What stays with Cursor (after v0)
Your skills (`vader_protocol_skill.md`, `vader_animations_skill.md`, `studio-dark-shield.md`) are not for v0. They are used after you download the `.zip`, when you hand off to Cursor (follow `v5-Implementation.md`).

---

## Integration status

v2 notes have been absorbed into the active workflow docs:

- `.cursor/docs/v0-Design/Prompt-v0.md`
- `.cursor/docs/v0-Design/v6-Master-Prompt.md`
- `.cursor/docs/v0-Design/v1-Overview.md`
- `.cursor/docs/v0-Design/v2-Layout-Components.md`
- `.cursor/docs/v0-Design/v3-State-Data.md`
- `.cursor/docs/v0-Design/v4-Operations.md`
- `.cursor/docs/v0-Design/v5-Implementation.md`

