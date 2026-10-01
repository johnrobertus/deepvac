// @vitest-environment node
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const LOCALES = path.resolve(__dirname, "../i18n/locales");

/** Every key path; arrays contribute their length as `path[]#n`. */
function shape(value: unknown, prefix = "", out: string[] = []): string[] {
  if (Array.isArray(value)) {
    out.push(`${prefix}[]#${value.length}`);
    value.forEach((v, i) => shape(v, `${prefix}[${i}]`, out));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) shape(v, prefix ? `${prefix}.${k}` : k, out);
  } else {
    out.push(prefix);
  }
  return out;
}

const files = fs.readdirSync(path.join(LOCALES, "en")).filter((f) => f.endsWith(".json"));

describe("i18n parity EN/DE", () => {
  it.each(files)("%s has a DE file with the same key paths and array lengths", (file) => {
    const dePath = path.join(LOCALES, "de", file);
    expect(fs.existsSync(dePath), `missing de/${file}`).toBe(true);
    const en = shape(JSON.parse(fs.readFileSync(path.join(LOCALES, "en", file), "utf8"))).sort();
    const de = shape(JSON.parse(fs.readFileSync(dePath, "utf8"))).sort();
    const deSet = new Set(de);
    const enSet = new Set(en);
    expect({ missingInDe: en.filter((k) => !deSet.has(k)), extraInDe: de.filter((k) => !enSet.has(k)) }).toEqual({ missingInDe: [], extraInDe: [] });
  });
});
