# 260503-codex-adoc-test scaffold

This folder is a small AsciiDoc + Asciidoctor.js + Deno 2 documentation lab.

It is designed for compact page/sheet documents: cheatsheets, quick guides, landscape/portrait pages, and later Codex-assisted documentation.

## What this proves

- `.adoc` is the source of truth.
- `css/mixworx-golo.css` can remain your personal base theme.
- `css/mixworx-adoc-demo.css` imports that base theme and adds demo/page styles.
- Deno uses `npm:asciidoctor` from the global Deno cache, with `nodeModulesDir: "none"`.
- Generated output goes to `dist/`.
- No `package.json` and no `node_modules/` are required for the intended path.

## Quick start

```bash
deno task render
```

Then open:

```text
dist/index.html
```

For live-ish editing:

```bash
deno task watch
```

To clean generated output:

```bash
deno task clean
```

## Chrome Asciidoctor.js extension preview

You can also open `index.adoc` directly through the Chrome Asciidoctor.js extension. The source references:

```adoc
:stylesheet: css/mixworx-adoc-demo.css
:linkcss:
```

`mixworx-adoc-demo.css` imports `mixworx-golo.css`, so your existing style file can stay as-is.

## Important files

```text
index.adoc                         root document, includes chapters
chapters/*.adoc                    one feature/page per file
css/mixworx-adoc-demo.css          additive demo stylesheet
scripts/render_adoc.ts             Deno render script using Asciidoctor.js
scripts/clean_dist.ts              deletes dist/
AGENTS.md                          Codex project instructions
.codex/skills/asciidoc-pages/      draft Codex skill/instruction package
prompts/                           small prompts for Codex/app/IDE use
assets/diagrams/*.svg              embedded diagram assets
assets/excalidraw/*.excalidraw     editable diagram source example
```

## Git workflow suggestion

Local Git is enough; GitHub can come later.

```bash
git add .
git commit -m "Add AsciiDoc Deno toolchain scaffold"
```

`dist/`, `node_modules/`, and generated PDFs are ignored by default.

## PDF export

The calm path is still browser-based:

1. Render with `deno task render`.
2. Open `dist/index.html` in Chrome.
3. Print to PDF.

Later you can add a scripted Chrome/Playwright PDF export, but that would add heavier dependencies.
