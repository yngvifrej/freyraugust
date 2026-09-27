# freia — Swiss Modular Web System

This package uses a single authoritative responsive grid and typographic hierarchy.

## Grid
- Desktop: 12 equal columns.
- Baseline: 8 px.
- Outer margin: 24–48 px, fluid with viewport width.
- Gutter: 14–24 px.
- Grid is viewport/left anchored rather than centred inside a narrow wrapper.
- Maximum working width: 1920 px.

## Header
- `freia`: columns 1–2.
- Primary navigation: columns 7–12 on desktop, creating a deliberate field of negative space.
- Tablet: brand columns 1–3; navigation columns 5–12.
- Mobile: brand first row; navigation becomes a two-column left-aligned matrix.

## Type hierarchy
The system follows a bounded major-third (approximately 1.25) scale:
- navigation / metadata: 11–12 px
- body: 16–18 px
- deck: 18–22 px
- lead: 28–42 px
- subhead: 34–52 px
- section heading: 58–96 px
- display heading: 76–128 px

Display headings use tight leading and tracking; prose uses generous leading and controlled line measure. All editorial text is ragged-right and left aligned.

## Content placement
- kicker/index: columns 1–2
- main section/page title: columns 3–10
- primary About copy: columns 3–7
- secondary About copy: columns 9–12
- Services and Sustainability visual fields: columns 2–11
- desktop navigation: columns 7–12

No important editorial modules overlap grid columns.

## Visual system
The Services and Sustainability triangles use the exact same selected gradient field. The visible brain overlays also use that same field and mask so the palette is consistent even if WebGL or the remote 3D model fails.

Endpoint colours:
- Sound / green-cyan: `#36E6BF`
- Knowledge / red: `#FF4343`
- Vision / blue: `#2E63FF`

## Accessibility and interaction
- keyboard focus has a visible 2 px outline
- navigation hover/focus uses a restrained 1 px rule
- reduced-motion preferences are respected
- mobile navigation is not compressed into unreadably narrow columns

## Implementation principle
The final block in `assets/css/swiss-system.css` is authoritative. Earlier page-specific CSS is retained for content-specific modules, while the final block normalises the shared grid, header, typography and responsive behavior.
