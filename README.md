# Majed Saliou Azar · AI Engineer portfolio

**Live site: [midlightddk.github.io](https://midlightddk.github.io/)**

Portfolio for my AI engineering work. Each project is live and has its own held-out evals:

| Project | What it is | Headline result |
| --- | --- | --- |
| [FilingLens](https://github.com/MidlightDDK/filinglens) | RAG over SEC 10-K filings with verified citations | 85.5% recall@10 on the held-out test split |
| [Browser Analyst](https://github.com/MidlightDDK/browser-analyst) | Tool-calling data-analysis agent that runs SQL and Python in the browser | 94% task success on a 100-question benchmark |
| [PocketSQL](https://github.com/MidlightDDK/pocketsql) | LoRA fine-tuned 0.5B text-to-SQL model, running offline via WebGPU | Execution accuracy 30.9% → 49.3% on Spider dev |

## How the site is built

Plain HTML, CSS, and a little JavaScript: no framework, no build step, no dependencies.
GitHub Pages hosts it for free.

```
site/            everything that gets deployed
  index.html     the page
  styles.css     styles (light and dark themes)
  main.js        theme toggle, copy-email button, chart and nav animations
  assets/        screenshots of the live demos
tools/           sources for generated files (not deployed)
  resume.html    → site/Majed-Saliou-Azar-Resume.pdf
  og.html        → site/og.png (link-preview image)
  icon.html      → site/apple-touch-icon.png
  render.mjs     renders the three files above with headless Chrome or Edge
```

- **Preview locally:** open `site/index.html` in a browser.
- **Update the résumé, preview image, or icon:** edit the file in `tools/`, then run `node tools/render.mjs`.
- **Deploy:** push to `main`. `.github/workflows/pages.yml` publishes `site/` to GitHub Pages.
