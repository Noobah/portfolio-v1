/** Projects panel: product cards with hover/tap case-study details. */
import { icons } from "../icons.js";

export function renderProjects(root, data) {
  const cards = data.projects
    .map((p, i) => {
      const index = String(i + 1).padStart(2, "0");
      const detailsId = `project-details-${i}`;
      const monogram = p.monogram ?? p.name.slice(0, 2).toUpperCase();

      return `
    <article class="project-card spotlight" data-spotlight style="--project-accent: ${p.accent ?? "var(--accent)"}">
      <div class="project-visual" aria-hidden="true">
        <span class="project-index">${index}</span>
        <span class="tag project-tag">${p.tag}</span>
        <span class="project-monogram">${monogram}</span>
      </div>

      <div class="project-content">
        <h3 class="project-name">${p.name}</h3>
        <p class="project-summary">${p.summary ?? p.results}</p>
        <div class="stack-row">
          ${p.stack.map((s) => `<span class="tag">${s}</span>`).join("")}
        </div>
        <div class="project-metric">
          <span class="metric-dot" aria-hidden="true"></span>
          <span>${p.metric}</span>
        </div>

        <div class="project-actions">
          <button class="project-toggle" type="button" aria-expanded="false" aria-controls="${detailsId}">
            <span>Details</span>
            ${icons.chevronDown}
          </button>
          <span class="project-foot-note">${index} / case study</span>
        </div>
      </div>

      <div class="project-details" id="${detailsId}" role="region" aria-label="${p.name} case study">
        <div class="project-details-head">
          <span class="project-details-title">${p.name} <span>/ case study</span></span>
          <button class="project-close" type="button" aria-label="Close ${p.name} details">
            ${icons.close}
          </button>
        </div>

        <div class="project-details-body">
          ${renderMedia(p, i)}
          <dl class="psl">
            <div><dt>Problem</dt><dd>${p.problem}</dd></div>
            <div><dt>Approach</dt><dd>${p.approach}</dd></div>
            <div><dt>Architecture</dt><dd>${p.architecture}</dd></div>
            <div><dt>Results</dt><dd>${p.results}</dd></div>
          </dl>
        </div>

        <div class="project-details-foot">
          <div class="project-links">
            <button class="link-btn project-expand" type="button">
              Full case study ${icons.chevronDown}
            </button>
            ${p.links
              .map((l) => {
                const icon = /github/i.test(l.label)
                  ? icons.github
                  : icons.arrowUpRight;
                return `
              <a class="link-btn ${l.primary ? "primary" : ""}" href="${l.href}" target="_blank" rel="noreferrer noopener">
                ${l.label} ${icon}
              </a>`;
              })
              .join("")}
          </div>
        </div>
      </div>
    </article>`;
    })
    .join("");

  root.innerHTML = `
    <div class="panel-header">
      <span class="panel-title">Projects</span>
      <span class="panel-index">03 / selected work</span>
    </div>
    <div class="panel-body">
      <div class="projects-grid">${cards}</div>
    </div>`;

  wireProjectDetails(root);
}

/** Renders a real screenshot/video when provided, otherwise a labelled slot. */
function renderMedia(project, index) {
  if (!project.media) return "";

  const { type = "image", src, poster, alt, note } = project.media;

  if (src && type === "video") {
    return `
      <figure class="project-media">
        <video controls muted loop playsinline preload="none" ${poster ? `poster="${poster}"` : ""} width="640" height="360" aria-label="${alt}">
          <source src="${src}" type="video/mp4" />
        </video>
        <figcaption>${alt}</figcaption>
      </figure>`;
  }

  if (src) {
    return `
      <figure class="project-media">
        <img src="${src}" alt="${alt}" loading="lazy" decoding="async" width="640" height="360" />
        <figcaption>${alt}</figcaption>
      </figure>`;
  }

  return `
    <figure class="project-media project-media--placeholder">
      <div class="media-placeholder" role="img" aria-label="${alt} — placeholder">
        <span class="media-icon">${type === "video" ? icons.play : icons.image}</span>
        <span class="media-title">${type === "video" ? "Demo video" : "Screenshot"}</span>
        <span class="media-note">${note ?? "Preview coming soon."}</span>
      </div>
      <figcaption>${alt}</figcaption>
    </figure>`;
}

/** Toggle details on tap/keyboard; pointer hover previews them on desktop. */
function wireProjectDetails(root) {
  for (const card of root.querySelectorAll(".project-card")) {
    const toggle = card.querySelector(".project-toggle");
    const close = card.querySelector(".project-close");
    const expand = card.querySelector(".project-expand");
    if (!toggle || !close) continue;

    const closeDetails = (focusToggle = false) => {
      card.classList.remove("is-open");
      card.classList.add("is-dismissed");
      toggle.setAttribute("aria-expanded", "false");
      if (focusToggle) toggle.focus();
    };

    toggle.addEventListener("click", () => {
      const open = !card.classList.contains("is-open");
      card.classList.toggle("is-open", open);
      card.classList.remove("is-dismissed");
      toggle.setAttribute("aria-expanded", String(open));
      if (open) requestAnimationFrame(() => close.focus());
    });

    close.addEventListener("click", () => closeDetails(true));

    expand?.addEventListener("click", () => {
      card.classList.add("is-open");
      card.classList.remove("is-dismissed");
      toggle.setAttribute("aria-expanded", "true");
      requestAnimationFrame(() => close.focus());
    });

    card.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") card.classList.add("is-hovered");
    });

    card.addEventListener("pointerleave", () => {
      card.classList.remove("is-hovered");
      card.classList.remove("is-dismissed");
    });

    card.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (!card.classList.contains("is-open") && !card.matches(":hover")) return;
      closeDetails(true);
    });

    card.addEventListener("focusout", (event) => {
      if (event.relatedTarget && card.contains(event.relatedTarget)) return;
      if (!card.classList.contains("is-open")) return;
      card.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  }
}
