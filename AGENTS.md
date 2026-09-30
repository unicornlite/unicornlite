# Repository Guidelines

This is a static GitHub Profile README repository (`unicornlite`). No application code, local build process, or test suite exists.

## Design Constraints (Crucial)
- **Aesthetic:** All edits MUST follow the creepy, anomaly, 8-bit aesthetic defined in `PRD.md`.
- **Colors:** STRICTLY 100% Monochrome (Pure Black `#000000`, Pure White `#FFFFFF`). **NO GREY ALLOWED.**
- **Accents:** Only Pure Red (`#ff0000`) is allowed for specific creepy highlights/glitches.
- **Badges:** Do not use colorful standard badges. Use flat-square, 100% monochrome badges (e.g., via `visitorbadge.io` or `shields.io` with `color=000000`).

## Architecture & Workflows
- **Contribution Graph:** Powered by `abozanona/pacman-contribution-graph` (Bomberman mode) via `.github/workflows/generate-bomberman.yml`. SVGs are pushed to the `output` branch. Since the action's native output contains colors, it is forced to monochrome using a `sed` CSS filter injection (`grayscale(100%)`) inside the workflow before pushing.
- **Static Assets:** Custom SVGs (headers, footers, markdown heading replacements) live in `assets/`. They use raw SVG and CSS animations for glitches/CRT scanlines.
- **Editing:** Edit `README.md` and `assets/*.svg` directly.

## Agent skills

### Issue tracker
Isu di-track via GitHub Issues (`gh` CLI). See `docs/agents/issue-tracker.md`.

### Triage labels
Menggunakan label standar (`needs-triage`, `needs-info`, dll). See `docs/agents/triage-labels.md`.

### Domain docs
Single-context (satu GLOSSARY.md). See `docs/agents/domain.md`.