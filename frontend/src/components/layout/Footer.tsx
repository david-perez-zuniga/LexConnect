import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.brand}>
          <span className={styles.brandName}>TechLawyer</span>
          <p className={styles.copyright}>© 2024 TechLawyer. Todos los derechos reservados.</p>
        </div>
        <nav className={styles.nav}>
          <a href="/" className={styles.navLink}>Aviso Legal</a>
          <a href="/" className={styles.navLink}>Privacidad</a>
          <a href="/" className={styles.navLink}>Términos de Servicio</a>
          <a href="/" className={styles.navLink}>Contacto</a>
        </nav>
      </div>
    </footer>
  );
};
