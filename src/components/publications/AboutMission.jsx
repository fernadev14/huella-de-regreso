import { useScrollAnimation } from './useScrollAnimation';

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
    <section className="bg-white py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* LEFT */}
        <div ref={leftRef}>
          
          {/* TAG */}
          <span
            className={`inline-flex items-center gap-2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-1 rounded-full text-xs font-bold font-nunito mb-5 transition-opacity duration-700 ${
              leftVis ? 'opacity-100' : 'opacity-0'
            }`}
          >
            🐶 Nuestra misión
          </span>

          {/* TITLE */}
          <h2
            className={`font-nunito text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-5 transition-all duration-700 ${
              leftVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Cada mascota<br />
            merece <span className="text-yellow-500">volver a casa</span>
          </h2>

          {/* TEXT */}
          <p
            className={`font-inter text-gray-600 text-base md:text-lg leading-relaxed mb-8 transition-all duration-700 delay-150 ${
              leftVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Huella de Regreso nació porque perder a una mascota es perder a un miembro de la familia.
            Combinamos tecnología accesible con el poder de la comunidad para que ninguna 
            historia de amor entre humanos y animales quede sin un final feliz.
          </p>

          {/* VALUES */}
          <div
            className={`flex flex-col gap-3 transition-all duration-700 delay-300 ${
              leftVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {[
              'Accesible para todos',
              'Respaldado por la comunidad',
              'Rápido y confiable',
              'Hecho con amor por Colombia'
            ].map((v, i) => (
              <div key={i} className="flex items-center gap-3 font-nunito font-bold text-gray-900">
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                {v}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div ref={rightRef}>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700 ${
              rightVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {cards.map((c, i) => (
              <div
                key={i}
                style={{ transitionDelay: `${0.08 * i}s` }}
                className="bg-blue-50 border border-gray-200 rounded-xl p-6 hover:-translate-y-1.5 hover:shadow-xl hover:border-yellow-400 transition-all duration-300"
              >
                <span className="text-3xl block mb-3">{c.icon}</span>

                <p className="font-nunito font-extrabold text-gray-900 mb-1">
                  {c.title}
                </p>

                <p className="font-inter text-sm text-gray-600 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}