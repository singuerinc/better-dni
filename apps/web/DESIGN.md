---
name: Better DNI
description: Spanish DNI, NIE and NIF validation for JavaScript, filed as a patent drawing sheet.
colors:
  paper: "#fdfdfb"
  ink: "#111111"
  ink-soft: "#555555"
  rule: "#b7b7b7"
  carmine: "#b31a1a"
  hatch: "rgb(17 17 17 / 0.22)"
  hatch-carmine: "rgb(179 26 26 / 0.35)"
typography:
  display:
    fontFamily: "Old Standard TT, Times New Roman, serif"
    fontSize: "clamp(1.875rem, 2.6vw, 2.875rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "0.11em"
  headline:
    fontFamily: "Old Standard TT, Times New Roman, serif"
    fontSize: "clamp(1.875rem, 3vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "0.12em"
  title:
    fontFamily: "Old Standard TT, Times New Roman, serif"
    fontSize: "2.5rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.08em"
  lede:
    fontFamily: "Old Standard TT, Times New Roman, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Old Standard TT, Times New Roman, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Old Standard TT, Times New Roman, serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.18em"
  label-small:
    fontFamily: "Old Standard TT, Times New Roman, serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.18em"
  specification:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  part-number:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "1.75rem"
    fontWeight: 400
    letterSpacing: "0.08em"
  numeral:
    fontFamily: "Old Standard TT, Times New Roman, serif"
    fontSize: "26px"
    fontWeight: 400
rounded:
  none: "0"
  circle: "50%"
spacing:
  space-1: "0.5rem"
  space-2: "1rem"
  space-3: "1.5rem"
  space-4: "2.5rem"
  space-5: "4rem"
  tap-min: "44px"
components:
  control:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 1.4rem"
    height: "52px"
  control-copied:
    textColor: "{colors.carmine}"
  control-small:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label-small}"
    rounded: "{rounded.none}"
    padding: "0 0.9rem"
    height: "{spacing.tap-min}"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.part-number}"
    rounded: "{rounded.none}"
    padding: "0 1rem"
    height: "64px"
    width: "100%"
  install-block:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.space-3}"
  stamp:
    textColor: "{colors.carmine}"
    rounded: "{rounded.circle}"
    size: "136px"
  stamp-compact:
    textColor: "{colors.carmine}"
    rounded: "{rounded.circle}"
    size: "88px"
  title-nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "0 0.6rem"
    height: "{spacing.tap-min}"
---

# Design System: Better DNI

## Overview

**Creative North Star: "The Patent Drawing Sheet"**

The site is a single utility-patent sheet on white bond: a double-ruled border with circular registration marks at its four corners, a title block across the top and bottom, and every section filed as a numbered figure (Fig. 1, Fig. 2, Fig. 3) or as the claims. India-ink line does all the work. Tone comes from 45° section hatching, never from tinted panels. One colour, carmine, marks whatever is under examination: the control letter, a flagged reading, the subject row of a benchmark, the examiner's stamp once an ID passes.

Type is split by register, as on a real filing. Engraved open-serif capitals with wide tracking (Old Standard TT) set titles, figure labels and reference numerals; a typewriter mono (Courier Prime) carries anything that is data or specification: IDs, function names, code, measurements. The density is that of a drafting sheet: hairline cells, small tracked labels, generous margins inside each cell, no decoration that is not also a drawing convention (leaders, dimension lines, centre axes, crosshair dividers).

The world rejects the dark dev-tool hero with a code block and feature cards. Everything is flat paper and ink; depth is drawn, not lit.

**Key Characteristics:**
- White bond paper, india-ink line, carmine for the thing under examination.
- 45° hatching as the only tonal fill.
- Engraved tracked serif capitals for titles; typewriter mono for data.
- Square, double-ruled controls and fields; circles only for registration marks, crosshairs, leader dots and the stamp.
- Exploded-view figures with curved leader lines to italic reference numerals.
- Every section is a cell of the sheet, separated by 1px ink rules.

