import Image from "next/image";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Braces,
  Code2,
  Layers3,
  Mail,
  ScanLine,
} from "lucide-react";
import Navigation, { Brand } from "../components/Navigation";
import BuildControls from "../components/BuildControls";
import { email, principles, projects, record, stack } from "./content";

function Wordmark() {
  return (
    <div
      className="wordmark"
      aria-hidden="true"
      data-build="wipe"
      data-label="Portfolio"
    >
      <svg viewBox="0 0 1400 236" preserveAspectRatio="none">
        <defs>
          <linearGradient
            id="metal"
            x1="0"
            y1="0"
            x2="0.08"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor="#ff5443" />
            <stop offset=".18" stopColor="#ff3b2f" />
            <stop offset=".49" stopColor="#bf2c24" />
            <stop offset=".8" stopColor="#481713" />
            <stop offset="1" stopColor="#110b0c" />
          </linearGradient>
          <linearGradient id="shine">
            <stop stopColor="#fff" stopOpacity="0" />
            <stop offset=".52" stopColor="#ffc1b1" stopOpacity=".19" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id="letter-clip">
            <text
              x="0"
              y="225"
              textLength="1400"
              lengthAdjust="spacingAndGlyphs"
            >
              PORTFOLIO
            </text>
          </clipPath>
        </defs>
        <g clipPath="url(#letter-clip)">
          <rect width="1400" height="236" fill="url(#metal)" />
          <rect className="sheen" width="220" height="236" fill="url(#shine)" />
        </g>
      </svg>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-label" data-build="type">
      <span aria-hidden="true" /> {children}
    </div>
  );
}

const projectCount = String(projects.length).padStart(2, "0");

