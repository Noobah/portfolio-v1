# Ravi Bhushan V — Portfolio

A dependency-free portfolio built with vanilla HTML, CSS, and JavaScript. There is no build step: the site is a set of static files that deploy directly to GitHub Pages.

## Stack

- **Markup:** semantic HTML in `index.html`
- **Styling:** hand-written CSS in `css/` using design tokens, `color-mix()`, and a light/dark theme
- **Behaviour:** small ES modules in `js/`
- **Content:** every editable string, link, metric, project, and stack item lives in `data.js`
- **Deployment:** GitHub Actions → GitHub Pages

## Run locally

```bash
python3 -m http.server 4173
```

Open <http://localhost:4173>. Opening `index.html` directly also works in Firefox, but a local server is recommended for consistent module loading.

## Edit content

Open `data.js`. The important blocks are:

- `profile` — name, role, focus, and bio
- `socials` — email and LinkedIn
- `experience` — company, role, dates, tools, and achievement bullets
- `stack` — skill categories, items, and icons used by the Skills section
- `projects` — StudyBuddy, SentriX, Unifetch case studies
- `testimonials` — reviews copied from the Unifetch Firefox Add-ons listing
- `education` — degrees and one-line highlights

## Deployment

The workflow at `.github/workflows/deploy.yml` publishes the repo to GitHub Pages on every push to `main`.

1. Push to `main`.
2. In the GitHub repo, go to **Settings → Pages** and set **Source** to **GitHub Actions** (if it is not already selected).
3. The site deploys at <https://noobah.github.io/portfolio-v1/>.

`robots.txt`, `sitemap.xml`, and canonical/Open Graph URLs are already pointed at that URL.

## Before publishing

- Regenerate `assets/og.png` if the name/tagline changes.
