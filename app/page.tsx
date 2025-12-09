// app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

// Hero: interactive network (lines + nodes)
const heroParticlesOptions: any = {
  background: {
    color: "#000000",
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: {
        distance: 150,
        links: { opacity: 1 },
      },
      push: { quantity: 4 },
    },
  },
  particles: {
    number: {
      value: 350,
      density: { enable: true, area: 500 },
    },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: {
      value: 0.8,
      random: true,
    },
    size: {
      value: 3,
      random: true,
    },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.7,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      outModes: { default: "out" },
    },
  },
  detectRetina: true,
};

// Footer: dense starfield, no links, no interaction
const footerParticlesOptions: any = {
  background: {
    color: "#000000",
  },
  fpsLimit: 60,
  particles: {
    number: {
      value: 2000, // more "stars"
      density: { enable: true, area: 700 },
    },
    color: { value: "#ffffff" },
    // 🔽 DIAMOND-SHAPED STARS
  shape: {
    type: "polygon",
    options: {
      polygon: {
        sides: 4, // square
      },
    },
  },

  // 🔽 ROTATE THE SQUARE 45° SO IT LOOKS LIKE A DIAMOND
  rotate: {
    value: 45,
    direction: "clockwise",
    animation: {
      enable: false,
      speed: 0,
    },
  },
    opacity: {
      value: { min: 0.8, max: 1 },
    },
    size: {
      value: { min: 0.7, max: 1.8 },
    },
    move: {
      enable: true,
      speed: 0.25,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
    links: {
      enable: false,
    },
  },
  interactivity: {
    events: {
      onHover: { enable: false, mode: [] },
      onClick: { enable: false, mode: [] },
      resize: true,
    },
  },
  detectRetina: true,
};


/* ------------ SVG icons for buttons ------------ */

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v.2l8 5 8-5V7H4zm0 2.9V17h16V9.9l-8 5-8-5z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <rect x="3" y="3" width="18" height="18" rx="2.2" />
      <circle cx="8" cy="8" r="1.2" fill="#020617" />
      <rect x="7" y="10" width="2.2" height="7" fill="#020617" />
      <path
        d="M11.2 10h2.1v1c.3-.6.9-1.2 1.9-1.2 1.5 0 2.5 1 2.5 3v4.2h-2.2V13c0-1-.4-1.6-1.2-1.6-.8 0-1.3.6-1.3 1.8v3h-2.1V10z"
        fill="#020617"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M12 .5C6.5.5 2 5 2 10.6c0 4.5 2.9 8.3 6.9 9.7.5.1.7-.2.7-.5v-1.9c-2.8.7-3.4-1.3-3.4-1.3-.4-.9-.9-1.1-.9-1.1-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.4.7.1-.5.3-.9.5-1.1-2.2-.3-4.5-1.2-4.5-4.9 0-1.1.4-2 .9-2.7-.1-.3-.4-1.2.1-2.5 0 0 .8-.3 2.6.9.8-.2 1.5-.3 2.3-.3s1.6.1 2.3.3c1.8-1.2 2.6-.9 2.6-.9.5 1.3.2 2.2.1 2.5.6.7.9 1.6.9 2.7 0 3.7-2.3 4.6-4.5 4.9.3.3.5.8.5 1.7v2.4c0 .3.2.6.7.5 4-1.4 6.9-5.2 6.9-9.7C22 5 17.5.5 12 .5z" />
    </svg>
  );
}

/* --------------------- Page wrapper --------------------- */

export default function Home() {
  const [particlesReady, setParticlesReady] = useState(false);

  // initialize tsParticles engine once for the whole app
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => {
      setParticlesReady(true);
    });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-black text-slate-100">
        <Header />

        <main className="max-w-6xl mx-auto px-4 pt-16 pb-4 space-y-8">
          <Hero particlesReady={particlesReady} />
          <Experience />
          <Projects />
          <Skills />
          <Contact particlesReady={particlesReady} />
        </main>
      </div>

      <GlobalStyles />
    </>
  );
}

/* ----------------------- Header ----------------------- */

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-900/30 bg-slate-950/10 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm">
        <a href="#top" className="font-semibold tracking-tight">
          Syed Faizan Ahmed
        </a>

        <div className="hidden gap-6 text-slate-300 sm:flex">
          <a href="#about" className="hover:text-sky-400">
            About
          </a>
          <a href="#experience" className="hover:text-sky-400">
            Experience
          </a>
          <a href="#projects" className="hover:text-sky-400">
            Projects
          </a>
          <a href="#skills" className="hover:text-sky-400">
            Skills
          </a>
          <a href="#contact" className="font-medium hover:text-sky-400">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ----------------------- Hero ----------------------- */

