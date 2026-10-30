/**
 * Portfolio data — edit this file to update the whole site.
 * Loaded before js/main.js and passed to each component.
 *
 * TODO (content you own): replace the placeholder testimonials and add real
 * project screenshots/videos below.
 */
window.PORTFOLIO = {
  meta: {
    title: "Ravi Bhushan V | Full Stack Engineer",
    description:
      "Full-Stack Engineer — MERN, TypeScript, AI Systems. I build scalable backend platforms, real-time APIs, and LLM-powered products.",
    url: "https://noobah.github.io/portfolio-v1/",
    ogImage: "assets/og.png",
  },

  profile: {
    name: "Ravi Bhushan V",
    role: "Full Stack Engineer",
    focus: "MERN · TypeScript · AI Systems",
    status: "Open to work",
    location: "Chennai, India",
    phone: "+91 82205 76536",
    avatar: "assets/avatar.jpg",
    bio: [
      "I build scalable backend platforms, real-time APIs, and LLM-powered products that ship fast and hold under pressure. At Fastack Technologies, I shipped systems that cut client onboarding by 87% and eliminated 10+ hours/week of manual ops — from no-code workflow engines to LLM streaming pipelines, all in production.",
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

  /** GitHub username used for profile links and the command palette. */
  githubUsername: "ivarcodes",

  experience: [
    {
      company: "Fastack Technologies",
      role: "Full Stack Engineer",
      location: "Chennai, India",
      period: "Mar 2025 — Mar 2026",
      /** Structured so the pills can count up on scroll. */
      metrics: [
        { value: 87, suffix: "%", label: "faster onboarding" },
        { value: 40, suffix: "%", label: "lower latency" },
        { value: 10, suffix: "+", label: "hrs/week saved" },
        { value: 98, suffix: "%", label: "delivery reliability" },
      ],
      projects: [
        {
          name: "Whasta Automation",
          tag: "No-Code Platform",
          description:
            "Architected a no-code workflow automation platform using React Flow + Node.js, enabling non-technical users to configure end-to-end business logic independently — cutting client onboarding time by 87% and eliminating developer dependency entirely.",
          metric: "87% faster",
          stack: ["React Flow", "Node.js", "REST APIs", "Event-Driven"],
          diagram: {
            label: "Whasta Automation request flow",
            nodes: [
              { title: "React Flow", sub: "visual builder" },
              { title: "Node.js API", sub: "validate + auth" },
              { title: "Event bus", sub: "workers + retries" },
              { title: "Integrations", sub: "WhatsApp · Tally · Odoo" },
            ],
          },
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
      monogram: "SB",
      accent: "#3b82f6",
      metric: "Token-by-token AI roadmaps",
      summary:
        "Real-time AI tutor that turns vague goals into day-by-day roadmaps.",
      problem:
        "Students have no structured way to turn vague goals into actionable, day-by-day plans. Static study guides go stale and never adapt to the learner.",
      approach:
        "Built a conversational planner that asks for the goal, current level, and timeline, then streams a personalized roadmap. Sessions persist across devices so learners can pick up where they left off.",
      architecture:
        "Next.js client → API route → Groq Llama-3 with SSE streaming → MongoDB session store. JWT auth protects routes and keeps each learner's plan private.",
      results:
        "Measurably higher engagement than static resources, with answers appearing token-by-token instead of after a long spinner. JWT-secured routes and persistent login are live in production.",
      stack: ["Next.js", "Groq AI", "MongoDB", "SSE", "JWT"],
      media: {
        type: "image",
        src: "assets/studybuddy-preview.svg",
        alt: "StudyBuddy roadmap and streaming tutor interface",
        note: "",
      },
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
      monogram: "SX",
      accent: "#06b6d4",
      metric: "<100ms raid detection",
      summary:
        "Event-driven Discord moderation with sub-100ms raid detection.",
      problem:
        "Large Discord communities are vulnerable to coordinated raids, and manual moderation is always slower than the attack.",
      approach:
        "Built an event-driven moderation bot with configurable per-server rules, a lightweight command handler, and raid detection that reacts before a channel is overrun.",
      architecture:
        "Discord gateway events → rule engine → action queue → SQLite per-guild config. A single command deploys the bot with zero manual restarts.",
      results:
        "Sub-100ms raid detection, 25% lower memory overhead from the custom command handler, and per-guild settings that persist across reboots.",
      stack: ["Node.js", "Discord.js", "SQLite", "Event-Driven"],
      media: {
        type: "image",
        src: "assets/sentrix-preview.svg",
        alt: "SentriX moderation dashboard and raid alert",
        note: "",
      },
      links: [
        {
          label: "Live Demo",
          href: "https://sentrix-pm8s.onrender.com",
          primary: true,
        },
        { label: "GitHub", href: "https://github.com/ivarcodes/sentrix" },
      ],
    },
    {
      name: "Unifetch",
      tag: "Browser Extension",
      monogram: "UF",
      accent: "#8b5cf6",
      metric: "Live on Firefox Add-ons",
      summary:
        "One-click bulk asset extraction for Firefox, live on the marketplace.",
      problem:
        "Developers waste time manually extracting assets from web pages during audits, migrations, and competitive research.",
      approach:
        "Built a Manifest V3 Firefox extension with intelligent DOM traversal that finds and downloads page assets in one click — no external dependencies.",
      architecture:
        "Content script scans the DOM → background script batches downloads → popup UI shows progress and filters. Packaged as a Manifest V3 extension.",
      results:
        "Live on the Firefox Add-ons Marketplace with real users, proving browser API depth beyond typical full-stack work.",
      stack: ["JavaScript", "Manifest V3", "DOM API"],
      media: {
        type: "image",
        src: "assets/unifetch-preview.svg",
        alt: "Unifetch extension popup extracting page assets",
        note: "",
      },
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

  /** Real reviews from the Unifetch Firefox Add-ons listing. */
  testimonials: [
    {
      quote: "Does what it advertises perfectly!",
      name: "Vanier",
      role: "Firefox Add-ons review",
      initials: "V",
      product: "UniFetch",
      reviewedAt: "Oct 30, 2026 · 10:44 PM",
      reviewUrl: "https://addons.mozilla.org/en-US/firefox/addon/unifetch/reviews/2779226/",
    },
    {
      quote:
        "Works pretty well. Grabs everything off a page fast. No ads, no fuss. Solid 4 stars.",
      name: "Pixel Neon",
      role: "Firefox Add-ons review",
      initials: "PN",
      product: "UniFetch",
      reviewedAt: "Apr 27, 2026 · 11:10 AM",
      reviewUrl: "https://addons.mozilla.org/en-US/firefox/addon/unifetch/reviews/2707862/",
    },
    {
      quote:
        "I have been using this extension for a long time. It's excellent, and I have built many projects and completed my work quickly thanks to Creator.",
      name: "wrench",
      role: "Firefox Add-ons review",
      initials: "W",
      product: "UniFetch",
      reviewedAt: "Apr 27, 2026 · 10:19 AM",
      reviewUrl: "https://addons.mozilla.org/en-US/firefox/addon/unifetch/reviews/2707852/",
    },
    {
      quote:
        "This extension is really very helpful as it lets you collect images, videos, PDFs, fonts and other files from a website in one place. You can preview items and download selected files easily. It is small, simple to use and works as expected.",
      name: "Firefox user 19770907",
      role: "Firefox Add-ons review",
      initials: "FU",
      product: "UniFetch",
      reviewedAt: "Mar 3, 2026 · 1:47 PM",
      reviewUrl: "https://addons.mozilla.org/en-US/firefox/addon/unifetch/reviews/2601293/",
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
        { name: "OpenAI API", icon: "openai" },
        { name: "Anthropic Claude", icon: "anthropic" },
        { name: "Groq / Llama-3", icon: "bolt" },
        { name: "LLM Streaming", icon: "stream" },
        { name: "SSE / WebSockets", icon: "radio" },
        { name: "Prompt Engineering", icon: "terminal" },
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
      highlight:
        "Coursework: advanced databases, distributed systems, and cloud architecture.",
    },
    {
      degree: "Bachelor of Computer Applications",
      school: "DG Vaishnav College, Chennai",
      period: "2021 — 2024",
      current: false,
      highlight:
        "Coursework: data structures, DBMS, and web technologies. Built the department's event registration portal.",
    },
  ],
};
