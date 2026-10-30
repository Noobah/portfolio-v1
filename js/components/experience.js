/** Experience panel: company header + project timeline. */

/** Wraps metric figures in <b> for emphasis. */
const strong = (text) =>
  text.replace(/(\d+%[^.,]*|\d+\+ hours?\/week)/g, "<b>$&</b>");

export function renderExperience(root, data) {
  const sections = data.experience
    .map((job) => {
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
        </article>`,
        )
        .join("");

      return `
      <div>
        <div class="exp-company">
          <span class="exp-company-mark" aria-hidden="true">${job.company.charAt(0)}</span>
          <div class="exp-company-info">
            <h3 class="exp-company-name">${job.company}</h3>
            <div class="exp-role">${job.role}</div>
          </div>
          <span class="exp-period">${job.period}</span>
        </div>
        <div class="exp-highlights">
          ${job.highlights.map((h) => `<span class="chip">${h}</span>`).join("")}
        </div>
        <div class="exp-projects">${projects}</div>
      </div>`;
    })
    .join("");

  root.innerHTML = `
    <div class="panel-header">
      <span class="panel-title">Experience</span>
      <span class="panel-index">03 / work</span>
    </div>
    <div class="panel-body">${sections}</div>`;
}
