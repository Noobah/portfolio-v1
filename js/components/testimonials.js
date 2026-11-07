/** Testimonials panel: compact, horizontally scrollable social proof. */
import { icons } from "../icons.js";

export function renderTestimonials(root, data) {
  const total = String(data.testimonials.length).padStart(2, "0");

  const cards = data.testimonials
    .map(
      (t, index) => `
        <figure class="testimonial-card spotlight" data-spotlight>
          <div class="testimonial-card-top">
            <span class="testimonial-mark" aria-hidden="true">${icons.quote}</span>
            <span class="testimonial-number">${String(index + 1).padStart(2, "0")} / ${total}</span>
          </div>
          <blockquote class="testimonial-quote">${t.quote}</blockquote>
          <figcaption class="testimonial-author">
            <span class="testimonial-avatar" aria-hidden="true">${t.initials}</span>
            <span class="testimonial-author-copy">
              <strong>${t.name}</strong>
              <span>${t.product} · ${t.reviewedAt}</span>
            </span>
          </figcaption>
        </figure>`,
    )
    .join("");

  root.innerHTML = `
    <div class="panel-header">
      <span class="panel-title">Testimonials</span>
      <span class="panel-index">05 / what people say</span>
    </div>
    <div class="panel-body">
      <div class="testimonials-top">
        <div class="testimonials-heading">
          <p class="testimonials-intro">Real words from people using the work.</p>
          <p class="testimonial-source">
            Reviews from the
            <a href="https://addons.mozilla.org/en-US/firefox/addon/unifetch/reviews/" target="_blank" rel="noreferrer noopener">Unifetch Firefox Add-ons listing</a>.
          </p>
        </div>
        <div class="testimonials-controls">
          <button class="testimonial-control is-prev" type="button" data-testimonial-prev aria-label="Previous testimonials">
            ${icons.arrowRight}
          </button>
          <button class="testimonial-control" type="button" data-testimonial-next aria-label="Next testimonials">
            ${icons.arrowRight}
          </button>
        </div>
      </div>
      <div class="testimonials-track" data-testimonials-track tabindex="0" aria-label="Testimonials, scroll horizontally">
        ${cards}
      </div>
    </div>`;

  const track = root.querySelector("[data-testimonials-track]");
  const prev = root.querySelector("[data-testimonial-prev]");
  const next = root.querySelector("[data-testimonial-next]");

  const step = () => {
    const card = track.querySelector(".testimonial-card");
    if (!card) return track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  };

  const updateControls = () => {
    const max = track.scrollWidth - track.clientWidth - 1;
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= max;
  };

  const scrollByCard = (direction) => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({
      left: direction * step(),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  prev.addEventListener("click", () => scrollByCard(-1));
  next.addEventListener("click", () => scrollByCard(1));
  track.addEventListener("scroll", updateControls, { passive: true });
  window.addEventListener("resize", updateControls, { passive: true });
  updateControls();
}
