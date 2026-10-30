# Ravi Bhushan V — Portfolio

A small, dependency-free portfolio built with vanilla HTML, CSS, and JavaScript. Content lives in `data.js`; the sections are rendered by the components in `js/components/`.

## Run locally

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Structure

- `index.html` — page shell and section mount points
- `data.js` — profile, experience, projects, stack, and education content
- `css/` — design tokens, layout, and component styles
- `js/` — theme handling, icons, and section renderers
