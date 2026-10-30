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

- `profile` — name, role, bio, photo, and resume link
- `socials` — email, GitHub, LinkedIn
- `experience` — company, logo, metrics, project timeline, Whasta architecture diagram
- `projects` — StudyBuddy, SentriX, Unifetch case studies + media slots
- `testimonials` — reviews copied from the Unifetch Firefox Add-ons listing
- `stack` — categories and items
- `education` — degrees and one-line highlights

### Replacing project media

Each project has a `media` object. The repo ships with wireframe previews in
`assets/*-preview.svg`; replace the `src` with a real screenshot when you have one:

```js
media: {
  type: "image",
  src: "assets/studybuddy-preview.svg",
  alt: "StudyBuddy roadmap interface",
  note: "",
}
```

For a looping video, use `type: "video"`, `src: "assets/demo.mp4"`, and an optional `poster`.

## Deployment

The workflow at `.github/workflows/deploy.yml` publishes the repo to GitHub Pages on every push to `main`.

1. Push to `main`.
2. In the GitHub repo, go to **Settings → Pages** and set **Source** to **GitHub Actions** (if it is not already selected).
3. The site deploys at <https://noobah.github.io/portfolio-v1/>.

`robots.txt`, `sitemap.xml`, and canonical/Open Graph URLs are already pointed at that URL.

## Before publishing

- Add real screenshots or demo videos for StudyBuddy, SentriX, and Unifetch.
- Regenerate `assets/og.png` if the name/tagline changes.
- Confirm the resume URL is publicly accessible.
