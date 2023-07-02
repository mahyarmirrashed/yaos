import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const packageJsonPath = resolve(__dirname, "..", "package.json");
const manifestJsonPath = resolve(__dirname, "..", "manifest.json");
const versionsJsonPath = resolve(__dirname, "..", "versions.json");

const packageJson = JSON.parse(readFileSync(packageJsonPath));
let manifestJson = JSON.parse(readFileSync(manifestJsonPath));
let versionsJson = JSON.parse(readFileSync(versionsJsonPath));

const { version: newVersion } = packageJson;
const { minAppVersion } = manifestJson;

manifestJson.version = newVersion;
versionsJson[newVersion] = minAppVersion;

writeFileSync(manifestJsonPath, JSON.stringify(manifestJson, null, "  "));
writeFileSync(versionsJsonPath, JSON.stringify(versionsJson, null, "  "));
