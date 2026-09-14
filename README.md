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
