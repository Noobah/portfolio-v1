/** Stack panel: categorized skill pills with icons. */
export function renderStack(root, data) {
  const groups = data.stack
    .map((group) => {
      const items = group.items
        .map((item) => {
          const icon = item.icon
            ? `<img src="https://skillicons.dev/icons?i=${item.icon}" alt="" loading="lazy" width="20" height="20" />`
            : `<span class="stack-glyph" aria-hidden="true">⬡</span>`;
          return `<div class="stack-item">${icon}<span>${item.name}</span></div>`;
        })
        .join("");

      return `
      <div>
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
