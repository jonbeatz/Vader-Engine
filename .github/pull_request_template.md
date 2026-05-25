## Summary

<!-- What changed and why (1–3 sentences) -->

## Type

- [ ] Bug fix
- [ ] Feature / template
- [ ] Documentation
- [ ] Chore (deps, CI, tooling)

## Vader Protocol checklist

- [ ] No secrets in diff (`.env.local`, tokens, PATs)
- [ ] `npm run msc:validate-env` — PASS
- [ ] `npm run msc:lint` — 0 errors, 0 warnings
- [ ] `npm run grade` — **60/60**
- [ ] `npm run msc:test:root` — all passing
- [ ] [CHANGELOG.md](../CHANGELOG.md) updated (user-visible changes)
- [ ] [HOW-TO.md](../.cursor/docs/HOW-TO.md) / [Code-Jedi.md](../.cursor/docs/Code-Jedi.md) if scripts changed

## Templates / sandboxes

- [ ] N/A
- [ ] `npm run msc:template -- doctor` (if touching `templates/` or `tools/msc-cli/`)
- [ ] Sandbox build tested (`examples/nextjs-minimal` and/or `nextjs-payload`)

## Screenshots / logs

<!-- Optional — grade output, CI link, UI capture -->
