# fri28aug — full GitHub Pages deployment package

This is the complete deployable site package.

## Site structure

- About / home
- Services — triangle + rotating 3D brain, without SDGs
- Sustainability — triangle + rotating 3D brain + interactive SDG network
- Audio — SoundCloud and OTG content
- News
- Contact

The common navigation works across all pages. The SOUND label in the Services and Sustainability visualisations links to `sound.html`.

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
- SOUND, LANGUAGE and VISION are all clickable on Services and Sustainability.
- SOUND opens sound.html, LANGUAGE opens language.html, VISION opens vision.html.
- Added language.html and vision.html with the shared site design.
- GitHub Pages workflow now validates and deploys the two new pages.


V35 update:
- redesigned audio page around a stricter Swiss 12-column grid
- added a Johannes Itten colour framework section
- filled previously empty audio image areas with built-in colour compositions
- kept real SoundCloud embeds and links


V36 update:
- Services and Sustainability triangle/brain are monochrome
- SOUND/LANGUAGE/VISION labels are black
- Audio artwork fields now use artwork from the linked SoundCloud / OTG release pages rather than generated colour compositions


V37 update:
- triangle uses Johannes Itten primary triad: yellow / red / blue, with secondary transitions
- brain uses the same Itten primary mapping for Sound / Language / Vision
- audio page contains no colour-theory content; it is music/release focused only
- SoundCloud artwork is resolved through oEmbed and downloaded as same-origin static images during GitHub Pages build
- OTG release cover is downloaded from the linked release page during build


V38 update:
- removed the default hover-helper SDG text
- applied an Itten palette to SDG numbers
- added clearer audio artwork fallbacks for preview mode
- artwork images are still downloaded during GitHub Pages deployment


V39 FINAL DEPLOY:
- index.html and about.html are identical
- Services/Sustainability triangle and brain share the exact RGB tractography-style palette: SOUND #00FF00, LANGUAGE #FF0000, VISION #0000FF
- brain coloration is more saturated and dominant-region weighting is stronger
- Sustainability keeps the Itten palette for SDG numbers
- Audio removes technical deployment copy and keeps only music/release content


V40 update:
- removed underline/underscore hover styling from SOUND, LANGUAGE and VISION links
- modality labels remain clickable with no hover decoration


V41 final update:
- Audio page now uses only large SoundCloud visual players with artwork visible inside the player.
- Removed separate artwork-image fetching and the standalone OTG release tile.
- Increased cortical RGB luminance, edge glow and modality dominance while keeping the same tractography RGB primaries as the triangle.


V42 final interaction fix:
- removed legacy modality hover-underline rules from Services and Sustainability
- SOUND, LANGUAGE and VISION remain clickable but have no underline/underscore, border, pseudo-line or hover decoration


V43 final responsive pass:
- centered the site on a consistent 12-column Swiss grid
- responsive desktop, tablet, mobile, small-phone and landscape rules
- safe-area handling for notched iOS devices
- viewport-height fallbacks for browsers without svh support
- robust media sizing for canvas and SoundCloud iframes
- preserved no-underline modality links and all prior interaction behavior


V45 update:
- VISION replaces VISUAL everywhere visible
- moving image is the descriptive medium used on the Vision page and About page
- sound/language/vision links remain responsive at desktop, tablet, mobile and short landscape breakpoints


V46 final responsive pass:
- VISION is the final navigation label; the page describes the medium as moving image
- no moving-image works were invented or embedded; the page remains ready for supplied media
- added extra <=480px and <=350px breakpoints so SOUND/LANGUAGE/VISION labels stay inside narrow phone viewports
- preserves 12-column desktop/tablet grid, mobile full-width grid, safe-area insets, short-landscape handling, reduced-motion handling and responsive SoundCloud embeds
