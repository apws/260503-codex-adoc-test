# PDF export notes

`deno task render` now renders both:

1. `dist/index.html`
2. `dist/AsciiDoc Feature Demo for Compact Pages.pdf`

PDF export uses installed Chrome / Edge in headless mode, so it keeps the
browser CSS path without adding Playwright, Puppeteer, Ruby, or `node_modules/`.

If Chrome / Edge is not installed in a standard location, set `CHROME_PATH` or
`CHROME_BIN` to the browser executable.
