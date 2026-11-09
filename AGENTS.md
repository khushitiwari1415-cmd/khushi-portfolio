# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Portfolio scope
Keep only hero and selected case studies. Use the supplied oversized editorial reference, pastel cream/lavender/peach palette, restrained motion, and verified Notion content. Never invent project results.

Case studies: follow the clean Consulting Services reference: one frosted central panel, project summary left, four case-related text tiles in a 2x2 grid right, and floating label/counter with arrow controls. Keep the hero unchanged during this iteration.

Background/motion refinement: use full photographic backgrounds behind the glass. Match the supplied video with a pinned foreground panel and navigation, vertically sliding background scenes, and a brief text change at the scene midpoint. Keep native scrolling and reduced-motion support. Generated photos are decorative, never evidence of project teams or results.

Latest refinement: place the case panel near the bottom with navigation beneath, use lighter/more transparent glass, and remove in-panel Next/Previous project CTAs. Retain only Read case study inside the panel and arrow navigation below. Import background images as bundled source assets to ensure the build includes their validated paths.

Scope expanded by user: add a section after case studies based on the second editorial-row video. Use Behind the pixels: clarity, collaboration, intent, curiosity, grounded in verified portfolio content. Rows have hover image previews and accessible expandable notes; do not invent dated blog posts or results.
