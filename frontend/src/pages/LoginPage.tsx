import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useLogin } from '../hooks/userLogin';
import styles from '../styles/LoginPage.module.css';

export const LoginPage: React.FC = () => {
  const { email, setEmail, password, setPassword, submit, cargando, error, exito } = useLogin()
  const navigate = useNavigate()

  if (exito) {
    navigate('/dashboard')
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.bgLayer}>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLj9ft7zkiSFPuglVwreR7W-aXky42pDL2VjzDHPNTzWfXOBfojB6LrlSYM-Kd9_b_3Ria-JSo1ItuuoE8PiKhCGbs00dJGQVgnzSgIOTXb1qzDBvOmtMGdpujmd8M03j__Lp2l8WCnvrVBeecG7SMnvHw5dNmC755LMzt3vG5_fW3jPOyc_MQS1NJXNMLni4ILwTFaY3vnP_5DEYqkuN23GZcFLvInmzrl0zZc_9jdW4A66wCfzeKVvIyy2U9EFMFVFlKofM6h8yj"
            alt="TechLawyer Professional Environment"
            className={styles.bgImage}
          />
          <div className={styles.vignette} />
        </div>

        <section className={styles.section}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h1 className={styles.cardTitle}>Iniciar sesión</h1>
              <p className={styles.cardSubtitle}>Accede a tu red profesional legal.</p>
            </div>

            <form className={styles.form} onSubmit={submit}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Correo electrónico</label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="password">Contraseña</label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <div className={styles.options}>
                <label className={styles.checkbox}>
                  <input type="checkbox" className={styles.checkboxInput} name="remember" />
                  <span className={styles.checkboxLabel}>Recordarme</span>
                </label>
                <a href="#" className={styles.forgotLink}>¿Olvidaste tu contraseña?</a>
              </div>

              <Button type="submit" fullWidth disabled={cargando}>
                {cargando ? 'Iniciando sesión...' : 'Iniciar sesión'}
                <span className="material-symbols-outlined" translate="no" style={{ fontSize: '1.25rem' }}>login</span>
              </Button>
            </form>

            <div className={styles.divider} />

            <div className={styles.footerLink}>
              <p>
                ¿No tienes cuenta?{' '}
                <Link to="/registro" className={styles.registerLink}>Regístrate aquí</Link>
              </p>
            </div>

            <div className={styles.trustBadges}>
              <div className={styles.badge}>
                <span className="material-symbols-outlined" translate="no">verified_user</span>
                <span>Conexión Segura</span>
              </div>
              <div className={styles.badgeDivider} />
              <div className={styles.badge}>
                <span className="material-symbols-outlined" translate="no">gavel</span>
                <span>Uso Profesional</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
