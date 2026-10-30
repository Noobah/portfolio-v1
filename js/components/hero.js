/** Hero panel: intro, availability, socials, and portrait. */
import { icons } from "../icons.js";

const socialIcon = {
  email: icons.mail,
  github: icons.github,
  linkedin: icons.linkedin,
};

export function renderHero(root, data) {
  const { profile, socials } = data;
  const [firstName, ...rest] = profile.name.split(" ");

  const socialsHtml = socials
    .map(
      (s) => `
      <a class="social-btn" href="${s.href}" ${s.href.startsWith("http") ? 'target="_blank" rel="noreferrer noopener"' : ""}>
        ${socialIcon[s.icon] ?? icons.github}
        <span>${s.label}</span>
      </a>`,
    )
    .join("");

  root.innerHTML = `
    <div class="hero">
      <div class="hero-copy">
        <p class="hero-eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>Portfolio — 2026</p>
        <h1 class="hero-name">
          <span>${firstName}</span>
          <span class="hero-name-rest">${rest.join(" ")}</span>
          <span class="verified" title="Verified human" aria-label="Verified">${icons.verified}</span>
        </h1>
        <p class="hero-role">
          ${profile.role}
          <span class="hero-role-sep" aria-hidden="true">/</span>
          <strong>${profile.focus}</strong>
        </p>

        <span class="hero-status">
          <span class="status-dot" aria-hidden="true"></span>
          ${profile.status}
        </span>

        <div class="hero-bio">
          ${profile.bio.map((p) => `<p>${emphasize(p)}</p>`).join("")}
        </div>

        <div class="socials">
          ${socialsHtml}
          <a class="social-btn primary" href="${profile.resumeUrl}" target="_blank" rel="noreferrer noopener">
            ${icons.file}
            <span>Resume</span>
          </a>
        </div>
      </div>

      <figure class="hero-figure">
        <div class="hero-avatar-wrap">
          <img class="hero-avatar" src="${profile.avatar}" alt="Portrait of ${profile.name}" referrerpolicy="no-referrer" width="180" height="180" />
        </div>
      </figure>
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
