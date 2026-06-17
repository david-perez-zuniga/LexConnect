import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.brand}>
          <span className={`material-symbols-outlined ${styles.iconFilled}`} translate="no">gavel</span>
          LawSource
        </div>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLinkActive}>Inicio</Link>
        </nav>

        <div className={styles.actions}>
          <button className={styles.loginBtn}>Iniciar sesión</button>
          <button className={styles.signupBtn} onClick={() => navigate('/registro')}>Regístrate ahora</button>
        </div>

        <button className={styles.menuToggle} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span className="material-symbols-outlined" translate="no">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/" className={styles.mobileLink}>Inicio</Link>
          <button className={styles.mobileLoginBtn}>Iniciar sesión</button>
          <button className={styles.mobileSignupBtn} onClick={() => navigate('/registro')}>Regístrate ahora</button>
        </div>
      )}
    </header>
  );
};
