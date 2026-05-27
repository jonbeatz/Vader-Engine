## v2.2.0 — Template Scaffolding CLI — May 24, 2026

Production-ready scaffolding layer for **Vader Engine v2**. **Grade: 52/52 (100%).** Repository: [jonbeatz/Vader-Engine](https://github.com/jonbeatz/Vader-Engine).

### Highlights

- **`npm run msc:template`** — ESM-native CLI with `list`, `apply`, `seed`, `doctor`
- **Three read-only blueprints** — `frontend/portfolio`, `cms/divi-bridge`, `full-stack/task-manager`
- **Token injection engine** — `.tsx`/`.jsx` support, `--dry-run`, dynamic port from **3002**
- **Disk persistence** — `seed-payload.json` to `--target` or `.sandbox/` fallback
- **JonBeatz-only commit policy** — Husky strips Cursor co-author trailers
- **Zero API breakages** from v2.1.0 (prior Gold Master release)

### Quick commands

```bash
npm run msc:template -- list
npm run msc:template -- apply frontend/portfolio --name="My Studio"
npm run msc:template -- seed --template=full-stack/task-manager --target=../Dev-Projectz/my-studio
npm run msc:template -- doctor
npm run grade   # expect 52/52
```

### Upgrade notes (from v2.1.0)

- Grader count unchanged (**52 checks**)
- `templates/**` excluded from Biome (mustache tokens)
- `.sandbox/` gitignored for local seed output
- All docs, rules, and `package.json` aligned to **v2.2.0**

### Getting started

- **Quick start:** https://github.com/jonbeatz/Vader-Engine#quick-start
- **Documentation:** https://github.com/jonbeatz/Vader-Engine#documentation-map · [DOCS.md](https://github.com/jonbeatz/Vader-Engine/blob/main/DOCS.md)

```bash
git clone https://github.com/jonbeatz/Vader-Engine.git my-project
cd my-project
npm run msc:onboard
```

Full changelog: [CHANGELOG.md](https://github.com/jonbeatz/Vader-Engine/blob/main/CHANGELOG.md)

Prior release: [v2.1.0 Gold Master](https://github.com/jonbeatz/Vader-Engine/releases/tag/v2.1.0)
