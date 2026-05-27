# Vader Protocol — Overview

**Module:** `v1-Overview.md`  
**Goal:** Define product intent, visual constraints, and quality expectations for v0 generation.

## Product definition

**Vader Protocol** is the UI control plane for **Vader Engine**.  
It surfaces operational commands, environment health, and workflow gates in a single dashboard.

## Core design intent

- Developer operations dashboard, not CRM
- High-density and keyboard-friendly
- Dark industrial aesthetic, minimal ornament
- Predictable component system suitable for post-v0 integration

## Mandatory visual contract

| Token | Value | Usage |
| --- | --- | --- |
| `bg-main` | `#121212` | app background |
| `bg-surface` | `#1c1c1c` | cards/surfaces |
| `border` | `#2d2d2d` | separators |
| `accent` | `#e02b20` | primary actions |
| `success` | `#1D9E75` | running/pass states |
| `warning` | `#BA7517` | warnings |

## Interaction contract

- Persistent shell: sidebar + header + footer + command bar
- `Cmd/Ctrl + K` command palette is first-class, not optional
- All destructive actions require `AlertDialog`
- Async blocks render skeleton states
- Every key control includes stable `data-testid`

## Anti-drift constraints

- No CRM components (kanban, client stages, task boards)
- No generic “coming soon” placeholders
- No inline styles
- No structural changes during style pass (Stage 2)

## Quality target

The v0 output must look and behave like a production-ready UI skeleton that can be wired to real API endpoints with minimal refactor.
