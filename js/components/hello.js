/** About panel: time-aware greeting + how I work. */
export function renderHello(root, data) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = data.profile.name.split(" ")[0];
  const email = data.socials.find((s) => s.icon === "email")?.href ?? "#";

  root.innerHTML = `
    <div class="panel-header">
      <span class="panel-title">About</span>
      <span class="panel-index">02 / how I work</span>
    </div>
    <div class="panel-body">
      <div class="about-grid">
        <div class="about-intro">
          <h3 class="hello-greeting">${greeting} <span class="wave" aria-hidden="true">👋</span></h3>
          <p class="about-lede">
            I'm <strong>${data.profile.name}</strong>, a ${data.profile.role} working across ${data.profile.focus}.
          </p>
          <p class="about-note">
            I care about systems that are boring in production: observable, testable, and cheap to operate.
          </p>
          <a class="about-link" href="${email}">
            Currently open to full-stack / platform work — let's talk
            <span aria-hidden="true">↗</span>
          </a>
          <p class="signature">— ${firstName}</p>
        </div>

        <ul class="about-list">
          <li>
            <span class="about-num" aria-hidden="true">01</span>
            <p><strong>Production is the spec.</strong> I optimize for systems that stay predictable under load, not just demos.</p>
          </li>
          <li>
            <span class="about-num" aria-hidden="true">02</span>
            <p><strong>Product-minded backend.</strong> I work best where architecture decisions meet real user experience.</p>
          </li>
          <li>
            <span class="about-num" aria-hidden="true">03</span>
            <p><strong>Fast feedback loops.</strong> Ship small, measure, and iterate — from no-code tools to LLM streaming.</p>
          </li>
        </ul>
      </div>
    </div>`;
}
