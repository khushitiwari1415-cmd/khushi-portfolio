# Design QA

final result: passed

## Evidence and scope

Source visual truth: `.local/reference.png` (1517 × 696 pixels) and `.local/reference.mp4` (five-second source recording). Original references are available in the earlier conversation attachments; local copies are ignored by Git.
Implementation: `.local/hero-desktop.png`, `.local/mobile-work.png`; browser screenshots of both project states also inspected in-session.
Viewport: desktop 1517 × 696 CSS pixels; phone 390 × 844 CSS pixels. Desktop capture is 1517 × 696 pixels, density 1. Source screenshot and final desktop capture opened together in the same comparison tool response. No density resizing was required. State: top of hero, then first and second project panels. Mobile work capture is a transition state, supplemented by an inspected first-panel resting screenshot.

## Required surfaces

- Typography: oversized heavy Arial display name retains source hierarchy; DM Sans supplies readable UI/body typography with Arial fallback. Longer real name intentionally changes width. The final name and edition marker are separate from the introduction. Desktop name silhouette and right-hand intro were checked in the combined comparison.
- Spacing: outer margin and wide image start near source alignment. Desktop banner begins at approximately 415px versus reference 419px. Mobile reflows the introduction and project content. No horizontal page overflow observed at 390px. Lower controls have reserved bottom space.
- Color: intentional requested adaptation to cream #faf7f0, lavender #e3dcf2, peach #f2d5c3, and dark foreground #262329. Original source artwork remains unmodified, including orange project covers.
- Images: real downloaded Notion banner and project covers; all three images decoded successfully. Source screenshot portrait belongs to another designer and is intentionally replaced by Khushi's own portfolio banner. Mobile banner retains complete source text after crop correction.
- Copy: real name and verified Notion description. Organisation role, timeline, and team match source page. Second project describes design approach without inventing an outcome or metric. Case links point to original pages. No resume, contact, or extra-page affordances were fabricated.

## Comparison history

1. P1 desktop name overlapped introduction. Reduced display width from 18.4vw to 15vw; checked revised desktop capture, then adjusted vertical scale to recover the oversized source silhouette. Final combined reference/capture shows separate regions.
2. P2 mobile banner clipped baked-in source text. Changed mobile fit to contain with native 4:1 ratio. Reopened phone hero: complete banner visible.
3. P1 reverse sticky navigation did not reliably return or update active label. Added stable non-sticky anchors and scroll-position tracking. Verified Next selects 2/2 and Previous returns to 1/2 on desktop and phone.
4. P2 control bar appeared over introductory work heading. Hide it until the first project enters the visible region; verified phone hero/heading state.

## Interaction and runtime checks

- Hero work links navigate to selected work.
- Previous/next controls move in both directions; active project labels and boundary disabled states update.
- Native scrolling verified through panel transition on phone.
- Project anchor URLs and accessible labels checked against source URLs.
- Browser warning/error log: empty after final reload.
- Build succeeds; all four bundled serving/packaging tests pass.
- Reduced-motion stylesheet and navigation branch inspected; OS preference was not changed during browser tests.

## Accepted differences and follow-up polish

This is the requested pastel adaptation: project surfaces and original artwork replace stock photography and dark glass panels from the motion recording. It preserves stacked scroll and floating navigation, not the video's precise panel artwork. No P0/P1/P2 issues remain within that adaptation. Full visual parity with the original screenshot portrait would require Khushi's chosen portrait, which was not supplied. Source cover text is small on narrow screens, while equivalent project titles and summaries remain available as readable HTML.

## Case-study panel refinement — 9 November 2026

This entry supersedes the earlier case-study appearance review.

Source: `C:/Users/khush/AppData/Local/Temp/codex-clipboard-4dee58d8-00d7-4fe3-802c-8eaf14a624d2.png`, 1513 × 622 pixels. The user requested the Consulting Services panel structure with case-study copy and four related word-only containers. Hero remains unchanged.

