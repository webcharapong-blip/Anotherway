import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.brand}>อนาเธอร์เวย์</p>
      <p className={styles.tagline}>No perfect way, just anotherway.</p>
      <p className={styles.sub}>© 2026 ANOTHERWAY · All Rights Reserved</p>
      <p className={styles.contact}>LINE: @onmywayy_17 · IG: @anotherway.psd</p>
    </footer>
  );
}