/**
 * Portfolio data — edit this file to update the whole site.
 * Loaded before js/main.js and passed to each component.
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
    location: "Chennai, India",
    avatar: "assets/avatar.jpg",
    bio: [
      "I build scalable backend platforms, real-time APIs, and LLM-powered products that ship fast and hold up under pressure. At Fastack Technologies, I cut client onboarding by 87% and saved 10+ hours/week of manual ops.",
    ],
  },

  socials: [
    { label: "Gmail", href: "mailto:rbhushan1122@gmail.com", icon: "email" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/ravibhushanv",
      icon: "linkedin",
    },
  ],

  experience: [
    {
      company: "Fastack Technologies",
      role: "Full Stack Engineer",
      location: "Chennai, India",
      period: "Mar 2025 — Mar 2026",
      summary:
        "Shipped full-stack features across React, TypeScript, Node.js, and MongoDB — from data models to production UI.",
      did: [
        "Owned full-stack delivery across the MERN stack — React and React Native interfaces, TypeScript, Node.js/Express APIs, and MongoDB data models — taking features from schema design to production UI.",
        "Architected a no-code workflow automation platform using React Flow + Node.js, enabling non-technical users to configure end-to-end business logic independently — cutting client onboarding time by 87% and eliminating developer dependency entirely.",
        "Built a bidirectional sync bridge between Tally Prime (XML) and Odoo, mapping records with XML parsing and the Odoo API — eliminating 10+ hours/week of manual financial reconciliation and reducing reporting errors across client operations.",
        "Optimized LLM streaming pipelines via SSE and request batching, achieving a 40% reduction in time-to-first-token and significantly improving perceived responsiveness on mobile.",
        "Integrated WhatsApp Cloud API with OAuth 2.0, RBAC, and exponential retry logic, achieving 98% notification delivery reliability with zero unauthorized-access incidents post-launch.",
      ],
      learned: [
        "Event-driven architecture, queue/retry design, and building configurable no-code abstractions for non-technical users.",
        "Shipping LLM streaming in production: SSE, request batching, and optimizing time-to-first-token on mobile networks.",
        "Third-party integrations at scale: OAuth 2.0, RBAC, webhook retries, and keeping data in sync across systems.",
        "Mapping data across heterogeneous systems: XML parsing, Odoo records, and reconciliation-safe sync.",
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
      icon: "layers",
      accent: "#3b82f6",
      items: [
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "TypeScript", icon: "ts" },
        { name: "JavaScript", icon: "javascript" },
        { name: "Tailwind CSS", icon: "tailwind" },
        { name: "Redux", icon: "redux" },
      ],
    },
    {
      category: "Backend",
      icon: "server",
      accent: "#0891b2",
      items: [
        { name: "Node.js", icon: "nodejs" },
        { name: "Express", icon: "express" },
        { name: "REST APIs", icon: "server" },
        { name: "WebSockets", icon: "radio" },
      ],
    },
    {
      category: "Databases",
      icon: "database",
      accent: "#8b5cf6",
      items: [
        { name: "MongoDB", icon: "mongodb" },
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "Redis", icon: "redis" },
        { name: "Firebase", icon: "firebase" },
      ],
    },
    {
      category: "DevOps & Tools",
      icon: "terminal",
      accent: "#16a34a",
      items: [
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
        { name: "Docker", icon: "docker" },
        { name: "Linux", icon: "linux" },
        { name: "Vercel", icon: "vercel" },
        { name: "Render", icon: "render" },
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
