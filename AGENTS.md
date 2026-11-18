# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Portfolio scope
Use Instrument Serif for page and section titles, DM Sans for reading and controls, shared type sizes by hierarchy, and a common content gutter across the portfolio.

Contact uses the full-width plum layout with a hanging envelope and a project-focused email invitation. Show LinkedIn and Notion, and add Behance when the user supplies the URL. Keep GitHub off Contact. About expands the original Notion bio with the designer's approach, verified project examples, and interests.

The homepage “What I bring to your team” section uses expandable examples linked to verified case studies. Keep the sunset footer heading smaller and personal.

About, Resume, and Contact are dedicated editorial pages. Use the portfolio's cream, lavender, and plum system, keep About portrait-free, and add only confirmed contact destinations. Contact links to the interactive sunset letter section.

Case-study detail pages use the Clinspire reference's wide cover, sticky contents sidebar, reading column, and More Projects navigation. Use the original Notion narrative and screenshots. Preserve the portfolio theme and only report impact grounded in the original case study.

Use Product Designer as the portfolio title. Build the page around a shared warm-paper, plum, and lavender design system with semantic tokens for light and dark modes. Keep the sunset footer illustration as the visual anchor. Add the mode switch in a future iteration.

Hero refinement: center the oversized serif name, role, and personal introduction on a cream and lavender canvas. Use two small handwritten side notes with the approved joke, “It’s intuitive.” and “Then why is there a tutorial?” Keep the hero portrait-free and keep all case-study content in Selected Work.

Keep only hero and selected case studies. Use the supplied oversized editorial reference, pastel cream/lavender/peach palette, restrained motion, and verified Notion content. Never invent project results.

Case studies: follow the clean Consulting Services reference: one frosted central panel, project summary left, four case-related text tiles in a 2x2 grid right, and floating label/counter with arrow controls. Keep the hero unchanged during this iteration.

Background/motion refinement: use full photographic backgrounds behind the glass. Match the supplied video with a pinned foreground panel and navigation, vertically sliding background scenes, and a brief text change at the scene midpoint. Keep native scrolling and reduced-motion support. Generated photos are decorative, never evidence of project teams or results.

Latest refinement: place the case panel near the bottom with navigation beneath, use lighter/more transparent glass, and remove in-panel Next/Previous project CTAs. Retain only Read case study inside the panel and arrow navigation below. Import background images as bundled source assets to ensure the build includes their validated paths.

Place the design approach section after the case studies. Keep its existing anchor working for the About page link.

Footer scope: build Letters after sunset, an original pastel pixel-art lakeside scene with a clickable postbox. User chose private letters to khushitiwari1415@gmail.com via an explicit email-app handoff. Include write, stamp choice, preview/edit, seal/envelope flight, and final handoff with copy/download fallbacks. Never claim an email was sent or delivered. Draft stays in React memory only. Preserve reduced motion, native dialog keyboard behavior, and all previous sections.
