/** Skills panel: one general list of skills, each with a matching icon. */
import { icons } from "../icons.js";
import { stackIcons } from "../stack-icons.js";

const iconFor = (name) => stackIcons[name] ?? icons[name] ?? icons.spark;

export function renderSkills(root, data) {
  const skills = data.stack.flatMap((group) =>
    group.items.map((item) => ({
      ...item,
      category: group.category,
      accent: group.accent ?? "var(--accent)",
    })),
  );

  const chips = skills
    .map(
      (item) => `
      <span class="skill-chip" style="--skill-accent: ${item.accent}" title="${item.category}">
        <span class="skill-chip-icon" aria-hidden="true">${iconFor(item.icon)}</span>
        <span>${item.name}</span>
      </span>`,
    )
    .join("");

  root.innerHTML = `
    <div class="panel-header">
      <span class="panel-title">Skills</span>
      <span class="panel-index">03 / tools</span>
    </div>
    <div class="panel-body">
      <div class="skills-cloud">${chips}</div>
    </div>`;
}