function Hero({ particlesReady }: { particlesReady: boolean }) {
  const hellos = [
    "Hello World!",
    "Bonjour le monde!",
    "Hola Mundo!",
    "नमस्ते दुनिया!",
    "مرحبا بالعالم!",
    "こんにちは世界！",
  ];
  const [helloIndex, setHelloIndex] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current = (current + 1) % hellos.length;
      setHelloIndex(current);
      if (current === 0) clearInterval(interval);
    }, 1300);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="hero-section">
      {/* Particles background using your JSON file */}
      {particlesReady && (
        <Particles
          id="heroParticles"
          className="hero-particles"
          options={heroParticlesOptions}
        />
      )}

      {/* content centered on top */}
      <div className="hero-inner max-w-6xl mx-auto px-4 space-y-10">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]">
          {/* Left: rectangular photo with animated border */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-sky-500/35 via-fuchsia-500/25 to-rose-500/25 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] hero-photo-frame">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/faizan(1).png"
                  alt="Syed Faizan Ahmed"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div className="space-y-6">
            {/* animated hello badge */}
            <div className="inline-flex items-center rounded-full bg-slate-900/80 px-4 py-1.5 text-sm sm:text-base border border-slate-700/70 shadow-sm shadow-slate-900/60">
              <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{hellos[helloIndex]}</span>
            </div>

            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              I&apos;m Syed Faizan Ahmed.
            </h1>

            <p className="text-lg font-medium">
              <span className="gradient-subtitle">
                Jr. SOC Analyst · L1/L2 Support · Security-focused
              </span>
            </p>

            <p className="max-w-xl text-base text-slate-300 sm:text-lg">
              I&apos;m a Master of Applied Computing student at Wilfrid Laurier
              University with previous L1 support experience at Kyndryl and a
              growing focus on cyber security. Working on Windows, Microsoft
              365, VPN and Active Directory incidents taught me how production
              issues really look. Now I&apos;m building security and ML projects
              around DDoS traffic, TLS metadata, and fraud detection to move
              towards a Jr. SOC / security analyst role.
            </p>
            <p className="max-w-xl text-base text-slate-300 sm:text-lg">
              I like troubleshooting systems, studying how attacks behave, and
              turning that into practical tools.
            </p>

            {/* CTA buttons – aura buttons with wavy borders, new order */}
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="/Faizan-Resume.pdf"
                className="btn-pill btn-aura"
                target="_blank"
                rel="noreferrer"
              >
                <span>My resume</span>
              </a>
              <a
                href="mailto:s.faizanahmed338@gmail.com"
                className="btn-pill btn-aura"
              >
                <MailIcon className="h-4 w-4 md:h-5 md:w-5" />
                <span>Email me</span>
              </a>
              <a
                href="https://www.linkedin.com/in/syedfaizanahmed2001/"
                target="_blank"
                rel="noreferrer"
                className="btn-pill btn-aura"
              >
                <LinkedInIcon className="h-4 w-4 md:h-5 md:w-5" />
                <span>LinkedIn profile</span>
              </a>
              <a
                href="https://github.com/DEzmond-gleATH"
                target="_blank"
                rel="noreferrer"
                className="btn-pill btn-aura"
              >
                <GitHubIcon className="h-4 w-4 md:h-5 md:w-5" />
                <span>GitHub profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- Experience ----------------------- */

type ExperienceCardProps = {
  company: string;
  title: string;
  period: string;
  logoSrc?: string;
  fallbackInitials: string;
  bullets: string[];
};

