import { useState } from 'react';
import { useScrollAnimation } from './useScrollAnimation';
import '../../styles/quienes-somos.css'

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
    <section className="bg-yellow-50 py-20 px-6 relative overflow-hidden text-center">

      {/* 🐾 Background */}
      <div className="absolute text-[220px] md:text-[280px] opacity-[0.04] pointer-events-none select-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        🐾
      </div>

      <div ref={ref} className="relative z-10 max-w-2xl mx-auto">

        {/* BADGE */}
        <p className={`inline-flex items-center gap-2 bg-white border border-yellow-300 text-yellow-700 px-4 py-1 rounded-full text-sm font-medium mb-6 transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          🐾 Únete a la comunidad
        </p>

        {/* TITLE */}
        <h2 className={`font-nunito text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          ¿Listo para dejar<br />tu <span className="text-yellow-500">huella</span>?
        </h2>

        {/* SUB */}
        <p className={`font-inter text-gray-600 text-lg leading-relaxed max-w-md mx-auto mb-10 transition-all duration-700 delay-200 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Reporta una mascota perdida, comparte un avistamiento o simplemente sé parte de la red.
        </p>

        {/* BUTTONS */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition hover:-translate-y-1">
            + Hacer un reporte
          </button>

          <button className="bg-white border border-gray-200 hover:border-yellow-400 text-gray-700 hover:text-yellow-700 font-semibold px-8 py-3 rounded-lg shadow-sm hover:shadow-md transition hover:-translate-y-1">
            Ver mascotas perdidas
          </button>
        </div>

        {/* DIVIDER */}
        <div className={`flex items-center gap-4 mb-6 transition-opacity duration-700 delay-400 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 uppercase tracking-wider whitespace-nowrap">
            o recibe alertas en tu zona
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* NEWSLETTER */}
        <div className={`transition-all duration-700 delay-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-sm text-gray-500 mb-3">
            Te avisamos cuando haya mascotas perdidas cerca de ti
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row max-w-md mx-auto shadow-md rounded-lg overflow-hidden"
          >
            <input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-200 outline-none focus:border-yellow-400 text-gray-800"
            />

            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-3 transition"
            >
              Suscribirme
            </button>
          </form>

          {sent && (
            <p className="text-green-600 font-semibold mt-3 animate-fadeIn">
              ✅ ¡Listo! Te avisaremos cuando haya mascotas cerca de ti.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}