## Colors

A drafting palette: off-white bond, near-black ink, one grey for secondary ink, one hairline grey, and a single carmine.

### Primary
- **Examiner's Carmine** (`colors.carmine`): the mark of examination. The control letter part and its leader in Fig. 1, a flagged ctrlChar row, the active cell of the 23-letter table, the subject row and bar of the benchmark, the valid verdict, the stamp in its VALID state, the computed letter in the worked example. It also carries the interaction signals: focus ring, link hover, the current-section underline in the title nav, the "Copied" confirmation, the text caret and text selection.
- **Carmine Hatch** (`colors.hatch-carmine`): carmine at 35% alpha, used only as the hatch stroke for an examined part or cell.

### Neutral
- **White Bond** (`colors.paper`): the sheet, every control and field face, and the knock-out fill behind registration marks, crosshairs and leader dots so lines stop cleanly. Also the `theme-color`.
- **India Ink** (`colors.ink`): all text, all structural rules, part outlines, leaders, control borders.
- **Secondary Ink** (`colors.ink-soft`): table headers, definition terms, figure captions, dimension and API labels, placeholders, the pending stamp, example readings, the explode axis.
- **Hairline Grey** (`colors.rule`): row dividers inside tables, letter-cell dividers, install rows. Never text.
- **Ink Hatch** (`colors.hatch`): ink at 22% alpha, the hatch stroke for un-examined parts, benchmark bars and hovered controls.

### Named Rules
**The Examination Rule.** Carmine marks the one thing being examined in a view, plus focus, hover, current and copied states. If two unrelated things on one figure are carmine, one of them is wrong.

**The Bond-and-Ink Rule.** Surfaces are paper; there are no tinted panels or grey cards. Paper may be used as a solid fill only to knock lines out behind a mark (registration marks, crosshair, leader dots, control faces).

## Typography

**Display Font:** Old Standard TT (with Times New Roman, serif), 400, 400 italic, 700 via @fontsource, latin subset
**Body Font:** Old Standard TT
**Label/Mono Font:** Courier Prime (with Courier New, monospace), 400 and 700 via @fontsource

**Character:** An engraved, high-contrast didone-flavoured serif set in wide-tracked capitals reads as the printed title of a filing; the typewriter mono reads as what the clerk typed in. The pairing is the register split of a patent sheet.

### Hierarchy
- **Display** (`typography.display`, uppercase, `text-wrap: balance`): the one invention headline in the first viewport.
- **Headline** (`typography.headline`, uppercase): section titles ("Control letter table", "What is claimed is"), sitting on a baseline with the figure title.
- **Title** (`typography.title`, uppercase, nowrap): "FIG. 1/2/3" figure titles.
- **Lede** (`typography.lede`, max 44ch): the first-viewport claim paragraph.
- **Body** (`typography.body`, max 62ch): section ledes and claim text. Footnotes drop to 0.9375rem italic.
- **Label** (`typography.label` / `typography.label-small`, uppercase): title-block text, nav, table heads, definition terms, field labels, figure captions. Wordmark in the title block is 1.125rem at 0.24em.
- **Specification** (`typography.specification`): code examples, function names (700 for the claimed function), reference readings, filing values.
- **Part number** (`typography.part-number`): the live input. Exploded parts in the figure are Courier Prime 700 at 80 SVG units.
- **Numeral** (`typography.numeral`, italic): reference numerals 10–22 on the figure; the same italic serif numbers the claims (1.375rem), the reference table's No. column and the letter-table indices, with tabular figures.

### Named Rules
**The Register Rule.** Prose and titles are serif; anything a developer would type or read back from the library (IDs, function calls, commands, times) is Courier Prime.

**The Engraved Caps Rule.** Every title-level line is uppercase Old Standard TT at weight 400 with tracking between 0.08em and 0.24em. Weight never carries hierarchy at title level; size and tracking do.

