import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useRegister } from '../hooks/useRegister';
import styles from '../styles/RegisterPage.module.css';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    email, setEmail,
    password, setPassword,
    role, setRole,
    cargando, error, exito,
    submit, reset,
  } = useRegister();

  const irAlInicio = () => {
    reset();
    navigate('/');
  };

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.bgLayer}>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLj9ft7zkiSFPuglVwreR7W-aXky42pDL2VjzDHPNTzWfXOBfojB6LrlSYM-Kd9_b_3Ria-JSo1ItuuoE8PiKhCGbs00dJGQVgnzSgIOTXb1qzDBvOmtMGdpujmd8M03j__Lp2l8WCnvrVBeecG7SMnvHw5dNmC755LMzt3vG5_fW3jPOyc_MQS1NJXNMLni4ILwTFaY3vnP_5DEYqkuN23GZcFLvInmzrl0zZc_9jdW4A66wCfzeKVvIyy2U9EFMFVFlKofM6h8yj"
            alt="LawSource Professional Environment"
            className={styles.bgImage}
          />
          <div className={styles.vignette}></div>
        </div>

        <section className={styles.section}>
          <div className={styles.card}>
            {exito ? (
              <div className={styles.successOverlay}>
                <div className={styles.successIcon}>
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <h2 className={styles.successTitle}>¡Registro exitoso!</h2>
                <p className={styles.successMessage}>Te haz registrado correctamente</p>
                <button onClick={irAlInicio} className={styles.submitBtn}>
                  Aceptar
                  <span className="material-symbols-outlined">home</span>
                </button>
              </div>
            ) : (
              <>
                <div className={styles.cardHeader}>
                  <h1 className={styles.cardTitle}>Regístrate ahora</h1>
                  <p className={styles.cardSubtitle}>Únete a la red líder de profesionales del derecho</p>
                </div>

                <form className={styles.form} onSubmit={submit}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">Correo electrónico</label>
                    <input
                      className={styles.input}
                      id="email"
                      type="email"
                      placeholder="ejemplo@lawsource.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="password">Contraseña</label>
                    <input
                      className={styles.input}
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="confirm-password">Confirmación de contraseña</label>
                    <input
                      className={styles.input}
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className={styles.field}>
                    <span className={styles.label}>Rol</span>
                    <div className={styles.roleGrid}>
                      <button
                        type="button"
                        className={`${styles.roleBtn} ${role === 'cliente' ? styles.roleBtnActive : ''}`}
                        onClick={() => setRole('cliente')}
                      >
                        <span className={`material-symbols-outlined ${role === 'cliente' ? styles.iconFilled : ''}`}>person</span>
                        Cliente
                      </button>
                      <button
                        type="button"
                        className={`${styles.roleBtn} ${role === 'abogado' ? styles.roleBtnActive : ''}`}
                        onClick={() => setRole('abogado')}
                      >
                        <span className={`material-symbols-outlined ${role === 'abogado' ? styles.iconFilled : ''}`}>gavel</span>
                        Abogado
                      </button>
                    </div>
                  </div>

                  {error && <p className={styles.errorMsg}>{error}</p>}

                  <button type="submit" className={styles.submitBtn} disabled={cargando}>
                    {cargando ? 'Registrando...' : 'Registrarme'}
                    {!cargando && <span className="material-symbols-outlined">arrow_forward</span>}
                  </button>
                </form>

                <div className={styles.footerLink}>
                  <p>¿Ya tienes cuenta? <Link to="/" className={styles.loginLink}>Inicia sesión aquí.</Link></p>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
