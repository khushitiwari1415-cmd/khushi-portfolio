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
