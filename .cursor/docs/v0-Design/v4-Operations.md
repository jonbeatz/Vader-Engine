# Vader Protocol — Operations & Scope

**Module:** `v4-Operations.md`  
**Goal:** Lock scope, IA, and script mapping for the generated dashboard.

## P0 scope

1. Dashboard (bento shell)
2. Projects page
3. Templates page
4. Sandboxes page
5. Integrity page
6. Operations pages (scripts, ports, env)
7. Protocols page
8. Settings page
9. Global command palette
10. Global log drawer

## Navigation contract

- `/`
- `/projects`
- `/templates`
- `/sandboxes`
- `/integrity`
- `/operations`
- `/operations/scripts`
- `/operations/ports`
- `/operations/env`
- `/protocols`
- `/settings`

## Command palette actions (P0)

- route navigation
- run grader
- run lint
- run tests
- start/stop sandbox
- kill port / kill all

## Script mapping policy

UI actions must map to existing scripts only.  
No invented script names in UI labels or command handlers.

## Destructive flow policy

Require `AlertDialog` for:
- stop sandbox
- kill port
- kill all ports
- any destructive protocol action
