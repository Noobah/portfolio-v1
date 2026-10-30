/** Testimonials panel: small, deliberately understated social proof. */
import { icons } from "../icons.js";

export function renderTestimonials(root, data) {
  const cardsMarkup = data.testimonials
    .map(
      (t, index) => `
        <figure class="testimonial-card spotlight" data-spotlight>
          <div class="testimonial-card-top">
            <span class="testimonial-mark" aria-hidden="true">${icons.quote}</span>
            <span class="testimonial-number">${String(index + 1).padStart(2, "0")} / ${String(data.testimonials.length).padStart(2, "0")}</span>
          </div>
          <blockquote class="testimonial-quote">${t.quote}</blockquote>
          <figcaption class="testimonial-author">
            <span class="testimonial-avatar" aria-hidden="true">${t.initials}</span>
            <span class="testimonial-author-copy">
              <strong>${t.name}</strong>
              <span>${t.product} · ${t.reviewedAt}</span>
            </span>
            ${t.placeholder ? '<span class="tag testimonial-tag">Placeholder</span>' : ""}
          </figcaption>
        </figure>`,
    )
    .join("");
  const duplicateCardsMarkup = data.testimonials
    .map(
      (t, index) => `
        <figure class="testimonial-card testimonial-card-duplicate" aria-hidden="true">
          <div class="testimonial-card-top">
            <span class="testimonial-mark" aria-hidden="true">${icons.quote}</span>
            <span class="testimonial-number">${String(index + 1).padStart(2, "0")} / ${String(data.testimonials.length).padStart(2, "0")}</span>
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
      <span class="panel-index">04 / what people say</span>
    </div>
    <div class="panel-body">
      <div class="testimonials-carousel">
        <div class="testimonials-carousel-heading">
          <p>Real words from people using the work.</p>
          <div class="testimonials-controls">
            <button class="testimonial-control" type="button" data-direction="-1" aria-label="Previous testimonial">←</button>
            <button class="testimonial-control" type="button" data-direction="1" aria-label="Next testimonial">→</button>
          </div>
        </div>
        <div
          class="testimonials-grid"
          tabindex="0"
          aria-label="Testimonials carousel"
          aria-describedby="testimonials-scroll-hint">${cardsMarkup}${duplicateCardsMarkup}</div>
        <p class="testimonials-scroll-hint" id="testimonials-scroll-hint">
          <span aria-hidden="true">↔</span> Drag, swipe, or use the arrows
        </p>
      </div>
      <p class="testimonial-source">
        Reviews from the
        <a href="https://addons.mozilla.org/en-US/firefox/addon/unifetch/reviews/" target="_blank" rel="noreferrer noopener">Unifetch Firefox Add-ons listing</a>.
      </p>
    </div>`;

  const carousel = root.querySelector(".testimonials-grid");
  const controls = [...root.querySelectorAll(".testimonial-control")];
  let paused = false;
  let animationFrame;
  let lastFrameTime = 0;

  const scrollToNext = (direction = 1) => {
    const firstCard = carousel.querySelector(".testimonial-card");
    const distance = firstCard ? firstCard.getBoundingClientRect().width + 16 : carousel.clientWidth;
    const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4;
    const nextPosition = direction > 0 && atEnd ? 0 : Math.max(0, carousel.scrollLeft + distance * direction);
    carousel.scrollTo({
      left: nextPosition,
      behavior: "smooth",
    });
  };

  controls.forEach((control) => {
    control.addEventListener("click", () => scrollToNext(Number(control.dataset.direction)));
  });

  const stopAutoScroll = () => {
    paused = true;
  };
  const resumeAutoScroll = () => {
    paused = false;
  };

  carousel.addEventListener("pointerenter", stopAutoScroll);
  carousel.addEventListener("pointerleave", resumeAutoScroll);
  carousel.addEventListener("focusin", stopAutoScroll);
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) resumeAutoScroll();
  });

  const animateCarousel = (time) => {
    if (!lastFrameTime) lastFrameTime = time;
    const elapsed = time - lastFrameTime;
    lastFrameTime = time;

    if (!paused) {
      const loopPoint = carousel.scrollWidth / 2;
      if (loopPoint > carousel.clientWidth) {
        const nextPosition = carousel.scrollLeft + elapsed * 0.025;
        carousel.scrollLeft = nextPosition >= loopPoint ? nextPosition - loopPoint : nextPosition;
      }
    }

    animationFrame = window.requestAnimationFrame(animateCarousel);
  };

  if (data.testimonials.length > 1) {
    animationFrame = window.requestAnimationFrame(animateCarousel);
  }

}
