/** Experience panel: foldable company summary, achievements, and learnings. */
import { icons } from "../icons.js";

/** Wraps metric figures and key tech in <strong> for emphasis. */
const strong = (text) =>
  text.replace(
    /(\d+%|\d+\+ hours?\/week|MERN|TypeScript|Node\.js\/Express|MongoDB|React Flow \+ Node\.js|XML parsing|Odoo API|SSE|WhatsApp Cloud API|RBAC)/g,
    "<strong>$&</strong>",
  );

export function renderExperience(root, data) {
  const items = data.experience
    .map((job) => {
      const did = job.did?.length
        ? `<div class="exp-block">
             <span class="exp-label">What I did</span>
             <ul class="exp-bullets">${job.did.map((item) => `<li>${strong(item)}</li>`).join("")}</ul>
           </div>`
        : "";

      const learned = job.learned?.length
        ? `<div class="exp-block">
             <span class="exp-label">What I learned</span>
             <ul class="exp-bullets">${job.learned.map((h) => `<li>${strong(h)}</li>`).join("")}</ul>
           </div>`
        : "";

      return `
      <article class="exp-item">
        <div class="exp-head">
          <div class="exp-company-info">
            <h3 class="exp-company-name">${job.company}</h3>
            <p class="exp-role">${job.role}</p>
          </div>
          <div class="exp-meta">
            <span class="exp-period">${job.period}</span>
            <span class="exp-location">${job.location}</span>
          </div>
        </div>
        <details class="exp-more">
          <summary class="exp-teaser">
            <span class="exp-summary">${job.summary ?? ""}</span>
            <span class="exp-toggle" aria-hidden="true">${icons.arrowRight}</span>
          </summary>
          <div class="exp-body">
            ${did}
            ${learned}
          </div>
        </details>
      </article>`;
    })
    .join("");

  root.innerHTML = `
    <div class="panel-header">
      <span class="panel-title">Experience</span>
      <span class="panel-index">02 / work</span>
    </div>
    <div class="panel-body">
      <div class="exp-list">${items}</div>
    </div>`;
}
