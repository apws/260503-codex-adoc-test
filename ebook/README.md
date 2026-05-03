# Ebooks

Each ebook lives in its own folder:

```text
ebook/<ebook-name>/
├── index.adoc
├── chapters/
├── includes/
├── css/
└── assets/
```

Render the default ebook:

```powershell
deno task render
```

Render a specific ebook:

```powershell
deno task render <ebook-name>
```

Outputs are written to:

```text
dist/<ebook-name>/
```

The current ebook is `cs-adoc-features`. A later Codex-focused ebook can use a
sibling folder such as `ebook/codex-features/`.
