import { useState } from 'react';
import { useScrollAnimation } from './useScrollAnimation';

const steps = [
  { icon: '📸', title: 'Publica el reporte', desc: 'Sube una foto de tu mascota, agrega su descripción y marca el lugar donde se perdió en el mapa.' },
  { icon: '🔔', title: 'Alertas automáticas', desc: 'Notificamos al instante a todos los usuarios cercanos a la zona donde fue visto por última vez.' },
  { icon: '👀', title: 'La comunidad busca', desc: 'Miles de personas atentas en tu ciudad revisan el reporte y reportan avistamientos en tiempo real.' },
  { icon: '🏡', title: '¡Reencuentro!', desc: 'Coordinamos el reencuentro de forma segura, y celebramos junto a tu familia ese final feliz.' },
];

const diffs = [
  { icon: '📍', title: 'Búsqueda geolocalizada', desc: 'Alertas solo a personas en el radio exacto donde se perdió tu mascota.' },
  { icon: '🌐', title: '100% gratuito', desc: 'Acceso libre para todas las familias. La ayuda no debe tener costo.' },
  { icon: '🤝', title: 'Red de voluntarios', desc: 'Rescatistas, veterinarios y vecinos comprometidos en cada ciudad.' },
];

export default function AboutSolution() {
  const [activeStep, setActiveStep] = useState(null);
  const [headerRef, headerVis] = useScrollAnimation(0.2);
  const [stepsRef, stepsVis] = useScrollAnimation(0.1);
  const [diffRef, diffVis] = useScrollAnimation(0.2);

  return (
    <section className="bg-linear-to-br from-blue-100 via-blue-50 to-blue-100 py-20 px-6 md:px-12 overflow-hidden">
      
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16" ref={headerRef}>
          <span className={`inline-flex items-center gap-2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-1 rounded-full text-xs font-bold mb-5 transition-opacity duration-500 ${headerVis ? 'opacity-100' : 'opacity-0'}`}>
            💡 Cómo funciona
          </span>

          <h2 className={`font-nunito text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 transition-all duration-700 ${headerVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Simple, rápido y<br />
            <span className="text-yellow-500">efectivo</span>
          </h2>

          <p className={`text-gray-500 max-w-md mx-auto transition-opacity duration-700 delay-200 ${headerVis ? 'opacity-100' : 'opacity-0'}`}>
            4 pasos que pueden cambiar todo. Toca cada paso para ver más detalles.
          </p>
        </div>

        {/* STEPS */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
          ref={stepsRef}
        >
          {steps.map((s, i) => (
            <div
              key={i}
              className={`relative transition-all duration-700 ${
                stepsVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${0.1 * i}s` }}
            >
              {/* Flecha (solo desktop) */}
              {i !== steps.length - 1 && (
                <span className="hidden lg:block absolute top-10 -right-4 text-yellow-500 opacity-60 text-lg">
                  →
                </span>
              )}

              <div
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                className={`bg-white rounded-2xl p-6 shadow-md border-2 cursor-pointer h-full transition-all duration-300
                ${
                  activeStep === i
                    ? 'border-yellow-400 shadow-xl -translate-y-2'
                    : 'border-transparent hover:border-yellow-400 hover:shadow-xl hover:-translate-y-2'
                }`}
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-400 text-gray-900 font-extrabold text-sm mb-4">
                  {i + 1}
                </div>

                <span className="text-3xl mb-3 block">{s.icon}</span>

                <p className="font-nunito font-extrabold text-gray-900 mb-2 text-sm">
                  {s.title}
                </p>

                <p
                  className={`text-gray-500 text-xs leading-relaxed overflow-hidden transition-all duration-300 ${
                    activeStep === i ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* DIFERENCIADORES */}
        <div
          ref={diffRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-5 transition-all duration-700 ${
            diffVis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {diffs.map((d, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${0.1 * i}s` }}
              className="bg-white/80 border border-yellow-200 rounded-xl p-6 flex gap-4 hover:bg-white hover:border-yellow-400 transition"
            >
              <span className="text-2xl">{d.icon}</span>
              <div>
                <p className="font-nunito font-extrabold text-gray-900 text-sm mb-1">
                  {d.title}
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {d.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}