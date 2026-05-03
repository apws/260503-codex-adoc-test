# PDF export notes

Preferred first workflow:

1. `deno task render`
2. Open `dist/index.html` in Chrome / Edge.
3. Use Print → Save as PDF.

Why not automate PDF immediately?

- Chrome print is already reliable and visually close to your browser preview.
- Playwright/Puppeteer adds heavier dependencies and may create a larger toolchain.
- Asciidoctor PDF is powerful, but it is Ruby-based and uses a different theme system than browser CSS.

Later optional headless Chrome idea:

```bash
chrome --headless --disable-gpu --print-to-pdf=dist/index.pdf dist/index.html
```

Windows path to Chrome varies, so this is intentionally not wired as a default task.
