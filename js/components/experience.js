/** Experience panel: company header, count-up metrics, and a filling timeline. */

/** Wraps metric figures in <b> for emphasis. */
const strong = (text) =>
  text.replace(/(\d+%[^.,]*|\d+\+ hours?\/week)/g, "<b>$&</b>");

function metricText(metric) {
  const value = Number(metric?.value ?? 0);
  const suffix = String(metric?.suffix ?? "");
  const safeValue = Number.isFinite(value) ? value : 0;
  return `${safeValue}${suffix}`;
}

export function renderExperience(root, data) {
  const sections = data.experience
    .map((job) => {
      const metrics = job.metrics
        .map(
          (m) => {
            const value = metricText(m);
            return `
            <span class="chip metric-chip">
              <span class="metric-value" data-count="${Number(m?.value ?? 0)}" data-suffix="${String(m?.suffix ?? "")}">${value}</span>
              <span class="metric-label">${m.label}</span>
            </span>`;
          },
        )
        .join("");

      const projects = job.projects
        .map(
          (p, i) => `
        <article class="exp-project">
          <div class="exp-project-head">
            <span class="exp-project-index" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
            <h4 class="exp-project-name">${p.name}</h4>
            <span class="tag">${p.tag}</span>
            ${p.metric ? `<span class="exp-metric">· ${p.metric}</span>` : ""}
          </div>
          <p class="exp-project-desc">${strong(p.description)}</p>
          <div class="stack-row">
            ${p.stack.map((s) => `<span class="tag">${s}</span>`).join("")}
          </div>
          ${p.diagram ? renderDiagram(p.diagram, i) : ""}
        </article>`,
        )
        .join("");

      return `
      <div>
        <div class="exp-company">
          <div class="exp-company-info">
            <h3 class="exp-company-name">${job.company}</h3>
            <div class="exp-role">${job.role} · ${job.location}</div>
          </div>
          <span class="exp-period">${job.period}</span>
        </div>
        <div class="exp-highlights">${metrics}</div>
        <div class="exp-projects" data-timeline>
          <span class="timeline-fill" aria-hidden="true"></span>
          ${projects}
        </div>
      </div>`;
    })
    .join("");

  root.innerHTML = `
    <div class="panel-header">
      <span class="panel-title">Experience</span>
      <span class="panel-index">02 / work</span>
    </div>
    <div class="panel-body">${sections}</div>`;
}

/** Compact Mermaid-style flow for the Whasta Automation entry. */
function renderDiagram(diagram, index) {
  const nodes = diagram.nodes ?? [];
  const width = 740;
  const nodeWidth = 150;
  const nodeHeight = 76;
  const gap = 38;
  const startX = 8;
  const y = 26;
  const markerId = `exp-arch-arrow-${index}`;

  const boxes = nodes
    .map((node, i) => {
      const x = startX + i * (nodeWidth + gap);
      const arrow =
        i < nodes.length - 1
          ? `<path d="M${x + nodeWidth + 6} ${y + nodeHeight / 2} H${x + nodeWidth + gap - 6}" fill="none" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#${markerId})" />`
          : "";
      return `
        <g>
          <rect x="${x}" y="${y}" width="${nodeWidth}" height="${nodeHeight}" rx="9" fill="var(--card)" stroke="var(--line)" />
          <rect x="${x}" y="${y}" width="${nodeWidth}" height="3" rx="1.5" fill="var(--accent)" />
          <text x="${x + nodeWidth / 2}" y="${y + 31}" text-anchor="middle" fill="var(--foreground)" font-family="var(--font-display)" font-size="12" font-weight="600">${node.title}</text>
          <text x="${x + nodeWidth / 2}" y="${y + 50}" text-anchor="middle" fill="var(--muted)" font-family="var(--font-mono)" font-size="8.5">${node.sub}</text>
        </g>
        ${arrow}`;
    })
    .join("");

  return `
    <div class="exp-diagram">
      <div class="exp-diagram-label">Architecture</div>
      <svg viewBox="0 0 ${width} 132" role="img" aria-label="${diagram.label}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="${markerId}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
          </marker>
        </defs>
        ${boxes}
      </svg>
      <p class="exp-diagram-caption">${diagram.label}</p>
    </div>`;
}
