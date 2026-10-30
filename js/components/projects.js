/** Projects panel: editorial cards with problem / solution / impact. */
export function renderProjects(root, data) {
  const cards = data.projects
    .map(
      (p, i) => `
    <article class="project-card">
      <div class="project-side">
        <span class="project-index" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
        <h3 class="project-name">${p.name}</h3>
        <span class="tag">${p.tag}</span>
      </div>

      <div class="project-main">
        <dl class="psl">
          <div><dt>Problem</dt><dd>${p.problem}</dd></div>
          <div><dt>Solution</dt><dd>${p.solution}</dd></div>
          <div><dt>Impact</dt><dd>${p.impact}</dd></div>
        </dl>
      </div>

      <div class="project-foot">
        <div class="stack-row">
          ${p.stack.map((s) => `<span class="tag">${s}</span>`).join("")}
        </div>
        <div class="project-links">
          ${p.links
            .map(
              (l) => `
            <a class="link-btn ${l.primary ? "primary" : ""}" href="${l.href}" target="_blank" rel="noreferrer noopener">
              ${l.label} ↗
            </a>`,
            )
            .join("")}
        </div>
      </div>
    </article>`,
    )
    .join("");

  root.innerHTML = `
    <div class="panel-header">
      <span class="panel-title">Projects</span>
      <span class="panel-index">04 / selected work</span>
    </div>
    <div class="panel-body">
      <div class="projects-grid">${cards}</div>
    </div>`;
}
