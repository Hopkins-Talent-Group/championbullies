@import "tailwindcss";

:root {
  --paper: #ffffff;
  --ink: #171717;
  --body: #4a4a4a;
  --muted: #7a7a7a;
  --accent: #d80027;
  --line: #e2e2e2;
  --line-soft: #efefef;
  --ease: cubic-bezier(.25, .1, .25, 1);
  --ease-out: cubic-bezier(.22, 1, .36, 1);
  --pad: clamp(20px, 4.5vw, 72px);
  --nav-h: 64px;
}

@theme inline {
  --color-paper: var(--paper);
  --color-ink: var(--ink);
  --color-body: var(--body);
  --color-muted: var(--muted);
  --color-accent: var(--accent);
------ snippet (first lines) ------