import { useState } from 'react';
import { useScrollAnimation } from './useScrollAnimation';
import '../../styles/quienes-somos.css'

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
      {/* <style>{STYLES}</style> */}
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