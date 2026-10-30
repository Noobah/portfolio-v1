/** Orchestrator: wires header, nav, theme, interactions, and sections. */
import { initThemeToggle } from "./theme.js";
import { icons } from "./icons.js";
import { initCommandPalette } from "./palette.js";
import { renderHero } from "./components/hero.js";
import { renderHello } from "./components/hello.js";
import { renderExperience } from "./components/experience.js?v=20261030-9";
import { renderProjects } from "./components/projects.js?v=20261030-9";
import { renderTestimonials } from "./components/testimonials.js";
import { renderStack } from "./components/stack.js";
import { renderEducation } from "./components/education.js";
import { renderContact } from "./components/contact.js";

const data = window.PORTFOLIO;
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

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
renderHello(document.getElementById("hello-panel"), data);
renderExperience(document.getElementById("experience-panel"), data);
renderProjects(document.getElementById("projects-panel"), data);
renderTestimonials(document.getElementById("testimonials-panel"), data);
renderStack(document.getElementById("stack-panel"), data);
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

// ── Count-up metrics ───────────────────────────────────────
const counters = [...document.querySelectorAll("[data-count]")];

function finishCounter(el) {
  const target = Number(el.dataset.count);
  el.textContent = `${target}${el.dataset.suffix ?? ""}`;
}

function animateCounter(el) {
  if (prefersReducedMotion.matches) {
    finishCounter(el);
    return;
  }

  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix ?? "";
  const duration = 900;
  const start = performance.now();

  const tick = (now) => {
    const progressValue = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progressValue, 3);
    el.textContent = `${Math.round(target * eased)}${suffix}`;
    if (progressValue < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

if (counters.length) {
  if (!("IntersectionObserver" in window)) {
    counters.forEach(finishCounter);
  } else {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.7 },
    );
    counters.forEach((counter) => counterObserver.observe(counter));
  }
}

// ── Experience timeline fill ───────────────────────────────
const timelines = [...document.querySelectorAll("[data-timeline]")];
let timelineFrame = 0;

function updateTimelines() {
  timelineFrame = 0;
  const anchor = window.innerHeight * 0.72;
  for (const timeline of timelines) {
    const rect = timeline.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
    const value = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
    timeline.style.setProperty("--timeline-fill", value.toFixed(3));
  }
}

if (timelines.length) {
  window.addEventListener(
    "scroll",
    () => {
      if (!timelineFrame) timelineFrame = requestAnimationFrame(updateTimelines);
    },
    { passive: true },
  );
  window.addEventListener("resize", updateTimelines);
  updateTimelines();
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
