import { useScrollAnimation } from './useScrollAnimation';
import '../../styles/quienes-somos.css';

const cards = [
  { icon: '📣', title: 'Reporta fácil', desc: 'En segundos desde tu celular, con foto y ubicación' },
  { icon: '🔔', title: 'Alertas locales', desc: 'Avisamos a personas cercanas automáticamente' },
  { icon: '🤝', title: 'Red solidaria', desc: 'Miles de vecinos dispuestos a ayudar' },
  { icon: '🏠', title: 'Reencuentro feliz', desc: 'Coordinamos el regreso a casa de forma segura' },
];

export default function AboutMission() {
  const [leftRef, leftVis] = useScrollAnimation(0.2);
  const [rightRef, rightVis] = useScrollAnimation(0.2);

  return (
    <>
      {/* <style>{STYLES}</style> */}
      <section className="qs-mission min-h-screen flex items-center justify-center py-20 px-4">
        <div className="qs-mission-inner">
          <div ref={leftRef}>
            <span className={`qs-section-tag ${leftVis ? 'vis' : ''}`}>🐶 Nuestra misión</span>
            <h2 className={`qs-mission-title ${leftVis ? 'vis' : ''}`}>
              Cada mascota<br />merece <span>volver a casa</span>
            </h2>
            <p className={`qs-mission-text ${leftVis ? 'vis' : ''}`}>
              Huella de Regreso nació porque perder a una mascota es perder a un miembro de la familia.
              Combinamos tecnología accesible con el poder de la comunidad para que ninguna 
              historia de amor entre humanos y animales quede sin un final feliz.
            </p>
            <div className={`qs-mission-values ${leftVis ? 'vis' : ''}`}>
              {['Accesible para todos', 'Respaldado por la comunidad', 'Rápido y confiable', 'Hecho con amor por Colombia'].map((v, i) => (
                <div className="qs-mission-value" key={i}>
                  <div className="qs-value-dot" />
                  {v}
                </div>
              ))}
            </div>
          </div>

          <div ref={rightRef}>
            <div className={`qs-mission-cards ${rightVis ? 'vis' : ''}`}>
              {cards.map((c, i) => (
                <div className="qs-mcard" key={i} style={{ transitionDelay: `${0.08 * i}s` }}>
                  <span className="qs-mcard-icon">{c.icon}</span>
                  <p className="qs-mcard-title">{c.title}</p>
                  <p className="qs-mcard-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}