## Layout

The page is one sheet: max-width 1600px, centred, inset 20px from the viewport (12px at ≤820px), bordered with a 3px double ink rule and four 14px registration circles straddling the corners.

Inside, the sheet is a stack of cells divided by 1px ink rules. The header title block is a four-column grid (76px monogram, name, nav, filing meta). The first viewport is a four-column drawing row: 168px filing margin, claim (0.9fr), Fig. 1 (1.55fr), 290px reference-numerals column. Below it, each figure is a full-width `sheet-section` (4rem by 2.5rem padding) with a figure title, a crosshair rule and a lede. The claims section is a 2fr / minmax(260px, 1fr) grid. The footer repeats the title block as three spaced columns.

Spacing follows a five-step scale (`spacing.space-1` to `spacing.space-5`, 0.5 / 1 / 1.5 / 2.5 / 4rem). Cells pad at space-4 vertical, space-3 horizontal. Interactive targets hold a 44px minimum (`spacing.tap-min`).

**Responsive.**
- **≤1240px:** the first viewport reflows to a 2×2 grid (claim | Fig. 1 over margin | numerals); filing meta leaves the title block.
- **≤820px:** single column ordered claim, Fig. 1, numerals, margin. The nav drops to a full-width wrapped row under its own rule. Filing metadata becomes two columns. The 23-letter table becomes 6 columns of fully ruled cells. Benchmark rows become stacked cards (name and method, then the bar row) with the header hidden. Claims and install stack. The margin stamp hides and an 88px stamp moves next to the verdict; the figure's API labels hide, keeping numerals only.

### Named Rules
**The Sheet Rule.** New content is filed as a cell or figure of the sheet, bounded by 1px ink rules, never floated as a card on the paper.

## Elevation & Depth

Flat. Nothing is lifted and there are no drop shadows. The only `box-shadow` in the system is inset and draws a second rule: `inset 0 0 0 3px paper, inset 0 0 0 4px ink` inside a 1px ink border produces the double-ruled edge of controls, the field and the install block; the active letter cell uses `inset 0 0 0 1px carmine` as a coloured outline. Depth in the figures is drawn with drafting conventions: hatching for cut faces, a dash-dot centre axis (`14 4 2 4`) behind exploded parts, dashed outlines for empty parts.

### Named Rules
**The Drawn Depth Rule.** Depth is drawn, never lit: hatching, axes and double rules, not blur or offset shadows.

## Shapes

Rectangles with square corners (`rounded.none`) for every control, field, cell, bar and table. Circles (`rounded.circle`) are reserved for drafting marks: corner registration marks (14px), the crosshair-rule centre mark (13px circle with a cross), leader start dots (r=4) and the stamp. Line vocabulary: 1px ink for structure, 3px double for the sheet edge, hairline grey for intra-table rows, 1px dashed ink for the rules around code examples, dashed rims on the pending stamp.

## Components

### Buttons (double-ruled controls)
- **Character:** engraved instrument plates; square, double-ruled, tracked caps.
- **Shape:** square (`rounded.none`), 1px ink border plus inset paper/ink double rule, 52px tall.
- **Default:** paper face, ink text, Old Standard TT 0.875rem at 0.16em uppercase. A mono part inside (`.mono`) runs at 1rem, 0.02em, natural case; a trailing hint is separated by a 1px ink rule.
- **Hover / Active:** the face fills with ink hatching (`--hatch-fill`). Focus is the global 2px carmine outline at 3px offset.
- **Copied:** the label swaps to carmine "Copied" for 2s, announced through a polite status region.
- **Small:** 44px tall, 0.75rem label, used in install rows.

### Inputs / Fields
- **Style:** the part-number field: square, double-ruled like a control, 64px tall, Courier Prime 1.75rem at 0.08em, carmine caret, secondary-ink placeholder.
- **Focus:** global 2px carmine outline.
- **Error:** expressed in the figure and verdict, not on the field (flagged parts turn carmine).

