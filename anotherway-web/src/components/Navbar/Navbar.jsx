import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <span className={styles.brand}>อนาเธอร์เวย์</span>
      <span className={styles.tag}>PRE-ORDER</span>
    </nav>
  );
}