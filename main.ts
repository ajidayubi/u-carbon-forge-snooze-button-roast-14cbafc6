import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// One line that roasts an alarm clock for ringing at 6 AM on a Saturday.
const LINE =
  "My alarm rings at 6 AM on a Saturday like rent is due — relax, the only appointment I have today is with the snooze button, and I'm already running late for it.";

// The entry must be a single line of 1-200 characters, nothing else.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be blank");
}

const here = dirname(fileURLToPath(import.meta.url));
const outDir = "/output";
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
writeFileSync(outFile, LINE, "utf8");

// Read it back and prove the file holds exactly the line, no trailing newline.
const back = readFileSync(outFile, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt does not match the entry");
}

console.log(LINE);
console.log(`characters: ${LINE.length}`);
console.log(`wrote ${outFile}`);
void here;
