import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import imgDogAnimate from "../../assets/perrito-motion-fourSteps.webp"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"

const steps = [
  {
    title: "Crea un reporte",
    desc: "Sube una foto clara y describe a tu mascota. Esto aumenta las probabilidades de encontrarla.",
    emoji: "📝"
  },
  {
    title: "Difunde el reporte",
    desc: "Comparte el enlace en redes y deja que la comunidad te ayude.",
    emoji: "📢"
  },
  {
    title: "Recibe alertas",
    desc: "Personas cercanas podrán avisarte si ven algo similar.",
    emoji: "🔔"
  },
  {
    title: "Reencuéntrate ❤️",
    desc: "Coordina el encuentro y vuelve a casa con tu mascota.",
    emoji: "🐾"
  }
]

const FourSteps = () => {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((prev) => (prev + 1) % steps.length)
  const prev = () => setIndex((prev) => (prev - 1 + steps.length) % steps.length)

  return (
    <section className="py-28 px-6 relative overflow-hidden bg-linear-to-b from-white to-[#f1f5f9]">

        <div className="max-w-5xl mx-auto text-center">

            {/* TITULO */}
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Cómo encontrar a tu mascota
            </h2>

            <p className="text-gray-500 mb-16 max-w-xl mx-auto">
                Un proceso simple, pero poderoso. Cada paso aumenta las probabilidades de encontrarla 🐾
            </p>

            {/* PROGRESO (timeline visual) */}
            <div className="flex justify-between items-center mb-12 relative">

            {/* línea */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 -translate-y-1/2"></div>

                {steps.map((_, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center">

                    <div
                        className={`
                        w-10 h-10 flex items-center justify-center rounded-full
                        font-bold transition-all duration-300
                        ${i <= index ? "bg-[#FFD54F] text-black scale-110" : "bg-gray-200 text-gray-400"}
                        `}
                    >
                    {i + 1}
                    </div>

                </div>
                ))}
            </div>

            {/* CARD */}
            <div className="relative">

                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -40, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-10 shadow-xl max-w-xl mx-auto"
                    >

                        <div className="text-5xl mb-4">
                            {steps[index].emoji}
                        </div>

                        <h3 className="text-2xl font-bold mb-3">
                            {steps[index].title}
                        </h3>

                        <p className="text-gray-600">
                            {steps[index].desc}
                        </p>

                    </motion.div>
                </AnimatePresence>

            {/* BOTONES */}
                <div className="flex justify-center gap-6 mt-10">

                    <button
                        onClick={prev}
                        className="w-12 h-12 flex items-center justify-center rounded-full
                                bg-white shadow-md hover:scale-110 transition cursor-pointer"
                    >
                        <FaArrowLeft />
                    </button>

                    <button
                        onClick={next}
                        className="w-12 h-12 flex items-center justify-center rounded-full
                                bg-[#FFD54F] shadow-md hover:scale-110 transition cursor-pointer"
                    >
                        <FaArrowRight />
                    </button>

                </div>

            </div>

        </div>

        {/* PERRO DECORATIVO */}
        <motion.img
            src={imgDogAnimate}
            className="absolute bottom-10 right-10 w-56 hidden md:block opacity-90"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
        />

    </section>
  )
}

export default FourSteps