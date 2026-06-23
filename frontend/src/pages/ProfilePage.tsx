import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Input } from '../components/ui/Input';
import { useProfile } from '../hooks/useProfile';
import styles from '../styles/ProfilePage.module.css';

const DEPARTAMENTOS = [
  { value: '', label: 'Selecciona departamento' },
  { value: 'antioquia', label: 'Antioquia' },
  { value: 'bogota', label: 'Bogotá D.C.' },
  { value: 'valle', label: 'Valle del Cauca' },
  { value: 'atlantico', label: 'Atlántico' },
];

const CIUDADES = [
  { value: '', label: 'Selecciona ciudad' },
  { value: 'medellin', label: 'Medellín' },
  { value: 'bogota_city', label: 'Bogotá' },
  { value: 'cali', label: 'Cali' },
  { value: 'barranquilla', label: 'Barranquilla' },
];

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { cargando, error, exito, submit } = useProfile();

  const handleLogout = () => {
    navigate('/');
  };

  if (exito) {
    return (
      <div className={styles.page}>
        <Header user={{ name: 'Dr. Alejandro Rivera', onLogout: handleLogout }} />
        <main className={styles.main}>
          <div className={styles.wrapper}>
            <div className={styles.successCard}>
              <div className={styles.successIcon}>
                <span className="material-symbols-outlined" translate="no">check</span>
              </div>
              <h2 className={styles.successTitle}>¡Perfil actualizado!</h2>
              <p className={styles.successSubtitle}>
                Tu información ha sido guardada correctamente. Serás redirigido al siguiente paso.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header user={{ name: 'Dr. Alejandro Rivera', onLogout: handleLogout }} />

      <main className={styles.main}>
        <div className={styles.bgDecor}>
          <div className={styles.bgBlur1} />
          <div className={styles.bgBlur2} />
        </div>

        <div className={styles.wrapper}>
          <div className={styles.progressHeader}>
            <div className={styles.stepBadge}>
              <span className={styles.stepBadgeText}>Paso 1 de 2</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} />
            </div>
          </div>

          <div className={styles.card}>
            <header className={styles.cardHeader}>
              <h1 className={styles.cardTitle}>Personaliza tu perfil de cliente</h1>
              <p className={styles.cardSubtitle}>
                Cuéntanos un poco sobre ti para brindarte la mejor asesoría legal.
              </p>
            </header>

            <form className={styles.form} onSubmit={submit}>
              <div className={styles.avatarSection}>
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatarCircle}>
                    <div className={styles.avatarPlaceholder}>
                      <span className="material-symbols-outlined" translate="no">person</span>
                    </div>
                  </div>
                  <div className={styles.avatarEdit}>
                    <span className="material-symbols-outlined" translate="no">edit</span>
                  </div>
                </div>
                <span className={styles.avatarLabel}>Foto de perfil</span>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="full_name">Nombre completo</label>
                <Input
                  id="full_name"
                  type="text"
                  placeholder="Ej. Dr. Alejandro Rivera"
                  icon={<span className="material-symbols-outlined" translate="no">person</span>}
                />
              </div>

              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="departamento">Departamento</label>
                  <div className={styles.inputGroup}>
                    <span className={styles.inputIcon}>
                      <span className="material-symbols-outlined" translate="no">map</span>
                    </span>
                    <select id="departamento" className={styles.fieldSelect} defaultValue="">
                      {DEPARTAMENTOS.map((d) => (
                        <option key={d.value} value={d.value} disabled={d.value === ''}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                    <span className={styles.selectArrow}>
                      <span className="material-symbols-outlined" translate="no">expand_more</span>
                    </span>
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="ciudad">Ciudad</label>
                  <div className={styles.inputGroup}>
                    <span className={styles.inputIcon}>
                      <span className="material-symbols-outlined" translate="no">location_city</span>
                    </span>
                    <select id="ciudad" className={styles.fieldSelect} defaultValue="">
                      {CIUDADES.map((c) => (
                        <option key={c.value} value={c.value} disabled={c.value === ''}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <span className={styles.selectArrow}>
                      <span className="material-symbols-outlined" translate="no">expand_more</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="dob">Fecha de nacimiento</label>
                <div className={styles.inputGroup}>
                  <span className={styles.inputIcon}>
                    <span className="material-symbols-outlined" translate="no">calendar_today</span>
                  </span>
                  <input id="dob" type="date" className={styles.fieldInput} style={{ paddingLeft: '3rem' }} />
                </div>
              </div>

              {error && <p style={{ color: 'var(--error)', textAlign: 'center', fontSize: '0.875rem' }}>{error}</p>}

              <div className={styles.submitSection}>
                <button type="submit" className={styles.submitBtn} disabled={cargando}>
                  {cargando ? (
                    <>
                      <span className={`material-symbols-outlined ${styles.spinner}`} translate="no">progress_activity</span>
                      Guardando...
                    </>
                  ) : (
                    <>
                      Continuar
                      <span className="material-symbols-outlined" translate="no">arrow_forward</span>
                    </>
                  )}
                </button>
                <p className={styles.legalText}>
                  Al continuar, confirmas que la información proporcionada es veraz y actual.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
