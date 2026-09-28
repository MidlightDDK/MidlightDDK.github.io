# Handoff: portfolio site

Status as of 2026-09-28. **Live at https://midlightddk.github.io/**, served from the repo `MidlightDDK/MidlightDDK.github.io` (renamed from `portfolio`; the old `/portfolio/` Pages URL now returns 404).

Goal: a portfolio that maximizes Majed Saliou Azar's chances of landing a remote AI Engineer role. It must cost $0 to build and host.

## What was built

A single-page static site with plain HTML, CSS and a little JavaScript. There is no framework, build step, or npm dependency. GitHub Pages hosts it, and a GitHub Actions workflow publishes `site/` on every push to `main` that touches `site/**`.

### Page sections

| Section | Content |
| --- | --- |
| Hero | Tagline "I build AI systems that show their work.", an "open to roles" badge, and buttons for projects, résumé and email. Also four quick facts (4+ years, 3 live apps, MSIT, 5th in Africa) and a card of headline eval results. |
| Selected work | One case study per project: a screenshot of the live demo, three metric tiles, links (demo, video, evals, code), "What I built", tech stack, a small bar chart, and a "What didn't work" note. |
| How I work | Six engineering habits, each tied to a specific project. |
| Experience | The Terahard Ltd role as written in the résumé, a "what carries over to AI engineering" panel, and cards for education, competitive programming and languages. |
| Skills | The three skill groups from the résumé. |
| Contact | Email button, copy-address button, LinkedIn, GitHub, Hugging Face and résumé PDF. |

Every number on the page was checked against the project READMEs in `../filinglens`, `../browser-analyst` and `../pocketsql`. Claims those READMEs don't support were reworded. For example, the Lighthouse 99 score applies only to the two apps whose READMEs report it. Keep this rule when editing.

### Files

```
site/                          deployed as-is
  index.html                   the page (content lives here)
  styles.css                   light/dark tokens, layout, charts
  main.js                      theme toggle, copy email, nav highlight, chart animation
  assets/*.webp                screenshots of the three live demos
  Majed-Saliou-Azar-Resume.pdf generated from tools/resume.html
  og.png                       link-preview image, generated from tools/og.html
  apple-touch-icon.png         generated from tools/icon.html
  favicon.svg, 404.html, robots.txt, sitemap.xml
tools/                         sources for generated files (not deployed)
  render.mjs                   renders the PDF, og.png and icon with headless Chrome or Edge
.github/workflows/pages.yml    GitHub Pages deploy
```

- **Résumé PDF:** a one-page, text-based (ATS-friendly) copy of `resume.txt`. Two things changed: live-demo and portfolio links were added, and the phone number was removed because the file is public.
- **Screenshots:** captured on 2026-09-28 with Playwright from the live demos. Each shows an answered example: the FilingLens R&D question, the Browser Analyst penguins question, and the PocketSQL billing-countries question. The capture script was a one-off and isn't in the repo. To refresh a screenshot, capture a light-theme 16:10 crop at 2x scale and save it as WebP under the same name.
- **Git-ignored on purpose:** `.claude/` holds the user's personal Windows sound hooks. `resume.txt` is the private source résumé and includes a phone number.

## How to make changes

- **Keep this file current.** It's the handoff for later sessions: update it whenever a decision or open item changes, and commit it.

- **Preview:** open `site/index.html` in a browser.
- **Edit content:** edit `site/index.html` directly.
- **Update the résumé, preview image or icon:** edit the file in `tools/`, then run `node tools/render.mjs`. It needs Chrome or Edge installed, or a `CHROME_PATH` pointing to one.
- **Deploy:** commit and push to `main`.
- **Push error:** on this machine, `git push` over HTTPS fails with "SSL certificate problem". Use `git -c http.sslBackend=schannel push origin main` instead. It switches to the Windows certificate store and still verifies certificates. The `gh` CLI works without changes.

## Decisions and status

1. **Contact email:** `majed.azar7@gmail.com` (the résumé's address) is correct. Don't change it.
2. **GitHub profile:** done: descriptions, homepage links and topics on `filinglens`, `browser-analyst` and `pocketsql`; a profile README (`MidlightDDK/MidlightDDK`) aligned with the résumé; the profile name, bio and website (set by the user); and the three project repos pinned (2026-09-28, via the profile's "Customize your pins" dialog, since there's no API for pinning).
3. **Root URL:** done. The repo is `MidlightDDK.github.io` and every absolute URL points to `https://midlightddk.github.io/`.
4. **Portfolio link elsewhere:** `resume.txt` now has it. The user updates any Word/PDF résumé copies and anywhere the old `/portfolio/` link was shared. **LinkedIn:** updated by Claude on request (2026-09-28); the Featured links are still pending. Details are in `linkedin/HANDOFF.md`, which is git-ignored and exists only on this machine. `resume.txt` is not the render source: the site PDF is built from `tools/resume.html`, so mirror any `resume.txt` edits there (minus the phone number) before running `node tools/render.mjs`.
5. **Phone number:** never on the public site or PDF.
6. **Numbers:** sync only when the user asks after rerunning a project's evals. Figures live in `site/index.html` (hero card, metric tiles, charts), `tools/og.html`, `tools/resume.html` (then rerun `node tools/render.mjs`), the three repo descriptions and the profile README.
