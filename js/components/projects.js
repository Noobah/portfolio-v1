/** Projects panel: collapsible project cards with live/GitHub links. */
import { icons } from "../icons.js";

export function renderProjects(root, data) {
  const cards = data.projects
    .map((p, i) => {
      const index = String(i + 1).padStart(2, "0");
      const monogram = p.monogram ?? p.name.slice(0, 2).toUpperCase();
      const media = p.image
        ? `<figure class="project-media">
             <img
               src="${p.image}"
               alt="${p.imageAlt ?? `${p.name} preview`}"
               width="1000"
               height="1000"
               loading="lazy"
               decoding="async" />
           </figure>`
        : `<span class="project-monogram" aria-hidden="true">${monogram}</span>`;

      return `
    <details class="project-card spotlight" data-spotlight style="--project-accent: ${p.accent ?? "var(--accent)"}">
      <summary class="project-head">
        <div class="project-main">
          ${media}

          <div class="project-copy">
            <div class="project-title-row">
              <h3 class="project-name">${p.name}</h3>
              <span class="tag">${p.tag}</span>
              <span class="project-index" aria-hidden="true">${index}</span>
            </div>

            <p class="project-summary">${p.summary ?? p.results}</p>

            <div class="project-meta">
              <span class="project-metric">
                <span class="metric-dot" aria-hidden="true"></span>
                <span>${p.metric}</span>
              </span>
              <div class="stack-row">
                ${p.stack.map((s) => `<span class="tag">${s}</span>`).join("")}
              </div>
            </div>
          </div>
        </div>
      </summary>

      <div class="project-actions">
        <div class="project-links">
          ${(p.links ?? [])
            .map((l) => {
              const icon = /github/i.test(l.label)
                ? icons.github
                : icons.arrowUpRight;
              return `<a class="link-btn ${l.primary ? "primary" : ""}" href="${l.href}" target="_blank" rel="noreferrer noopener">${l.label} ${icon}</a>`;
            })
            .join("")}
        </div>
      </div>
    </details>`;
    })
    .join("");

  root.innerHTML = `
    <div class="panel-header">
      <span class="panel-title">Projects</span>
      <span class="panel-index">04 / selected work</span>
    </div>
    <div class="panel-body">
      <div class="projects-list">${cards}</div>
    </div>`;
}