Evidence: `.local/case-desktop.png` and `.local/case-mobile.png`. Desktop browser viewport approximately 1513 × 622 CSS pixels (backend reports 1514 × 622); captured desktop content 1498 × 616 pixels due browser capture surface. Source and final capture were opened together in one tool response. Regions were compared proportionally, without claiming pixel equivalence. Phone viewport 390 × 844 CSS pixels. First-panel resting state and both navigation directions inspected. The earlier initial capture immediately after resize was clipped by the browser capture surface; fresh settled capture confirms the whole panel fits.

Typography: compact bold project title, smaller subtitle/body, readable white tile labels, and small case index match the source hierarchy. Spacing: single centered glass container, summary left, 2×2 text grid right; rounded pills beneath. Four tiles stack below the summary on phone. Colors: dark plum translucent surface, lavender-tinted tiles and peach/lavender source-image wash adapt the original palette. Images: existing case-study covers supply a blurred decorative background; no stock photo or invented product mockup. Copy: workspace/app/team themes and preventive UX/friction/action-placement themes come from verified source descriptions; no new outcome claims.

Interactions: in-panel Next/Previous actions and floating arrows move between projects, labels update 1/2 and 2/2, boundary arrows disable. Outgoing card recedes by at most 4.5%, 24px, and 35% opacity during the native stacked scroll. Reduced-motion CSS suppresses these transforms and fading. No scroll interception. Both phone and desktop checked, eight total topic tiles present, phone scroll width 375px versus 390px viewport, no overflow. Console warnings/errors empty. Production build and four existing tests pass.

Accepted differences: source people photo replaced with blurred original project artwork, palette remains pastel/plum, source service labels replaced with project-specific text. Tiles are descriptive content, not tabs that imply hidden panels. No actionable P0/P1/P2 findings remain for this requested adaptation.

final result: passed

## Photo backgrounds and pinned scene transition — 9 November 2026

This entry supersedes earlier descriptions of receding or stacked case-study cards.

Source: supplied `Screen Recording 2026-11-01 152632.mp4`, inspected at 1s and 2s via `.local/reference.html`. Source frame saved as `.local/motion-source.png` (1280 × 720 including video letterboxing and controls). Implementation evidence: `.local/background-transition.png` and `.local/background-final.png` (approximately 1071 × 615 browser surface). Source and implementation transition screenshots opened together in one tool response. Comparison evaluated the video content region and normalized layout proportions; no pixel-for-pixel or timing-equivalence claim. Desktop CSS viewport approximately 1087 × 615, phone 390 × 844. Mobile and desktop resting scenes inspected.

Reference finding: foreground panel and nav remain fixed while complete photographic backgrounds translate vertically. The earlier outgoing-card scaling was the wrong mechanism and has been removed. The new two-screen scroll region pins one stage, translates its two-image background track with native scroll progress, and changes active project at the midpoint with a short opacity/12px content transition. Foreground top measured 115.3375px before scroll and 115.2000px at progress 0.4004; navigation 496.3375px and 496.2000px. Difference under 0.14px from layout rounding. The transition capture visibly shows the boundary between photos moving behind the fixed glass panel, as in the video.

Required fidelity surfaces: compact DM Sans project title/body hierarchy preserved; centered rounded panel plus 2×2 tiles and pill navigation retained; lavender/peach photographic accents and dark translucent glass preserve the requested palette; two sharp generated background photos replace blurred case covers; all verified project text unchanged. Generated scenes are decorative fictional studio images, not evidence of real project teams. Hero untouched.

Validation: native intermediate scrolling, next/previous and boundary disabled states, active label, both photo decodes, phone layout with no horizontal overflow (375px scroll width versus 390px viewport), build and four bundled tests pass. Inactive panels are inert and hidden from accessibility APIs. Reduced-motion CSS disables the vertical track transform and content transitions, switching to the active static scene; CSS branch inspected, OS preference not changed. Console contained a development hot-reload websocket reconnect message from the restarted preview; no application exceptions observed.

Accepted differences: two actual portfolio projects instead of fifteen services, four topic tiles instead of six, generated pastel studio photography instead of the source stock photos. Pinned movement matches the observed reference mechanism, while native device scroll speed and the brief text transition are implementation choices. No unresolved P0/P1/P2 findings.

final result: passed
