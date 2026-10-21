import { ProjectCard } from "./components/ProjectCard";
import { SiteHeader } from "./components/SiteHeader";
import { EMAIL, GITHUB_PROFILE, projects, steps } from "./content";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main" tabIndex={-1} className={styles.main}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowRule} aria-hidden="true" />
              Independent AI Systems Builder
            </p>
            <h1 id="hero-title" className={styles.h1}>
              I build tools that let people direct AI agents{" "}
              <em>and stay in control of what they do.</em>
            </h1>
            <p className={styles.lede}>
              I&rsquo;m self-taught and work independently. I build desktop applications, AI agent
              workflows, runtime security controls and verification systems, and I own each
              project from the first idea through implementation, testing, debugging and
              iteration.
            </p>
            <div className={styles.actions}>
              <a className={`${styles.button} ${styles.buttonSolid}`} href="#work">
                See what I&rsquo;ve built <span aria-hidden="true">↓</span>
              </a>
              <a className={`${styles.button} ${styles.buttonOutline}`} href={GITHUB_PROFILE}>
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <dl className={styles.facts}>
            <div>
              <dt>Focus</dt>
              <dd>Agent workspaces, execution controls, verification</dd>
            </div>
            <div>
              <dt>Working with</dt>
              <dd>Python, Electron, JavaScript/TypeScript</dd>
            </div>
            <div>
              <dt>Applying for</dt>
              <dd>Forward Deployed Engineer, Fredrin</dd>
            </div>
          </dl>
        </section>

        <section id="work" className={styles.section} aria-labelledby="work-title">
          <div className={styles.sectionHead}>
            <p className={styles.label}>Featured work</p>
            <h2 id="work-title" className={styles.h2}>
              What I&rsquo;ve built
            </h2>
          </div>
          <div className={styles.cards}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section id="how-i-work" className={styles.section} aria-labelledby="how-title">
          <div className={styles.sectionHead}>
            <p className={styles.label}>Process</p>
            <h2 id="how-title" className={styles.h2}>
              How I work
            </h2>
          </div>
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.h3}>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="forward-deployed"
          className={`${styles.section} ${styles.split}`}
          aria-labelledby="fde-title"
        >
          <div className={styles.sectionHead}>
            <p className={styles.label}>The role</p>
            <h2 id="fde-title" className={styles.h2}>
              Forward deployed engineering
            </h2>
          </div>
          <div className={styles.prose}>
            <p>
              Forward deployed engineering is the same loop, run inside someone else&rsquo;s
              workflow. The work is adapting a system to the tools, data and constraints a team
              already has, debugging the integration when it doesn&rsquo;t behave the way the docs
              say it should, and noticing when the same problem keeps coming back. A recurring
              workaround is usually a product gap, and I want to turn it into a product
              improvement instead of leaving it as a one-off fix. Building Grid AI, ADOM and Rain on
              my own means I&rsquo;m used to owning that whole path, from understanding the problem
              to the change that ships.
            </p>
          </div>
        </section>

        <section
          id="contact"
          className={`${styles.section} ${styles.contact}`}
          aria-labelledby="contact-title"
        >
          <div className={styles.sectionHead}>
            <p className={styles.label}>Contact</p>
            <h2 id="contact-title" className={styles.h2}>
              Get in touch
            </h2>
          </div>
          <ul className={styles.contactList}>
            <li>
              <span className={styles.contactLabel}>Email</span>
              <a className={styles.contactLink} href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </li>
            <li>
              <span className={styles.contactLabel}>GitHub</span>
              <a className={styles.contactLink} href={GITHUB_PROFILE}>
                github.com/SilkForgeAi
              </a>
            </li>
          </ul>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; Aaron Dennis</p>
      </footer>
    </>
  );
}
