import { useScrollAnimation } from './useScrollAnimation';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Inter:wght@300;400;500&display=swap');

  .qs-story {
    background: #ffffff;
    padding: 100px 48px;
    position: relative;
    overflow: hidden;
  }

  .qs-story-inner {
    max-width: 900px;
    margin: 0 auto;
  }

  .qs-story-header {
    text-align: center;
    margin-bottom: 80px;
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

  .qs-story-title {
    font-family: 'Nunito', sans-serif;
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 900;
    color: #1a1a2e;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s;
  }
  .qs-story-title span { color: #F5C500; }
  .qs-story-title.vis { opacity: 1; transform: translateY(0); }

  /* Timeline */
  .qs-timeline {
    position: relative;
    padding-left: 40px;
  }

  .qs-timeline::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: linear-gradient(to bottom, #F5C500, rgba(245,197,0,0.15));
    border-radius: 2px;
  }

  .qs-tl-item {
    position: relative;
    margin-bottom: 48px;
    opacity: 0;
    transform: translateX(-20px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .qs-tl-item.vis { opacity: 1; transform: translateX(0); }
  .qs-tl-item:last-child { margin-bottom: 0; }

  /* Dot en la línea */
  .qs-tl-dot {
    position: absolute;
    left: -32px;
    top: 12px;
    width: 18px; height: 18px;
    background: #F5C500;
    border-radius: 50%;
    border: 3px solid #ffffff;
    box-shadow: 0 0 0 2px #F5C500;
    transition: transform 0.3s ease;
  }
  .qs-tl-item:hover .qs-tl-dot { transform: scale(1.4); }

  .qs-tl-card {
    background: #f8faff;
    border: 1.5px solid #edf2f7;
    border-radius: 16px;
    padding: 28px 32px;
    transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
    cursor: default;
  }
  .qs-tl-item:hover .qs-tl-card {
    box-shadow: 0 12px 32px rgba(0,0,0,0.08);
    border-color: #F5C500;
    transform: translateX(6px);
  }

  .qs-tl-year {
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    font-weight: 800;
    color: #F5C500;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .qs-tl-title {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #1a1a2e;
    margin-bottom: 8px;
  }

  .qs-tl-text {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #718096;
    line-height: 1.75;
  }

  .qs-tl-emoji {
    float: right;
    font-size: 32px;
    margin-left: 16px;
    margin-bottom: 8px;
  }

  @media (max-width: 640px) {
    .qs-story { padding: 72px 24px; }
    .qs-timeline { padding-left: 28px; }
  }
`;

const events = [
  {
    year: '2024',
    emoji: '💡',
    title: 'La historia comienza con un perro perdido',
    text: 'Fernando pasó tres semanas buscando a Manchas, su gato. Lo encontró, pero la experiencia le mostró cuánto dolor puede evitarse con la herramienta correcta. Esa noche nació la idea.',
  },
  {
    year: '2025-1',
    emoji: '🛠️',
    title: 'De la idea a la primera versión',
    text: 'Un equipo de 2 personas construyó el primer prototipo en su habitación. En los primeros 30 días, ya habían 200 usuarios y el primer reencuentro emocionó a todos.',
  },
  {
    year: '2025-2',
    emoji: '🌍',
    title: 'Colombia nos abraza',
    text: 'La plataforma se expandió a 12 ciudades. Voluntarios, veterinarios y rescatistas se unieron espontáneamente. La comunidad construyó algo que ningún algoritmo podría hacer solo.',
  },
  {
    year: '2026-1',
    emoji: '🎉',
    title: 'Más de 500 mascotas en casa',
    text: 'Superamos los 500 reencuentros felices documentados. Cada uno con una historia diferente, pero todos con el mismo final: lágrimas de alegría y colas que no paran de moverse.',
  },
  {
    year: '2026-2',
    emoji: '🚀',
    title: 'Seguimos creciendo juntos',
    text: 'Nuevas funciones, más ciudades, más voluntarios. Y la misma certeza: mientras haya una mascota perdida, seguiremos trabajando para traerla a casa.',
  },
];

function TlItem({ event }) {
  const [ref, vis] = useScrollAnimation(0.3);
  return (
    <div className={`qs-tl-item ${vis ? 'vis' : ''}`} ref={ref}>
      <div className="qs-tl-dot" />
      <div className="qs-tl-card">
        <span className="qs-tl-emoji">{event.emoji}</span>
        <p className="qs-tl-year">{event.year}</p>
        <p className="qs-tl-title">{event.title}</p>
        <p className="qs-tl-text">{event.text}</p>
      </div>
    </div>
  );
}

export default function AboutStory() {
  const [headerRef, headerVis] = useScrollAnimation(0.2);

  return (
    <>
      <style>{STYLES}</style>
      <section className="qs-story">
        <div className="qs-story-inner">
          <div className="qs-story-header" ref={headerRef}>
            <span className={`qs-section-tag ${headerVis ? 'vis' : ''}`}>📖 Nuestra historia</span>
            <h2 className={`qs-story-title ${headerVis ? 'vis' : ''}`}>
              Empezó con una <span>mascota perdida</span><br />y un corazón obstinado
            </h2>
          </div>

          <div className="qs-timeline">
            {events.map((e, i) => <TlItem key={i} event={e} />)}
          </div>
        </div>
      </section>
    </>
  );
}