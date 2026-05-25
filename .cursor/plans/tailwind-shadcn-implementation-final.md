\*\*PLANNING: Opt-in Tailwind/shadcn Sandboxing Feature\*\*



I am ready to move "Opt-in Tailwind/shadcn sandboxing" from "Planned" to active development. Based on my existing `msc-cli` architecture and established `tailwind-shadcn-bridge.mdc`, map out the technical roadmap to implement this as an isolated workspace.



\*\*DO NOT CHANGE ANY FILES — produce a planning document only at `.cursor/plans/tailwind-shadcn-implementation.md`\*\*



\---



\## Requirements



\### 1. Structural Blueprint



\- Define the sandbox environment path as `templates/full-stack/tailwind-shadcn/` (reusable via `msc:template apply`)

\- \*\*Styling rules for Tailwind sandbox (Vader Protocol compliant):\*\*

&#x20; - Central `tailwind.css` as single source of truth (parallel to `vader.css`)

&#x20; - No inline `style={{}}` props allowed

&#x20; - No CSS modules (no `\*.module.css` files)

&#x20; - Tailwind utility classes only

\- How it inherits core `msc-` design system rules without duplicating code

\- Keep existing `vader.css` and Vader components unchanged

\- The sandbox blueprint must be reusable via `msc:template apply` — not a one-off setup



\### 2. CLI Command Design



\- New command: `npm run msc:sandbox:init -- --css=tailwind` (or `--css=vader` as default)

\- How it bootstraps the workspace using existing `msc:template` engine

\- Decision: standalone command vs flag on `msc:template apply` (recommend standalone for clarity)



\### 3. Dependency Mapping



\- List all npm packages needed (tailwindcss, postcss, autoprefixer, class-variance-authority, shadcn/ui)

\- How to ensure the sandbox uses existing bridge without creating circular dependencies in `package.json`

\- \*\*Packages MUST live inside the sandbox only — never in root `package.json`\*\*



\### 4. Verification Gate



\- New command: `npm run msc:test:sandbox`

\- \*\*Enforce Vader Protocol styling rules:\*\*

&#x20; - `grep -r "style={{|className={styles"` → must return 0 matches (no inline styles, no CSS modules)

&#x20; - `find . -name "\*.module.css"` → must return 0 files

&#x20; - All styling must be via Tailwind classes or `tailwind.css`

\- How to integrate with existing `msc:shield:audit` (Tailwind sandbox exempt from `msc-` prefix check, but must follow central CSS rule)

\- \*\*Add a check to verify that sandbox dependencies do not promote themselves to the project root `package.json` — ensures opt-in stays truly isolated\*\*



\### 5. Documentation Update



\- List files to update: `README.md`, `HOW-TO.md`, `Code-Jedi.md`, `CONTRIBUTING.md`

\- How to mirror package.json as single source of truth



\---



\## Constraints (strictly enforced)



\- Maintain 100% adherence to existing "Zero-Noise" hygiene (no stray files, no broken links)

\- Sandbox is strictly opt-in — does not interfere with `full-stack/vader-site` template

\- Adhere to `msc\_` naming convention for all new scripts

\- Preserve 60/60 grader contract (no new checks unless absolutely necessary)

\- \*\*No inline styles, no CSS modules — central `tailwind.css` only\*\*



\---



\## Before/After File Tree



\*\*Before:\*\*
emplates/full-stack/

├── vader-site/ (existing)

└── task-manager/ (existing)

\*\*After:\*\*
templates/full-stack/

├── vader-site/ (existing)

├── task-manager/ (existing)

└── tailwind-shadcn/ (new)

├── package.json (Tailwind/shadcn deps here, not in root)

├── tailwind.config.js

├── postcss.config.js

├── src/

│ ├── tailwind.css (single source of truth)

│ └── components/

│ ├── Button.tsx (Tailwind classes only, no inline styles)

│ ├── Card.tsx

│ └── Dialog.tsx

└── README.md





\*\*Root package.json:\*\* unchanged (no Tailwind/shadcn deps)



\---



\## Risk Assessment



| Risk | Probability | Mitigation |

|------|-------------|------------|

| CSS conflicts between Vader and Tailwind | Low | Sandbox is isolated — never loaded together |

| \*\*Inline styles or CSS modules in shadcn components\*\* | \*\*Medium\*\* | \*\*Verification gate blocks them. Sandbox must use central `tailwind.css`.\*\* |

| Build size increase | Medium | Tailwind + shadcn add \~200KB — acceptable for sandbox |

