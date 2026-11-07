/** Hero panel: cover, photo, intro, location, and socials. */
import { icons } from "../icons.js";

const socialIcon = {
  email: icons.mail,
  linkedin: icons.linkedin,
};

export function renderHero(root, data) {
  const { profile, socials } = data;
  const [firstName, ...rest] = profile.name.split(" ");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coverSrc = reduceMotion
    ? "assets/hero-cover-still.jpg"
    : "assets/hero-cover.gif";

  const socialsHtml = socials
    .map(
      (s) => `
      <a class="social-btn" href="${s.href}" ${s.href.startsWith("http") ? 'target="_blank" rel="noreferrer noopener"' : ""}>
        ${socialIcon[s.icon] ?? icons.mail}
        <span>${s.label}</span>
      </a>`,
    )
    .join("");

  const locationHtml = profile.location
    ? `<span class="hero-location">
         ${icons.pin}
         <span>${profile.location}</span>
         <span class="hero-photo-arrow" aria-hidden="true">${icons.arrowCurve}</span>
       </span>`
    : "";

  root.innerHTML = `
    <div class="hero-cover" aria-hidden="true">
      <img src="${coverSrc}" alt="" loading="eager" decoding="async" />
    </div>
    <div class="hero">
      <div class="hero-head">
        <div class="hero-avatar-wrap">
          <img
            class="hero-avatar"
            src="${profile.avatar}"
            alt="${profile.name}"
            width="112"
            height="112"
            loading="eager"
            decoding="async"
            draggable="false" />
          ${locationHtml}
        </div>
        <div class="hero-copy">
          <h1 class="hero-name">
            <span>${firstName}</span>
            <span class="hero-name-rest">${rest.join(" ")}</span>
          </h1>
          <p class="hero-role">
            ${profile.role}
            <span class="hero-role-sep" aria-hidden="true">/</span>
            <strong>${profile.focus}</strong>
          </p>
        </div>
      </div>

      <div class="hero-bio">
        ${profile.bio.map((p) => `<p>${emphasize(p)}</p>`).join("")}
      </div>

      <div class="socials">${socialsHtml}</div>
    </div>`;
}

/** Wraps %s and hour figures in <strong> for a little emphasis. */
function emphasize(text) {
  return text
    .replace(/(\d+%)|(\d+\+ hours\/week)/g, "<strong>$&</strong>")
    .replace(
      /(React Flow \+ Node\.js|Tally Prime \(XML\) and Odoo|SSE and request batching|WhatsApp Cloud API|Llama-3 via Groq)/g,
      "<strong>$&</strong>",
    );
}
