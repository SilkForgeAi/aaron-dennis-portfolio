import type { ReactNode } from "react";

// All copy on the page lives here. Accuracy rule: nothing below may be invented —
// no employers, degrees, customers, metrics or benchmark numbers. Rain stays private.

export const GITHUB_PROFILE = "https://github.com/SilkForgeAi";
export const EMAIL = "Aaron@vexaai.app";

export type ProjectLink =
  | { kind: "repo"; href: string; label: string; note?: string }
  | { kind: "private"; note: string };

export type Project = {
  id: string;
  tag: string;
  name: string;
  subtitle?: string;
  stack: string;
  link: ProjectLink;
  problem: ReactNode;
  built: ReactNode;
  matters: ReactNode;
  /** An honest limit on what the project claims, shown under "Why it matters". */
  caveat?: string;
  lead?: boolean;
};

export const projects: Project[] = [
  {
    id: "grid-ai",
    tag: "01 · Desktop app · Open source",
    name: "Grid AI",
    stack: "Electron · Python · built on openhands-sdk",
    link: {
      kind: "repo",
      href: "https://github.com/SilkForgeAi/grid-ai",
      label: "SilkForgeAi/grid-ai",
      note: "Prerelease: the public repo is a source preview.",
    },
    lead: true,
    problem: (
      <p>
        Coding agents move fast, and it&rsquo;s hard to see what they changed or to take changes
        back.
      </p>
    ),
    built: (
      <>
        <p>
          A desktop workspace that combines code editing (Monaco), agent conversations, terminal
          access and change review. My work covers:
        </p>
        <ul>
          <li>Model and provider integrations.</li>
          <li>
            Approval workflows with risk-tiered autonomy: GREEN runs, YELLOW asks, RED always asks,
            with deterministic rules for things like <code>rm -rf</code>, <code>git push</code>,
            deploys and secrets.
          </li>
          <li>
            Checkpoints and undo in a private shadow git repo that never touches the user&rsquo;s
            own history.
          </li>
          <li>
            Recovery: regression revert restores the last good checkpoint when tests get worse.
          </li>
        </ul>
        <p>A task counts as done only when the project&rsquo;s own check passes.</p>
      </>
    ),
    matters: (
      <p>
        It gives users a usable workspace for directing agents, inspecting their work and keeping
        control over changes.
      </p>
    ),
  },
  {
    id: "adom",
    tag: "02 · Agent security · Open source",
    name: "ADOM",
    subtitle: "AI agent security",
    stack: "Python · Docker replay · policy enforcement",
    link: {
      kind: "repo",
      href: "https://github.com/SilkForgeAi/adom-agent-security",
      label: "SilkForgeAi/adom-agent-security",
    },
    problem: (
      <p>
        An agent&rsquo;s proposed action should not automatically become permission to execute it.
      </p>
    ),
    built: (
      <>
        <p>A model-independent enforcement boundary outside the agent. It includes:</p>
        <ul>
          <li>A single mediated gateway for tool calls.</li>
          <li>A deny-unknown action policy.</li>
          <li>Egress and data-flow screening.</li>
          <li>Budgets on actions, destructive effects, spend and failures (blast radius).</li>
          <li>Circuit breakers.</li>
          <li>
            Decision receipts with service-side effect records that an independent verifier can
            check.
          </li>
          <li>Deterministic and containerized incident replays.</li>
        </ul>
      </>
    ),
    matters: (
      <p>
        Consequential actions are controlled and auditable even if the model is wrong or
        compromised.
      </p>
    ),
    caveat:
      "It is a bounded reference implementation: it does not claim universal protection or guaranteed containment.",
  },
  {
    id: "rain",
    tag: "03 · Research · Private",
    name: "Rain",
    subtitle: "Scientific reasoning and verification",
    stack: "Python · private research project",
    link: { kind: "private", note: "Private repository · available to discuss" },
    problem: <p>A fluent AI answer isn&rsquo;t evidence that it&rsquo;s right.</p>,
    built: (
      <p>
        A research system that separates AI-generated proposals from computational checks and
        supporting evidence, exploring reproducible workflows, symbolic and numerical verification,
        and uncertainty tracking.
      </p>
    ),
    matters: <p>It makes it easier to inspect why a result should be trusted.</p>,
  },
];

export const steps: { title: string; body: string }[] = [
  {
    title: "Understand the problem",
    body: "I find out who runs into the problem, what they are trying to get done and what working would actually look like for them.",
  },
  {
    title: "Build",
    body: "I build the smallest version that does the real job end to end, in the environment it has to run in.",
  },
  {
    title: "Test",
    body: "I run it against the project's own checks and the cases most likely to break it, not just the happy path.",
  },
  {
    title: "Inspect failures",
    body: "When something fails, I read the logs, reproduce it and find the cause before I change any code.",
  },
  {
    title: "Iterate",
    body: "I fix the cause, rerun the checks and keep the change only if the result is better than before.",
  },
];
