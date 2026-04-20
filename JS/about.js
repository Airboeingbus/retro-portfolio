// Interactive Story Engine - Authentic Narrative
const storyData = {
  start: {
    text: `You started with a simple observation:

The world runs on systems. Most people see what systems do.
You became curious about how they actually work.

Not as theory. As practice. As lived edges and constraints.

How did this curiosity first take shape?`,
    ascii: `
    ┌─┬─┬─┐
    ├─┼─┼─┤
    ├─┼─┼─┤
    └─┴─┴─┘
    `,
    choices: [
      { text: "Understanding how things work", next: "understanding" },
      { text: "Building things from scratch", next: "building" },
      { text: "Making things work better", next: "optimizing" }
    ]
  },

  understanding: {
    text: `You spent time looking inward at systems.

Not surface-level. The hidden logic.
The assumptions that matter. The ones that break.

You learned that understanding comes in layers.
A classifier's decision boundary. A sensor's noise floor.
A pipeline's failure points.

You became obsessed with evaluation.
Not just "does it work" — but "how does it fail?
What assumptions break? When?"

Sepsis prediction taught you this. You didn't just
build a model. You studied the people it would affect,
the thresholds where decisions change lives,
what your tool doesn't know.

This shaped how you think about everything now.`,
    ascii: `
    ↓ ━ ↓ ━ ↓
    ├─┼─┼─┤
    ↑ ━ ↑ ━ ↑
    `,
    choices: [
      { text: "Going deeper", next: "research_depth" },
      { text: "Understanding alone wasn't enough", next: "systems_analysis" }
    ]
  },

  building: {
    text: `You realized early: to truly understand something,
you have to build it yourself.

Not follow someone else's blueprint.
Build it from scratch so every choice is deliberate.

You wanted control over the structure, the tradeoffs,
why each piece mattered and how it connected.

Whether it was a flight recommender thinking through
real airline routes and constraints, or hardware
actually listening to the physical world — you needed
to know why each decision was made.

Building became your language for understanding.`,
    ascii: `
    ┌─┐
    ├─┤
    ├─┤
    └─┘
    ↓
    ┌─┐
    ├─┤
    └─┘
    `,
    choices: [
      { text: "This led to hardware", next: "embedded_reality" },
      { text: "But incomplete without structure", next: "systems_integration" }
    ]
  },

  optimizing: {
    text: `The world has constraints. Real ones.
Real people. Real physics. Real money.

You became fascinated by problems where optimization
actually matters. Where a small improvement scales
across thousands. Where efficiency is respect
for the system you're working with.

A better HVAC schedule saves energy.
A more efficient algorithm runs on cheaper hardware.
A more precise model catches what others miss early.

This wasn't abstract. It was about impact.`,
    ascii: `
    ∧ ├─ ∧
    │ │  │
    ∨ ├─ ∨
    `,
    choices: [
      { text: "Understanding constraints", next: "constraint_reality" },
      { text: "Connecting different layers", next: "systems_integration" }
    ]
  },

  research_depth: {
    text: `You dove into problems that demanded real analysis.

Sepsis prediction. You didn't just train a model.
You studied threshold optimization. Class imbalance.
What happens when a patient's case doesn't fit the pattern.
When your tool is confident but wrong.

You learned that depth means sitting with uncertainty.
Understanding what your tools don't know.
Being honest about the limits.

This is where actual expertise lives — not in memorizing
answers, but in asking better questions about what you're
measuring and why it matters.`,
    ascii: `
    ░ ░ ░ ░ ░
    ░ ▓ ▓ ░ ░
    ░ ▓ ░ ▓ ░
    ░ ░ ░ ░ ░
    `,
    choices: [
      { text: "Continue", next: "convergence_depth" }
    ]
  },

  systems_analysis: {
    text: `Understanding alone doesn't scale. You need structure.

You started thinking in pipelines.
Data → Validation → Decision → Feedback.

DormWise taught you this. It wasn't just an optimization
algorithm. It was understanding how sensors feed into
decisions, how those decisions ripple into the world,
how you measure whether it actually helped.

Systems thinking became your framework. Not a philosophy,
but a practical way of decomposing complex problems.

It made you better at seeing connections.`,
    ascii: `
    ① ⟶ ② ⟶ ③
    ↓    ↓    ↓
    ④ ⟶ ⑤ ⟶ ⑥
    `,
    choices: [
      { text: "Continue", next: "convergence_systems" }
    ]
  },

  embedded_reality: {
    text: `You wanted to touch the physical world.

An ESP32 listening to real sensors. A device making
decisions that affect actual infrastructure.

This removed the luxury of abstraction.

A sensor has noise. A circuit draws power. The real world
doesn't care about elegant theory.

SmartZone-R taught you this. You can't ignore what's
actually available, what actually works, which tradeoffs
are fundamental versus which are just constraints
you inherited from someone else's choices.

Respect the constraints. Work within them.
That's where actual solutions live.`,
    ascii: `
    ⚡⚙ ⟶ 🔲
    `,
    choices: [
      { text: "Continue", next: "convergence_build" }
    ]
  },

  constraint_reality: {
    text: `Optimization is honesty.

You can't ignore what costs money, power, or space.
You can't pretend human factors don't matter.

A flight recommender has to account for real airline
routes, price constraints, time windows. Not idealized
networks. Real ones.

Your HVAC work meant understanding both the math and
the fact that people leave windows open. Both matter.

This aligned you. You stopped building in a vacuum.
You started asking what problem actually needs solving,
for whom, under which constraints.

That question changed everything.`,
    ascii: `
    ◇ ─ ◇
    │   │
    ◇ ─ ◇
    `,
    choices: [
      { text: "Continue", next: "convergence_optimize" }
    ]
  },

  systems_integration: {
    text: `You realized something:

These aren't separate paths. They're the same path
seen from different angles.

Understanding feeds building. Building demands
knowing your constraints. Constraints reveal what's
actually worth optimizing.

You became someone who moves between layers.
From raw data to hardware to design choices to
the people affected by those choices.

The projects started to make sense not as
individual achievements, but as evidence
of how you think.`,
    ascii: `
    ◆ ■ ◆
    ■ ● ■
    ◆ ■ ◆
    `,
    choices: [
      { text: "Continue", next: "convergence_unified" }
    ]
  },

  convergence_depth: {
    text: `Going deeper into one problem teaches you something:

The deeper you understand, the more patterns
you recognize in other domains.

The threshold optimization work from sepsis applies
to flight routing. The validation rigor applies to
hardware. The uncertainty management appears everywhere.

Depth isn't isolation. It's learning a way of thinking
that transfers.`,
    ascii: `
    ◎ ⟲ ◎
    ⟲   ⟲
    ◎ ⟲ ◎
    `,
    choices: [
      { text: "What does this mean?", next: "synthesis" }
    ]
  },

  convergence_systems: {
    text: `Understanding systems teaches you something:

Structure matters. But structure serves understanding.
Understanding serves solving real problems.

You become fluent in translation — between domains,
between layers of abstraction, between problems
and possible solutions.

The pipeline you designed for one system becomes
the thinking framework you use for the next.`,
    ascii: `
    ↻ ◎ ↻
    ↻   ↻
    ↻ ◎ ↻
    `,
    choices: [
      { text: "What does this mean?", next: "synthesis" }
    ]
  },

  convergence_build: {
    text: `Building things teaches you something practical:

You're not a purist. You're pragmatic.
Not because you lack ideals, but because
ideals without execution are just ideas.

Every project teaches what matters and what doesn't.
What's clever and what's clever without purpose.
What scales and what just works at small scale.

This grounds you. It keeps you honest.`,
    ascii: `
    ⟳ ◆ ⟳
    ⟳   ⟳
    ⟳ ◆ ⟳
    `,
    choices: [
      { text: "What does this mean?", next: "synthesis" }
    ]
  },

  convergence_optimize: {
    text: `Optimizing systems teaches you something:

Small improvements compound. Efficiency is respect
for the resources you're using.

But optimization without understanding is just
tuning knobs. Building without knowing your
constraints is wasting potential.

You became someone who sees connections across
the whole picture.`,
    ascii: `
    ↗ ◊ ↗
    ↗   ↗
    ↗ ◊ ↗
    `,
    choices: [
      { text: "What does this mean?", next: "synthesis" }
    ]
  },

  convergence_unified: {
    text: `This is where you stand:

Not specialized in one domain, but able to move
between them because the thinking is the same.

You started asking: how do I understand this?
Then: how do I build this well? Then: what are
the actual constraints and what actually matters?

Each question refines the others.

Your projects aren't portfolio pieces to display.
They're evidence of how you think.`,
    ascii: `
    · ◎ · ◎ ·
    · ◎ · ◎ ·
    · · · · ·
    `,
    choices: [
      { text: "What's the philosophy?", next: "synthesis" }
    ]
  },

  synthesis: {
    text: `You discovered something over time:

Deep work isn't about being the smartest
in one thing. It's about understanding the
entire ecosystem around that thing.

Your method, refined:

1. Understand the problem at its deepest level.
   What are people actually trying to achieve?
   Where can things break? What doesn't the
   obvious solution account for?

2. Build pragmatically within real constraints.
   Not perfect. Actually useful.

3. Optimize for what matters, leave what doesn't.
   Respect resources. Respect time. Respect people.

4. Let that understanding inform the next problem.

You care about problems that are real, solvable,
and produce actual impact when solved well.

Whether it's medical data, runway sensors, routing
algorithms, or hardware integration — the thinking
pattern is the same.

This is the actual story. Not "I built six projects."
But "I learned how to think across domains
and why that thinking actually works."

And it's still evolving with each new problem.

───────────

Philosophy:
Build understanding. Respect constraints.
Focus on problems that matter.

Press A to return to terminal.`,
    ascii: `
    ◆ ━ ━ ━ ◆
    ┃ ◊ · ◊ ┃
    ┃ · ◆ · ┃
    ┃ ◊ · ◊ ┃
    ◆ ━ ━ ━ ◆
    `,
    choices: []
  }
};

// Story State Management
let currentScene = "start";

document.addEventListener("DOMContentLoaded", () => {
  displayScene(currentScene);
});

function displayScene(sceneKey) {
  const scene = storyData[sceneKey];
  if (!scene) {
    console.error("Scene not found:", sceneKey);
    return;
  }

  currentScene = sceneKey;

  // Update story text
  const storyTextEl = document.getElementById("story-text");
  storyTextEl.textContent = scene.text;

  // Update ASCII art
  const asciiAreaEl = document.getElementById("ascii-area");
  asciiAreaEl.innerHTML = `<pre>${scene.ascii}</pre>`;

  // Generate choice buttons
  const choicesEl = document.getElementById("choices-container");
  choicesEl.innerHTML = "";

  if (scene.choices.length > 0) {
    scene.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.className = "choice-button";
      button.textContent = choice.text;
      button.onclick = () => displayScene(choice.next);
      choicesEl.appendChild(button);
    });
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "a") {
    sessionStorage.setItem("lastCommand", "");
    window.location.href = "../index.html";
  }
});

