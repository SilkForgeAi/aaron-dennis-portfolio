import styles from "./SiteHeader.module.css";

const links = [
  { href: "#work", label: "Work" },
  { href: "#how-i-work", label: "How I work" },
  { href: "#contact", label: "Contact" },
];

// On narrow screens the nav wraps under the name as a plain in-page link row,
// so it needs no JavaScript and every link stays in the tab order.
export function SiteHeader() {
  return (
    <header id="top" className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.name} href="#top">
          Aaron Dennis
        </a>
        <nav aria-label="Primary">
          <ul className={styles.list}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
