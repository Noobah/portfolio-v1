/** Education panel: degree cards. */
export function renderEducation(root, data) {
  const cards = data.education
    .map(
      (e, i) => `
    <article class="edu-card ${e.current ? "current" : ""}">
      <div class="edu-top">
        <span class="edu-index" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
        <span class="edu-period ${e.current ? "current" : ""}">${e.period}</span>
      </div>
      <h3 class="edu-degree">${e.degree}</h3>
      <p class="edu-school">${e.school}</p>
      ${e.highlight ? `<p class="edu-highlight">${e.highlight}</p>` : ""}
    </article>`,
    )
    .join("");

  root.innerHTML = `
    <div class="panel-header">
      <span class="panel-title">Education</span>
      <span class="panel-index">06 / academics</span>
    </div>
    <div class="panel-body">
      <div class="edu-grid">${cards}</div>
    </div>`;
}
