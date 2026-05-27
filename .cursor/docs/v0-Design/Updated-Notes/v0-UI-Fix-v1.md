Build **Vader Protocol v2.5.0-Engine** — a production-grade visual command center for the Vader Engine (Next.js 15 App Router, TypeScript, Tailwind CSS 3, shadcn/ui).

**Core Design Directives (Vader Protocol System):**
- **Aesthetic:** Industrial minimalism, terminal-like precision. 
- **Palette (CSS Variables):** Background: `#080808` (`var(--bg-void)`), Surface: `#0f0f0f`, Card: `#141414`. Accent: `#c0392b` (`var(--accent-red)`), Warning: `#e67e22`.
- **Typography:** Display: 'Rajdhani', 700 (Headings). Monospace: 'Share Tech Mono', 400 (Labels, tags, nav, CTAs).
- **Layout Rules:** Sharp corners only (border-radius: 0). No drop shadows; use background color differentiation for depth. 1px borders using `var(--border)`.

**Motion Directives (Vader Animations):**
- **Atmosphere:** Integrate keyframes for `flicker` (hero title), `pulse-red` (primary CTA), `scan-sweep`, and `bootReveal`.
- **Feedback:** Use `fadeInUp` for staggered content entrances. Add `cursor` (`_`) after all monospace labels.
- **Interactions:** Top-border reveal on project cards (`::before { transform: scaleX(0) }` to `scaleX(1)`). Pulse-green status dot on "ONLINE" indicators.

**UI Architecture:**
- **Navigation:** Fixed, glass-morphism header (`rgba(8,8,8,0.92)`, `backdrop-filter: blur(8px)`).
- **Dashboard:** Bento-style grid with 1px hairline dividers (using `gap: 1px; background: var(--border)`).
- **Footer:** Include "Powered by the MSC Media Engine".
- **UX:** AlertDialog for destructive actions, Skeleton loading for async states, `data-testid` attributes on all interactive elements.

**Technical Implementation:**
- Import styles from `vader.css` (canonical classes `vader-*`).
- Animations must respect `prefers-reduced-motion: reduce`.
- The dashboard UI must follow the "Terminal meets modern dev dashboard" concept—no SaaS-style roundness or pastel colors.

Important Integration NotesStyle Management: Ensure your project's app/(app)/vader.css is updated with the animation keyframes provided in your reference docs.  Visual Logic: The "Boot Sequence" component can be implemented as an overlay on the initial dashboard load to establish the "military terminal" feel you requested. 
Workflow: As you build this out, remember that vader.css is the single source of truth for component styles—avoid mixing in Tailwind utility classes that contradict the vader-* definitions

Dashboard Metrics Interface:
// types/vader-dashboard.ts

export interface VaderEngineStats {
  vaderVelocity: number;      // Current processing speed (e.g., 84.5)
  engineCapacity: number;     // Percentage of total capacity (0-100)
  integrityStatus: number;    // Fixed to 61/61 as per requirements
  activeNodes: number;        // Total count of active sandboxes
}

// Example hook for animating the values
export function useDashboardStats() {
  const [stats, setStats] = useState<VaderEngineStats>({
    vaderVelocity: 0,
    engineCapacity: 0,
    integrityStatus: 61,
    activeNodes: 0,
  });

  // Use this state to trigger the 'countUp' keyframe animation 
  // defined in vader_animations_skill_2.md
  return stats;
}

Integration Tips for "Vader Protocol"Animation Trigger: When mapping these stats to your UI, wrap the number output in a component that applies the countUp class from vader_animations_skill_2.md whenever the state updates.  Stationary Status: Since integrityStatus is strictly 61/61, you can treat this as a static display element, perhaps with a slight flicker animation from vader_animations_skill_2.md to indicate the system is "live" and stable. Data-TestIDs: Remember to include data-testid="stat-velocity", data-testid="stat-capacity", etc., to satisfy the testing requirement mentioned in your core build notes

------------------------------------------------

To ensure your VaderEngine dashboard stats align perfectly with the Vader Protocol aesthetic, add these specific classes to your vader.css file. These classes handle the industrial layout and the countUp animation behavior.

vader.css Statistic Card Definitions

/* Dashboard Stat Grid Wrapper */
.vader-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1px;
  background: var(--border); /* Creates the hairline grid divider effect */
}

