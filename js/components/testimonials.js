/** Testimonials panel: small, deliberately understated social proof. */
import { icons } from "../icons.js";

export function renderTestimonials(root, data) {
  const cards = data.testimonials
    .map(
      (t) => `
    <figure class="testimonial-card spotlight" data-spotlight>
      <span class="testimonial-mark" aria-hidden="true">${icons.quote}</span>
      <blockquote class="testimonial-quote">${t.quote}</blockquote>
      <figcaption class="testimonial-author">
        <span class="testimonial-avatar" aria-hidden="true">${t.initials}</span>
        <span class="testimonial-author-copy">
          <strong>${t.name}</strong>
          <span>${t.role}</span>
        </span>
        ${t.placeholder ? '<span class="tag testimonial-tag">Placeholder</span>' : ""}
      </figcaption>
    </figure>`,
    )
    .join("");

  root.innerHTML = `
    <div class="panel-header">
      <span class="panel-title">Testimonials</span>
      <span class="panel-index">04 / what people say</span>
    </div>
    <div class="panel-body">
      <!-- TODO: replace the placeholder quotes and names in data.js. -->
      <div class="testimonials-grid">${cards}</div>
    </div>`;
}
