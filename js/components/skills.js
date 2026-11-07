/** Skills panel: grouped skill pills with matching icons. */
import { icons } from "../icons.js";
import { stackIcons } from "../stack-icons.js";

const iconFor = (name) => stackIcons[name] ?? icons[name] ?? icons.spark;
const slug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function renderSkills(root, data) {
  const groups = data.stack
    .map((group) => {
      const groupId = `skill-group-${slug(group.category)}`;
      const chips = group.items
        .map(
          (item) => `
          <span class="skill-chip" style="--skill-accent: ${group.accent ?? "var(--accent)"}">
            <span class="skill-chip-icon" aria-hidden="true">${iconFor(item.icon)}</span>
            <span>${item.name}</span>
          </span>`,
        )
        .join("");

      return `
      <section class="skill-group" aria-labelledby="${groupId}">
        <h3 class="skill-group-title" id="${groupId}">
          <span class="skill-group-icon" aria-hidden="true">${icons[group.icon] ?? icons.layers}</span>
          ${group.category}
        </h3>
        <div class="skill-group-items">${chips}</div>
      </section>`;
    })
    .join("");

  root.innerHTML = `
    <div class="panel-header">
      <span class="panel-title">Skills</span>
      <span class="panel-index">03 / tools</span>
    </div>
    <div class="panel-body">
      <div class="skill-groups">${groups}</div>
    </div>`;
}
