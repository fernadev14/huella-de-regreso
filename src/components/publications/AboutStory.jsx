import { useScrollAnimation } from './useScrollAnimation';

const events = [
  {
    year: 'Inicio 2025',
    emoji: '💡',
    title: 'Todo empezó con una pérdida real',
    text: 'Perder una mascota no es solo un momento difícil, es no saber qué hacer después. Entre redes sociales, grupos y publicaciones, todo se vuelve desordenado. Ahí nació la idea: crear algo que realmente ayudara.',
  },
  {
    year: '2025',
    emoji: '🛠️',
    title: 'Construyendo desde cero',
    text: 'El proyecto empezó como una idea simple: una plataforma clara para reportar mascotas perdidas. Sin equipo grande, sin inversión, solo con la intención de solucionar un problema real.',
  },
  {
    year: '2025',
    emoji: '🌍',
    title: 'La comunidad empezó a crecer',
    text: 'Las primeras personas comenzaron a usar la plataforma y compartir reportes. Poco a poco, más gente se unió: vecinos, amigos, rescatistas. La ayuda dejó de ser individual y pasó a ser colectiva.',
  },
  {
    year: '2026',
    emoji: '🎉',
    title: 'Los primeros reencuentros',
    text: 'Cada mascota encontrada confirmó que la idea funcionaba. No eran solo números: eran historias reales, familias completas otra vez.',
  },
  {
    year: 'Hoy',
    emoji: '🚀',
    title: 'Seguimos creciendo',
    text: 'Huella de Regreso sigue evolucionando. Más funciones, más alcance, pero con el mismo objetivo: que ninguna mascota se pierda sin ser buscada.',
  },
];

function TlItem({ event }) {
  const [ref, vis] = useScrollAnimation(0.3);

  return (
    <div
      ref={ref}
      className={`relative pl-10 mb-12 transition-all duration-700 ${
        vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {/* DOT */}
      <div className="absolute left-0 top-3 w-4 h-4 bg-yellow-400 rounded-full border-4 border-white shadow-[0_0_0_2px_#F5C500]" />

      {/* CARD */}
      <div className="bg-blue-50 border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-yellow-400 transition group">
        
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-yellow-500 uppercase tracking-wider">
              {event.year}
            </p>

            <h3 className="font-nunito text-lg font-extrabold text-gray-900 mt-1">
              {event.title}
            </h3>
          </div>

          <span className="text-3xl opacity-70 group-hover:scale-110 transition">
            {event.emoji}
          </span>
        </div>

        <p className="font-inter text-sm text-gray-600 mt-3 leading-relaxed max-w-md">
          {event.text}
        </p>
      </div>
    </div>
  );
}

export default function AboutStory() {
  const [headerRef, headerVis] = useScrollAnimation(0.2);

  return (
    <section className="bg-white py-24 px-6 relative overflow-hidden">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div ref={headerRef} className="text-center mb-20">

          <span
            className={`inline-flex items-center gap-2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-1 rounded-full text-xs font-bold transition ${
              headerVis ? 'opacity-100' : 'opacity-0'
            }`}
          >
            📖 Nuestra historia
          </span>

          <h2
            className={`font-nunito text-3xl md:text-5xl font-extrabold text-gray-900 mt-4 transition ${
              headerVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Empezó con una{" "}
            <span className="text-yellow-500">mascota perdida</span>
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            No es solo una plataforma. Es una respuesta a un problema real.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative border-l-2 border-yellow-200 pl-6">
          {events.map((e, i) => (
            <TlItem key={i} event={e} />
          ))}
        </div>

        {/* CIERRE EMOCIONAL */}
        <div className="text-center mt-20">
          <p className="text-gray-600 text-lg">
            Y esta historia apenas comienza…
          </p>
        </div>

      </div>
    </section>
  );
}