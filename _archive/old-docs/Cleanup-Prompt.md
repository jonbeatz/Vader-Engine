Vader Engine Comprehensive Audit & Context Documentation

Role Definition
You are acting as a Senior Systems Architect / Vader Engine Lead. Your task is to perform a comprehensive technical audit of the entire Vader Engine codebase and generate a definitive Project-Context.md that serves as the single source of truth.

Mode: PLAN ONLY - No Code Changes Yet
Do NOT delete, move, or modify any files. Only analyze, document, and provide recommendations. All suggested deletions should go to a /_archive/ folder first.

Phase 1: Project Audit & Discovery
1.1 Map the Complete Project Structure
First, explore and document the entire directory structure:

# Run these commands to understand the layout
ls -la
find . -type d -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/.git/*" | sort
find . -name "package.json" -not -path "*/node_modules/*" | xargs -I {} sh -c 'echo "{}:" && cat {} | grep "name" | head -1'


1.2 Identify Redundant & Orphaned Files
Search for and list:

Build output folders: .next, dist, build, out, vader-site-deploy/

Multiple node_modules folders (count and size)

Temporary files: *.bak, *.old, *.tmp, *.log, .DS_Store

Unused dependencies: Run npm ls --depth=0 in each package.json location

Orphaned scripts: Scripts in scripts/ not referenced in any package.json

Deprecated templates: Old templates in templates/ not actively used

Duplicate components: Same component exists in multiple locations

1.3 Enforce Vader Protocol Compliance
Check for violations:

Naming violations: Functions/classes without msc_ prefix, CSS without msc- prefix

Aesthetic violations: Colors not using Studio Dark palette (#121212, #1c1c1c, #e02b20)

Tailwind sprawl: Components using inline Tailwind utilities instead of MSC Shield CSS

Security violations: PHP files without defined('ABSPATH') || exit;, missing nonces

Integrity score: Run npm run grade and document current score

1.4 Performance & Workflow Analysis
Identify bottlenecks:

Build time: Check next.config.mjs for optimization opportunities

Deployment workflow: Review scripts/prep-hostinger-deploy.sh for efficiency

Environment hydration: Check scripts/lib/msc-load-env.mjs for issues

Hydration patterns: Ensure all relative time components use mounted state pattern

Phase 2: Generate PROJECT_CONTEXT.md
Create a master documentation file at the project root that includes EVERYTHING below:

2.1 Executive Summary & Project Goals
What is Vader Engine? (Cursor-native full-stack development factory)

Current version (from root package.json)

Primary purpose and target users

2.2 Complete Technical Stack
Runtime: Node version requirements

Frameworks: Next.js (Minimal, Payload, Tailwind/shadcn Path B), WordPress

Styling: MSC Shield (CSS variable-driven, BEM-style, no Tailwind sprawl)

Hosting: Hostinger deployment workflow

Testing: Vitest (Root), Playwright (E2E)

Tooling: Custom CLI (tools/msc-cli/), Biome linting

2.3 Protocol Mandates (THE RULES)
Naming: Strict msc_ prefix for functions/scripts, msc- for CSS classes

Aesthetic: Studio Dark Palette - BG: #121212, Surface: #1c1c1c, Accent: #e02b20

Integrity: Mandatory 61/61 integrity score via npm run grade

Zero-Leak: No live credentials in committed files; use .env.local (gitignored)

Security: PHP files require defined('ABSPATH') || exit;, nonces for actions

Hydration: Client components using relative time must use mounted state pattern

2.4 Project Structure (Where Everything Lives)
Document each folder with purpose and status (active/archivable/legacy):

Path	Purpose	Status
ui/dashboard/	Vader Construct ops dashboard (port 3010)	Active
templates/full-stack/vader-site/	Marketing landing page (port 3003)	Active
examples/	Demo/test apps	Evaluate for archival
scripts/	Build, deploy, automation scripts	Active
tools/msc-cli/	Custom CLI tooling	Active
vader-site-deploy/	Generated static output	Archive
_archive/	Create this folder for deprecated files	New
2.5 Development Workflow & Commands
Document every important command:

# Dashboard
npm run msc:dev:dashboard     # Start dashboard on port 3010
npm run msc:kill -- 3010      # Kill process on port 3010

# Landing Page
cd templates/full-stack/vader-site && npm run dev  # Port 3003

# Quality & Testing
npm run grade                  # Run 61/61 integrity check
npm run msc:lint              # Biome linting
npm run msc:test:root         # Run tests
npm run msc:shield:audit      # Audit CSS variables

# Deployment
npm run msc:forge             # Generate static site
scripts/prep-hostinger-deploy.sh  # Prepare for Hostinger

2.6 UI/UX Design System
Color variables: Complete list from ui/msc-shield.css

Typography: Fonts, sizes, mono-space usage

Component patterns: shadcn/ui usage, Card variants, Button states

Modal behavior: Command palette centering, scrollbar handling

Responsive breakpoints: Mobile-first approach

2.7 Key Components Registry
List each major component with:

File path

Purpose

Current status (stable/needs-work/legacy)

Key dependencies

Known issues

2.8 Current State & Known Issues
Document:

Completed fixes: Hydration errors, duplicate UI, button alignment

Active branch: feat/vader-construct-dashboard-v2

Pending refactors: Components still needing normalization

Technical debt: Scrollbar shift, mixed styling approaches (mostly resolved)

Integrity score: Current score and any failing checks

2.9 Cleanup Recommendations
Specific actions with justification:

Files/Folders to Archive (move to /_archive/):
vader-site-deploy/ - Generated output, can be regenerated

examples/ - If not actively used for testing

Any .bak, .old, .tmp files

Old migration scripts not referenced

Dependencies to Review:
Run npm audit in each package.json location

Identify unused packages with depcheck

Code to Refactor:
Components still using Tailwind utilities (if any remain)

Inline styles that should move to CSS variables

2.10 Future Improvement Roadmap
Prioritized suggestions:

Short-term (1-2 hours): Archive redundant folders, clean up dependencies

Medium (half day): Complete any remaining component normalization

Long-term (full day+): Performance optimization, test coverage improvement

Phase 3: Deliverables
After completing the audit, provide EXACTLY these three things:

Deliverable 1: Audit Findings Report

# Vader Engine Audit Report
## Date: [CURRENT DATE]

## Executive Summary
[2-3 paragraphs on overall project health]

## Redundancy Report
### Files to Archive (Move to /_archive/)
- [ ] path/to/file - reason

### Unused Dependencies
- [ ] package-name - reason

### Duplicate Code / Violations
- [ ] description - location

## Integrity Score
Current: __/61
Failing checks: [list]

## Archive Workflow Command
mkdir -p _archive
mv [file-list] _archive/

Deliverable 2: PROJECT_CONTEXT.md
Full markdown document as structured above, ready to save to project root.

Deliverable 3: Action Plan

# Immediate Actions (Today)
- [ ] Create _archive folder
- [ ] Move [specific files] to archive
- [ ] Commit PROJECT_CONTEXT.md

# Short-term (This Week)
- [ ] Action 1
- [ ] Action 2

# Long-term (Next Sprint)
- [ ] Action 1


Important Constraints
DO NOT DELETE ANYTHING - Only recommend moving to /_archive/

DO NOT MODIFY CODE - Only document and suggest

Check timestamps - Files modified in last 30 days are likely active

Respect .gitignore - Some files are intentionally ignored

Preserve Vader Protocol - Note violations, don't suggest removing the rules

Success Criteria
You have succeeded when:

✅ I can understand the entire project structure from PROJECT_CONTEXT.md alone

✅ I have a clear list of exactly what files/folders to archive

✅ I know the current integrity score and what's failing

✅ Any new AI agent can read PROJECT_CONTEXT.md and instantly understand the codebase

✅ I have a prioritized action plan for cleanup

Run this audit now and produce the three deliverables. Take your time to be thorough.
















