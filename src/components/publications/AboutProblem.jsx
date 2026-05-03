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
    title: 'Nunca regresan',
    desc: 'Sin una plataforma de reporte centralizada, más de la mitad de las mascotas perdidas nunca vuelven a casa.',
  },
];

export default function AboutProblem() {
  const [headerRef, headerVis] = useScrollAnimation(0.2);
  const [cardsRef, cardsVis] = useScrollAnimation(0.1);
  const [quoteRef, quoteVis] = useScrollAnimation(0.2);

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-yellow-50 to-orange-50 py-24 px-6">

      {/* PAW DECORATION */}
      <div className="absolute text-[180px] md:text-[260px] opacity-[0.04] -bottom-10 -right-5 select-none pointer-events-none">
        🐾
      </div>

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div ref={headerRef} className="text-center mb-20">

          <span className={`inline-flex items-center gap-2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-1 rounded-full text-xs font-bold transition ${
            headerVis ? 'opacity-100' : 'opacity-0'
          }`}>
            😿 El problema
          </span>

          <h2 className={`font-nunito text-3xl md:text-5xl font-extrabold text-gray-900 mt-4 transition ${
            headerVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            Perder una mascota duele.<br />Encontrarla, lo cambia todo.
          </h2>

          <p className={`font-inter text-gray-500 mt-4 max-w-xl mx-auto transition ${
            headerVis ? 'opacity-100' : 'opacity-0'
          }`}>
            Antes de Huella de Regreso, la búsqueda era caótica: carteles en postes,
            grupos de WhatsApp y mucha desesperanza.
          </p>
        </div>

        {/* CARDS */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {problems.map((p, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${0.12 * i}s` }}
              className={`
                bg-white rounded-2xl p-8 shadow-md border border-transparent
                transition-all duration-500 cursor-default
                hover:-translate-y-2 hover:shadow-2xl hover:border-yellow-400
                ${cardsVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              <span className="text-4xl mb-4 block">{p.emoji}</span>

              <div className="font-nunito text-3xl font-extrabold text-yellow-500">
                {p.stat}
              </div>

              <p className="font-nunito text-lg font-bold text-gray-900 mt-2">
                {p.title}
              </p>

              <p className="font-inter text-sm text-gray-500 mt-2 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* QUOTE */}
        <div
          ref={quoteRef}
          className={`
            bg-gray-900 text-center rounded-2xl px-6 py-12 md:px-12 md:py-14
            transition-all duration-700
            ${quoteVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          <p className="font-nunito text-xl md:text-2xl font-bold text-white leading-relaxed max-w-3xl mx-auto">
            "No es solo tecnología... es <span className="text-yellow-400">esperanza</span>.
            Cada reporte es una historia, cada alerta una posibilidad,
            y cada reencuentro... un final feliz."
          </p>

          <p className="font-inter text-sm text-white/50 mt-4">
            — El corazón de Huella de Regreso
          </p>
        </div>

      </div>
    </section>
  );
}