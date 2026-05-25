import styles from "./page.module.css";

const projects = [
  {
    name: "Boilerplate",
    description: "Cursor-native full-stack boilerplate with a 60-point self-grader, isolated Next.js / Payload / WordPress sandboxes, Vader Protocol UI shield, Biome linting, and MCP-ready agent workflows.",
    stack: ["Next.js", "Payload CMS", "WordPress", "Biome", "MCP"],
    url: "https://github.com/jonbeatz/Boilerplate",
    status: "ACTIVE",
  },
  {
    name: "Node-Launcher",
    description: "Vader Project Engine — Station Prime. Full-stack Electron launcher with renderer sandboxing, SQLite, and forge workflow automation.",
    stack: ["Electron", "Node.js", "SQLite", "Next.js"],
    url: "https://github.com/jonbeatz/Node-Launcher",
    status: "ACTIVE",
  },
  {
    name: "MSC-Projectz",
    description: "Projects management app and personal dashboard for tracking builds, experiments, and dev progress across the VaderLabz ecosystem.",
    stack: ["Node.js", "React", "TypeScript"],
    url: "https://github.com/jonbeatz/MSC-Projectz",
    status: "BUILDING",
  },
];

const stack = [
  "Next.js", "Node.js", "React", "TypeScript",
  "Payload CMS", "WordPress", "SQLite", "Electron",
  "Biome", "MCP Workflows", "AI/LLM", "Cursor",
  "Vitest", "Playwright", "Docker", "GitHub Actions",
];

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.scanline} aria-hidden="true" />

      {/* NAV */}
      <nav className={styles.nav}>
        <span className={styles.navLogo}>
          <span className={styles.navLogoAccent}>&gt;</span> VADERLABZ
        </span>
        <div className={styles.navLinks}>
          <a href="#projects">PROJECTS</a>
          <a href="#lab">LAB</a>
          <a href="#stack">STACK</a>
          <a href="#contact">CONTACT</a>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true">
          {Array.from({ length: 80 }).map((_, i) => (
            <div key={i} className={styles.heroGridCell} />
          ))}
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>// VADER_PROTOCOL :: INITIALIZED</p>
          <h1 className={styles.heroTitle}>
            VADER<span className={styles.heroTitleAccent}>LABZ</span>
          </h1>
          <p className={styles.heroSub}>
            Dev Lab &amp; AI Playground
          </p>
          <p className={styles.heroDesc}>
            Building, breaking, and learning. Full-stack AI experiments,
            personal projects, and new ideas forged in the dark.
          </p>
          <div className={styles.heroCtas}>
            <a href="#projects" className={styles.ctaPrimary}>VIEW PROJECTS</a>
            <a href="https://github.com/jonbeatz" target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>GITHUB ↗</a>
          </div>
          <p className={styles.heroStatus}>
            <span className={styles.statusDot} />
            SYSTEM ONLINE — vaderlabz.com
          </p>
        </div>
      </section>

      {/* PROJECTS */}
      <section className={styles.section} id="projects">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>01</span>
          <h2 className={styles.sectionTitle}>PROJECTS</h2>
          <div className={styles.sectionLine} />
        </div>
        <div className={styles.projectsGrid}>
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectCard}
            >
              <div className={styles.projectCardTop}>
                <span className={styles.projectName}>{p.name}</span>
                <span className={`${styles.projectStatus} ${p.status === "ACTIVE" ? styles.statusActive : styles.statusBuilding}`}>
                  {p.status}
                </span>
              </div>
              <p className={styles.projectDesc}>{p.description}</p>
              <div className={styles.projectStack}>
                {p.stack.map((s) => (
                  <span key={s} className={styles.tag}>{s}</span>
                ))}
              </div>
              <span className={styles.projectLink}>VIEW ON GITHUB ↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* LAB */}
      <section className={styles.section} id="lab">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>02</span>
          <h2 className={styles.sectionTitle}>LAB / EXPERIMENTS</h2>
          <div className={styles.sectionLine} />
        </div>
        <div className={styles.labGrid}>
          {["AI Agent Workflows", "MCP Integrations", "LLM Prompt Engineering", "Full-Stack AI Apps"].map((item) => (
            <div key={item} className={styles.labCard}>
              <span className={styles.labCardIcon}>⬡</span>
              <span className={styles.labCardName}>{item}</span>
              <span className={styles.labCardBadge}>COMING SOON</span>
            </div>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section className={styles.section} id="stack">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>03</span>
          <h2 className={styles.sectionTitle}>TECH STACK</h2>
          <div className={styles.sectionLine} />
        </div>
        <div className={styles.stackGrid}>
          {stack.map((s) => (
            <div key={s} className={styles.stackItem}>
              <span className={styles.stackAccent}>//</span> {s}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className={styles.section} id="contact">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>04</span>
          <h2 className={styles.sectionTitle}>CONNECT</h2>
          <div className={styles.sectionLine} />
        </div>
        <div className={styles.contactBlock}>
          <p className={styles.contactText}>
            Building in public. Always learning. Always shipping.
          </p>
          <a
            href="https://github.com/jonbeatz"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaPrimary}
          >
            GITHUB ↗
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <span className={styles.footerLogo}>&gt; VADERLABZ</span>
        <span className={styles.footerText}>// VADER_PROTOCOL v1.0 — {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
