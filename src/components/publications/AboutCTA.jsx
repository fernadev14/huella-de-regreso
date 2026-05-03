import { useState } from 'react';
import { useScrollAnimation } from './useScrollAnimation';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .cta-section {
    background: #fff8e6;
    padding: 100px 48px;
    position: relative;
    overflow: hidden;
    text-align: center;
  }

  .cta-paw-bg {
    position: absolute;
    font-size: 280px;
    opacity: 0.04;
    pointer-events: none;
    user-select: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1;
  }

  .cta-inner {
    position: relative;
    z-index: 1;
    max-width: 720px;
    margin: 0 auto;
  }

  /* ── Badge ── */
  .cta-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #fff;
    border: 1px solid #f5a62350;
    color: #c47f00;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 999px;
    margin-bottom: 28px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .cta-badge.visible { opacity: 1; transform: translateY(0); }

  /* ── Heading ── */
  .cta-heading {
    font-family: 'Inter', sans-serif;
    font-size: clamp(36px, 5vw, 60px);
    font-weight: 800;
    line-height: 1.1;
    color: #1a1a2e;
    margin-bottom: 20px;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
  }
  .cta-heading span { color: #f5a623; }
  .cta-heading.visible { opacity: 1; transform: translateY(0); }

  /* ── Sub ── */
  .cta-sub {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.7;
    color: #4b5563;
    max-width: 520px;
    margin: 0 auto 48px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
  }
  .cta-sub.visible { opacity: 1; transform: translateY(0); }

  /* ── Buttons ── */
  .cta-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 64px;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s;
  }
  .cta-actions.visible { opacity: 1; transform: translateY(0); }

  .cta-btn-primary {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #1a1a2e;
    background: #f5a623;
    padding: 14px 36px;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .cta-btn-primary:hover {
    background: #e09410;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(245,166,35,0.35);
  }

  .cta-btn-secondary {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: #374151;
    background: #fff;
    padding: 14px 36px;
    border: 1.5px solid #e5e7eb;
    cursor: pointer;
    border-radius: 10px;
    transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }
  .cta-btn-secondary:hover {
    border-color: #f5a623;
    color: #c47f00;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  }

  /* ── Divider ── */
  .cta-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 28px;
    opacity: 0;
    transition: opacity 0.7s ease 0.4s;
  }
  .cta-divider.visible { opacity: 1; }
  .cta-divider-line {
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }
  .cta-divider-text {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 1px;
    white-space: nowrap;
  }

  /* ── Newsletter ── */
  .cta-newsletter {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s;
  }
  .cta-newsletter.visible { opacity: 1; transform: translateY(0); }

  .newsletter-label {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #6b7280;
    margin-bottom: 14px;
  }

  .newsletter-form {
    display: flex;
    gap: 0;
    max-width: 440px;
    margin: 0 auto;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    border-radius: 10px;
    overflow: hidden;
  }

  .newsletter-input {
    flex: 1;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: #1a1a2e;
    background: #fff;
    border: 1.5px solid #e5e7eb;
    border-right: none;
    padding: 14px 18px;
    outline: none;
    border-radius: 10px 0 0 10px;
    transition: border-color 0.2s ease;
  }
  .newsletter-input::placeholder { color: #9ca3af; }
  .newsletter-input:focus { border-color: #f5a623; }

  .newsletter-btn {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #1a1a2e;
    background: #f5a623;
    border: none;
    padding: 14px 22px;
    cursor: pointer;
    border-radius: 0 10px 10px 0;
    transition: background 0.2s ease;
    white-space: nowrap;
  }
  .newsletter-btn:hover { background: #e09410; }

  .newsletter-success {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #16a34a;
    margin-top: 14px;
    animation: fadeIn 0.4s ease;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 768px) {
    .cta-section { padding: 72px 20px; }
    .newsletter-form { flex-direction: column; border-radius: 10px; overflow: visible; box-shadow: none; }
    .newsletter-input { border-right: 1.5px solid #e5e7eb; border-radius: 10px; margin-bottom: 8px; }
    .newsletter-btn { border-radius: 10px; }
  }
`;

export default function AboutCTA() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [ref, visible] = useScrollAnimation(0.2);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSent(true);
      setEmail('');
    }
  };

  return (
    <>
      <style>{STYLES}</style>
      <section className="cta-section">
        <div className="cta-paw-bg">🐾</div>

        <div className="cta-inner" ref={ref}>
          <p className={`cta-badge ${visible ? 'visible' : ''}`}>
            🐾 Únete a la comunidad
          </p>

          <h2 className={`cta-heading ${visible ? 'visible' : ''}`}>
            ¿Listo para dejar<br />tu <span>huella</span>?
          </h2>

          <p className={`cta-sub ${visible ? 'visible' : ''}`}>
            Reporta una mascota perdida, comparte un avistamiento o simplemente sé parte de la red. Cada acción tuya puede reunir a una familia con su compañero.
          </p>

          <div className={`cta-actions ${visible ? 'visible' : ''}`}>
            <button className="cta-btn-primary">
              + Hacer un reporte
            </button>
            <button className="cta-btn-secondary">
              Ver mascotas perdidas
            </button>
          </div>

          <div className={`cta-divider ${visible ? 'visible' : ''}`}>
            <div className="cta-divider-line" />
            <span className="cta-divider-text">o recibe alertas en tu zona</span>
            <div className="cta-divider-line" />
          </div>

          <div className={`cta-newsletter ${visible ? 'visible' : ''}`}>
            <p className="newsletter-label">Te avisamos cuando haya mascotas perdidas cerca de ti</p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                className="newsletter-input"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="newsletter-btn" type="submit">Suscribirme</button>
            </form>
            {sent && (
              <p className="newsletter-success">
                ✅ ¡Listo! Te avisaremos cuando haya mascotas cerca de ti.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}