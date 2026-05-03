# 260503-codex-adoc-test scaffold

This folder is a small AsciiDoc + Asciidoctor.js + Deno 2 documentation lab.

It is designed for compact page/sheet documents: cheatsheets, quick guides,
landscape/portrait pages, and later Codex-assisted documentation.

## What this proves

- `.adoc` is the source of truth.
- Each ebook can carry its own `css/mixworx-golo.css` personal/base theme.
- Each ebook can carry its own `css/mixworx-adoc-demo.css` additive page styles.
- Deno uses `npm:asciidoctor` from the global Deno cache, with
  `nodeModulesDir: "none"`.
- Generated output goes to `dist/<ebook-name>/`.
- No `package.json` and no `node_modules/` are required for the intended path.

## Quick start

```bash
deno task render
```

The default ebook is `cs-adoc-features`. To render another ebook under
`ebook/<name>/`:

```bash
deno task render <ebook-name>
```

Then open:

```text
dist/cs-adoc-features/index.html
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

You can also open an ebook root, such as `ebook/cs-adoc-features/index.adoc`,
directly through the Chrome Asciidoctor.js extension. The source references:

```adoc
:stylesheet: css/mixworx-adoc-demo.css
:linkcss:
```

`mixworx-adoc-demo.css` imports `mixworx-golo.css`, so your existing style file
can stay as-is.

## Important files

```text
ebook/cs-adoc-features/index.adoc          current ebook root document
ebook/cs-adoc-features/chapters/*.adoc     one feature/page per file
ebook/cs-adoc-features/css/*.css           ebook stylesheets
ebook/cs-adoc-features/assets/             ebook image/diagram/media assets
scripts/render_adoc.ts                     Deno render script using Asciidoctor.js
scripts/clean_dist.ts                      deletes dist/
AGENTS.md                                  Codex project instructions
.codex/skills/asciidoc-pages/              draft Codex skill/instruction package
prompts/                                   small prompts for Codex/app/IDE use
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
2. Open `dist/cs-adoc-features/index.html` in Chrome, or use the generated PDF
   next to it.

PDF export is integrated through installed Chrome / Edge in headless mode. It
does not add Playwright, Puppeteer, Ruby, or `node_modules/`.