| Root package.json pollution | Low | Verification gate catches it |

| Maintenance burden | Medium | Two styling paths to keep in sync — defer to user choice |

| Grader contract broken | None | No new checks added to 60/60 |



\---



\## Implementation Execution Guide



When you are ready to implement this plan, follow these steps \*\*in order\*\*. Do not skip ahead.



\### Phase 1: Template Blueprint Creation (30 min)



\*\*Task 1.1:\*\* Create `templates/full-stack/tailwind-shadcn/` directory structure

\*\*Task 1.2:\*\* Copy base files from `templates/full-stack/vader-site/`

\*\*Task 1.3:\*\* Replace `vader.css` with `tailwind.css` + `postcss.config.js` + `tailwind.config.js`

\*\*Task 1.4:\*\* Update `package.json` in template with Tailwind/shadcn dependencies (not in root)

\*\*Task 1.5:\*\* Add shadcn component stubs (Button, Card, Dialog, Input, Tabs) — \*\*Tailwind classes only, no inline styles, no CSS modules\*\*



\*\*Verification:\*\* `npm run msc:template -- list` → shows `full-stack/tailwind-shadcn`



\---



\### Phase 2: CLI Integration (45 min)



\*\*Task 2.1:\*\* Add `msc:sandbox:init` to `tools/msc-cli/cli.mjs` as subcommand

\*\*Task 2.2:\*\* Create `tools/msc-cli/scripts/sandbox-init.mjs`

\*\*Task 2.3:\*\* Implement `--css` flag logic (vader | tailwind)

\*\*Task 2.4:\*\* Reuse `template-engine.mjs` for copying, add conditional CSS file selection



\*\*Verification:\*\* `npm run msc:sandbox:init -- --css=tailwind --name=test --dry-run`



\---



\### Phase 3: Verification Gate (30 min)



\*\*Task 3.1:\*\* Create `tools/msc-cli/scripts/sandbox-test.mjs`

\*\*Task 3.2:\*\* Implement root `package.json` pollution check (grep for tailwind/shadcn packages)

\*\*Task 3.3:\*\* Implement inline styles check: `grep -r "style={{|className={styles"` → must return 0

\*\*Task 3.4:\*\* Implement CSS modules check: `find . -name "\*.module.css"` → must return 0

\*\*Task 3.5:\*\* Integrate with existing `msc:shield:audit` (optional for Tailwind sandbox)

\*\*Task 3.6:\*\* Add `msc:test:sandbox` to `package.json` scripts



\*\*Verification:\*\* `npm run msc:test:sandbox -- --target=../test-sandbox`



\---



\### Phase 4: Documentation Sync (15 min)



\*\*Task 4.1:\*\* Update `README.md` template blueprints table

\*\*Task 4.2:\*\* Update `HOW-TO.md` with `msc:sandbox:init` and `msc:test:sandbox`

\*\*Task 4.3:\*\* Update `Code-Jedi.md` script inventory

\*\*Task 4.4:\*\* Update `CONTRIBUTING.md` with sandbox contribution notes



\*\*Verification:\*\* `git grep -n "msc:sandbox" -- "\*.md"` → shows all references



\---



\### Phase 5: Final Testing (15 min)



\*\*Task 5.1:\*\* Create live sandbox: `npm run msc:sandbox:init -- --name=live-test --css=tailwind`

\*\*Task 5.2:\*\* Run inline styles scan: `grep -r "style={{|className={styles" ../live-test/src --include="\*.tsx"` → 0 matches

\*\*Task 5.3:\*\* Run CSS modules scan: `find ../live-test -name "\*.module.css"` → 0 files

\*\*Task 5.4:\*\* Run `npm run msc:test:sandbox -- --target=../live-test`

\*\*Task 5.5:\*\* Run `npm run grade \&\& npm run msc:lint \&\& npm run msc:test:root`

\*\*Task 5.6:\*\* Verify root `package.json` has no Tailwind/shadcn dependencies



\*\*Gate:\*\* All commands exit 0, root `package.json` unchanged, sandbox builds successfully, no inline styles or CSS modules.



\---



\## Execution Commands (Copy-Paste for Cursor)



When ready to implement, tell Cursor:



```text

\*\*IMPLEMENT the plan in `.cursor/plans/tailwind-shadcn-implementation.md`\*\*



Execute phases 1-5 in order. After each task, run the verification gate and report results. Do not skip ahead. Stop if any verification fails.