function Metrics({ compact = false }: { compact?: boolean }) {
  const data = compact
    ? [
        ["06", "ERP team"],
        ["08", "Nagase team"],
        ["12", "Cloudrity team"],
      ]
    : [
        ["4+", "Years of experience"],
        [projectCount, "Selected projects"],
        ["02", "Companies"],
      ];
  return (
    <dl className={compact ? "metrics compact" : "metrics hero-metrics"}>
      {data.map(([n, label]) => (
        <div key={label} data-build="pop" data-label={label}>
          <dd>
            {n === "4+" ? (
              <>
                4<span>+</span>
              </>
            ) : (
              n
            )}
          </dd>
          <dt>{label}</dt>
        </div>
      ))}
    </dl>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#work">
        Skip to selected work
      </a>
      <main>
        <section id="intro" className="cover">
          <Navigation />
          <div className="stage">
            <div className="folio-index" data-build="pop">
              <span>
                <i /> PERSONAL PORTFOLIO
              </span>
              <span>FRONTEND DEVELOPMENT</span>
            </div>
            <Wordmark />
            <div
              className="portrait-field"
              data-build="wipe"
              data-label="Portrait"
            >
              <div className="red-glow" />
              <Image
                priority
                src="/portrait.png?v=2"
                width={1056}
                height={1489}
                sizes="(max-width: 720px) 65vw, 36vw"
                alt="Tong Minh Duong"
                className="portrait"
              />
            </div>
            <div className="intro-copy">
              <p className="greeting" data-build="type">
                Hello, I&apos;m
              </p>
              <h1 data-build="wipe">
                TONG MINH
                <br />
                DUONG<span>.</span>
              </h1>
              <p className="role" data-build="type">
                Frontend Developer
              </p>
              <p className="bio" data-build="type">
                I build responsive interfaces for enterprise software and
                cybersecurity platforms.
              </p>
              <a href="#work" className="red-button" data-build="pop">
                View work <ArrowDownRight size={17} />
              </a>
            </div>
            <Metrics />
            <div aria-hidden="true" className="cross c-one" />
            <div aria-hidden="true" className="cross c-two" />
          </div>
          <div
            className="cover-foot"
            data-build="pop"
            data-label="Scroll guide"
          >
            <a href="#work">
              <ArrowDown size={14} /> SCROLL TO EXPLORE
            </a>
            <span className="foot-rule" />
            <span>
              <b>01</b> / 06
            </span>
          </div>
        </section>

        <section id="work" className="section">
          <SectionLabel>Selected work</SectionLabel>
          <div className="section-heading work-head">
            <div>
              <h2 data-build="wipe">
                Work that ships<span>.</span>
              </h2>
              <p data-build="type">
                Enterprise software, cloud infrastructure, cybersecurity, and mobile healthcare.
              </p>
            </div>
            <Metrics compact />
          </div>
          <div className="projects">
            {projects.map((p, i) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.title}
                  className="project"
                  data-build="pop"
                  data-label={p.title}
                >
                  <div className="project-top">
                    <Icon size={28} strokeWidth={1.35} />
                    <span className="mono">{String(i + 1).padStart(2, "0")} / {projectCount}</span>
                  </div>
                  <div className="project-field">{p.field}</div>
                  <h3>{p.title}</h3>
                  <div className="project-role">{p.role}{p.client && <> · Client in {p.client}</>}</div>
                  {p.description && <p className="mt-4 text-sm text-zinc-300">{p.description}</p>}
                  <ul>
                    {p.points.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="chips">
                    {p.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="stack" className="section stack-section">
          <SectionLabel>Stack</SectionLabel>
          <h2 data-build="wipe">
            Tools of the trade<span>.</span>
          </h2>
          <div
            className="marquee"
            data-build="pop"
            data-label="Technology stack"
            tabIndex={0}
            aria-label="Technology stack, focus to pause"
          >
            <div className="track">
              {[0, 1].map((copy) => (
                <div
                  className="tool-group"
                  key={copy}
                  aria-hidden={copy === 1 || undefined}
                >
                  {stack.map((tool) => (
                    <span key={tool}>
                      <i />
                      {tool}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="record" className="section split">
          <div>
            <SectionLabel>Record</SectionLabel>
            <h2 data-build="wipe">
              Experience
              <br />& education<span>.</span>
            </h2>
          </div>
          <ol className="timeline">
            {record.map(([date, org, role]) => (
              <li data-build="pop" key={org} data-label={org}>
                <span className="time-dot" />
                <time>{date}</time>
                <h3>{org}</h3>
                <p>{role}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="about" className="section">
          <SectionLabel>About</SectionLabel>
          <div className="split about-intro">
            <h2 data-build="wipe">
              Behind the
              <br />
              interface<span>.</span>
            </h2>
            <div className="about-copy">
              <p data-build="type">
                I’m Tong Minh Duong, a frontend developer specializing in
                Angular and ReactJS. My work spans enterprise applications,
                cybersecurity dashboards, and migrations from desktop software
                to the web.
              </p>
              <p data-build="type">
                I build shared UI libraries and design micro-frontends that
                teams can deploy independently. I work with backend engineers,
                testers, and business analysts to turn requirements into usable
                interfaces.
              </p>
            </div>
          </div>
          <div className="skills-grid">
            {[
              [Code2, "Frontend", "Angular · ReactJS · TypeScript"],
              [Layers3, "Architecture", "Micro-frontends · Module Federation"],
              [Braces, "Integration", "RESTful APIs · Authentication"],
              [ScanLine, "Quality", "Unit testing · Responsive design"],
            ].map(([Icon, title, description]) => {
              const Glyph = Icon as typeof Code2;
              return (
                <article key={String(title)} data-build="pop">
                  <Glyph size={22} />
                  <h3>{String(title)}</h3>
                  <p>{String(description)}</p>
                </article>
              );
            })}
          </div>
          <h3 className="principle-heading" data-build="type">
            Principles I work by
          </h3>
          <div className="principles">
            {principles.map(([name, body]) => (
              <div data-build="pop" key={name}>
                <h4>
                  <ArrowRight size={15} />
                  {name}
                </h4>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <SectionLabel>Contact</SectionLabel>
          <div
            className="contact-card"
            data-build="pop"
            data-label="Contact card"
          >
            <div>
              <Mail size={26} />
              <h2>
                Let’s talk<span>.</span>
              </h2>
              <a className="email" href={"mailto:" + email}>
                {email}
              </a>
            </div>
            <a className="red-button" href={"mailto:" + email}>
              Get in touch <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>
      <footer data-build="pop" data-label="Footer">
        <Brand />
        <a href="#intro">
          BACK TO TOP <ArrowUp size={14} />
        </a>
      </footer>
      <BuildControls />
    </>
  );
}
