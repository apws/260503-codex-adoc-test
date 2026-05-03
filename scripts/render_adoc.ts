import AsciidoctorFactory from "asciidoctor";
import { copy, ensureDir, exists } from "@std/fs";
import { dirname, fromFileUrl, join, toFileUrl } from "@std/path";

const scriptDir = dirname(fromFileUrl(import.meta.url));
const rootDir = dirname(scriptDir);
const inputRel = Deno.args[0] ?? "index.adoc";
const inputPath = join(rootDir, inputRel);
const distDir = join(rootDir, "dist");
const outputPath = join(distDir, "index.html");
const pdfOutputPath = join(
  distDir,
  "AsciiDoc Feature Demo for Compact Pages.pdf",
);

function fail(message: string): never {
  console.error(`ERROR: ${message}`);
  Deno.exit(1);
}

async function findBrowser(): Promise<string | undefined> {
  const envCandidates = [
    Deno.env.get("CHROME_PATH"),
    Deno.env.get("CHROME_BIN"),
  ];
  const platformCandidates = Deno.build.os === "windows"
    ? [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    ]
    : Deno.build.os === "darwin"
    ? [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
    ]
    : [
      "/usr/bin/google-chrome",
      "/usr/bin/google-chrome-stable",
      "/usr/bin/chromium",
      "/usr/bin/chromium-browser",
      "/usr/bin/microsoft-edge",
    ];

  for (const candidate of [...envCandidates, ...platformCandidates]) {
    if (candidate && await exists(candidate)) {
      return candidate;
    }
  }

  return undefined;
}

async function printPdf(): Promise<void> {
  const browserPath = await findBrowser();
  if (!browserPath) {
    fail(
      "Chrome/Edge executable not found. Set CHROME_PATH or CHROME_BIN to enable PDF export.",
    );
  }

  console.log(`- pdf browser: ${browserPath}`);
  console.log(`- pdf output: ${pdfOutputPath}`);

  const command = new Deno.Command(browserPath, {
    args: [
      "--headless",
      "--disable-gpu",
      "--no-pdf-header-footer",
      `--print-to-pdf=${pdfOutputPath}`,
      toFileUrl(outputPath).href,
    ],
    stdout: "piped",
    stderr: "piped",
  });
  const result = await command.output();

  if (result.code !== 0) {
    const stderr = new TextDecoder().decode(result.stderr).trim();
    fail(`Chrome PDF export failed.${stderr ? `\n${stderr}` : ""}`);
  }
}

if (!(await exists(inputPath))) {
  fail(`Input file not found: ${inputPath}`);
}

await ensureDir(distDir);

const asciidoctor = (AsciidoctorFactory as unknown as () => {
  convertFile: (inputPath: string, options: Record<string, unknown>) => void;
})();

console.log("AsciiDoc render pipeline");
console.log(`- runtime: Deno ${Deno.version.deno}`);
console.log("- renderer: Asciidoctor.js via npm:asciidoctor");
console.log("- node_modules: disabled by deno.json nodeModulesDir=none");
console.log(`- input: ${inputPath}`);
console.log(`- output: ${outputPath}`);

asciidoctor.convertFile(inputPath, {
  safe: "safe",
  backend: "html5",
  base_dir: rootDir,
  to_file: outputPath,
  mkdirs: true,
  attributes: {
    "showtitle": "",
    "toc": "left",
    "toclevels": "3",
    "sectnums": "",
    "icons": "font",
    "experimental": "",
    "source-highlighter": "highlight.js",
    "highlightjs-languages":
      "asciidoc,css,javascript,typescript,json,bash,mermaid,xml,yaml,toml",
    "stylesheet": "css/mixworx-adoc-demo.css",
    "linkcss": "",
    "imagesdir": "assets",
    "stem": "latexmath",
    "xrefstyle": "short",
  },
});

// LinkCSS means the generated HTML points to css/... and assets/...
// Copy those folders into dist so dist/index.html is portable.
for (const folder of ["css", "assets"]) {
  const src = join(rootDir, folder);
  const dst = join(distDir, folder);
  if (await exists(src)) {
    await copy(src, dst, { overwrite: true });
    console.log(`- copied: ${folder}/ -> dist/${folder}/`);
  }
}

await printPdf();

console.log("Done.");
console.log(`Open: ${outputPath}`);
console.log(`PDF: ${pdfOutputPath}`);
