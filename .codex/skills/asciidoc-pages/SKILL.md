# AsciiDoc Pages Skill

Use this skill when the user asks for compact technical documentation, cheatsheets, page-like slides, manuals, or ebook-style guides based on AsciiDoc.

## Goal

Maintain a source-first AsciiDoc documentation system using:

- `.adoc` files as source of truth
- `include::` for chapter/page composition
- custom CSS for visual style
- Deno 2 + Asciidoctor.js for HTML rendering
- generated outputs under `dist/`

## Required behavior

Before changing files, report:

1. files you will edit
2. whether you will render
3. exact render command
4. whether `node_modules/` will be created

Avoid `node_modules/` by default. Prefer Deno `npm:` imports and `nodeModulesDir: "none"`.

## Page pattern

Each feature page should use:

```asciidoc
<<<

== NN Feature title

[.page-sheet]
****
Rendered explanation/example.
****

.Syntax
[source,asciidoc]
....
AsciiDoc source example here.
....
```

Use `....` as the delimiter when showing AsciiDoc examples that themselves contain `----` or `++++` blocks.

## Output

Render with:

```bash
deno task render
```

Then report:

- output path
- warnings/errors
- whether `dist/` was regenerated
- whether dependency folders were created
