# LiX · Open-source project hub

[**Explore the interactive project hub →**](https://lix-works.github.io/)

AI-agent tools for scientific research, live physics demonstrations, and an interactive periodic table of the techniques behind them. A researcher remains in charge of the work.

This is the first public preview. The site is still being refined.

## Run locally

Serve `site/` with any static HTTP server. There is no package installation or build step. For example:

```sh
python -m http.server 8800 --directory site
```

Open `http://localhost:8800/`. The ProxiTouch embed uses the existing same-origin `/Capacitance-Demos/` project site. A local server needs to mount that project at the same path for its live embed to work; the deployed hub uses the published project directly.

## Maintain and deploy

- `site/index.html`: layout, periodic table, interactions, and responsive styles.
- `site/shared/content.js`: project copy and technique descriptions.
- `site/shared/live/embed.js`: live embeds and video fallbacks.
- `site/shared/live/edl/`: the live EDL excerpt, with its original source license and vendored three.js license.
- `site/shared/fig/` and `site/shared/media/`: illustrations, posters, and fallback clips.

Push to `main` to publish through GitHub Actions. The workflow uploads only `site/` to GitHub Pages. It does not publish repository documentation as site content. Google Fonts is optional; system fonts are used when it is unavailable.

The hub links to the existing [Capacitance Demos](https://lix-works.github.io/Capacitance-Demos/) and [Scientific Animation Workflow](https://lix-works.github.io/Scientific-Animation-Workflow/gallery/index.html#film). Each project retains its own repository and deployment.

## Licenses and credits

Original hub code: [MIT](LICENSE). Original media and writing: [CC BY 4.0](LICENSE-MEDIA.md). Reused materials retain their source licenses; see [sources and notices](THIRD_PARTY_NOTICES.md).