### Navigation
- **Style:** title-block links, 0.875rem tracked caps (0.75rem/0.12em on mobile), 44px targets, no underline at rest; hover underlines; the current figure carries a 2px carmine underline at 0.5em offset, driven by scroll position.

### Fig. 1 exploded view (signature)
An SVG drawing of the ID split into parts (prefix 10, body 12, control letter 14) on a dash-dot centre axis. Parts are 1.5px-outlined, hatch-filled boxes with Courier Prime 700 characters; the control letter is always carmine; a mis-typed letter or unshaped input is flagged carmine; empty parts are dashed and unfilled. Curved cubic leaders with paper-filled dots run up to italic numerals over each part and down to numerals 16–22 labelled with the API call that reads that part, assigned left to right so leaders never cross. A dimension line reports body length ("7 / 7 digits"). Parts slide along the axis (`transform` 520ms, ease-out) as the ID becomes complete.

### Reference numerals table
Italic tabular numeral, mono part name, right-aligned mono reading; hairline row dividers under an ink-ruled tracked header. A flagged row turns carmine. Example readings are shown in secondary ink with an italic caption.

### Examiner's stamp
A circular stamp rotated −11°: two rims (r 74 and r 46), "BETTER DNI · EXAMINED" set on a ring path, and a centre word. Pending: secondary ink, dashed rims, "PENDING". Valid: carmine solid rims and text, kind (NIE/NIF), "VALID" in 700 and the date in mono; it lands with a 420ms scale-and-rotate (`stamp-land`, 1.45 → 1, −4° → −11°), reduced to a 200ms fade under reduced motion.

### Control letter table
23 equal cells ruled by hairlines, italic index above a large serif letter; the active remainder cell gains carmine hatching, carmine text and a carmine inset outline with a 300ms colour transition.

### Benchmark bars
Ink-outlined 18px bars filled with ink hatch, width proportional to time; the subject row is carmine-outlined with carmine hatch and carmine name and time.

### Crosshair rule
A 1px ink rule with a 13px crosshair circle at its centre, placed under every section heading and under the display headline.

### Motion
One easing, `cubic-bezier(0.16, 1, 0.3, 1)`. Motion only reports state changes: parts re-exploding (520ms), the stamp landing (420ms), the active letter cell (300ms). Smooth scrolling for in-page anchors. Under `prefers-reduced-motion`, transitions are removed, the stamp only fades, and scrolling is instant.

## Do's and Don'ts

### Do:
- **Do** file new content as a ruled cell or a numbered figure of the sheet, with a figure title, crosshair rule and lede.
- **Do** use hatching (`--hatch-fill`, `--hatch-fill-carmine`, 45°, 1px stroke every 7px) for any tonal fill, including active control states.
- **Do** keep carmine for the item under examination and for focus, hover, current and copied states.
- **Do** set IDs, function names, commands and measurements in Courier Prime, and titles in tracked uppercase Old Standard TT at 400.
- **Do** use square double-ruled controls (1px border plus the inset paper/ink rule) with 44px minimum targets.
- **Do** connect annotations to their subject with leader lines and italic reference numerals.

### Don't:
- **Don't** introduce tinted panels, gradients or grey cards; the sheet is paper and ink.
- **Don't** add drop shadows or blur for elevation; the only shadows are inset rules.
- **Don't** round control, field or cell corners; circles belong only to drafting marks and the stamp.
- **Don't** use carmine decoratively or on more than the examined item in a figure.
- **Don't** set titles in bold; hierarchy at title level comes from size and tracking.

## Open decisions

- **Dark mode:** none. The white-bond sheet has no agreed night rendition; the site renders light only.
- **Primary control:** `control-primary` currently renders identically to `control`; the install action is distinguished only by its mono command and hint. Whether the primary action gets its own treatment is unresolved.
