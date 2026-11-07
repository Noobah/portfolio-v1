/** Custom follower cursor + magnetic buttons. */
export function initCursor() {
  const ring = document.createElement("div");
  ring.className = "cursor";
  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  ring.appendChild(dot);
  document.body.appendChild(ring);

  let mouse = { x: 0, y: 0 };
  let pos = { x: 0, y: 0 };
  const lerp = (a, b, t) => a + (b - a) * t;

  const tick = () => {
    pos.x = lerp(pos.x, mouse.x, 0.18);
    pos.y = lerp(pos.y, mouse.y, 0.18);
    ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const enter = () => ring.classList.add("cursor--active");
  const leave = () => ring.classList.remove("cursor--active");

  const refresh = () => {
    const targets = document.querySelectorAll(
      "a, button, .social-btn, .link-btn, .icon-btn, .copy-btn, .testimonial-control, [role=option], details summary"
    );
    targets.forEach((el) => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
  };

  refresh();

  // Re-scan after dynamic content mounts.
  const observer = new MutationObserver(refresh);
  observer.observe(document.body, { childList: true, subtree: true });

  /** Magnetic pull toward cursor. */
  const magnets = document.querySelectorAll(
    ".social-btn, .link-btn, .icon-btn, .copy-btn, .brand"
  );
  magnets.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.35;
      const dy = (e.clientY - cy) * 0.35;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}
