import { useState } from 'react';
import { useScrollAnimation } from './useScrollAnimation';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .values-section {
    background: #ffffff;
    padding: 100px 48px;
    position: relative;
    overflow: hidden;
  }

  .values-inner {
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ── Header ── */
  .values-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #fff8e6;
    border: 1px solid #f5a62340;
    color: #c47f00;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 999px;
    margin-bottom: 24px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .values-badge.visible { opacity: 1; transform: translateY(0); }

  .values-heading {
    font-family: 'Inter', sans-serif;
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 800;
    line-height: 1.1;
    color: #1a1a2e;
    margin-bottom: 16px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
  }
  .values-heading span { color: #f5a623; }
  .values-heading.visible { opacity: 1; transform: translateY(0); }

  .values-sub {
    font-family: 'Inter', sans-serif;
    font-size: 17px;
    font-weight: 400;
    color: #6b7280;
    max-width: 560px;
    line-height: 1.7;
    margin-bottom: 16px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
  }
  .values-sub.visible { opacity: 1; transform: translateY(0); }

  .values-hint {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #9ca3af;
    margin-bottom: 48px;
    opacity: 0;
    transition: opacity 0.6s ease 0.3s;
  }
  .values-hint.visible { opacity: 1; }

  /* ── Grid ── */
  .values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .value-card {
    perspective: 1000px;
    height: 220px;
    cursor: pointer;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .value-card.visible { opacity: 1; transform: translateY(0); }

  .value-card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1);
  }
  .value-card.flipped .value-card-inner { transform: rotateY(180deg); }

  .value-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 28px 24px;
    transition: box-shadow 0.3s ease;
  }
  .value-face:hover { box-shadow: 0 8px 32px rgba(245,166,35,0.12); }

  .value-front {
    background: #fff;
    border-color: #e5e7eb;
  }

  .value-back {
    background: #f5a623;
    border-color: #f5a623;
    transform: rotateY(180deg);
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .value-icon {
    font-size: 36px;
    margin-bottom: 12px;
    display: block;
    line-height: 1;
  }

  .value-title {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 4px;
  }

  .value-tagline {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #9ca3af;
  }

  .value-back-text {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.7;
    color: #fff;
  }

  .value-back-hint {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.65);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 14px;
  }

  @media (max-width: 768px) {
    .values-section { padding: 64px 20px; }
    .values-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 480px) {
    .values-grid { grid-template-columns: 1fr; }
  }
`;

const values = [
  {
    icon: '🐾',
    title: 'Las mascotas primero',
    tagline: 'Siempre el centro',
    desc: 'Cada perro o gato perdido es una familia incompleta. Actuamos con urgencia porque cada hora cuenta.',
  },
  {
    icon: '🤝',
    title: 'Comunidad',
    tagline: 'Juntos encontramos más',
    desc: 'Creemos en la solidaridad vecinal. Un reporte llega más lejos cuando todos ayudan.',
  },
  {
    icon: '⚡',
    title: 'Rapidez',
    tagline: 'Cada minuto importa',
    desc: 'Las primeras horas son cruciales. Conectamos reportes con personas cercanas al instante.',
  },
  {
    icon: '🔍',
    title: 'Transparencia',
    tagline: 'Información honesta',
    desc: 'Cada reporte debe ser verificable. Fomentamos la responsabilidad para mantener la confianza.',
  },
  {
    icon: '❤️',
    title: 'Empatía',
    tagline: 'Sentimos tu angustia',
    desc: 'Sabemos lo que duele perder un compañero peludo. Construimos esto con el corazón.',
  },
  {
    icon: '🇨🇴',
    title: 'Hecho en Colombia',
    tagline: 'Nacimos aquí',
    desc: 'Somos colombianos, pensados para nuestra realidad. De barrio en barrio, cubrimos el país.',
  },
];

export default function AboutValues() {
  const [flipped, setFlipped] = useState(null);
  const [headerRef, headerVisible] = useScrollAnimation(0.2);
  const [gridRef, gridVisible] = useScrollAnimation(0.1);

  const toggle = (i) => setFlipped(flipped === i ? null : i);

  return (
    <>
      <style>{STYLES}</style>
      <section className="values-section">
        <div className="values-inner">

          <div ref={headerRef}>
            <p className={`values-badge ${headerVisible ? 'visible' : ''}`}>
              💛 Nuestros valores
            </p>
            <h2 className={`values-heading ${headerVisible ? 'visible' : ''}`}>
              Lo que nos <span>define</span>
            </h2>
            <p className={`values-sub ${headerVisible ? 'visible' : ''}`}>
              Estos valores viven en cada reporte, en cada reencuentro y en cada decisión que tomamos para hacer crecer esta comunidad.
            </p>
            <p className={`values-hint ${headerVisible ? 'visible' : ''}`}>
              👆 Toca una tarjeta para saber más
            </p>
          </div>

          <div className="values-grid" ref={gridRef}>
            {values.map((v, i) => (
              <div
                className={`value-card ${gridVisible ? 'visible' : ''} ${flipped === i ? 'flipped' : ''}`}
                key={i}
                onClick={() => toggle(i)}
                style={{ transitionDelay: `${0.07 * i}s` }}
              >
                <div className="value-card-inner">
                  <div className="value-face value-front">
                    <span className="value-icon">{v.icon}</span>
                    <p className="value-title">{v.title}</p>
                    <p className="value-tagline">{v.tagline}</p>
                  </div>
                  <div className="value-face value-back">
                    <p className="value-back-text">{v.desc}</p>
                    <p className="value-back-hint">Toca para cerrar</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}