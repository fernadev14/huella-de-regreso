import { useState } from 'react';
import { useScrollAnimation } from './useScrollAnimation';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Inter:wght@300;400;500&display=swap');

  .qs-solution {
    background: linear-gradient(135deg, #e8f4fd 0%, #f0f8ff 50%, #e8f4fd 100%);
    padding: 100px 48px;
    position: relative;
    overflow: hidden;
  }

  .qs-solution-inner {
    max-width: 1100px;
    margin: 0 auto;
  }

  .qs-solution-header {
    text-align: center;
    margin-bottom: 72px;
  }

  .qs-section-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #fff9d6;
    border: 1.5px solid #F5C500;
    border-radius: 100px;
    padding: 5px 14px;
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: #b8860b;
    margin-bottom: 20px;
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  .qs-section-tag.vis { opacity: 1; }

  .qs-solution-title {
    font-family: 'Nunito', sans-serif;
    font-size: clamp(30px, 4vw, 50px);
    font-weight: 900;
    color: #1a1a2e;
    margin-bottom: 14px;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s;
  }
  .qs-solution-title span { color: #F5C500; }
  .qs-solution-title.vis { opacity: 1; transform: translateY(0); }

  .qs-solution-sub {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: #718096;
    max-width: 500px;
    margin: 0 auto;
    line-height: 1.7;
    opacity: 0;
    transition: opacity 0.8s ease 0.2s;
  }
  .qs-solution-sub.vis { opacity: 1; }

  /* Steps interactivos */
  .qs-steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 64px;
  }

  .qs-step {
    position: relative;
    opacity: 0;
    transform: translateY(32px);
  }
  .qs-step.vis {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  /* Línea conectora entre steps */
  .qs-step:not(:last-child)::after {
    content: '→';
    position: absolute;
    top: 40px;
    right: -18px;
    font-size: 20px;
    color: #F5C500;
    z-index: 2;
    opacity: 0.6;
  }

  .qs-step-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 32px 24px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.07);
    border: 2px solid transparent;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    height: 100%;
  }
  .qs-step-card:hover,
  .qs-step-card.active {
    transform: translateY(-8px);
    box-shadow: 0 20px 48px rgba(245,197,0,0.18);
    border-color: #F5C500;
  }

  .qs-step-num {
    width: 36px; height: 36px;
    background: #F5C500;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    font-weight: 900;
    color: #1a1a2e;
    margin-bottom: 16px;
  }

  .qs-step-icon {
    font-size: 32px;
    margin-bottom: 12px;
    display: block;
  }

  .qs-step-title {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 800;
    color: #1a1a2e;
    margin-bottom: 8px;
  }

  .qs-step-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #718096;
    line-height: 1.65;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease, opacity 0.4s ease;
    opacity: 0;
  }
  .qs-step-card:hover .qs-step-desc,
  .qs-step-card.active .qs-step-desc {
    max-height: 100px;
    opacity: 1;
  }

  /* Sección diferenciadores */
  .qs-diff-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.9s ease, transform 0.9s ease;
  }
  .qs-diff-grid.vis { opacity: 1; transform: translateY(0); }

  .qs-diff-item {
    background: rgba(255,255,255,0.8);
    border-radius: 16px;
    padding: 28px 24px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    border: 1.5px solid rgba(245,197,0,0.2);
    transition: background 0.3s ease, border-color 0.3s ease;
  }
  .qs-diff-item:hover {
    background: #ffffff;
    border-color: #F5C500;
  }

  .qs-diff-icon {
    font-size: 26px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .qs-diff-title {
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    font-weight: 800;
    color: #1a1a2e;
    margin-bottom: 4px;
  }

  .qs-diff-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #718096;
    line-height: 1.6;
  }

  @media (max-width: 900px) {
    .qs-solution { padding: 72px 24px; }
    .qs-steps { grid-template-columns: repeat(2, 1fr); }
    .qs-step:not(:last-child)::after { display: none; }
    .qs-diff-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 480px) {
    .qs-steps { grid-template-columns: 1fr; }
  }
`;

const steps = [
  { icon: '📸', title: 'Publica el reporte', desc: 'Sube una foto de tu mascota, agrega su descripción y marca el lugar donde se perdió en el mapa.' },
  { icon: '🔔', title: 'Alertas automáticas', desc: 'Notificamos al instante a todos los usuarios cercanos a la zona donde fue visto por última vez.' },
  { icon: '👀', title: 'La comunidad busca', desc: 'Miles de personas atentas en tu ciudad revisan el reporte y reportan avistamientos en tiempo real.' },
  { icon: '🏡', title: '¡Reencuentro!', desc: 'Coordinamos el reencuentro de forma segura, y celebramos junto a tu familia ese final feliz.' },
];

const diffs = [
  { icon: '📍', title: 'Búsqueda geolocalizada', desc: 'Alertas solo a personas en el radio exacto donde se perdió tu mascota.' },
  { icon: '🌐', title: '100% gratuito', desc: 'Acceso libre para todas las familias. La ayuda no debe tener costo.' },
  { icon: '🤝', title: 'Red de voluntarios', desc: 'Rescatistas, veterinarios y vecinos comprometidos en cada ciudad.' },
];

export default function AboutSolution() {
  const [activeStep, setActiveStep] = useState(null);
  const [headerRef, headerVis] = useScrollAnimation(0.2);
  const [stepsRef, stepsVis] = useScrollAnimation(0.1);
  const [diffRef, diffVis] = useScrollAnimation(0.2);

  return (
    <>
      <style>{STYLES}</style>
      <section className="qs-solution">
        <div className="qs-solution-inner">
          <div className="qs-solution-header" ref={headerRef}>
            <span className={`qs-section-tag ${headerVis ? 'vis' : ''}`}>💡 Cómo funciona</span>
            <h2 className={`qs-solution-title ${headerVis ? 'vis' : ''}`}>
              Simple, rápido y<br /><span>efectivo</span>
            </h2>
            <p className={`qs-solution-sub ${headerVis ? 'vis' : ''}`}>
              4 pasos que pueden cambiar todo. Toca cada paso para ver más detalles.
            </p>
          </div>

          <div className="qs-steps" ref={stepsRef}>
            {steps.map((s, i) => (
              <div
                className={`qs-step ${stepsVis ? 'vis' : ''}`}
                key={i}
                style={{ transitionDelay: `${0.1 * i}s` }}
              >
                <div
                  className={`qs-step-card ${activeStep === i ? 'active' : ''}`}
                  onClick={() => setActiveStep(activeStep === i ? null : i)}
                >
                  <div className="qs-step-num">{i + 1}</div>
                  <span className="qs-step-icon">{s.icon}</span>
                  <p className="qs-step-title">{s.title}</p>
                  <p className="qs-step-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`qs-diff-grid ${diffVis ? 'vis' : ''}`} ref={diffRef}>
            {diffs.map((d, i) => (
              <div className="qs-diff-item" key={i} style={{ transitionDelay: `${0.1 * i}s` }}>
                <span className="qs-diff-icon">{d.icon}</span>
                <div>
                  <p className="qs-diff-title">{d.title}</p>
                  <p className="qs-diff-desc">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}