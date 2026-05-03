import { useScrollAnimation, useCounter } from './useScrollAnimation';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .impact-section {
    background: #f8f9fb;
    padding: 100px 48px;
    position: relative;
    overflow: hidden;
  }

  .impact-inner {
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ── Header ── */
  .impact-badge {
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
  .impact-badge.visible { opacity: 1; transform: translateY(0); }

  .impact-heading {
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
  .impact-heading span { color: #f5a623; }
  .impact-heading.visible { opacity: 1; transform: translateY(0); }

  .impact-sub {
    font-family: 'Inter', sans-serif;
    font-size: 17px;
    font-weight: 400;
    color: #6b7280;
    max-width: 520px;
    line-height: 1.7;
    margin-bottom: 64px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
  }
  .impact-sub.visible { opacity: 1; transform: translateY(0); }

  /* ── Counters ── */
  .impact-counters {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 64px;
  }

  .impact-counter {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    padding: 36px 24px;
    text-align: center;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    cursor: default;
  }
  .impact-counter.visible { opacity: 1; transform: translateY(0); }
  .impact-counter:hover {
    box-shadow: 0 8px 32px rgba(245,166,35,0.12);
    border-color: #f5a62350;
  }

  .counter-number {
    font-family: 'Inter', sans-serif;
    font-size: clamp(36px, 4vw, 52px);
    font-weight: 800;
    color: #1a1a2e;
    line-height: 1;
    margin-bottom: 4px;
  }
  .counter-number span { color: #f5a623; }

  .counter-label {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 4px;
  }

  .counter-desc {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 400;
    color: #9ca3af;
    line-height: 1.5;
  }

  /* ── Testimonials ── */
  .impact-testimonials {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .testimonial-card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    padding: 36px 32px;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease;
    position: relative;
  }
  .testimonial-card.visible { opacity: 1; transform: translateY(0); }
  .testimonial-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.06); }

  .testimonial-quote-icon {
    font-size: 32px;
    margin-bottom: 16px;
    display: block;
    line-height: 1;
  }

  .testimonial-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: #374151;
    line-height: 1.75;
    margin-bottom: 24px;
    font-style: italic;
  }

  .testimonial-footer {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .testimonial-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff8e6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .testimonial-author {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #1a1a2e;
  }

  .testimonial-role {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 400;
    color: #9ca3af;
    margin-top: 2px;
  }

  @media (max-width: 768px) {
    .impact-section { padding: 64px 20px; }
    .impact-counters { grid-template-columns: repeat(2, 1fr); }
    .impact-testimonials { grid-template-columns: 1fr; }
  }
`;

function AnimatedCounter({ target, suffix, prefix, label, desc, delay, visible }) {
  const count = useCounter(target, 2000, visible);
  return (
    <div
      className={`impact-counter ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: delay }}
    >
      <div className="counter-number">
        <span>{prefix}</span>{count.toLocaleString()}<span>{suffix}</span>
      </div>
      <p className="counter-label">{label}</p>
      <p className="counter-desc">{desc}</p>
    </div>
  );
}

const counters = [
  { prefix: '+', target: 500,  suffix: '',  label: 'Mascotas encontradas', desc: 'Reunidas con sus familias' },
  { prefix: '+', target: 1200, suffix: '',  label: 'Reportes activos',      desc: 'Perdidas y encontradas' },
  { prefix: '+', target: 3000, suffix: '',  label: 'Personas ayudando',     desc: 'En toda Colombia' },
  { prefix: '',  target: 48,   suffix: 'h', label: 'Tiempo promedio',       desc: 'Para encontrar una mascota' },
];

const testimonials = [
  {
    emoji: '🐶',
    text: 'Pensé que nunca volvería a ver a mi Mochi. En menos de dos días, gracias a Huella de Regreso, alguien la encontró a cuatro cuadras de casa.',
    author: 'Laura Jiménez',
    role: 'Bogotá, Colombia',
  },
  {
    emoji: '🐱',
    text: 'Encontré un perrito en la calle y no sabía qué hacer. Publiqué en la plataforma y en pocas horas ya estaba con su dueña. ¡Una comunidad increíble!',
    author: 'Carlos Mendoza',
    role: 'Medellín, Colombia',
  },
];

export default function AboutImpact() {
  const [headerRef, headerVisible] = useScrollAnimation(0.2);
  const [countersRef, countersVisible] = useScrollAnimation(0.15);
  const [testiRef, testiVisible] = useScrollAnimation(0.2);

  return (
    <>
      <style>{STYLES}</style>
      <section className="impact-section">
        <div className="impact-inner">

          <div ref={headerRef}>
            <p className={`impact-badge ${headerVisible ? 'visible' : ''}`}>
              📊 Nuestro impacto
            </p>
            <h2 className={`impact-heading ${headerVisible ? 'visible' : ''}`}>
              Números que cuentan<br /><span>reencuentros reales</span>
            </h2>
            <p className={`impact-sub ${headerVisible ? 'visible' : ''}`}>
              Cada número representa una mascota que volvió a casa y una familia que volvió a estar completa.
            </p>
          </div>

          <div className="impact-counters" ref={countersRef}>
            {counters.map((c, i) => (
              <AnimatedCounter
                key={i}
                {...c}
                delay={`${0.1 * i}s`}
                visible={countersVisible}
              />
            ))}
          </div>

          <div className="impact-testimonials" ref={testiRef}>
            {testimonials.map((t, i) => (
              <div
                className={`testimonial-card ${testiVisible ? 'visible' : ''}`}
                key={i}
                style={{ transitionDelay: `${0.15 * i}s` }}
              >
                <span className="testimonial-quote-icon">💬</span>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-footer">
                  <div className="testimonial-avatar">{t.emoji}</div>
                  <div>
                    <p className="testimonial-author">{t.author}</p>
                    <p className="testimonial-role">{t.role}</p>
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