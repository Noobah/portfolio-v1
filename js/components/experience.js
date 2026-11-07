/** Experience panel: company details and a compact list of shipped work. */

/** Wraps metric figures and key tech in <strong> for emphasis. */
const strong = (text) =>
  text.replace(
    /(\d+%|\d+\+ hours?\/week|React Flow \+ Node\.js|Tally Prime \(XML\)|Odoo|SSE|WhatsApp Cloud API|OAuth 2\.0|retry logic)/g,
    "<strong>$&</strong>",
  );

export function renderExperience(root, data) {
  const items = data.experience
    .map((job) => {
      const projects = job.projects?.length
        ? `<div class="exp-block">
             <span class="exp-label">What I did</span>
             <ul class="exp-projects">
               ${job.projects
                 .map(
                   (project) => `<li class="exp-project">
                       <p class="exp-project-desc">${strong(project.description)}</p>
                     </li>`,
                 )
                 .join("")}
             </ul>
           </div>`
        : "";

      return `
      <details class="exp-entry" open>
        <summary class="exp-head">
          <div class="exp-company-info">
            <div class="exp-company-line">
              <h3 class="exp-company-name">${job.company}</h3>
              <span class="exp-status">
                <span class="exp-status-dot"></span>
                Completed
              </span>
            </div>
            <p class="exp-role">${job.role}</p>
          </div>
          <div class="exp-meta">
            <span class="exp-period">${job.period}</span>
            <span class="exp-location">${job.location}</span>
          </div>
          <span class="exp-toggle" aria-hidden="true">
            <span aria-hidden="true"></span>
          </span>
        </summary>

        <div class="exp-details">
          ${projects}
        </div>
      </details>`;
    })
    .join("");

  root.innerHTML = `
    <div class="exp-reference">
      <h2 class="exp-section-title">Experience</h2>
      <div class="exp-list">${items}</div>
    </div>`;
}
