/** Stack panel: categorized skill pills with inlined brand icons. */
import { icons } from "../icons.js";
import { stackIcons } from "../stack-icons.js";

const inlineIcons = {
  ...stackIcons,
  openai: icons.openai,
  anthropic: icons.anthropic,
  bolt: icons.bolt,
  stream: icons.stream,
  radio: icons.radio,
  terminal: icons.terminal,
};

export function renderStack(root, data) {
  const groups = data.stack
    .map((group) => {
      const items = group.items
        .map((item) => {
          const icon = item.icon ? (inlineIcons[item.icon] ?? icons.spark) : icons.spark;
          return `<div class="stack-item"><span class="stack-icon">${icon}</span><span>${item.name}</span></div>`;
        })
        .join("");

      return `
      <div class="stack-group spotlight" data-spotlight>
        <div class="stack-category"><span class="stack-dot"></span>${group.category}</div>
        <div class="stack-items">${items}</div>
      </div>`;
    })
    .join("");

  root.innerHTML = `
    <div class="panel-header">
      <span class="panel-title">Stack</span>
      <span class="panel-index">05 / tools</span>
    </div>
    <div class="panel-body">
      <div class="stack-grid">${groups}</div>
    </div>`;
}
