/** Contact panel: direct email, copy-to-clipboard, and socials. */
import { icons } from "../icons.js";

const socialIcon = {
  github: icons.github,
  linkedin: icons.linkedin,
};

export function renderContact(root, data) {
  const emailHref =
    data.socials.find((s) => s.icon === "email")?.href ?? "mailto:";
  const email = emailHref.replace(/^mailto:/, "");
  const socials = data.socials
    .filter((s) => s.icon !== "email")
    .map(
      (s) => `
      <a class="contact-social" href="${s.href}" target="_blank" rel="noreferrer noopener">
        ${socialIcon[s.icon] ?? icons.github}
        <span>${s.label}</span>
      </a>`,
    )
    .join("");

  root.innerHTML = `
    <div class="panel-header">
      <span class="panel-title">Contact</span>
      <span class="panel-index">07 / say hello</span>
    </div>
    <div class="panel-body">
      <div class="contact">
        <div class="contact-copy">
          <p class="contact-kicker">// open to work</p>
          <h2 class="contact-title">Let's build something<br /><span>that holds up.</span></h2>
          <p class="contact-note">
            I'm open to full-stack and platform roles. The fastest way to reach me is email.
          </p>
        </div>

        <div class="contact-actions">
          <a class="contact-email" href="${emailHref}">
            <span>${email}</span>
            <span class="contact-arrow" aria-hidden="true">${icons.arrowUpRight}</span>
          </a>
          <div class="contact-row">
            <button class="copy-btn" type="button" data-copy-email aria-live="polite">
              ${icons.copy}
              <span class="copy-label">Copy email</span>
            </button>
            <div class="contact-socials">${socials}</div>
          </div>
        </div>
      </div>
    </div>`;

  const copyButton = root.querySelector("[data-copy-email]");
  if (!copyButton || !email) return;

  copyButton.addEventListener("click", async () => {
    try {
      await copyEmail(email);
      showCopied(copyButton);
    } catch {
      setCopyLabel(copyButton, "Copy failed");
    }
  });
}

async function copyEmail(email) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(email);
      return;
    } catch {
      /* fall through to the legacy path */
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = email;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function setCopyLabel(button, text) {
  const label = button.querySelector(".copy-label");
  if (label) {
    label.textContent = text;
  } else {
    button.textContent = text;
  }
}

function showCopied(button) {
  setCopyLabel(button, "Copied ✓");
  button.classList.add("is-copied");
  window.setTimeout(() => {
    setCopyLabel(button, "Copy email");
    button.classList.remove("is-copied");
  }, 1800);
}