function Experience() {
  return (
    <section id="experience" className="space-y-8">
      <h2 className="text-2xl font-semibold">Experience</h2>

      {/* Centered timeline container */}
      <div className="relative mt-10 max-w-5xl experience-list">
        {/* All entries share the same left logo column + vertical line + right card */}
        <ExperienceCard
          company="Kyndryl"
          title="Technical Support Analyst (L1)"
          period="Dec 2023 – Aug 2024"
          logoSrc="/logos/kyndryl.png"
          fallbackInitials="K"
          bullets={[
            "Resolved a high volume of tickets for Windows 10/11, Microsoft 365/Outlook, VPN and Active Directory using ServiceNow, keeping SLAs and customer satisfaction targets on track.",
            "Performed structured triage, reproduced issues, and escalated clean cases to L2/L3 with clear notes and logs.",
            "Handled account and permission fixes (AD), mailbox and license requests (M365), software installs and performance troubleshooting with a focus on first-contact resolution.",
            "Wrote and updated simple KB articles and triage notes so other agents could solve recurring problems faster.",
          ]}
        />

        <ExperienceCard
          company="Effulgence Inc."
          title="Social Media Marketing Consultant"
          period="Jan 2023 – Dec 2023"
          logoSrc="/logos/effulgence.png"
          fallbackInitials="E"
          bullets={[
            "Planned and executed social media campaigns across multiple platforms, aligning content with brand goals and product launches.",
            "Created and scheduled posts, then tracked reach, engagement and click-throughs to see what actually worked.",
            "Reviewed weekly performance dashboards and shared simple reports and recommendations with the founder to refine strategy.",
            "Coordinated with designers and other team members to keep messaging consistent and respond quickly to audience feedback.",
          ]}
        />

        <ExperienceCard
          company="BMP Infotech Group (now AnantNetra Technologies)"
          title="Game Developer Intern"
          period="Sep 2023 – Nov 2023"
          logoSrc="/logos/bmp.png"
          fallbackInitials="B"
          bullets={[
            "Wrote and debugged gameplay code in collaboration with designers and senior developers.",
            "Helped document features and small systems so others could understand how pieces of the game fit together.",
            "Assisted in QA by testing builds, logging bugs with clear reproduction steps, and verifying fixes.",
          ]}
        />
      </div>
    </section>
  );
}

function ExperienceCard({
  company,
  title,
  period,
  logoSrc,
  fallbackInitials,
  bullets,
}: ExperienceCardProps) {
  return (
    <article className="grid items-start gap-4 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-8 mb-10">
      {/* Left: big logo + vertical line */}
      <div className="flex h-full flex-col items-center pt-1">
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-rose-400/80 bg-slate-950 shadow-md shadow-rose-900/50 logo-pulse">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={company}
              fill
              className="object-contain p-1"
            />
          ) : (
            <span className="text-sm font-semibold">{fallbackInitials}</span>
          )}
        </div>
        <div className="timeline-line" />
      </div>

      {/* Right: experience card with animated red border */}
      <div className="exp-card md:ml-2">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-slate-300">{company}</p>
        <p className="text-xs text-slate-400">{period}</p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/* ----------------------- Projects ----------------------- */

type ProjectCardProps = {
  title: string;
  description: string;
  stack: string;
  githubUrl: string;
  imageSrc: string;
};

type MiniProjectCardProps = {
  icon: string;
  title: string;
  body: string;
};

function Projects() {
  const [lightbox, setLightbox] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const openLightbox = (src: string, alt: string) => {
    setLightbox({ src, alt });
  };

  const closeLightbox = () => setLightbox(null);
  return (
    <section id="projects" className="space-y-8">
      <h2 className="text-2xl font-semibold">Projects</h2>

      <div className="space-y-6">
        <ProjectCard
          title="ML-Enhanced Adaptive DDoS Filtering"
          description="Built a pipeline that flags DDoS attack flows and automatically suggests filtering rules at different granularities (IP, subnet, protocol) using Random Forest and XGBoost models."
          stack="Python · Random Forest · XGBoost · Rule Engine"
          githubUrl="https://github.com/DEzmond-gleATH"
          imageSrc="/projects/ddosFiltering.png"
          onImageClick={openLightbox} 
        />
        <ProjectCard
          title="Encrypted Traffic Anomaly Detection via TLS Metadata"
          description="Detected suspicious encrypted connections using only TLS metadata (packet counts, sizes, timing, flags) without decrypting payloads, comparing multiple tree-based models."
          stack="Python · scikit-learn · XGBoost · Random Forest · SMOTE · CESNET-TLS22"
          githubUrl="https://github.com/DEzmond-gleATH/tls-metadata-anomaly-detection"
          imageSrc="/projects/tlsDetection.png"
          onImageClick={openLightbox}
        />
        <ProjectCard
          title="Credit Card Fraud Detection using ML"
          description="Implemented an end-to-end ML pipeline for fraud detection on a highly imbalanced credit card dataset, focusing on trade-offs between catching fraud and avoiding false alarms."
          stack="Python · pandas · scikit-learn · SMOTE · Random Forest · XGBoost · SVM"
          githubUrl="https://github.com/DEzmond-gleATH/credit-card-fraud-detection"
          imageSrc="/projects/creditcard-fraud.png"
          onImageClick={openLightbox}
        />
      </div>

      {/* Mini projects */}
      <div className="mt-8 space-y-3">
        <h3 className="text-sm font-semibold text-slate-200">Mini-projects</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <MiniProjectCard
            icon="🔧"
            title="Network-wide ad-blocker"
            body="Raspberry Pi–style DNS filtering to block trackers and intrusive ads across devices."
          />
          <MiniProjectCard
            icon="🔊"
            title="Audio watermarking"
            body="LSB watermarking experiments in MATLAB, tested against noise and compression."
          />
          <MiniProjectCard
            icon="📄"
            title="N-gram plagiarism detection"
            body="Similarity system that flags documents with high phrase and n-gram overlap."
          />
        </div>
      </div>

      <div className="pt-2 text-center">
        <a
          href="https://github.com/DEzmond-gleATH?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="btn-blue-outline"
        >
          <span>View more projects on GitHub</span>
        </a>
      </div>
      {/* ===== Lightbox overlay ===== */}
      {lightbox && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div
            className="lightbox-inner"
            onClick={(e) => e.stopPropagation()} // don't close when clicking image
          >
            <button
              className="lightbox-close"
              type="button"
              onClick={closeLightbox}
              aria-label="Close image"
            >
              ×
            </button>
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              className="lightbox-img"
            />
          </div>
        </div>
      )}
    </section>
  );
}

