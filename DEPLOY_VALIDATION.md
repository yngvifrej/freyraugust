# freia — deployment validation

This deployment package uses the supplied company description on `index.html` and `about.html`.

## Services visual
- `services.html` is the validated normal-triangle build.
- Triangle geometry is an equilateral downward triangle using `2 / sqrt(3)` width/height ratio.
- The triangle and brain use the same embedded raster colour texture.
- The page includes a static brain fallback so the composition remains visible if WebGL or the remote module/model is unavailable.
- GitHub Pages workflow downloads `models/brain.glb` during deployment.

## Validation performed
- Required page set present.
- Internal HTML links checked.
- HTML parsed successfully.
- CSS parsed with no syntax errors.
- Inline JavaScript syntax checked with Node.
- Import maps parsed as valid JSON.
- Desktop and mobile Chromium render checks generated successfully.

## Acid-colour services update
- Services triangle and brain now use a more acid shared colour texture.
- Shared texture SHA-256: `524e4f3ce4f0741d0ac9c0ed1071de07675664f7ca276afeacb775005bca5d7e`.
- The visible helper text beneath the triangle was removed.
- All Vision links now point to the supplied external portfolio URL.

## User palette gradient update
- Services triangle and brain now use a new shared gradient built from the user's requested palette.
- Exact colours used: `#216fff`, `#fe3633`, `#7579e4`, `#27e5a7`, `#ff5624`.
- Shared texture SHA-256: `0478383e224d475ddbabe6a387d6dbfdc203ef0e0be005b81c4a1c3d77f634bf`.
- Triangle frame/outline remains removed.

## Attached-photo gradient extraction
- The Services colour field is derived directly from the attached photograph.
- The monitor was perspective-corrected, foreground album/text content masked and inpainted, and the remaining light field smoothed.
- No manually chosen HEX palette is used for this version.
- Triangle and brain reference the same embedded PNG; SHA-256: `54a20386e6b44a43982b350a7f7daaef1922280b7633fe6f33e6bd75f309856b`.

## Matched triangle/brain colour refinement
- Triangle keeps the full extracted gradient from the attached picture.
- Brain now uses a crop taken from the exact region of that same extracted gradient corresponding to the brain position inside the triangle.
- Triangle PNG SHA-256: `54a20386e6b44a43982b350a7f7daaef1922280b7633fe6f33e6bd75f309856b`.
- Brain-crop PNG SHA-256: `acf647d6d6cfffad15567b7407bbb2b140a45c716a9ab0d256175d39d3e174ee`.
- Fallback shadow reduced so the displayed colours stay closer to the source gradient.

## Full-gradient brain correction
- Removed the brain-specific crop completely.
- Triangle and brain now both use the full extracted gradient image from the reference photograph.
- No separate brain crop or separate brain palette is used.

## Candidate v6 — between versions 3 and 5, with more red
- Gradient tuned to sit between the exact-sampled-anchor version and the softer balanced version.
- Added stronger red presence on the right/lower-right to improve overall balance.
- Shared texture SHA-256: `3c40dc4fa9a18f7416ac77bf604b4bed439f70121904f3dba49989f8bdac7e99`.
- Triangle and brain both use the same full gradient.

## Candidate v7 — intense corner colours
- Each triangle corner is now driven by a strongest colour.
- Top-left: strongest green/cyan; top-right: strongest red; bottom apex: strongest blue.
- Shared texture SHA-256: `5ba92eb58723676fcd98ae91cb651df6cd919aad0dc745870e374c434a57f1ef`.


## freia final pass
- Brand renamed to `freia` across HTML metadata, visible UI, docs, comments, and deployment workflow.
- Master layout locked to a 12-column Swiss modular grid with an 8px baseline.
- Desktop shell is edge-anchored to a fluid page margin rather than a centred max-width frame.
- Header brand starts on column 1; navigation starts on column 2 and is left-justified.
- Services and Sustainability visual stages each occupy columns 2–11 on desktop.
- Selected v7 palette: SOUND `#36E6BF`, LANGUAGE `#FF4343`, VISION `#2E63FF`.
- Services and Sustainability triangles use the same embedded v7 gradient image.
- Both brains use the same selected v7 colour family; Sustainability endpoint colours are locked to the same three v7 anchors.
- GitHub Pages workflow supports `main` and `master`.
