# frei august — design system v55

## Master grid
The site uses one 12-column modular grid across the header, About, Services, Sustainability, Sound, Language, Vision, News and Contact layouts. Spacing is tied to an 8 px baseline rhythm. Desktop content is asymmetrically aligned to shared column starts; tablet retains the 12-column structure with rebalanced spans; mobile collapses to a single reading column while preserving the same hierarchy.

## Typography
Helvetica / Helvetica Neue / Arial fallback stack. Type hierarchy uses a bounded 1.25 modular scale as a web implementation device, with ragged-right text, controlled line length, and no decorative justification.

## Colour
The interface field is pure white and typography is near-black. Colour is reserved for the brain/triangle system. The three fixed colours are sampled directly from the user-provided reference artwork:

- SOUND — green `#2D6024`
- LANGUAGE — coral `#C04621`
- VISION — cyan `#019FBC`

The triangle and 3D brain read these same CSS variables, so the colour identity is shared exactly between them.


## v56 hierarchy
Top-level section headings share one bounded fluid scale (56–112 px desktop, 48–72 px mobile), so hierarchy is created by grid position, spacing, and content rather than arbitrary heading size differences. About lead copy is 28–42 px; supporting copy is 17–21 px. The header is intentionally plain white with a single structural rule.


## v57 refinement
All live pages now use the same 12-column grid, 8 px baseline rhythm, white field, black typographic hierarchy and unified display scale (64–128 px desktop, 52–80 px mobile). The established interactive brain and triangle are retained in Services and Sustainability, using the fixed reference-artwork palette.


## v58 visualisation restoration

The interactive brain/triangle uses the established tractography-style RGB mapping: SOUND `#00FF00`, LANGUAGE `#FF0000`, VISION `#0000FF`. The triangle geometry is restored to the original equilateral/down-pointing construction (`aspect-ratio: 1.154700538 / 1`) and is no longer narrowed by the editorial 10-column visualisation sub-grid. The editorial 12-column grid remains in place for page typography and content. The faint header divider has been removed.