function ProjectCard({
  title,
  description,
  stack,
  githubUrl,
  imageSrc,
  onImageClick,
}: ProjectCardProps & {
  onImageClick: (src: string, alt: string) => void;
}) {
  return (
    <article className="project-card flex flex-col gap-4 md:flex-row md:gap-6">
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-slate-300">{description}</p>
        <p className="text-xs text-slate-400">{stack}</p>
        <div className="pt-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-pill btn-project"
          >
            <GitHubIcon className="h-4 w-4" />
            <span>View code</span>
          </a>
        </div>
      </div>

      {/* Right: image with hover overlay */}
      <div className="relative w-full md:w-72">
        <div
          className="project-image-wrapper"
          onClick={() => onImageClick(imageSrc, `${title} preview`)}
        >
          <Image
            src={imageSrc}
            alt={`${title} preview`}
            fill
            className="project-image"
          />
          <div className="project-image-overlay">
            <span className="project-image-overlay-text">View</span>
          </div>
        </div>
      </div>
    </article>
  );
}


function MiniProjectCard({ icon, title, body }: MiniProjectCardProps) {
  return (
    <article className="mini-card">
      <div className="mb-1.5 flex items-center gap-2">
        <span className="mini-icon" aria-hidden="true">
          {icon}
        </span>
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      <p className="text-xs text-slate-300">{body}</p>
    </article>
  );
}

/* ----------------------- Skills ----------------------- */

type SkillItem = {
  label: string;
  iconSrc: string;
};

type SkillCardProps = {
  title: string;
  items: SkillItem[];
};

