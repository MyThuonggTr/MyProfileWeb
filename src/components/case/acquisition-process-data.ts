// The legal study's project sequence: ten steps (content.json case4.process items) grouped
// into three phases (case4.phases), each step pointing at its legal checks (case4.steps items).
import { pipes, rich, text, type Lang } from "../../lib/content";

type RawStep = { phase: number; title: string; work: string; output: string; who: string; legal: number[] };

/** A project step with its 1-based position in the whole sequence. */
export type ProcessStep = RawStep & { n: number };

/** A legal check point; steps refer to it by its 1-based position. */
export type LegalCheck = { title: string; review: string; risk: string; basis: string };

export type ProcessPhase = { n: number; name: string; steps: ProcessStep[] };

/** Phases with their steps, plus the legal checks; a step citing a missing check fails the build. */
export function acquisitionProcess(lang: Lang): { phases: ProcessPhase[]; checks: LegalCheck[] } {
  const checks = rich<LegalCheck>("case4", "steps", lang);
  const steps = rich<RawStep>("case4", "process", lang).map((s, i): ProcessStep => ({ ...s, n: i + 1 }));
  for (const s of steps) {
    for (const k of s.legal) if (!checks[k - 1]) throw new Error(`case4 step ${s.n} cites missing legal check ${k}`);
  }
  const phases = pipes(text("case4", "phases", lang)).map((name, i) => ({
    n: i + 1,
    name,
    steps: steps.filter((s) => s.phase === i + 1),
  }));
  return { phases, checks };
}

/** "01", "02", … */
export const pad2 = (n: number) => String(n).padStart(2, "0");
