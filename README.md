# Khushi Tiwari — Portfolio

A React + Vite portfolio containing only the editorial hero and two scroll-stacked case studies. Cream, lavender, and peach surfaces frame original artwork from Khushi's Notion portfolio. No project metrics or outcomes are invented.

## Development

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm ci
npm run dev
npm run build
npm run test:sites
```

Production static files are in `dist/client`. The retained starter also provides an optional Sites Worker build; no Site has been registered or deployed.

## Content sources

Retrieved 9 November 2026 from https://rocky-squid-b1f.notion.site/khushi-tiwari using the browser.

- Hero introduction and banner: original portfolio page.
- Organisation: https://rocky-squid-b1f.notion.site/Organisation-32c71ab9856881368320e690e2cfc4b3
  - End-to-end UI/UX Designer, 2 weeks, Designer + Product Manager.
  - WebToNative collaborative workspace; no quantitative results reproduced.
- Designing for Intent, Not Error: https://rocky-squid-b1f.notion.site/Designing-for-Intent-Not-Error-32f71ab985688055bd7cece936d4609a
  - Preventive UX, intentional friction, action placement. No unverified reduction claims.

Project titles, descriptions, and image alt text are in `src/App.jsx`; visual tokens and responsive rules are in `src/styles.css`. Creative display headlines paraphrase project themes and are not outcome claims. Case-study links open the original Notion pages.

## Design references and behavior

The supplied screenshot guides the oversized name, small edition marker, right-aligned introduction, and wide image. The supplied 5-second video guides stacked full-height panels, a floating active label/counter, and previous/next controls. The portfolio uses original pastel surfaces and source artwork rather than the reference designer's portrait or video stock photos. It is an adaptation, not a pixel-identical reproduction of the video panel styling.

Native scrolling works with mouse, touch, and keyboard. Controls use stable document anchors so reverse navigation works while cards are sticky. A passive, animation-frame-throttled listener tracks the active panel. Reduced-motion preferences disable smooth scrolling, transitions, and sticky stacking. There is no scroll hijacking or animation dependency.

## Validation

Production build and all four starter serving/package tests pass. Browser checks covered desktop (1517 × 696) and phone (390 × 844), project controls in both directions, active labels, image loading, and console errors. QA is recorded in `design-qa.md`. Local reference files and screenshots remain ignored in `.local/`.

## Case-study panel update

The case-study showcase now follows the supplied Consulting Services reference: a dark translucent central panel, project title and summary on the left, four related text themes on the right, two pill actions, and the floating project navigation below. Original project artwork is blurred behind the panel. Scroll progress gently recedes the outgoing card; reduced-motion mode removes that effect. The hero was left unchanged.

## Background and motion revision

Case studies now use two full photographic backgrounds generated for decorative use (`workspace-background.png`, `intent-background.png`). These are fictional studio scenes, not project documentation. The foreground panel and navigation stay pinned while the photographs slide vertically with native scroll progress. Text changes at the midpoint; inactive panels are inert and hidden from screen readers. Reduced-motion mode uses static scene changes. This supersedes the earlier receding-card animation and blurred-cover backgrounds. Hero remains unchanged.

Background photos now live under src/assets and are imported for validated, hashed production URLs. Panel placement is near the bottom with lighter glass. Only Read case study remains inside each panel; previous/next navigation uses the arrow controls beneath.

## Behind the pixels — editorial notes section

User expanded scope to add a section after the case studies, based on `Screen Recording 2026-11-01 152738.mp4`. The video shows four ruled editorial rows with a floating image preview. New content is four short design principles: clarity, collaboration, intent, curiosity. Copy draws from the verified Notion introduction and the two project descriptions; no dated articles, credentials, or results were invented. The wording follows the concise reflective style of the existing Notion text. Notes expand inline and link to the original source case studies or portfolio.

The image preview follows the pointer on devices with hover, also appears on keyboard focus, and is hidden on touch devices. Rows remain fully operable on phones and with Enter/Space, with aria-expanded and labeled regions. Only one note opens at a time. Existing hero and case-study visuals remain unchanged. This supersedes the original two-section-only scope at the user's request.

## Interactive footer: Letters after sunset

The user requested a creative footer based on a pixel-art sunset/join scene, then selected private letters and supplied `khushitiwari1415@gmail.com` as the destination. The implemented experience is an original illustrated lakeside sunset with a clickable postbox, three stamp moods, a paper preview, a seal/envelope animation, and a clearly labeled email-app handoff. Copy/download fallbacks are included. Messages stay in React memory until the visitor chooses a handoff; no guestbook, persistent storage, or automatic email delivery is implemented.

The detailed interaction design is in [FOOTER-DESIGN.md](FOOTER-DESIGN.md). Component and scoped styles: `src/LetterFooter.jsx`, `src/letter-footer.css`. Original generated scene and transparent envelope are imported from `src/assets` and emitted by Vite. Hero, case studies, and editorial notes remain intact. Actual sending/delivery requires the visitor to send in their email app; no test email was sent during verification.