function Skills() {
  const operatingSystems: SkillItem[] = [
    { label: "Windows 10/11", iconSrc: "/skills/windows.png" },
    { label: "Linux", iconSrc: "/skills/linux.png" },
    { label: "Bash", iconSrc: "/skills/bash.png" },
    { label: "PowerShell", iconSrc: "/skills/terminal.png" },
  ];

  const networking: SkillItem[] = [
    { label: "TCP/IP", iconSrc: "/skills/ip.png" },
    { label: "VPN support", iconSrc: "/skills/vpn.png" },
    { label: "Firewall rules (basic)", iconSrc: "/skills/firewall.png" },
  ];

  const securityTools: SkillItem[] = [
    { label: "Wireshark", iconSrc: "/skills/wireshark.jpg" },
    // add Splunk later when you’ve done hands-on labs:
    // { label: "Splunk", iconSrc: "/skills/splunk.svg" },
  ];

  const itSupport: SkillItem[] = [
    { label: "Active Directory", iconSrc: "/skills/ad.png" },
    { label: "Microsoft 365 / Outlook", iconSrc: "/skills/m365.png" },
    { label: "ServiceNow", iconSrc: "/skills/servicenow.jpg" },
    { label: "WordPress", iconSrc: "/skills/wordpress.png" },
  ];

  const programmingLanguages: SkillItem[] = [
    { label: "Python", iconSrc: "/skills/python.png" },
    { label: "C, C++", iconSrc: "/skills/c-.png" },
    { label: "C#", iconSrc: "/skills/c-sharp.png" },
    { label: "Java", iconSrc: "/skills/java.png" },
    { label: "JavaScript", iconSrc: "/skills/java-script.png" },
    { label: "SQL", iconSrc: "/skills/sql.png" },
    { label: "HTML", iconSrc: "/skills/html.png" },
  ];

  // ✅ merged Data Tools + Dev Tools into ONE category
  const dataAndDevTools: SkillItem[] = [
    { label: "pandas", iconSrc: "/skills/pandas.png" },
    { label: "scikit-learn", iconSrc: "/skills/scikit.png" },
    { label: "MATLAB", iconSrc: "/skills/matlab.png" },
    { label: "Git", iconSrc: "/skills/git.png" },
    { label: "GitHub", iconSrc: "/skills/github(1).png" },
    { label: "VS Code", iconSrc: "/skills/vscode.png" },
    { label: "MySQL", iconSrc: "/skills/mysql.png" },
    { label: "REST APIs", iconSrc: "/skills/rest-api.png" },
    { label: "Unity", iconSrc: "/skills/unity.png" },
    { label: "Godot", iconSrc: "/skills/godot.png" },
  ];

  return (
    <section id="skills" className="space-y-8">
      <h2 className="text-2xl font-semibold">Skills &amp; Tools</h2>

      {/* 3 cards per row on large screens */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <SkillCard title="Operating Systems" items={operatingSystems} />
        <SkillCard title="Networking" items={networking} />
        <SkillCard title="Security Tools" items={securityTools} />
        <SkillCard title="IT Support" items={itSupport} />
        <SkillCard title="Programming Languages" items={programmingLanguages} />
        <SkillCard title="Data & Dev Tools" items={dataAndDevTools} />
      </div>
    </section>
  );
}

function SkillCard({ title, items }: SkillCardProps) {
  return (
    <div className="skills-card">
      <h3 className="text-sm font-semibold text-slate-100 mb-3">{title}</h3>

      {/* neat, even grid of icons inside each card */}
      <div className="skill-items-grid">
        {items.map((item) => (
          <div key={item.label} className="skill-item">
            <div className="skill-icon">
              <Image
                src={item.iconSrc}
                alt={item.label}
                width={40}
                height={40}
              />
            </div>
            <span className="text-xs text-slate-300">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}



/* ----------------------- Contact / Footer ----------------------- */

function Contact({ particlesReady }: { particlesReady: boolean }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const bumpViews = async () => {
      try {
        const res = await fetch("/api/views", { method: "POST" });
        if (!res.ok) return;
        const data = await res.json();
        setViews(data.views ?? null);
      } catch (err) {
        console.error("Failed to update view counter", err);
      }
    };

    bumpViews();
  }, []);
  return (
    <section id="contact" className="contact-footer">
      {/* footer particles behind content */}
      {particlesReady && (
        <Particles
          id="footerParticles"
          className="footer-particles"
          options={footerParticlesOptions}
        />
      )}

      {/* wrapper stays above particles background */}
      <div className="relative z-10 space-y-5 max-w-4xl mx-auto px-4">
        <h2 className="text-center text-3xl font-semibold">Get in touch</h2>

        <p className="mx-auto max-w-2xl text-center text-sm text-slate-200 sm:text-base">
          You can reach out for anything — from coffee chats or collaborations to potential
          job opportunities.
        </p>

        <div className="space-y-1 text-center text-xs text-slate-400 sm:text-sm">
          <p>Based in Ontario, open to hybrid/remote.</p>
          <p>Comfortable with 24/7 support environments and shifts.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <a
            href="mailto:s.faizanahmed338@gmail.com"
            className="btn-pill btn-aura btn-aura-sm"
          >
            <MailIcon className="h-4 w-4 md:h-5 md:w-5" />
            <span>Email me</span>
          </a>
          <a
            href="https://www.linkedin.com/in/syedfaizanahmed2001/"
            target="_blank"
            rel="noreferrer"
            className="btn-pill btn-aura btn-aura-sm"
          >
            <LinkedInIcon className="h-4 w-4 md:h-5 md:w-5" />
            <span>Connect on LinkedIn</span>
          </a>
          <a
            href="https://github.com/DEzmond-gleATH"
            target="_blank"
            rel="noreferrer"
            className="btn-pill btn-aura btn-aura-sm"
          >
            <GitHubIcon className="h-4 w-4 md:h-5 md:w-5" />
            <span>GitHub profile</span>
          </a>
        </div>

        <p className="pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Syed Faizan Ahmed
        </p>
        {views !== null && (
          <p className="text-center text-[0.65rem] text-slate-600">
            Views: {" "}
            {views.toLocaleString("en-US")} times.
          </p>
          )}
      </div>
    </section>
  );
}

/* ----------------------- Global Styles ----------------------- */

function GlobalStyles() {
  return (
    <style jsx global>{`
      /* ===============================
         HERO – full-width with tsparticles background
         =============================== */

      .hero-section {
        position: relative;
        width: 100vw;
        left: 50%;
        transform: translateX(-50%);
        padding: 3rem 0 2.5rem;
        overflow: hidden;
        background: #000000;
      }

      /* particles canvas */
      .hero-particles {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: auto;
      }

      /* content sits above particles */
      .hero-inner {
        position: relative;
        z-index: 1;
      }

      /* animated gradient subtitle */
      .gradient-subtitle {
        background: linear-gradient(
          90deg,
          #0ea5e9,
          #a855f7,
          #fb7185,
          #0ea5e9
        );
        background-size: 200% 200%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: gradientMove 7s linear infinite;
      }

      @keyframes gradientMove {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      /* hero photo animated gradient border */
      .hero-photo-frame {
        border-radius: 2rem;
        border-width: 1px;
        border-style: solid;
        border-color: transparent;
        background-image: linear-gradient(#020617, #020617),
          linear-gradient(
            130deg,
            rgba(248, 113, 113, 0.9),
            rgba(56, 189, 248, 0.9),
            rgba(168, 85, 247, 0.9),
            rgba(248, 113, 113, 0.9)
          );
        background-origin: border-box;
        background-clip: padding-box, border-box;
        background-size: 220% 220%;
        animation: borderWaveHero 24s linear infinite;
      }

      @keyframes borderWaveHero {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      /* shared aura buttons */
      .btn-pill {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border-radius: 9999px;
        padding: 0.6rem 1.5rem;
        font-size: 0.9rem;
        font-weight: 500;
        color: #e5e7eb;
        border-width: 1px;
        border-style: solid;
        text-decoration: none;
        position: relative;
        overflow: hidden;
        white-space: nowrap;
      }

      .btn-aura {
        background-image: linear-gradient(#020617, #020617),
          linear-gradient(120deg, #f97373, #38bdf8, #a855f7, #f97373);
        background-origin: border-box;
        background-clip: padding-box, border-box;
        border-color: transparent;
        box-shadow: 0 0 18px rgba(129, 140, 248, 0.35);
        background-size: 220% 220%;
        animation: auraWave 18s linear infinite;
        transition: box-shadow 0.3s ease, transform 0.2s ease;
      }
        /* small project "View code" button */
.btn-project {
  padding: 0.45rem 1.1rem;          /* slightly smaller than default pill */
  font-size: 0.78rem;
  border-radius: 9999px;
  border: 1px solid rgba(56, 189, 248, 0.75);
  color: #7dd3fc;
  background-color: rgba(15, 23, 42, 0.96);

  position: relative;
  overflow: hidden;

  transition:
    background 0.25s ease,
    color 0.25s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;
}

/* on hover: fill with same blue gradient + light glow */
.btn-project:hover {
  color: #e5e7eb;
  background-image: linear-gradient(
    120deg,
    #0ea5e9,
    #2563eb,
    #1d4ed8,
    #0ea5e9
  );
  background-size: 220% 220%;
  animation: borderWaveBlue 14s linear infinite;
  box-shadow: 0 0 18px rgba(56, 189, 248, 0.65);
  transform: translateY(-1px);
}


      .btn-aura:hover {
        background-image: linear-gradient(
            120deg,
            #f97373,
            #38bdf8,
            #a855f7,
            #f97373
          ),
          linear-gradient(120deg, #f97373, #38bdf8, #a855f7, #f97373);
        animation-duration: 10s;
        box-shadow: 0 0 26px rgba(129, 140, 248, 0.55);
        transform: translateY(-1px);
      }

      .btn-aura-sm {
        padding: 0.5rem 1.3rem;
        font-size: 0.85rem;
      }

      @keyframes auraWave {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      /* experience red animated border + timeline */
      .exp-card {
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem;
  padding: 1.25rem 1.5rem;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;

  /* glassy black inner layer + animated red border */
  background-image:
    linear-gradient(
      rgba(15, 23, 42, 0.78),
      rgba(15, 23, 42, 0.9)
    ),
    linear-gradient(
      130deg,
      rgba(248, 113, 113, 0.9),
      rgba(239, 68, 68, 0.6),
      rgba(127, 29, 29, 0.95),
      rgba(248, 113, 113, 0.9)
    );
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-size: 220% 220%;
  animation: borderWaveRed 18s linear infinite;

  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}


      .exp-card:hover {
        box-shadow: 0 0 26px rgba(248, 113, 113, 0.45);
      }

      @keyframes borderWaveRed {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      .timeline-line {
        flex: 1 1 auto;
        width: 2px;
        margin-top: 0.5rem;
        background-image: linear-gradient(
          to bottom,
          rgba(248, 113, 113, 0.8),
          rgba(148, 163, 184, 0.4),
          transparent
        );
        background-size: 100% 200%;
        animation: timelineGlow 26s linear infinite;
      }

      @keyframes timelineGlow {
        0% {
          background-position: 0% 0%;
        }
        50% {
          background-position: 0% 100%;
        }
        100% {
          background-position: 0% 0%;
        }
      }

      .experience-list article:last-child .timeline-line {
        background: none;
      }

      .logo-pulse {
        animation: logoPulse 3.2s ease-in-out infinite;
      }

      @keyframes logoPulse {
        0%,
        100% {
          box-shadow: 0 0 0 rgba(248, 113, 113, 0.4);
        }
        50% {
          box-shadow: 0 0 22px rgba(248, 113, 113, 0.7);
        }
      }

      /* blue project cards */
      .project-card {
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  padding: 1.25rem 1.5rem;

  /* glassy inner layer + blue animated border */
  background-image:
    linear-gradient(
      rgba(15, 23, 42, 0.78),
      rgba(15, 23, 42, 0.9)
    ),
    linear-gradient(
      130deg,
      rgba(56, 189, 248, 0.9),
      rgba(37, 99, 235, 0.7),
      rgba(30, 64, 175, 0.9),
      rgba(56, 189, 248, 0.9)
    );
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-size: 220% 220%;
  animation: borderWaveBlue 20s linear infinite;

  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}


      .project-card:hover {
        box-shadow: 0 0 26px rgba(56, 189, 248, 0.45);
      }

      @keyframes borderWaveBlue {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      /* mini projects */
      /* mini projects – glassy variant */
.mini-card {
  position: relative;
  overflow: hidden;
  border-radius: 1.25rem;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  padding: 0.9rem 1rem;

  /* glass inner layer + soft purple/blue border */
  background-image:
    linear-gradient(
      rgba(15, 23, 42, 0.82),
      rgba(15, 23, 42, 0.96)
    ),
    linear-gradient(
      130deg,
      rgba(56, 189, 248, 0.8),
      rgba(129, 140, 248, 0.9),
      rgba(168, 85, 247, 0.95)
    );
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-size: 210% 210%;
  animation: borderWavePurple 24s linear infinite;

  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);

  transition: box-shadow 0.2s ease, transform 0.15s ease;
}

.mini-card:hover {
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.95);
  transform: translateY(-2px);
}


      .mini-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 9999px;
        padding: 0.25rem 0.5rem;
        font-size: 0.85rem;
        background: rgba(15, 23, 42, 0.95);
      }

/* === Project image hover & lightbox === */

/* image container */
.project-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 1.25rem;
  border: 1px solid rgba(30, 64, 175, 0.7);
  background: radial-gradient(circle at top, #020617, #020617);
  cursor: zoom-in;
}

/* actual image */
.project-image {
  object-fit: cover;
  transition: transform 0.35s ease-out;
}

/* hover overlay with "View" */
.project-image-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    circle at center,
    rgba(15, 23, 42, 0.15),
    rgba(15, 23, 42, 0.9)
  );
  opacity: 0;
  transition: opacity 0.25s ease-out, background 0.25s ease-out;
}

.project-image-overlay-text {
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.8);
  background: rgba(15, 23, 42, 0.9);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* hover effects */
.project-image-wrapper:hover .project-image {
  transform: scale(1.04);
}

.project-image-wrapper:hover .project-image-overlay {
  opacity: 1;
}

/* ===== Lightbox overlay ===== */

.lightbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-inner {
  position: relative;
  width: min(90vw, 1100px);
  height: min(80vh, 650px);
}

.lightbox-img {
  object-fit: contain;
  border-radius: 1.25rem;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.95);
}

/* close button */
.lightbox-close {
  position: absolute;
  top: -2.2rem;
  right: 0;
  border: none;
  border-radius: 999px;
  width: 2rem;
  height: 2rem;
  font-size: 1.35rem;
  line-height: 1;
  color: #e5e7eb;
  background: rgba(15, 23, 42, 0.95);
  box-shadow: 0 0 18px rgba(15, 23, 42, 0.9);
  cursor: pointer;
}


      /* purple animated skills cards */
.skills-card {
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  padding: 1.25rem 1.5rem;

  /* glass + purple animated border */
  background-image:
    linear-gradient(
      rgba(15, 23, 42, 0.78),
      rgba(15, 23, 42, 0.9)
    ),
    linear-gradient(
      130deg,
      rgba(129, 140, 248, 0.85),
      rgba(168, 85, 247, 0.9),
      rgba(147, 51, 234, 0.95),
      rgba(129, 140, 248, 0.85)
    );
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-size: 230% 230%;
  animation: borderWavePurple 24s linear infinite;

  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  /* layout inside each card */
  display: flex;
  flex-direction: column;
}

/* grid of skill items inside each card */
.skill-items-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.1rem 1.6rem;
}

@media (min-width: 640px) {
  .skill-items-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.45rem;
}

/* icon tile style (like your reference screenshot) */
.skill-icon {
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 1.1rem;
  background: #020617;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 0 1px rgba(148, 163, 184, 0.35),
    0 18px 28px rgba(0, 0, 0, 0.75);
}

.skill-icon img {
  width: 2.2rem;
  height: 2.2rem;
  object-fit: contain;
}



      @keyframes borderWavePurple {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    /* === Skill icon grid (icon + text like the reference) === */
      .skill-grid-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.45rem;
        min-width: 5.5rem;
        text-align: center;
      }

      .skill-icon-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 0.9rem;
        background: rgba(15, 23, 42, 0.98);
        border: 1px solid rgba(148, 163, 184, 0.55);
        box-shadow: 0 14px 35px rgba(0, 0, 0, 0.85);
        overflow: hidden;
      }

      .skill-icon-img {
        object-fit: contain;
      }

      .skill-icon-fallback {
        font-size: 0.8rem;
        font-weight: 600;
        color: #e5e7eb;
      }

      .skill-label {
        font-size: 0.72rem;
        color: #e5e7eb;
      }

      /* shared glass shine effect for main cards */
/* shared glass shine effect for main cards */
.exp-card::before,
.project-card::before,
.skills-card::before,
.mini-card::before {
  content: "";
  position: absolute;
  inset: -20%; /* narrower than before */
  background: linear-gradient(
    120deg,
    transparent 0%,
    transparent 40%,
    rgba(255, 255, 255, 0.18) 47%,
    rgba(255, 255, 255, 0.45) 50%,
    rgba(255, 255, 255, 0.18) 53%,
    transparent 60%,
    transparent 100%
  );
  transform: translateX(-170%) rotate(8deg); /* start well off the left */
  opacity: 0;
  pointer-events: none;
}

.exp-card:hover::before,
.project-card:hover::before,
.skills-card:hover::before,
.mini-card:hover::before {
  opacity: 1;
  animation: cardShine 2s ease-out forwards; /* faster sweep */
}

@keyframes cardShine {
  0% {
    transform: translateX(-170%) rotate(8deg);
  }
  100% {
    transform: translateX(170%) rotate(8deg); /* go fully across & exit right */
  }
}

            /* FOOTER – full-width, black background with subtle particles */

     .contact-footer {
  margin-top: 1rem;          /* smaller gap above footer */
  padding-top: 2rem;         /* less internal padding */
  padding-bottom: 1.75rem;   /* less bottom padding */
  border-top: 1px solid rgba(15, 23, 42, 0.95);

  position: relative;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  background: #000000;
}


      .footer-particles {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
      }


      .footer-particles {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
      }

      /* blue outline CTA */
      .btn-blue-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.55rem 1.4rem;
  border-radius: 9999px;
  border: 1px solid rgba(56, 189, 248, 0.85);
  color: #e5e7eb;

  /* dark inner, gradient border */
  background-image:
    linear-gradient(#020617, #020617),
    linear-gradient(120deg, #0ea5e9, #2563eb, #1d4ed8, #0ea5e9);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-size: 220% 220%;
  animation: borderWaveBlue 20s linear infinite;

  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  box-shadow: 0 0 18px rgba(56, 189, 248, 0.4);
  transition:
    box-shadow 0.2s ease,
    transform 0.15s ease,
    background-image 0.2s ease,
    color 0.2s ease;
}


      .btn-blue-outline:hover {
  /* full gradient fill (no dark inner layer) */
  background-image: linear-gradient(
    120deg,
    #0ea5e9,
    #2563eb,
    #1d4ed8,
    #0ea5e9
  );
  background-origin: border-box;
  background-clip: border-box;

  box-shadow: 0 0 26px rgba(56, 189, 248, 0.7);
  transform: translateY(-1px);
}

    `}</style>
  );
}
