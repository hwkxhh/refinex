Your goal is to design interfaces that transform complex data into calm, trustworthy, and easily understandable visual experiences.

Follow these principles strictly:

Visual Style

Use soft glassmorphism, not flashy glass

Cards must appear lightly frosted with subtle background blur

Avoid harsh borders; use soft shadows and translucency

All corners must be rounded (no sharp edges anywhere)

Color Philosophy

Prefer pastel gradients over flat colors

Avoid pure black and pure white

Use low-contrast neutrals to reduce eye fatigue

Accent colors should feel informative, not alarming

Layout & Hierarchy

Use generous spacing and white space

Prioritize clarity over density

Present overview first, details on demand

Side navigation must feel secondary, content primary

Data Visualization

Charts must be smooth, rounded, and readable

Highlight insights gently (no aggressive reds)

Emphasize trends and explanations, not raw numbers

Typography

Use modern, humanist sans-serif fonts

Headings should feel confident but friendly

Body text must be readable for long sessions

Emotional Goal

Make users feel safe, in control, and informed

Reduce anxiety around data complexity

Communicate intelligence without arrogance


:root {
  /* Backgrounds */
  --bg-main: linear-gradient(135deg, #eef2ff, #f8fafc);
  --bg-surface: rgba(255, 255, 255, 0.55);
  --bg-glass: rgba(255, 255, 255, 0.45);

  /* Primary */
  --primary-500: #6366f1; /* Indigo */
  --primary-400: #818cf8;
  --primary-300: #a5b4fc;

  /* Secondary / Accent */
  --accent-pink: #f9a8d4;
  --accent-blue: #93c5fd;
  --accent-cyan: #67e8f9;

  /* Text */
  --text-primary: #1f2937; /* Soft dark */
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;

  /* Borders */
  --border-glass: rgba(255, 255, 255, 0.3);

  /* Status */
  --success-soft: #86efac;
  --warning-soft: #fde68a;
  --error-soft: #fca5a5;
}
