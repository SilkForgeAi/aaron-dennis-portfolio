// Shared helpers for the dev-only verification scripts. They expect the static
// site to be served already (see .claude/skills/verify-app/SKILL.md) at $BASE_URL.
import { mkdirSync } from "node:fs";

export const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:4317";
export const EVIDENCE_DIR = process.env.EVIDENCE_DIR ?? "evidence";

export function ensureEvidenceDir() {
  mkdirSync(EVIDENCE_DIR, { recursive: true });
  return EVIDENCE_DIR;
}
