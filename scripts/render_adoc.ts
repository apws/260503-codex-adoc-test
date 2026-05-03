import AsciidoctorFactory from "asciidoctor";
import { copy, ensureDir, exists } from "@std/fs";
import { dirname, fromFileUrl, join } from "@std/path";

const scriptDir = dirname(fromFileUrl(import.meta.url));
const rootDir = dirname(scriptDir);
const inputRel = Deno.args[0] ?? "index.adoc";
const inputPath = join(rootDir, inputRel);
const distDir = join(rootDir, "dist");
const outputPath = join(distDir, "index.html");

function fail(message: string): never {
  console.error(`ERROR: ${message}`);
  Deno.exit(1);
}

if (!(await exists(inputPath))) {
  fail(`Input file not found: ${inputPath}`);
}

await ensureDir(distDir);

const asciidoctor = AsciidoctorFactory();

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
    "highlightjs-languages": "asciidoc,css,javascript,typescript,json,bash,mermaid,xml,yaml,toml",
    "stylesheet": "css/mixworx-adoc-demo.css",
    "linkcss": "",
    "imagesdir": "assets",
    "stem": "latexmath",
    "xrefstyle": "short"
  }
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

console.log("Done.");
console.log(`Open: ${outputPath}`);
