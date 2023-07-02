import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import { resolve } from "path";

const PRODUCTION = "production";

const buildingForProduction = process.argv[2] === PRODUCTION;

const entryPoint = resolve(__dirname, "..", "src", "main.ts");
const outFile = resolve(__dirname, "..", "main.js");

const context = await esbuild.context({
  entryPoints: [entryPoint],
  bundle: true,
  external: [
    "obsidian",
    "electron",
    "@codemirror/autocomplete",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/view",
    "@lezer/common",
    "@lezer/highlight",
    "@lezer/lr",
    ...builtins,
  ],
  format: "cjs",
  target: "es2018",
  logLevel: "info",
  sourcemap: buildingForProduction ? false : "inline",
  treeShaking: true,
  outfile: outFile,
});

if (buildingForProduction) {
  await context.rebuild();
  process.exit(0);
} else {
  await context.watch();
}
