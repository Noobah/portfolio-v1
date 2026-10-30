/**
 * Portfolio data — edit this file to update the whole site.
 * Loaded by js/main.js and passed to each component.
 */
window.PORTFOLIO = {
  meta: {
    title: "Ravi Bhushan V | Full Stack Engineer",
    description:
      "Full-Stack Engineer — MERN, TypeScript, AI Systems. I build scalable backend platforms, real-time APIs, and LLM-powered products.",
  },

  profile: {
    name: "Ravi Bhushan V",
    role: "Full Stack Engineer",
    focus: "MERN · TypeScript · AI Systems",
    status: "Open to work",
    avatar:
      "https://lh3.googleusercontent.com/d/1iGgigIazLdAzkOlTBiIJxiYZDZhLVrji",
    bio: [
      "I build scalable backend platforms, real-time APIs, and LLM-powered products that ship fast and hold under pressure. At Fastack Technologies, I shipped systems that cut client onboarding by 87% and eliminated 10+ hours/week of manual ops — from no-code workflow engines to LLM streaming pipelines, all in production.",
      "I work best at the intersection of backend systems and product thinking — from architecture decisions to zero-downtime deployments.",
    ],
    resumeUrl:
      "https://drive.google.com/file/d/13fDBy4ZFwMy8nQl_brfDBZAdpAqP3hZa/view?usp=sharing",
  },

  socials: [
    { label: "Gmail", href: "mailto:rbhushan1122@gmail.com", icon: "email" },
    { label: "GitHub", href: "https://github.com/ivarcodes", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/ravibhushanv",
      icon: "linkedin",
    },
  ],

  /** GitHub username used for the live contributions graph. */
  githubUsername: "ivarcodes",

  numbers: [
    { value: "87%", label: "faster client onboarding" },
    { value: "10+", label: "hours/week of ops eliminated" },
    { value: "40%", label: "lower LLM first-token latency" },
    { value: "98%", label: "notification delivery reliability" },
  ],

  experience: [
    {
      company: "Fastack Technologies",
      role: "Full Stack Engineer",
      period: "Mar 2025 — Mar 2026",
      highlights: [
        "87% faster onboarding",
        "40% lower latency",
        "10+ hrs/week saved",
        "98% delivery reliability",
      ],
      projects: [
        {
          name: "Whasta Automation",
          tag: "No-Code Platform",
          description:
            "Architected a no-code workflow automation platform using React Flow + Node.js, enabling non-technical users to configure end-to-end business logic independently — cutting client onboarding time by 87% and eliminating developer dependency entirely.",
          metric: "87% faster",
          stack: ["React Flow", "Node.js", "REST APIs", "Event-Driven"],
        },
        {
          name: "Docsync Engine",
          tag: "Data Sync",
          description:
            "Built a bidirectional sync bridge between Tally Prime (XML) and Odoo using Python/Django, eliminating 10+ hours/week of manual financial reconciliation and reducing reporting errors across client operations.",
          metric: "10+ hrs saved",
          stack: ["Python", "Django", "XML Parsing", "Odoo API"],
        },
        {
          name: "LucaGPT Mobile",
          tag: "AI / LLM",
          description:
            "Optimized LLM streaming pipelines via SSE and request batching, achieving a 40% reduction in time-to-first-token and significantly improving perceived responsiveness on mobile.",
          metric: "40% faster",
          stack: ["SSE", "LLM Streaming", "Node.js", "React Native"],
        },
        {
          name: "Solocrane",
          tag: "Integrations",
          description:
            "Integrated WhatsApp Cloud API with OAuth 2.0 and exponential retry logic, achieving 98% notification delivery reliability with zero unauthorized-access incidents post-launch.",
          metric: "98% reliable",
          stack: ["WhatsApp API", "OAuth 2.0", "RBAC", "Retry Logic"],
        },
      ],
    },
  ],

  projects: [
    {
      name: "StudyBuddy",
      tag: "AI EdTech",
      problem:
        "Students have no structured way to turn vague goals into actionable, day-by-day plans.",
      solution:
        "Real-time AI tutor using Llama-3 via Groq with SSE streaming — generates personalized roadmaps token-by-token with MongoDB-backed cross-device session persistence.",
      impact:
        "Measurably higher engagement vs. static resources. JWT-secured with protected routes and persistent login.",
      stack: ["Next.js", "Groq AI", "MongoDB", "SSE", "JWT"],
      links: [
        {
          label: "Live Demo",
          href: "https://studybuddy-sigma-rose.vercel.app/",
          primary: true,
        },
        {
          label: "GitHub",
          href: "https://github.com/ivarcodes/studybuddy",
        },
      ],
    },
    {
      name: "SentriX",
      tag: "Security",
      problem:
        "Large Discord communities are vulnerable to coordinated raids with no fast automated response.",
      solution:
        "Event-driven moderation bot with <100ms raid detection latency, per-server configurable rule sets, and a custom command handler reducing memory overhead by 25%.",
      impact:
        "Zero manual restarts — deployable with a single command. SQLite-backed per-guild config persists across reboots.",
      stack: ["Node.js", "Discord.js", "SQLite", "Event-Driven"],
      links: [
        { label: "Live Demo", href: "https://sentrix-pm8s.onrender.com", primary: true },
        { label: "GitHub", href: "https://github.com/ivarcodes/sentrix" },
      ],
    },
    {
      name: "Unifetch",
      tag: "Browser Extension",
      problem:
        "Developers waste time manually extracting assets from web pages during audits and development.",
      solution:
        "Manifest V3 Firefox extension with intelligent DOM traversal for one-click bulk asset extraction — zero external dependencies.",
      impact:
        "Live on the Firefox Add-ons Marketplace with real users. Demonstrates browser API depth beyond typical full-stack work.",
      stack: ["JavaScript", "Manifest V3", "DOM API"],
      links: [
        {
          label: "Marketplace",
          href: "https://addons.mozilla.org/en-US/firefox/addon/unifetch/",
          primary: true,
        },
        { label: "GitHub", href: "https://github.com/ivarcodes" },
      ],
    },
  ],

  stack: [
    {
      category: "Frontend",
      items: [
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "TypeScript", icon: "ts" },
        { name: "JavaScript", icon: "javascript" },
        { name: "Tailwind", icon: "tailwind" },
        { name: "Redux", icon: "redux" },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", icon: "nodejs" },
        { name: "Express", icon: "express" },
        { name: "MongoDB", icon: "mongodb" },
        { name: "Redis", icon: "redis" },
        { name: "Postgres", icon: "postgresql" },
        { name: "Firebase", icon: "firebase" },
      ],
    },
    {
      category: "AI / GenAI",
      items: [
        { name: "OpenAI API" },
        { name: "Anthropic Claude" },
        { name: "Groq / Llama-3" },
        { name: "LLM Streaming" },
        { name: "SSE / WebSockets" },
        { name: "Prompt Engineering" },
      ],
    },
    {
      category: "DevOps",
      items: [
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
        { name: "Vercel", icon: "vercel" },
        { name: "Render", icon: "render" },
        { name: "Docker", icon: "docker" },
        { name: "Linux", icon: "linux" },
        { name: "Postman", icon: "postman" },
      ],
    },
  ],

  education: [
    {
      degree: "Master of Computer Applications",
      school: "Sikkim Manipal University",
      period: "2025 — Present",
      current: true,
    },
    {
      degree: "Bachelor of Computer Applications",
      school: "DG Vaishnav College, Chennai",
      period: "2021 — 2024",
      current: false,
    },
  ],
};
