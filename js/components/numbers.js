/** Numbers panel: impact stats with a count-up on first view. */
export function renderNumbers(root, data) {
  const cells = data.numbers
    .map((n, i) => {
      const match = String(n.value).match(/^(\d+)(.*)$/);
      const value = match ? match[1] : n.value;
      const suffix = match ? match[2] : "";

      return `
        <div class="number-cell">
          <span class="number-index" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
          <div class="number-value">
            <span class="number-num" data-target="${value}">${value}</span>
            <span class="number-suffix">${suffix}</span>
          </div>
          <div class="number-label">${n.label}</div>
        </div>`;
    })
    .join("");

  root.innerHTML = `
    <div class="panel-header">
      <span class="panel-title">By the numbers</span>
      <span class="panel-index">01 / impact</span>
    </div>
    <div class="panel-body">
      <div class="numbers-grid">${cells}</div>
    </div>`;

  animateNumbers(root);
}

/** Counts each figure up from zero when it scrolls into view. */
function animateNumbers(root) {
  const figures = [...root.querySelectorAll(".number-num")];
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        const target = Number(el.dataset.target);
        if (!Number.isFinite(target)) continue;

        const start = performance.now();
        const duration = 900;

        const tick = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = String(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    },
    { threshold: 0.6 },
  );

  for (const figure of figures) {
    figure.textContent = "0";
    observer.observe(figure);
  }
}
