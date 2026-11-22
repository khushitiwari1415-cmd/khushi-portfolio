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

Hero v3 (user-chosen "sketchbook spread"; v2 "designer's canvas" with gradient blobs, dot grid, glass cards and Figma cursor was rejected as AI-looking): an open spiral sketchbook on the desk. Left page: graphite-textured Instrument Serif name, pencil scribble underline, handwritten "product designer" note, typed intro strip taped in, hand-circled "More about me". Right page: procedurally hand-drawn (seeded, wobbly) wireframe that sketches itself, the two approved jokes as dueling sticky notes on it, headphones doodle ("usually with music on", from the verified About line), and a pencil visitors can pick up to draw (in-memory only). Avoid generic AI-portfolio tropes: gradient blobs, dot grids, glassmorphism, floating UI cards. Never invent personal facts for doodles. Lives in `src/Hero.jsx` + `src/hero.css`.

Keep only hero and selected case studies. Use the supplied oversized editorial reference, pastel cream/lavender/peach palette, restrained motion, and verified Notion content. Never invent project results.

Case studies: follow the clean Consulting Services reference: one frosted central panel, project summary left, four case-related text tiles in a 2x2 grid right, and floating label/counter with arrow controls. Keep the hero unchanged during this iteration.

Background/motion refinement: use full photographic backgrounds behind the glass. Match the supplied video with a pinned foreground panel and navigation, vertically sliding background scenes, and a brief text change at the scene midpoint. Keep native scrolling and reduced-motion support. Generated photos are decorative, never evidence of project teams or results.

Latest refinement: place the case panel near the bottom with navigation beneath, use lighter/more transparent glass, and remove in-panel Next/Previous project CTAs. Retain only Read case study inside the panel and arrow navigation below. Import background images as bundled source assets to ensure the build includes their validated paths.

Place the design approach section after the case studies. Keep its existing anchor working for the About page link.

Footer scope: build Letters after sunset, an original pastel pixel-art lakeside scene with a clickable postbox. User chose private letters to khushitiwari1415@gmail.com via an explicit email-app handoff. Include write, stamp choice, preview/edit, seal/envelope flight, and final handoff with copy/download fallbacks. Never claim an email was sent or delivered. Draft stays in React memory only. Preserve reduced motion, native dialog keyboard behavior, and all previous sections.

Hero refinement reference: Jackie Hu’s portfolio (https://jackiehu.design) for tactile, interactive desk objects and a personal tone. Keep Khushi’s original sketchbook, use restrained responsive motion, and let visitors switch the sketch between a rough draft and a revision. Preserve the existing sketch pencil and approved notes.

Latest hero and navbar direction supersedes the open sketchbook. Start with a closed plum hardcover carrying Khushi’s name and Product Designer title. Open it on native scroll or explicit activation to reveal an introduction and linked case-study index. Keep the layout minimal, motion subtle, and controls tactile. Use a temporary Calendly URL and the confirmed LinkedIn profile. Show Dribbble with a temporary destination until the exact profile URL is supplied. Scope this iteration to the hero and navbar. References: Jackie Hu, Julius Gehrig, and Jeffrey Hakim.

Homepage hero direction now supersedes the closed-book concept. Use a pannable warm-paper desk canvas with a faint dot grid, scattered draggable artifacts, a large off-center name, four draggable project frames, and a visitor cursor. Project frames link to `/case-1` through `/case-4`. Use Instrument Serif and Geist, with warm paper `#F4F1EA`, soft black `#1C1B19`, muted `#8A857C`, tomato `#FF4F2B`, and sticky-note yellow `#FFE68A`. Keep animation interaction-driven. Temporary photos and bracketed copy are explicitly allowed until the user supplies final personal assets.

The first hardcover pass felt too basic. Develop a more art-directed editorial composition with an illustrated cloth cover, printed details, paper textures, and a ribbon. Include a quiet page-turn sound on explicit opening and a toggle that enables sound for scroll-driven opening.

Desk hero refinement: keep it clean and uncluttered, not a Canva-style collage. Nothing overlaps the name and bio. Every object is interactive (spring drag with lift/tilt, flip sticky, playable music player, file-name versions, photo outtake swap), with Tidy up and double-click to recenter. Only verified case studies get project frames (`/case-1` → Organisation, `/case-2` → Intent, aliased in `src/main.jsx`), with real UI screens as covers; slots 03/04 stay dashed bracketed placeholders until real projects are supplied. Keep the Letters after sunset footer.

Selected work (`src/SelectedWork.jsx`, id `#work`, header "Work" link) sits between the desk hero and "What I bring to your team" (`#behind-the-pixels`, linked from About). User rejected the plain editorial version as uncreative and disconnected: it is now a Figma-style board on the hero's same dotted paper. One Figma section with a name tab; each verified case study is a named frame (`# 01 — Title / Screen`) with hover selection handles and W×H badge, a prototype flow of real case-study screens joined by noodles (click to swap the main frame), a comment pin holding a verified quote from the case study, facts on a sticky note, Khushi's cursor, and a "You" multiplayer tag that follows the visitor's pointer. Slots 03–04 are empty "Untitled" frames. Project copy is shared with the hero via `src/work.js`.

Homepage navbar (`DeskHeader` in `src/SiteHeader.jsx`, styles in `src/navigation.css`) matches the desk and work board as a sticky Figma-style top bar on warm paper: file-style brand ("Khushi Tiwari / product-designer.fig"), nav as a segmented tab group (Work lights up while `#work` is on screen), multiplayer avatars (K follows Khushi's cursor on the board with Figma's follow outline; Y is the visitor), and a tomato "Say hello" share-style button to `#letters`. Inner pages keep the plum/lavender header.

Homepage footer (`<LetterFooter desk />`, `.letter-desk` styles at the end of `src/letter-footer.css`) joins the desk/board system: dotted warm paper, Figma section tab "Letters after sunset", the pixel-art scene as a named frame with hover selection handles, a "psst — the postbox actually works." sticky, ink/tomato buttons, and matching letter dialogs (stamp moods keep their colours). Case-study pages keep the original plum footer. The letter flow, postbox, Join me companions, and email handoff are unchanged.

Homepage loader (`src/Loader.jsx`, `src/loader.css`): Figma-style file opening on dotted paper. A file header ("Drafts / product-designer.fig"), Khushi's cursor drags out a "# Home" frame with live W×H badge and handles, the name types into it, and a tomato progress bar with casual status lines tracks real font and hero-image loading (min ~1.5s, max 5s). It then zooms into the frame and fades. Shows once per tab session (sessionStorage), Skip button and Esc/Enter skip it, reduced motion shortens it, and the hero cursor waits for it via `Hero ready`.
