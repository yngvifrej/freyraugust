# fri28aug — full GitHub Pages deployment package

This is the complete deployable site package.

## Site structure

- About / home
- Services — triangle + rotating 3D brain, without SDGs
- Sustainability — triangle + rotating 3D brain + interactive SDG network
- Audio — SoundCloud and OTG content
- News
- Contact

The common navigation works across all pages. The AUDIO label in the Services and Sustainability visualisations links to `audio.html`.

## GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`. On a push to `main`, the workflow:

1. validates all required HTML pages,
2. builds the static `_site` folder,
3. downloads the brain GLB model,
4. uploads the Pages artifact,
5. deploys it with GitHub Pages.

See `GITHUB_PAGES_DEPLOY.md` for the exact setup steps.

## Local preview

Use `serve-local.command` rather than opening the HTML directly from Finder. The helper downloads the brain model if needed and starts a local HTTP server at `http://localhost:8000`.


V34 update:
- About page now contains editorial copy reflecting the site's multimodal / systems / sustainability concept.
- AUDIO, TEXT and VIDEO are all clickable on Services and Sustainability.
- AUDIO opens audio.html, TEXT opens text.html, VIDEO opens video.html.
- Added text.html and video.html with the shared site design.
- GitHub Pages workflow now validates and deploys the two new pages.


V35 update:
- redesigned audio page around a stricter Swiss 12-column grid
- added a Johannes Itten colour framework section
- filled previously empty audio image areas with built-in colour compositions
- kept real SoundCloud embeds and links


V36 update:
- Services and Sustainability triangle/brain are monochrome
- AUDIO/TEXT/VIDEO labels are black
- Audio artwork fields now use artwork from the linked SoundCloud / OTG release pages rather than generated colour compositions


V37 update:
- triangle uses Johannes Itten primary triad: yellow / red / blue, with secondary transitions
- brain uses the same Itten primary mapping for Audio / Text / Video
- audio page contains no colour-theory content; it is music/release focused only
- SoundCloud artwork is resolved through oEmbed and downloaded as same-origin static images during GitHub Pages build
- OTG release cover is downloaded from the linked release page during build


V38 update:
- removed the default hover-helper SDG text
- applied an Itten palette to SDG numbers
- added clearer audio artwork fallbacks for preview mode
- artwork images are still downloaded during GitHub Pages deployment
