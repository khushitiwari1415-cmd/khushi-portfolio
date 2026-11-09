# Letters after sunset

## The idea

A small, quiet world at the end of the portfolio. A designer sits beside a lake at sunset; a copper postbox waits among the flowers. Instead of joining a public crowd, visitors can leave Khushi a private letter.

The footer follows the supplied sunset reference's emotional rhythm: discover a scene, enter a small personal detail, make a choice, then see that choice arrive in the world. The original guestbook's people and pets become a handwritten-feeling letter, a chosen stamp, and a flying envelope. The artwork is an original pastel lakeside illustration rather than the reference's Arizona landscape.

## First impression

The headline reads **“Stay for the sunset. Leave a little letter.”** A short invitation welcomes a thought, a hello, or an idea. The scene is intentionally free of constant motion: the visitor decides when the story begins.

Two entry points lead to the same composer:

- **Write me a letter** is the obvious primary action above the scene.
- The illustrated **postbox** is also clickable. Hover or keyboard focus reveals “The postbox is open.” It has an explicit accessible name and a generous invisible hit area aligned with the artwork.

The small caption “Letters after sunset” identifies the scene. The status pill provides gentle feedback without covering the sun, seated figure, or postbox.

## The complete journey

| Moment | Visitor action | Response and details |
| --- | --- | --- |
| 1. Open | Click the invitation or postbox | A cream dialog appears over a blurred backdrop. Focus starts in the name field. The page behind it stops scrolling. |
| 2. Write | Add a name and a letter | Name is required, 2–40 characters. Letter is required, 10–800 characters. Whitespace-only entries do not count. An optional reply email uses normal email validation. A visible character count supports the writing. |
| 3. Choose a mood | Select Lavender, Apricot, or Sage | The radio choice has a clear selected outline. Each mood has a small caption, and the letter's stamp uses the chosen palette. Lavender: “A little wonder.” Apricot: “A warm hello.” Sage: “Something thoughtful.” |
| 4. Preview | Click Preview my letter | The visitor sees a paper-like letter with “Dear Khushi,” their exact message, their name, and optional reply address. No text is sent. Focus moves to the preview heading. |
| 5. Edit | Click Keep writing | All fields and the chosen stamp remain intact. Focus returns to the name field and the dialog scroll resets. |
| 6. Seal | Click Fold & seal my letter | The dialog closes and the scene is brought into view. A real envelope image takes a 1.5-second curved journey towards the illustrated postbox. The entry buttons briefly disable so multiple flights cannot overlap. |
| 7. Arrive | Wait for the envelope | A small envelope remains near the postbox. After a short settling pause, the final dialog opens. The scene status says the letter is ready, not delivered. |
| 8. Hand off | Click Open email draft | Opens a draft addressed to **khushitiwari1415@gmail.com**, containing the visitor's name, letter, and optional reply email. The visitor reviews and sends it in their own email app. The website never claims delivery. |
| 9. Alternative route | Copy or download the letter | Copy provides success or an honest unavailable message. Download creates a plain text letter. The visitor can use either if an email app is not configured. |
| 10. Revisit | Read it again, close, or start a new letter | Read it again returns to the paper preview. Closing preserves this draft while the page stays open. Start a new letter clears the form and stamp choice and returns to writing. |

## Closing, returning, and errors

The Close button, Escape key, and a click on the dimmed backdrop all dismiss the dialog. They preserve the current letter while the page remains open. Close returns focus to the button that opened the composer. The native dialog keeps the underlying page inert, and an explicit Tab loop handles both ends of the keyboard sequence.

Missing fields and malformed email addresses are identified before the preview. A trimmed-content check also prevents a blank letter made of spaces. The input remains editable. The chosen stamp and message survive a preview/edit round trip.

Copy failures show an alternative rather than a success message. Download remains available. The email handoff is clearly labeled: opening a draft is not the same as sending a message.

## Privacy and delivery

The user explicitly selected **private letters** and supplied the receiving address. There is no public guestbook, visitor count, or visible message history.

Drafts are held only in page memory. There is no database, form service, analytics event containing the letter, local storage, or automatic server submission. Reloading or leaving the page clears the draft. The privacy explanation says this in the composer.

The mailto link is created only for the final handoff. Names and content are URL-encoded, and the recipient remains fixed. Actual sending and delivery depend on the visitor's email app. Direct website delivery would be a separate future feature requiring a mail service; the current interface does not imply it exists.

## Motion and responsive behavior

The illustration is a quiet still scene. The envelope is the meaningful animated moment: it rises, tilts gently, travels to the postbox, and settles. The entire sequence takes about 1.8 seconds including its settling pause. There is no looping motion or sound.

With reduced motion enabled, the flight is skipped and the final state appears immediately. The scene scroll uses an immediate movement in that mode.

On desktop, the invitation sits beside the headline and the illustration spans the footer width. The wide crop keeps both the seated designer and the postbox visible. On phones, the invitation stacks below the heading and the image becomes taller. Dialog fields stack, review actions become full-width, and long letters remain readable inside a bounded scrolling dialog. All essential actions remain available without hover.

## Visual details

- Warm cream paper, plum type, and lavender/apricot/sage stamp choices connect the experience to the rest of the portfolio.
- The pixel-art scene and transparent envelope are generated raster assets imported into the build, ensuring they are packaged with the website.
- The scene has a descriptive text alternative. The flying envelope is decorative; a status region describes the progress instead.
- Dialog headings identify each step; source text is rendered as plain React text, preserving line breaks without interpreting visitor input as markup.
- A small colophon credits Khushi and returns visitors to the beginning of the portfolio.

## Verification and limits

Desktop and phone checks covered the composer, required fields, malformed optional email, Apricot/Sage choices, preview, Escape, closing/reopening a draft, the envelope journey, handoff recipient/body, copy, and download. The browser's native backward Tab behavior initially reached the document body; an explicit focus loop corrected it and the same sequence was retested successfully. No test email was sent. The operating-system email-app launch and actual email delivery were not exercised.
