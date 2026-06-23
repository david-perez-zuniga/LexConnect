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
  const { step, cargando, error, exito, submit, save, goBack } = useProfile();

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

  if (step === 2) {
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
                <span className={styles.stepBadgeText}>Paso 2 de 2</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: '100%' }} />
              </div>
            </div>

            <div className={styles.previewCard}>
              <div className={styles.previewHeaderBg}>
                <svg className={styles.previewPattern} viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true">
                  <line x1="0" y1="80" x2="40" y2="0" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <line x1="40" y1="80" x2="80" y2="0" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <line x1="80" y1="80" x2="120" y2="0" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <line x1="120" y1="80" x2="160" y2="0" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <line x1="160" y1="80" x2="200" y2="0" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <line x1="20" y1="80" x2="60" y2="0" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  <line x1="60" y1="80" x2="100" y2="0" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  <line x1="100" y1="80" x2="140" y2="0" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  <line x1="140" y1="80" x2="180" y2="0" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                </svg>
              </div>

              <div className={styles.previewAvatarWrapper}>
                <div className={styles.previewAvatar}>
                  <span className="material-symbols-outlined" translate="no">person</span>
                </div>
              </div>

              <h2 className={styles.previewName}>Dr. Alejandro Rivera</h2>

              <div className={styles.previewInfoGrid}>
                <div className={styles.previewInfoItem}>
                  <span className="material-symbols-outlined" translate="no">pin_drop</span>
                  <span className={styles.previewInfoText}>Bogotá, Colombia</span>
                </div>
                <div className={styles.previewInfoItem}>
                  <span className="material-symbols-outlined" translate="no">calendar_today</span>
                  <span className={styles.previewInfoText}>15 de marzo de 1985</span>
                </div>
              </div>

              <div className={styles.previewBanner}>
                <div className={styles.previewBannerIcon}>
                  <span className="material-symbols-outlined" translate="no">info</span>
                </div>
                <div className={styles.previewBannerText}>
                  <p>Al guardar tu perfil, podrás añadir tu firma digital y personalizar tu experiencia en LexConnect.</p>
                </div>
              </div>

              {error && <p style={{ color: 'var(--error)', textAlign: 'center', fontSize: '0.875rem' }}>{error}</p>}

              <div className={styles.previewActions}>
                <button type="button" className={styles.previewBtnSecondary} onClick={goBack}>
                  <span className="material-symbols-outlined" translate="no">arrow_back</span>
                  Regresar y Modificar
                </button>
                <button type="button" className={styles.previewBtnPrimary} onClick={save} disabled={cargando}>
                  {cargando ? (
                    <>
                      <span className={`material-symbols-outlined ${styles.spinner}`} translate="no">progress_activity</span>
                      Guardando...
                    </>
                  ) : (
                    <>
                      Guardar Perfil
                      <span className="material-symbols-outlined" translate="no">check</span>
                    </>
                  )}
                </button>
              </div>

              <p className={styles.legalText}>
                Al guardar tu perfil, confirmas que la información proporcionada es veraz y actual.
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
