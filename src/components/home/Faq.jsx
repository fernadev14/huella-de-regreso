import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaw } from "react-icons/fa";

const FAQS = [
  {
    q: "¿Cómo funciona Huella de Regreso?",
    a: "Publicas un reporte con foto, ubicación y datos. La comunidad lo ve y te ayuda a encontrar a tu mascota más rápido."
  },
  {
    q: "¿Tengo posibilidades reales de encontrarla?",
    a: "Sí. Mientras mejor sea la foto y la información, más personas podrán ayudarte."
  },
  {
    q: "¿Sirve para cualquier mascota?",
    a: "Claro. Perros, gatos y otras mascotas también pueden ser reportadas."
  },
  {
    q: "¿Qué hago si pasa mucho tiempo?",
    a: "Puedes actualizar tu reporte para que vuelva a mostrarse a más personas."
  },
  {
    q: "¿Las notificaciones son rápidas?",
    a: "Sí. Se envían en minutos a personas cercanas."
  },
  {
    q: "¿Qué hago cuando la encuentro?",
    a: "Marca el reporte como encontrado y cierra el proceso 🙌"
  }
];

const Faq = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="py-24 px-6 bg-linear-to-b from-[#f8fafc] to-[#e2e8f0]">

      <div className="max-w-5xl mx-auto">

        {/* TITULO */}
        <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Preguntas frecuentes
        </h3>

        <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto">
          Todo lo que necesitas saber para encontrar a tu mascota más rápido 🐾
        </p>

        {/* GRID MODERNO */}
        <div className="grid md:grid-cols-2 gap-6">

          {FAQS.map((item, index) => (
            <motion.div
              key={index}
              layout
              onClick={() => setActive(active === index ? null : index)}
              className={`
                cursor-pointer rounded-2xl p-6
                bg-white/80 backdrop-blur-md
                border border-gray-200
                shadow-md hover:shadow-xl
                transition-all duration-300
                ${active === index ? "ring-2 ring-[#43A047]" : ""}
              `}
            >

              {/* PREGUNTA */}
              <div className="flex items-start gap-4">

                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#43A047] text-white shadow-md">
                  <FaPaw />
                </div>

                <h4 className="font-semibold text-gray-800 text-lg">
                  {item.q}
                </h4>

              </div>

              {/* RESPUESTA ANIMADA */}
              <AnimatePresence>
                {active === index && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600 mt-4 text-sm leading-relaxed"
                  >
                    {item.a}
                  </motion.p>
                )}
              </AnimatePresence>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Faq;