/* Individual Stat Card */
.vader-stat-card {
  background: var(--bg-card);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Stat Label (Monospace) */
.vader-stat-label {
  font-family: var(--font-mono); /* Share Tech Mono */
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  color: var(--text-secondary);
  text-transform: uppercase;
}

/* Stat Value (Animated) */
.vader-stat-value {
  font-family: var(--font-mono);
  font-size: 2rem;
  color: var(--text-primary);
  /* Triggers the countUp animation defined in vader_animations_skill_2.md */
  animation: countUp 0.6s ease-out both; 
}

Deployment StrategyInject Classes: Add the above to your vader.css file.  Apply Logic: In your component, apply these classes to your stat cards.Animate: Since the countUp animation is defined in vader_animations_skill_2.md, ensuring the animation: countUp property is present on the value element will provide the "military terminal" feedback you require. Verification: Confirm that your vader.css is imported in layout.tsx so these global styles are available throughout your vader-construct-dashboard branch

------------------------------------------------

To ensure your AlertDialog components match the sharp-edged, industrial aesthetic of the Vader Protocol, use the following structure. These components avoid all rounded corners and rely on the high-contrast color palette defined in vader_protocol_skill_2.md. 

Vader Protocol AlertDialog ComponentThis component uses the vader-* naming convention to maintain consistency with your existing stylesheets.  
// components/VaderAlertDialog.tsx
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import "./vader-dialog.css"; // Ensure this matches your vader.css pattern

export const VaderAlertDialog = ({ 
  trigger, 
  title, 
  description, 
  onConfirm 
}: { 
  trigger: React.ReactNode, 
  title: string, 
  description: string, 
  onConfirm: () => void 
}) => (
  <AlertDialogPrimitive.Root>
    <AlertDialogPrimitive.Trigger asChild>
      {trigger}
    </AlertDialogPrimitive.Trigger>
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="vader-dialog-overlay" />
      <AlertDialogPrimitive.Content className="vader-dialog-content">
        <AlertDialogPrimitive.Title className="vader-dialog-title">
          {title}
        </AlertDialogPrimitive.Title>
        <AlertDialogPrimitive.Description className="vader-dialog-description">
          {description}
        </AlertDialogPrimitive.Description>
        <div className="vader-dialog-actions">
          <AlertDialogPrimitive.Cancel className="vader-btn-secondary">
            ABORT
          </AlertDialogPrimitive.Cancel>
          <AlertDialogPrimitive.Action onClick={onConfirm} className="vader-btn-primary">
            EXECUTE
          </AlertDialogPrimitive.Action>
        </div>
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  </AlertDialogPrimitive.Root>
);

Required CSS (vader.css additions)Add these styles to your vader.css to enforce the sharp edges and specific colors.  

/* Dialog Overlay */
.vader-dialog-overlay {
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  inset: 0;
}

/* Dialog Content - Sharp Edges, Industrial */
.vader-dialog-content {
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 2rem;
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border-radius: 0; /* Strict adherence to sharp corners[cite: 9] */
  animation: scaleIn 0.2s ease-out; /* Defined in vader_animations_skill_2.md */
}

.vader-dialog-title {
  font-family: var(--font-rajdhani);
  color: var(--accent-red);
  font-size: 1.25rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.vader-dialog-description {
  font-family: var(--font-mono);
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 2rem;
}

.vader-dialog-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

Implementation NotesDestructive Actions: Use this component for any action involving kill (port termination) or delete (sandbox removal) to ensure the user acknowledges the system impact.  Animations: The scaleIn animation from vader_animations_skill_2.md provides the necessary "terminal coming online" precision when the dialog appears[cite: 8].Accessibility: By wrapping Radix UI primitives, you ensure the destructive action is fully keyboard accessible, satisfying the requirements for your professional-grade dashboard.  

Here is a final checklist to ensure we have captured everything for your v0.dev updates:Design System: Full adherence to vader_protocol_skill_2.md, including color tokens, sharp edges, Rajdhani/Share Tech Mono typography, and the industrial grid layout.  Motion System: Inclusion of key animations from vader_animations_skill_2.md, such as the flicker hero effect, pulse-red CTAs, and scaleIn dialogs.  Component Architecture: The dashboard includes the requested Bento-style grid, persistent sidebar/header, command palette trigger, and the VaderAlertDialog for destructive actions.  Branding & UI: The "Powered by the MSC Media Engine" footer and proper data-testid attributes are integrated.  Dashboard Logic: The VaderEngineStats interface is defined and ready for the countUp animation.  

------------------------------------------------

The core problem: v0 keeps copying your reference images literally (Kanban board, client steps, task lists) instead of using them as style inspiration.

Here's your final master prompt for v0
Copy this into a brand new v0 chat. Do not attach any images yet.

**Role:** Lead UI Engineer for **Vader Engine v2.5.0-Engine**.

**Critical instruction:** You are building a **developer dashboard**, not a CRM. The attached images (added in stage 2) are for **visual style only** — colors, card backgrounds, green pulse dots, footer placement. **Ignore their layout entirely.**

---

## Mandatory Layout Schema (follow this exactly)

**Shell:** 220px sidebar (left) + 48px header (top). Persistent across all routes.

**Dashboard Page – Bento Grid (4 columns):**

- **Row 1 (3 columns):** Metric cards
  - Card 1: Vader Velocity (+12% trend)
  - Card 2: Engine Capacity (2/3 active sandboxes: Minimal :3000, Payload :3001, Tailwind :3002)
  - Card 3: Integrity (61/61 score – green badge)

- **Row 2 (3 columns):** Sandbox cards (Minimal :3000, Payload :3001, Tailwind :3002)
  - Each card: name, port (monospace), green pulse dot if running, buttons: START / STOP / OPEN
  - STOP button must trigger AlertDialog confirmation

- **Row 3 (2 columns):**
  - Left (2/3): Activity feed with timestamps (2m ago, 15m ago, 45m ago, 2h ago)
  - Right (1/3): Support tickets with status badges (Open, Pending)

**Other Pages (placeholders):** /projects, /templates, /sandboxes, /integrity, /operations/scripts, /operations/ports, /operations/env, /protocols, /settings
- Each placeholder: Protocol Readiness card with page title + status

**Branding Zones (fixed position):**
- Footer: `Powered by Vader Engine` – fixed to bottom of viewport
- Command bar: `Type / for commands` – fixed 16px above footer, opens Command Palette (Cmd+K also works)

**Styling (Path B – Tailwind + shadcn):**
- Page background: `#121212`, cards: `#1c1c1c`
- Accent: `#e02b20`, success: `#1D9E75`, warning: `#BA7517`
- Typography: Geist/Inter UI, Geist Mono for ports/logs
- No inline styles, no CSS modules
- All destructive actions (kill port, stop sandbox) require AlertDialog
- Required `data-testid` attributes: command-palette-trigger, footer-brand, run-grader-button, sandbox-card-3000, sandbox-card-3001, sandbox-card-3002, activity-feed, protocol-readiness-card

---

**Do not add a Kanban board. Do not add project steps (Domain, Hosting, Collab, Theme, Launch). Do not add a task list (My Tasks). These come from the CRM mock images – ignore them.**

**First, generate the shell (`layout.tsx`) and Dashboard page with the Bento grid above. No images yet. After the shell is perfect, I will attach images for styling only.**


After this generates (stage 2)
Once v0 produces the clean Bento layout, click "Edit" or "Add/Modify", then attach your 6 reference images and paste:

**Keep the exact layout from the previous generation.** Do not change sidebar, Bento row arrangement, or footer position.

Now apply **only** the visual vocabulary from these images:
- Card background `#1c1c1c`
- Green pulse indicators (active services)
- Monospace for logs, ports, PIDs
- Footer text `Powered by Vader Engine` (bottom of every page)
- Command bar `Type / for commands` (bottom-left)

**Do NOT change any component positions or page structure. Do NOT add CRM elements (client projects, task lists, Kanban).**

Recap of what we've fixed
Problem	Solution
v0 copying CRM layout (Kanban, steps, tasks)	Explicitly forbidden in prompt
Images overriding your spec	Two‑stage workflow: structure first, style second
Missing Bento grid	Mandatory Layout Schema with rows/columns
Missing sandbox cards	Explicitly defined (Minimal, Payload, Tailwind)
Footer + command bar position	Fixed viewport positioning
No data-testid	Added required IDs
No AlertDialog for destructive actions	Enforced for STOP and kill port
One more thing
Your vader_protocol_skill.md, vader_animations_skill.md, and studio-dark-shield.md are not for v0. They are for Cursor after you download the .zip. Keep them in your repo – they will be used during the handoff (v5-Implementation.md §14).

---

## Integration status

The actionable parts of this note are now integrated into:

- `.cursor/docs/v0-Design/Prompt-v0.md`
- `.cursor/docs/v0-Design/v6-Master-Prompt.md` (Section 9 workflow model)
- `.cursor/docs/v0-Design/v1`–`v5` modules (scope, IA, data, implementation)

Use this file as historical brainstorming context only.






















