/** Orchestrator: wires header, nav, theme, and section rendering. */
import { initThemeToggle } from "./theme.js";
import { icons } from "./icons.js";
import { renderHero } from "./components/hero.js";
import { renderNumbers } from "./components/numbers.js";
import { renderHello } from "./components/hello.js";
import { renderExperience } from "./components/experience.js";
import { renderProjects } from "./components/projects.js";
import { renderStack } from "./components/stack.js";
import { renderEducation } from "./components/education.js";
import { renderContact } from "./components/contact.js";

const data = window.PORTFOLIO;

// ── Document meta ──────────────────────────────────────────
document.title = data.meta.title;
document.getElementById("meta-description").content = data.meta.description;

// ── Header / nav ───────────────────────────────────────────
const NAV_ITEMS = [
  { label: "About", href: "#hello-panel" },
  { label: "Experience", href: "#experience-panel" },
  { label: "Projects", href: "#projects-panel" },
  { label: "Stack", href: "#stack-panel" },
  { label: "Education", href: "#education-panel" },
  { label: "Contact", href: "#contact-panel" },
];

const navHtml = NAV_ITEMS.map((i) => `<a href="${i.href}">${i.label}</a>`).join("");
document.getElementById("site-nav").innerHTML = navHtml;
document.getElementById("mobile-nav").innerHTML = navHtml;

const headerGithub = document.getElementById("header-github");
headerGithub.href = `https://github.com/${data.githubUsername}`;
headerGithub.innerHTML = icons.github;

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

initThemeToggle(document.getElementById("theme-toggle"));

// ── Sections ───────────────────────────────────────────────
renderHero(document.getElementById("hero-panel"), data);
renderNumbers(document.getElementById("numbers-panel"), data);
renderHello(document.getElementById("hello-panel"), data);
renderExperience(document.getElementById("experience-panel"), data);
renderProjects(document.getElementById("projects-panel"), data);
renderStack(document.getElementById("stack-panel"), data);
renderEducation(document.getElementById("education-panel"), data);
renderContact(document.getElementById("contact-panel"), data);

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
    { threshold: 0.08 },
  );

  revealTargets.forEach((panel) => revealObserver.observe(panel));
}

// ── Scroll spy for nav highlight ───────────────────────────
const spyTargets = NAV_ITEMS.map((i) => ({
  el: document.querySelector(i.href),
  link: document.querySelector(`#site-nav a[href="${i.href}"]`),
}));

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
