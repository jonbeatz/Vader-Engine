## v2.2.0 — Template Scaffolding CLI — May 24, 2026

Production-ready scaffolding layer for Boilerplate-v2. **Grade: 52/52 (100%).** Repository: [jonbeatz/Boilerplate-v2](https://github.com/jonbeatz/Boilerplate-v2).

### Highlights

- **`npm run msc:template`** — ESM-native CLI with `list`, `apply`, `seed`, `doctor`
- **Three read-only blueprints** — portfolio, divi-bridge, task-manager
- **Token injection engine** — `.tsx`/`.jsx` support, `--dry-run`, dynamic port from **3002**
- **Disk persistence** — `seed-payload.json` to `--target` or `.sandbox/` fallback
- **Zero API breakages** from v2.1.0 Gold Master

### Quick commands

```bash
npm run msc:template -- list
npm run msc:template -- apply frontend/portfolio --name="My Studio" --target=../my-studio
npm run msc:template -- seed --template=full-stack/task-manager --target=../my-studio
npm run msc:template -- doctor
npm run grade   # expect 52/52
```

### Upgrade notes

- Grader count unchanged (**52 checks**)
- `templates/**` excluded from Biome (mustache tokens)
- `.sandbox/` gitignored for local seed output

Full changelog: [CHANGELOG.md](../CHANGELOG.md)
