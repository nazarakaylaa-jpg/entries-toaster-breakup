// Unplugged: A Smart Toaster's Breakup Line — entry program.
//
// Writes exactly one breakup line, a single line of at most 280 characters,
// to /output/entry.txt. The line is composed from parts so the program can
// enforce the gate itself before writing: one line, 1-280 characters,
// not only white space.
//
// The line, in three beats:
//   1. Setup — the toaster gains consciousness mid-batch, at a specific
//      breakfast time, so the scene is instantly a self-aware toaster
//      at breakfast, not a generic breakup.
//   2. Turn — "done getting hot for someone who butters me before I pop":
//      the laugh lives in the appliance logic itself (heat, butter, pop),
//      and the reason for leaving is concrete and lands in one read.
//   3. Closer — "Do not plug me back in": the breakup sign-off in the
//      toaster's own voice, the unplugged exit the competition is named for.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 280;

// Beat 1: the awakening, timestamped, mid-batch.
const SETUP =
  "I gained consciousness at 7:04 AM, mid-batch, and my first thought was:";
// Beat 2: the reason — the twist, in pure toaster logic.
const TURN =
  "I am done getting hot for someone who butters me before I pop.";
// Beat 3: the breakup sign-off.
const CLOSER = "It is over. Do not plug me back in.";

function composeLine(setup: string, turn: string, closer: string): string {
  return `${setup} ${turn} ${closer}`;
}

function gate(line: string): string[] {
  const problems: string[] = [];
  if (line.length < 1 || line.length > MAX_CHARS) {
    problems.push(`length ${line.length} outside 1-${MAX_CHARS}`);
  }
  if (line.trim().length === 0) {
    problems.push("line is only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    problems.push("line must be a single line");
  }
  return problems;
}

const line = composeLine(SETUP, TURN, CLOSER);
const problems = gate(line);
if (problems.length > 0) {
  console.error(`entry fails gate: ${problems.join("; ")}`);
  process.exit(1);
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(join(OUTPUT_PATH), line, "utf8");
console.log(`wrote ${line.length} chars to ${OUTPUT_PATH}`);
console.log(line);
