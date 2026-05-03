import { exists } from "@std/fs";
import { dirname, fromFileUrl, join } from "@std/path";

const rootDir = dirname(dirname(fromFileUrl(import.meta.url)));
const distDir = join(rootDir, "dist");

if (await exists(distDir)) {
  await Deno.remove(distDir, { recursive: true });
  console.log(`Removed ${distDir}`);
} else {
  console.log("dist/ does not exist; nothing to clean.");
}
