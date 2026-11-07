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
      </div>
      <div class="testimonials-track" data-testimonials-track tabindex="0" aria-label="Testimonials, scroll horizontally">
        ${cards}
      </div>
    </div>`;

  const track = root.querySelector("[data-testimonials-track]");
  if (!track) return;

  // ── Auto-scroll: keeps moving, pauses on hover ──
  let timer;
  const scrollStep = () => {
    const max = track.scrollWidth - track.clientWidth;
    if (max <= 0) return;
    track.scrollLeft += 260;
    if (track.scrollLeft >= max) track.scrollLeft = 0;
  };
  timer = setInterval(scrollStep, 3400);
  track.addEventListener("mouseenter", () => clearInterval(timer));
  track.addEventListener("mouseleave", () => {
    timer = setInterval(scrollStep, 3400);
  });
}
