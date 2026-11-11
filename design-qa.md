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

## Lower glass and image loading correction
Source: latest user screenshot codex-clipboard-582853f3-cc68-4656-9207-cd4897f31cf1.png (1515 × 687). Evidence: .local/lower-glass-desktop.png (1071 × 615). Both opened in the same comparison response; proportional comparison, no density or pixel-equivalence claim. Panel now bottom-aligned with 5vh lower spacing, glass alpha .43 desktop/.51 phone versus prior .60; topic tile alpha .14. Typography and verified copy retained. Bundled source imports validate and emit both image paths; browser confirmed both decode at 1536px natural width after reload. User screenshot had broken image; cannot conclusively reproduce its original cause, so no specific root cause claimed. In-panel next/previous CTAs removed; remaining arrow navigation checked on phone. Phone 390 × 844 inspected with readable summary, all four tiles and bottom controls visible. Production build and four checks passed. Hero unchanged. No unresolved P0/P1/P2 issues.
final result: passed

## Editorial notes section QA — 9 November 2026

Source visual truth: `.local/next-reference.mp4`, original supplied Screen Recording 2026-11-01 152738.mp4, inspected at 0s/2s. Source capture `.local/notes-source.png` (1280 × 720, including letterboxing/video controls). Implementation `.local/notes-desktop.png` (1265 × 889 image, 1280 × 900 CSS viewport; browser surface excludes its scrollbar/border). Source and implementation opened together in the same comparison response. Compared proportional row structure and preview, rather than literal dimensions including video chrome. State: four rows with floating image; implementation keyboard-focused second row intentionally shows its focus outline. Phone viewport 390 × 844 inspected in expanded-note state.

Required surfaces: DM Sans provides restrained row titles, small uppercase categories, and small trailing action/count; thin horizontal rules and generous row spacing follow the reference. Existing cream, lavender and dark-text palette retained. Heading continues the portfolio's editorial serif accent. Existing sharp portfolio cover and decorative generated photos used for previews, with no new invented project visuals. Copy describes clarity, collaborative workspace design, preventive UX, and curiosity, based on source material already verified. Dates and fictional published articles were not added. User requested content judgment, so an explanatory heading and expandable notes intentionally supplement the reference's article-link layout.

Checks: all four rows visible in desktop overview; keyboard Tab shows contextual preview, Enter opens/closes notes and aria-expanded updates; opening Intent closes Collaboration. Phone note text, action labels, and source links are readable; scroll width 375 versus viewport 390, no horizontal overflow. Preview is hidden for touch/coarse pointer. Pointer-driven preview observed switching rows during scroll with pointer positioned over the list; source-following position logic also reviewed. Console error/warning log empty after final reload. Production build and all four existing serving/package checks pass. No new tests were added for this low-impact visual/content section.

Iteration: initial Curiosity preview used a wide text banner that cropped its baked-in text. Replaced with existing decorative studio photograph. Recaptured final desktop with cover preview and checked image quality. Mobile hover is intentionally disabled; expanded explanatory content carries the same meaning without a floating image.

No actionable P0/P1/P2 issues remain. Accepted differences: portfolio principles instead of another studio's articles, read/close actions instead of publication dates, additional heading, accessible inline expansions.

final result: passed

## Letters after sunset footer QA — 9 November 2026

Source truth: supplied `Screen Recording 2026-10-20 194148.mp4` (13.8333 seconds), inspected at 0s, 8s, and 12s. Scene capture `.local/footer-source.png` (1280 × 720 including letterboxing and player controls). New original scene: `src/assets/letters-sunset.png` (1536 × 1024); envelope sprite `src/assets/letter-envelope.png` (transparent generated raster). Implementation evidence `.local/footer-desktop.png` (1265 × 889, 1280 × 900 CSS viewport), `.local/footer-composer.png` (1280 × 900 dialog capture), and `.local/footer-mobile-preview.png` (390 × 844 phone preview). Source and full footer capture were opened together in one comparison response. Compared the same overview concept, excluding player chrome; this is an intentional creative adaptation, not a pixel clone. Composer, preview, flight, handoff, and phone layouts were also visually inspected.

Required fidelity surfaces:

