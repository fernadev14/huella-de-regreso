import { useScrollAnimation, useCounter } from './useScrollAnimation';

function AnimatedCounter({ target, suffix, prefix, label, desc, delay, visible }) {
  const count = useCounter(target, 2000, visible);

  return (
    <div
      style={{ transitionDelay: delay }}
      className={`bg-white border border-gray-200 rounded-xl p-6 text-center transition-all duration-500 hover:shadow-lg hover:border-yellow-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-none mb-1">
        <span className="text-yellow-500">{prefix}</span>
        {count.toLocaleString()}
        <span className="text-yellow-500">{suffix}</span>
      </div>

      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <p className="text-xs text-gray-400 mt-1">{desc}</p>
    </div>
  );
}

const counters = [
  { prefix: '+', target: 500,  suffix: '',  label: 'Mascotas encontradas', desc: 'Reunidas con sus familias' },
  { prefix: '+', target: 1200, suffix: '',  label: 'Reportes activos', desc: 'Perdidas y encontradas' },
  { prefix: '+', target: 3000, suffix: '',  label: 'Personas ayudando', desc: 'En toda Colombia' },
  { prefix: '',  target: 48,   suffix: 'h', label: 'Tiempo promedio', desc: 'Para encontrar una mascota' },
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
    text: 'Encontré un perrito en la calle y no sabía qué hacer. Publiqué en la plataforma y en pocas horas ya estaba con su dueña.',
    author: 'Carlos Mendoza',
    role: 'Medellín, Colombia',
  },
];

export default function AboutImpact() {
  const [headerRef, headerVisible] = useScrollAnimation(0.2);
  const [countersRef, countersVisible] = useScrollAnimation(0.15);
  const [testiRef, testiVisible] = useScrollAnimation(0.2);

  return (
    <section className="bg-gray-50 py-20 px-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div ref={headerRef} className="mb-16">

          <p className={`inline-flex items-center gap-2 bg-yellow-100 border border-yellow-300 text-yellow-700 px-4 py-1 rounded-full text-sm font-medium mb-6 transition-all duration-500 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            📊 Nuestro impacto
          </p>

          <h2 className={`font-nunito text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            Números que cuentan<br />
            <span className="text-yellow-500">reencuentros reales</span>
          </h2>

          <p className={`text-gray-500 text-lg max-w-xl leading-relaxed transition-all duration-700 delay-200 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Cada número representa una mascota que volvió a casa y una familia completa otra vez.
          </p>
        </div>

        {/* COUNTERS */}
        <div
          ref={countersRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {counters.map((c, i) => (
            <AnimatedCounter
              key={i}
              {...c}
              delay={`${0.1 * i}s`}
              visible={countersVisible}
            />
          ))}
        </div>

        {/* TESTIMONIALS */}
        <div
          ref={testiRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${0.15 * i}s` }}
              className={`bg-white border border-gray-200 rounded-xl p-8 transition-all duration-700 hover:shadow-lg ${
                testiVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="text-3xl block mb-4">💬</span>

              <p className="text-gray-700 italic leading-relaxed mb-6">
                {t.text}
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 text-lg">
                  {t.emoji}
                </div>

                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.author}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}