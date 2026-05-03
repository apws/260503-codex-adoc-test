# AGENTS.md — AsciiDoc page/sheet documentation project

This repository uses AsciiDoc as the source format for compact technical guides,
cheatsheets, and page-like documentation.

## Source of truth

- Keep `.adoc` files as the source of truth.
- Ebook sources live under `ebook/<ebook-name>/`.
- Current ebook root document is `ebook/cs-adoc-features/index.adoc`.
- Chapters/pages live under each ebook's `chapters/` folder.
- Use `include::` to compose larger documents.
- Do not convert AsciiDoc to Markdown unless explicitly asked.

## Preferred renderer/runtime

- Prefer Deno 2.
- Prefer Asciidoctor.js via Deno `npm:` imports.
- Do not create `package.json` or `node_modules/` unless the user explicitly
  approves.
- Deno config should keep `nodeModulesDir` as `none` unless a package truly
  requires local Node modules.

## Styling

- Use each ebook's `css/mixworx-golo.css` as the personal/base theme when
  present.
- Use each ebook's `css/mixworx-adoc-demo.css` for additive project-specific
  page, heading, panel, note, and print styles.
- Preferred style: compact technical guide, inverted dark heading bars, high
  visual section separation, strong h1/h2/h3 hierarchy.

## Outputs

- Generated outputs go into `dist/<ebook-name>/`.
- Do not treat generated HTML/PDF/images as source.
- Do not commit `dist/` unless the user explicitly asks.

## Before doing work

Before installing dependencies, changing renderer, or generating many files,
explain:

1. renderer/runtime used
2. source files to be changed
3. generated outputs expected
4. whether `node_modules/` will be created
5. exact command to regenerate output

Then wait for confirmation.

## Common tasks

- Render default ebook: `deno task render`
- Render a specific ebook: `deno task render <ebook-name>`
- Watch/render default ebook: `deno task watch`
- Clean output: `deno task clean`

## Documentation pattern

For each demonstrated feature page:

1. Show the rendered feature.
2. Show the AsciiDoc source in a `[source,asciidoc]` block.
3. Keep one concept per page where practical.
4. Use `<<<` for explicit page breaks.