- Typography: existing DM Sans and Georgia editorial hierarchy retained. New headline and modal headings wrap cleanly; letter salutation/signature use readable serif italics, body remains plain text with preserved line breaks.
- Spacing/layout: invitation and CTA flank each other on desktop, stack on phone. Wide scene crop preserves seated designer and postbox. Modal stays within viewport and scrolls for smaller desktop heights; phone write/preview/handoff layouts fit without horizontal overflow. Postbox hit area aligns with actual scene artwork.
- Colors: cream/plum interface with lavender, apricot, sage stamp choices; pastel sunset maintains portfolio palette. Inputs, selected stamp outline, focus borders and primary CTA clearly distinguish states.
- Images: both actual generated files decode and build with hashed URLs. Scene and sprite inspected at full resolution before placement. No CSS-drawn scenery or fake placeholder assets.
- Content: user-selected private delivery and exact supplied email. No invented visitor counts or public guestbook. Status copy distinguishes ready/folded from sent/delivered. The final step explicitly requires the visitor to send in their own mail app.

Interaction verification:

1. Invitation and illustrated postbox both open the composer. First-name field receives focus.
2. Empty required name blocked by native validation. Malformed optional reply email blocked. Whitespace-only name/message blocked by trimmed-content validation. Character count updates.
3. Apricot and Sage selections persist into their matching preview stamps. Message and name appear exactly in paper preview.
4. Escape closes; reopening preserves the draft and preview step. Keep writing returns to editable fields. Close/backdrop handling is implemented; Escape and explicit close verified.
5. Seal closes modal, brings the scene into view, disables duplicate triggers, flies the envelope for 1.5s, then opens handoff after the 1.8s sequence. Desktop and phone flight states visually checked. Small envelope remains by the postbox.
6. Final mailto href inspected: recipient exactly khushitiwari1415@gmail.com, encoded subject/body include synthetic test letter and sender. No actual email-app send or delivery was exercised.
7. Copy returned success feedback. Download produced a plain text letter file during browser test. Read-again and new-letter controls present and routed in source. No message persistence or network form submission.
8. Keyboard loop initially let backward Tab reach the document body in this browser. Added explicit first/last focus handling; retest moves from name to Close to Preview and document.activeElement remains inside dialog. Escape returns focus to opener. Focus moves to headings between steps.
9. Reduced-motion CSS removes envelope travel and hover translation; JavaScript skips flight delay and smooth scene scroll. Branch inspected, OS setting not changed in browser.
10. Phone 390 × 844: all stages readable, reply field stacks, full-width actions, dialog width about352px; page scroll width390px, no horizontal overflow. Native dialog keeps background inert and page scroll is locked.

Comparison history: first scene view left the lower artwork outside a short desktop viewport during seal. Added scene-centering scroll before flight and inspected phone animation with entire scene visible. Initial modal focus landed on Close; corrected to name field and retested. Keyboard edge case corrected as above. Postbox arrival coordinates adjusted after inspecting original illustration.

Production build succeeds; four bundled serving/package tests pass. Final build rerun after keyboard/Escape refinements. Final browser error/warning log empty after reload. No actionable P0/P1/P2 findings remain. Limits: email-client launch and actual delivery are external; reduced-motion preference checked in code rather than changing OS settings. PNG assets are several MB combined and could be optimized later without changing the interaction.

final result: passed

## Portrait-free hero

Compared the supplied reference with the local desktop capture at .local/hero-dotted.png. The centered serif name, italic role, and dotted paper carry the reference's visual hierarchy. The lavender work link supplies the accent, and the hero contains no photo or portrait.

Checked the narrow layout in the browser, followed the work link to #work, and checked the browser console. Production build and all four hosting tests passed.

final result: passed

## Case-study detail pages

Compared the Clinspire reference with .local/case-detail-desktop.png and .local/case-detail-contents.png. The new pages follow its left-aligned headline, wide cover, sticky contents rail, narrow article column, and related project section. The covers retain the original Notion aspect ratio, and the shared portfolio colors and footer carry through.

Verified Organisation in desktop Chrome and the Intent layout at 390px. Tested section jumps, active section, Back to top, and navigation between projects. Fixed a global navigation rule that hid mobile contents links and retested. Original Intent UI screenshots loaded, and the detail preview reported no console errors.

final result: passed
