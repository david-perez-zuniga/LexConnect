import React from 'react';
import layoutStyles from '../../styles/Landing.module.css';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  return (
    <section className={layoutStyles.heroSection}>
      <div className={layoutStyles.heroBackground} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80')" }}></div>
      <div className={layoutStyles.heroOverlay}></div>
      <div className={layoutStyles.heroContent}>
        <div className={styles.heroInner}>
          <div className={styles.badge}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }} translate="no">balance</span>
            <span>Claridad y Autoridad</span>
          </div>
          
          <h1 className={layoutStyles.heroTitle}>
            El puente directo a tu <span className={styles.titleAccent}>abogado perfecto</span>
          </h1>
          
          <p className={styles.heroDescription}>
            Una plataforma editorial curada que conecta a ciudadanos con profesionales del derecho en Nicaragua, priorizando la transparencia y la experiencia.
          </p>
          
          <div className={styles.heroButtons}>
            <button className={styles.secondaryButton}>
              Conoce más
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};