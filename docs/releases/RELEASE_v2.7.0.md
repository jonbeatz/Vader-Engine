# Vader Engine v2.7.0

## Release Date
2026-05-29

## Added

- **Portable modules** — `.cursor/custom-scriptz/` with `google-api-proxy` and `backup-system` (`install.ps1`, `module.manifest.json`, shared `_lib/Msc-ModuleInstall.ps1`)
- **`Prompt-Module.md`** — canonical portable module installer for any project
- **Interactive backup** — `msc-backup.mjs` with destination/folder prompts, `--yes`, `--note`; Standard copies `.env.local`
- **BackUp-Notez.md** — per-backup folder notes (git summary + optional operator note)
- **`backup-system` v1.2.0** — `global.mdc.fragment`, 8-step agent backup ritual
- **Personal env vault** — `.cursor/env/` contracts + `msc-build-personal-secrets-vault.mjs`
- **`msc:google-api:start`** — canonical LiteLLM + ngrok alias

## Changed

- **Agent backup ritual** — 8-step conversational flow in `global.mdc`, Cheat Sheet, Operator Card
- **LiteLLM start reliability** — proxy before ngrok; master key sync from config
- **`.cursor` hygiene** — env desk; design refs under `media/design-references/`

## Fixed

- **Standard backup** — restored `.env.local` copy (removed erroneous `/XF`)
- **BackUp-Notez** — local timestamps; operator-friendly footer in each backup folder

## Technical

- 61/61 integrity maintained
- 8/8 root Vitest passing
- Branch milestone: `Vader-Engine-Dev-v2` @ `96c10a6`
- GitHub release tag: `v2.7.0` (when tagged on merge)
