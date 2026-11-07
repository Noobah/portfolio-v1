/** Cmd/Ctrl+K command palette: navigation + quick actions. */
import { icons } from "./icons.js";
import { getTheme, setTheme } from "./theme.js";

export function initCommandPalette({ data, toggleButton }) {
  const emailHref =
    data.socials.find((s) => s.icon === "email")?.href ?? "mailto:";
  const email = emailHref.replace(/^mailto:/, "");
  const linkedin =
    data.socials.find((s) => s.icon === "linkedin")?.href ??
    "https://linkedin.com";

  const sections = [
    ["Experience", "#experience-panel", "02"],
    ["Skills", "#skills-panel", "03"],
    ["Projects", "#projects-panel", "04"],
    ["Testimonials", "#testimonials-panel", "05"],
    ["Education", "#education-panel", "06"],
    ["Contact", "#contact-panel", "07"],
  ];

  const actions = [
    ...sections.map(([label, href, hint]) => ({
      label,
      group: "Navigate",
      hint,
      icon: icons.arrowRight,
      keywords: `${label} section jump`,
      run: () => goToSection(href),
    })),
    {
      label: "Copy email",
      group: "Actions",
      hint: email,
      icon: icons.copy,
      keywords: "email clipboard contact",
      run: copyEmail,
    },
    {
      label: "Open LinkedIn",
      group: "Actions",
      hint: "linkedin.com",
      icon: icons.linkedin,
      keywords: "work experience profile",
      run: () => openExternal(linkedin),
    },
    {
      label: "Toggle theme",
      group: "Actions",
      hint: `${getTheme()} → ${getTheme() === "dark" ? "light" : "dark"}`,
      icon: getTheme() === "dark" ? icons.sun : icons.moon,
      keywords: "dark light appearance color",
      run: toggleTheme,
    },
  ];

  const dialog = document.createElement("dialog");
  dialog.className = "palette";
  dialog.setAttribute("aria-label", "Command palette");
  dialog.innerHTML = `
    <div class="palette-panel">
      <div class="palette-search">
        ${icons.search}
        <input
          class="palette-input"
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-autocomplete="list"
          aria-activedescendant=""
          autocomplete="off"
          spellcheck="false"
          placeholder="Jump to a section or run an action…" />
        <button class="palette-close" type="button" aria-label="Close command palette">${icons.close}</button>
      </div>
      <div class="palette-list" id="palette-list" role="listbox" aria-label="Commands"></div>
      <div class="palette-footer">
        <span class="palette-status" role="status" aria-live="polite"></span>
        <span class="palette-keys"><kbd>↑</kbd><kbd>↓</kbd> navigate <kbd>↵</kbd> select <kbd>esc</kbd> close</span>
      </div>
    </div>`;
  document.body.append(dialog);

  const input = dialog.querySelector(".palette-input");
  const list = dialog.querySelector(".palette-list");
  const status = dialog.querySelector(".palette-status");
  let visible = [];
  let activeIndex = 0;
  let statusTimer;

  const setStatus = (message) => {
    status.textContent = message;
    window.clearTimeout(statusTimer);
    if (message) {
      statusTimer = window.setTimeout(() => {
        status.textContent = "";
      }, 2400);
    }
  };

  const render = (query = "") => {
    const q = query.trim().toLowerCase();
    visible = actions.filter((action) => {
      if (!q) return true;
      return `${action.label} ${action.group} ${action.keywords}`
        .toLowerCase()
        .includes(q);
    });

    activeIndex = Math.min(activeIndex, Math.max(0, visible.length - 1));

    if (!visible.length) {
      list.innerHTML = `<p class="palette-empty">No commands match “${escapeHtml(query)}”.</p>`;
      input.setAttribute("aria-activedescendant", "");
      return;
    }

    list.innerHTML = visible
      .map(
        (action, index) => `
        <div
          class="palette-item ${index === activeIndex ? "is-active" : ""}"
          id="palette-item-${index}"
          role="option"
          aria-selected="${index === activeIndex}"
          data-index="${index}">
          <span class="palette-item-icon">${action.icon}</span>
          <span class="palette-item-copy">
            <strong>${action.label}</strong>
            <span>${action.group}</span>
          </span>
          <span class="palette-item-hint">${action.hint}</span>
        </div>`,
      )
      .join("");

    input.setAttribute(
      "aria-activedescendant",
      `palette-item-${activeIndex}`,
    );
  };

  const setActive = (index) => {
    if (!visible.length) return;
    activeIndex = (index + visible.length) % visible.length;
    for (const item of list.querySelectorAll(".palette-item")) {
      const active = Number(item.dataset.index) === activeIndex;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    }
    input.setAttribute(
      "aria-activedescendant",
      `palette-item-${activeIndex}`,
    );
    list
      .querySelector(`.palette-item[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  };

  const open = () => {
    if (dialog.open) return;
    input.value = "";
    activeIndex = 0;
    setStatus("");
    render();
    dialog.showModal();
    requestAnimationFrame(() => input.focus());
  };

  const close = () => {
    if (dialog.open) dialog.close();
  };

  const runAction = (action) => {
    if (!action) return;
    action.run();
  };

  const goToSection = (hash) => {
    close();
    const target = document.querySelector(hash);
    if (!target) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
    history.replaceState(null, "", hash);
  };

  const openExternal = (href) => {
    close();
    window.open(href, "_blank", "noopener,noreferrer");
  };

  async function copyEmail() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
      setStatus("Email copied to clipboard.");
    } catch {
      setStatus("Copy failed — use the contact section.");
    }
  }

  function toggleTheme() {
    const next = getTheme() === "dark" ? "light" : "dark";
    setTheme(next);
    const action = actions.find((item) => item.label === "Toggle theme");
    if (action) {
      action.hint = `${getTheme()} → ${getTheme() === "dark" ? "light" : "dark"}`;
      action.icon = getTheme() === "dark" ? icons.sun : icons.moon;
    }
    setStatus(`Theme: ${next}.`);
    render(input.value);
  }

  input.addEventListener("input", () => {
    activeIndex = 0;
    render(input.value);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive(activeIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive(activeIndex - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      runAction(visible[activeIndex]);
    }
  });

  list.addEventListener("mousemove", (event) => {
    const item = event.target.closest(".palette-item");
    if (!item) return;
    const index = Number(item.dataset.index);
    if (index !== activeIndex) setActive(index);
  });

  list.addEventListener("click", (event) => {
    const item = event.target.closest(".palette-item");
    if (!item) return;
    runAction(visible[Number(item.dataset.index)]);
  });

  dialog
    .querySelector(".palette-close")
    .addEventListener("click", () => close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });

  dialog.addEventListener("close", () => {
    setStatus("");
  });

  document.addEventListener("keydown", (event) => {
    const isModK =
      (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
    if (!isModK) return;
    event.preventDefault();
    if (dialog.open) close();
    else open();
  });

  if (toggleButton) {
    toggleButton.addEventListener("click", open);
    toggleButton.innerHTML = `${icons.command}<span class="palette-hint">K</span>`;
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
