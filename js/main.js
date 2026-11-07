/** Orchestrator: wires header, nav, theme, interactions, and sections. */
import { initThemeToggle } from "./theme.js";
import { icons } from "./icons.js";
import { initCommandPalette } from "./palette.js";
import { renderHero } from "./components/hero.js?v=20261107-24";
import { renderExperience } from "./components/experience.js?v=20261107-24";
import { renderSkills } from "./components/skills.js?v=20261107-24";
import { renderProjects } from "./components/projects.js?v=20261107-24";
import { renderTestimonials } from "./components/testimonials.js?v=20261107-24";
import { renderEducation } from "./components/education.js";
import { renderContact } from "./components/contact.js";

const data = window.PORTFOLIO;

// ── Document meta ──────────────────────────────────────────
document.title = data.meta.title;
document.getElementById("meta-description").content = data.meta.description;

// ── Header / nav ───────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Experience", href: "#experience-panel" },
  { label: "Skills", href: "#skills-panel" },
  { label: "Projects", href: "#projects-panel" },
  { label: "Education", href: "#education-panel" },
  { label: "Contact", href: "#contact-panel" },
];

const navHtml = NAV_ITEMS.map((i) => `<a href="${i.href}">${i.label}</a>`).join("");
document.getElementById("site-nav").innerHTML = navHtml;
document.getElementById("mobile-nav").innerHTML = navHtml;

const navToggle = document.getElementById("nav-toggle");
const mobileNav = document.getElementById("mobile-nav");
navToggle.innerHTML = icons.menu;
navToggle.addEventListener("click", () => {
  const open = mobileNav.hasAttribute("hidden");
  if (open) {
    mobileNav.removeAttribute("hidden");
    navToggle.innerHTML = icons.close;
  } else {
    mobileNav.setAttribute("hidden", "");
    navToggle.innerHTML = icons.menu;
  }
  navToggle.setAttribute("aria-expanded", String(open));
});
mobileNav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    mobileNav.setAttribute("hidden", "");
    navToggle.innerHTML = icons.menu;
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// ── Smooth in-page navigation ──────────────────────────────
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const hash = link.getAttribute("href");
  if (!hash || hash === "#") return;

  const target = document.querySelector(hash);
  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({
    behavior: reducedMotion.matches ? "auto" : "smooth",
    block: "start",
  });
  history.pushState(null, "", hash);
});

initThemeToggle(document.getElementById("theme-toggle"));

// ── Sections ───────────────────────────────────────────────
renderHero(document.getElementById("hero-panel"), data);
renderExperience(document.getElementById("experience-panel"), data);
renderSkills(document.getElementById("skills-panel"), data);
renderProjects(document.getElementById("projects-panel"), data);
renderTestimonials(document.getElementById("testimonials-panel"), data);
renderEducation(document.getElementById("education-panel"), data);
renderContact(document.getElementById("contact-panel"), data);

// ── Command palette ────────────────────────────────────────
initCommandPalette({
  data,
  toggleButton: document.getElementById("palette-toggle"),
});

// ── Footer ─────────────────────────────────────────────────
document.getElementById("footer-copy").textContent =
  `© ${new Date().getFullYear()} ${data.profile.name} · ${data.profile.role}`;

document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ── Scroll progress ────────────────────────────────────────
const progress = document.getElementById("scroll-progress");
let progressFrame = 0;

function updateProgress() {
  progressFrame = 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? window.scrollY / max : 0;
  progress.style.transform = `scaleX(${Math.min(1, Math.max(0, value))})`;
}

window.addEventListener(
  "scroll",
  () => {
    if (!progressFrame) progressFrame = requestAnimationFrame(updateProgress);
  },
  { passive: true },
);
window.addEventListener("resize", updateProgress);
updateProgress();

// ── Reveal panels as they enter the viewport ───────────────
const revealTargets = [...document.querySelectorAll(".panel")].filter(
  (panel) => panel.id !== "hero-panel",
);

if ("IntersectionObserver" in window) {
  for (const panel of revealTargets) panel.classList.add("reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    },
    { threshold: 0.05, rootMargin: "0px 0px -4% 0px" },
  );

  revealTargets.forEach((panel) => revealObserver.observe(panel));

  // Safety net: never leave a panel faded if an observer callback is missed.
  window.setTimeout(() => {
    for (const panel of revealTargets) {
      const rect = panel.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        panel.classList.add("is-visible");
      }
    }
  }, 1200);
} else {
  revealTargets.forEach((panel) => panel.classList.add("is-visible"));
}

// ── Cursor spotlight on cards ──────────────────────────────
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
for (const target of document.querySelectorAll("[data-spotlight]")) {
  target.addEventListener("pointermove", (event) => {
    if (!finePointer.matches) return;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  });
  target.addEventListener("pointerleave", () => {
    target.style.removeProperty("--spot-x");
    target.style.removeProperty("--spot-y");
  });
}

// ── Scroll spy for nav highlight ───────────────────────────
const spyTargets = NAV_ITEMS.map((i) => ({
  el: document.querySelector(i.href),
  link: document.querySelector(`#site-nav a[href="${i.href}"]`),
}));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const match = spyTargets.find((t) => t.el === entry.target);
        if (!match?.link) continue;
        if (entry.isIntersecting) {
          spyTargets.forEach((t) => t.link?.removeAttribute("aria-current"));
          match.link.setAttribute("aria-current", "true");
        }
      }
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );

  spyTargets.forEach((t) => t.el && observer.observe(t.el));
}
