import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderUser {
  name: string;
  onLogout?: () => void;
}

interface HeaderProps {
  user?: HeaderUser;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.brand}>
          <span className={`material-symbols-outlined ${styles.iconFilled}`} translate="no">gavel</span>
          TechLawyer
        </div>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLinkActive}>Inicio</Link>
        </nav>

        {user ? (
          <div className={styles.userSection}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                <span className="material-symbols-outlined" translate="no">person</span>
              </div>
              <span className={styles.userName}>{user.name}</span>
            </div>
            <button className={styles.logoutBtn} onClick={user.onLogout}>
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className={styles.actions}>
            <button className={styles.loginBtn} onClick={() => navigate('/iniciar-sesion')}>Iniciar sesión</button>
            <button className={styles.signupBtn} onClick={() => navigate('/registro')}>Regístrate ahora</button>
          </div>
        )}

        <button className={styles.menuToggle} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span className="material-symbols-outlined" translate="no">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/" className={styles.mobileLink}>Inicio</Link>
          {user ? (
            <>
              <div className={styles.mobileUserInfo}>
                <span className="material-symbols-outlined" translate="no">person</span>
                <span>{user.name}</span>
              </div>
              <button className={styles.mobileLogoutBtn} onClick={user.onLogout}>Cerrar Sesión</button>
            </>
          ) : (
            <>
              <button className={styles.mobileLoginBtn} onClick={() => navigate('/iniciar-sesion')}>Iniciar sesión</button>
              <button className={styles.mobileSignupBtn} onClick={() => navigate('/registro')}>Regístrate ahora</button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
