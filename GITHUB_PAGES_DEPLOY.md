# GitHub Pages deployment

This folder is ready to deploy as a static GitHub Pages site.

## Pages included

- `index.html` — home/about landing page
- `about.html` — About
- `services.html` — rotating brain + AUDIO/TEXT/VIDEO triangle, no SDG network
- `sustainability.html` — rotating brain + SDG network
- `audio.html` — Audio page with the current SoundCloud/OTG content
- `news.html` — News
- `contact.html` — Contact

## Deploy

1. Create a GitHub repository, or use your existing site repository.
2. Put the **contents of this folder in the repository root**. Do not upload the enclosing folder as one nested directory.
3. Make sure the default branch is `main`.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, choose **GitHub Actions** as the source.
6. Commit/push to `main`.
7. Open the **Actions** tab and wait for **Deploy fri28aug to GitHub Pages** to finish.
8. The deployment job will expose the final Pages URL.

## Brain model

The repository does not need to contain the large `brain.glb` file. During every GitHub Pages deployment, the included workflow downloads the anatomical model into `models/brain.glb` before publishing the site.

The site also loads Three.js/Draco modules from public CDNs, so the deployed site needs normal internet access.

## Local preview

On macOS, run `serve-local.command`, or from Terminal run:

```bash
./serve-local.command
```

Then open:

```text
http://localhost:8000
```

Opening the HTML directly with a `file://` URL is not a reliable test of the 3D brain or third-party audio embeds.
