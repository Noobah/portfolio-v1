/** Hero panel: cover, photo, intro, availability, about, socials, and stats. */
import { icons } from "../icons.js";

const socialIcon = {
  email: icons.mail,
  linkedin: icons.linkedin,
  github: icons.github,
};

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );

export function renderHero(root, data) {
  const { profile, socials } = data;
  const [firstName, ...rest] = profile.name.split(" ");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Random cover rotator — picks a different GIF on every load, nothing stored locally.
  const covers = profile.covers || [];
  let coverSrc = "";
  if (covers.length) {
    coverSrc = covers[Math.floor(Math.random() * covers.length)];
  } else if (profile.cover) {
    coverSrc = profile.cover;
  } else {
    coverSrc = reduceMotion
      ? "assets/hero-cover-still.jpg"
      : "assets/hero-cover.gif";
  }

  const socialsHtml = socials
    .map(
      (s) => `
      <a class="social-btn" href="${s.href}" ${s.href.startsWith("http") ? 'target="_blank" rel="noreferrer noopener"' : ""}>
        ${socialIcon[s.icon] ?? icons.mail}
        <span>${s.label}</span>
      </a>`,
    )
    .join("");

  const isExternalResume = /^https?:/i.test(profile.resume ?? "");
  const resumeHtml = profile.resume
    ? `<a class="social-btn primary" href="${profile.resume}" ${
        isExternalResume
          ? 'target="_blank" rel="noreferrer noopener"'
          : "download"
      } aria-label="Download resume as PDF">
         ${icons.download}
         <span>Download Resume</span>
       </a>`
    : "";

  const heroDetailsHtml = `
    <div class="hero-bio">
      ${profile.bio.map((p) => `<p>${emphasize(p)}</p>`).join("")}
    </div>
    <div class="socials">${socialsHtml}${resumeHtml}</div>`;

  const statsHtml = profile.stats?.length
    ? `<ul class="hero-stats" aria-label="Selected results">
         ${profile.stats
           .map(
             (stat) => `<li class="hero-stat">
               <strong>${escapeHtml(stat.value)}</strong>
               <span>${escapeHtml(stat.label)}</span>
             </li>`,
           )
           .join("")}
       </ul>`
    : "";

  const locationHtml = profile.location
    ? `<span class="hero-location">
         ${icons.pin}
         <span>${profile.location}</span>
       </span>`
    : "";

  root.innerHTML = `
    <div class="hero-cover" aria-hidden="true">
      <img
        src="${coverSrc}"
        alt=""
        loading="eager"
        decoding="async"
        onerror="this.onerror=null; this.src='assets/hero-cover-still.jpg';"
      />
    </div>
    <div class="hero">
      <div class="hero-head">
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
          ${heroDetailsHtml}
        </div>
        <div class="hero-avatar-wrap">
          <img
            class="hero-avatar"
            src="${profile.avatar}"
            alt="${profile.name}"
            width="120"
            height="120"
            loading="eager"
            decoding="async"
            draggable="false" />
          ${locationHtml}
        </div>
      </div>
    </div>
    ${statsHtml}`;
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
