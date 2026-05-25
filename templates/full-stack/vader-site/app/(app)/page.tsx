import { ENABLE_PAYLOAD } from '@/lib/enable-payload';
import { loadSiteData, type SiteProject, type SiteStackItem } from '@/lib/load-site-data';
import Link from 'next/link';
import BackToTop from './components/BackToTop';

type ProjectStatus = 'active' | 'building' | 'coming-soon';

const LAB_EXPERIMENTS = [
  { title: 'AI Agent Workflows', status: 'COMING SOON' },
  { title: 'MCP Integrations', status: 'COMING SOON' },
  { title: 'LLM Prompt Engineering', status: 'COMING SOON' },
  { title: 'Full-Stack AI Apps', status: 'COMING SOON' },
] as const;

function statusLabel(status: ProjectStatus): string {
  if (status === 'active') return 'ACTIVE';
  if (status === 'building') return 'BUILDING';
  return 'COMING SOON';
}

function statusClass(status: ProjectStatus): string {
  if (status === 'active') return 'vader-project-status vader-project-status-active';
  if (status === 'building') return 'vader-project-status vader-project-status-building';
  return 'vader-project-status vader-project-status-soon';
}

export default async function VaderHomePage() {
  const { projects, stackItems } = await loadSiteData();

  return (
    <>
      <nav className="vader-nav">
        <Link href="/" className="vader-nav-logo">
          <span className="vader-nav-logo-accent">&gt;</span> VADERLABZ
        </Link>
        <ul className="vader-nav-links">
          <li>
            <a href="#projects">PROJECTS</a>
          </li>
          <li>
            <a href="#lab">LAB</a>
          </li>
          <li>
            <a href="#stack">STACK</a>
          </li>
          <li>
            <a href="#contact">CONNECT</a>
          </li>
          {ENABLE_PAYLOAD && (
            <li>
              <Link href="/admin">ADMIN</Link>
            </li>
          )}
        </ul>
      </nav>

      <section className="vader-hero">
        <div className="vader-hero-grid" aria-hidden="true">
          {Array.from({ length: 96 }).map((_, i) => (
            <span key={i} className="vader-hero-grid-cell" />
          ))}
        </div>
        <div className="vader-hero-content">
          <p className="vader-hero-eyebrow">// VADER_PROTOCOL :: INITIALIZED</p>
          <h1 className="vader-hero-title">
            VADER<span className="vader-hero-title-accent">LABZ</span>
          </h1>
          <p className="vader-hero-sub">Dev Lab &amp; AI Playground</p>
          <p className="vader-hero-desc">
            Building, breaking, and learning. Full-stack AI experiments, personal projects, and new
            ideas forged in the dark.
          </p>
          <div className="vader-hero-ctas">
            <a href="#projects" className="vader-btn-primary">
              VIEW PROJECTS
            </a>
            <a
              href="https://github.com/jonbeatz"
              className="vader-btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB ↗
            </a>
          </div>
          <p className="vader-hero-status">
            <span className="vader-status-dot" />
            SYSTEM ONLINE — vaderlabz.com
          </p>
        </div>
      </section>

      <section id="projects" className="vader-section">
        <div className="vader-section-header">
          <span className="vader-section-tag">01</span>
          <h2 className="vader-section-title">PROJECTS</h2>
          <span className="vader-section-line" />
        </div>
        <div className="vader-projects-grid">
          {projects.map((project: SiteProject) => {
            const cardBody = (
              <div className="vader-project-card-top">
                <span className={statusClass(project.status as ProjectStatus)}>
                  {statusLabel(project.status as ProjectStatus)}
                </span>
                <h3 className="vader-project-name">{project.title}</h3>
                <p className="vader-project-desc">{project.description}</p>
                {project.tags && project.tags.length > 0 && (
                  <div className="vader-project-stack">
                    {project.tags.map((tag, idx) => (
                      <span key={tag.id ?? idx} className="vader-tag">
                        {tag.label}
                      </span>
                    ))}
                  </div>
                )}
                {project.githubUrl && (
                  <span className="vader-project-link">VIEW ON GITHUB ↗</span>
                )}
              </div>
            );

            return project.githubUrl ? (
              <a
                key={String(project.id)}
                href={project.githubUrl}
                className="vader-project-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                {cardBody}
              </a>
            ) : (
              <div key={String(project.id)} className="vader-project-card">
                {cardBody}
              </div>
            );
          })}
        </div>
      </section>

      <section id="lab" className="vader-section">
        <div className="vader-section-header">
          <span className="vader-section-tag">02</span>
          <h2 className="vader-section-title">LAB / EXPERIMENTS</h2>
          <span className="vader-section-line" />
        </div>
        <div className="vader-lab-grid">
          {LAB_EXPERIMENTS.map((item) => (
            <div key={item.title} className="vader-lab-card">
              <span className="vader-lab-card-icon">⬡</span>
              <span className="vader-lab-card-name">{item.title}</span>
              <span className="vader-lab-card-badge">{item.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="stack" className="vader-section">
        <div className="vader-section-header">
          <span className="vader-section-tag">03</span>
          <h2 className="vader-section-title">TECH STACK</h2>
          <span className="vader-section-line" />
        </div>
        <div className="vader-stack-grid">
          {stackItems.map((item: SiteStackItem) => {
            const stackName = item.label.replace(/^\/\/\s*/, '');
            return (
              <div key={String(item.id)} className="vader-stack-item">
                <span className="vader-stack-accent">//</span> {stackName}
              </div>
            );
          })}
        </div>
      </section>

      <section id="contact" className="vader-section">
        <div className="vader-section-header">
          <span className="vader-section-tag">04</span>
          <h2 className="vader-section-title">CONNECT</h2>
          <span className="vader-section-line" />
        </div>
        <div className="vader-contact-block">
          <p className="vader-contact-text">
            Building in public. Always learning. Always shipping.
          </p>
          <a
            href="https://github.com/jonbeatz"
            className="vader-btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB ↗
          </a>
        </div>
      </section>

      <footer className="vader-footer">
        <span className="vader-footer-brand">
          <span className="vader-footer-logo">&gt;</span> VADERLABZ
        </span>
        <span className="vader-footer-meta">{'// VADER_PROTOCOL :: v2.3.0'}</span>
      </footer>

      <BackToTop />
    </>
  );
}
