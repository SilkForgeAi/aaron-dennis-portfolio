import type { Project } from "../content";
import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  const headingId = `${project.id}-title`;
  return (
    <article
      id={project.id}
      aria-labelledby={headingId}
      className={`${styles.card} ${project.lead ? styles.lead : ""}`}
    >
      <div className={styles.meta}>
        <p className={styles.tag}>{project.tag}</p>
        <h3 id={headingId} className={styles.name}>
          {project.name}
          {project.subtitle ? <span className={styles.subtitle}>{project.subtitle}</span> : null}
        </h3>
        <p className={styles.stack}>{project.stack}</p>
        {project.link.kind === "repo" ? (
          <p className={styles.link}>
            <a href={project.link.href}>
              <span className="visually-hidden">{project.name} repository on GitHub: </span>
              github.com/{project.link.label}
              <span aria-hidden="true"> ↗</span>
            </a>
          </p>
        ) : null}
        {project.link.kind === "repo" && project.link.note ? (
          <p className={styles.note}>{project.link.note}</p>
        ) : null}
        {project.link.kind === "private" ? (
          <p className={styles.private}>{project.link.note}</p>
        ) : null}
      </div>

      <div className={styles.details}>
        <div className={styles.column}>
          <h4 className={styles.label}>
            Problem
          </h4>
          <div className={styles.body}>{project.problem}</div>
        </div>
        <div className={styles.column}>
          <h4 className={styles.label}>
            What I built
          </h4>
          <div className={styles.body}>{project.built}</div>
        </div>
        <div className={styles.column}>
          <h4 className={styles.label}>
            Why it matters
          </h4>
          <div className={styles.body}>
            {project.matters}
            {project.caveat ? <p className={styles.caveat}>{project.caveat}</p> : null}
          </div>
        </div>
      </div>
    </article>
  );
}
