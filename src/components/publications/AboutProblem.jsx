import { useScrollAnimation } from './useScrollAnimation';

const problems = [
  {
    emoji: '😢',
    stat: '1 de 3',
    title: 'Mascotas se pierden',
    desc: 'Al año, miles de familias colombianas viven la angustia de no saber dónde está su compañero fiel.',
  },
  {
    emoji: '⏰',
    stat: '48 hrs',
    title: 'Ventana crítica',
    desc: 'Las primeras 48 horas son decisivas. Sin una red de ayuda rápida, las posibilidades disminuyen significativamente.',
  },
  {
    emoji: '💔',
    stat: '60%',
    title: 'No regresan',
    desc: 'Sin una plataforma de reporte centralizada, más de la mitad de las mascotas perdidas nunca vuelven a casa.',
  },
];

export default function AboutProblem() {
  const [headerRef, headerVis] = useScrollAnimation(0.2);
  const [cardsRef, cardsVis] = useScrollAnimation(0.1);
  const [quoteRef, quoteVis] = useScrollAnimation(0.2);

  return (
    <>
      {/* <style>{STYLES}</style> */}
      <section className="qs-problem">
        <div className="qs-problem-bg-paw">🐾</div>
        <div className="qs-problem-inner">
          <div className="qs-problem-header" ref={headerRef}>
            <span className={`qs-section-tag ${headerVis ? 'vis' : ''}`}>😿 El problema</span>
            <h2 className={`qs-problem-title ${headerVis ? 'vis' : ''}`}>
              Perder una mascota duele.<br />Encontrarla, lo cambia todo.
            </h2>
            <p className={`qs-problem-sub ${headerVis ? 'vis' : ''}`}>
              Antes de Huella de Regreso, la búsqueda era caótica: carteles en postes, 
              grupos de WhatsApp y mucha desesperanza.
            </p>
          </div>

          <div className="qs-problem-cards" ref={cardsRef}>
            {problems.map((p, i) => (
              <div
                className={`qs-prob-card ${cardsVis ? 'vis' : ''}`}
                key={i}
                style={{ transitionDelay: `${0.12 * i}s` }}
              >
                <span className="qs-prob-emoji">{p.emoji}</span>
                <div className="qs-prob-stat">{p.stat}</div>
                <p className="qs-prob-title">{p.title}</p>
                <p className="qs-prob-desc">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className={`qs-problem-quote ${quoteVis ? 'vis' : ''}`} ref={quoteRef}>
            <p className="qs-quote-text">
              "No es solo tecnología... es <span>esperanza</span>. Cada reporte 
              es una historia, cada alerta una posibilidad, 
              y cada reencuentro... un final feliz."
            </p>
            <p className="qs-quote-sub">— El corazón de Huella de Regreso</p>
          </div>
        </div>
      </section>
    </>
  );
}