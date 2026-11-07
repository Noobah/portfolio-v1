/** Projects panel: compact, scannable project rows with optional case studies. */
import { icons } from "../icons.js";

export function renderProjects(root, data) {
  const cards = data.projects
    .map((p, i) => {
      const index = String(i + 1).padStart(2, "0");
      const monogram = p.monogram ?? p.name.slice(0, 2).toUpperCase();

      return `
    <article class="project-card spotlight" data-spotlight style="--project-accent: ${p.accent ?? "var(--accent)"}">
      <div class="project-main">
        <span class="project-monogram" aria-hidden="true">${monogram}</span>

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

        <details class="project-more">
          <summary class="project-toggle">
            <span>Case study</span>
            ${icons.chevronDown}
          </summary>
          <dl class="psl">
            <div><dt>Problem</dt><dd>${p.problem}</dd></div>
            <div><dt>Approach</dt><dd>${p.approach}</dd></div>
            <div><dt>Architecture</dt><dd>${p.architecture}</dd></div>
            <div><dt>Results</dt><dd>${p.results}</dd></div>
          </dl>
        </details>
      </div>
    </article>`;
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
