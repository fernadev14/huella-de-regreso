import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import imgDogAnimate from "../../assets/perrito-motion-fourSteps.webp"
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";

const steps = [
  {
    title: "Crea un reporte",
    desc: "Sube una foto y describe a tu mascota. Entre más claro, mejor.",
    emoji: "📝"
  },
  {
    title: "Difunde el reporte",
    desc: "Comparte el enlace y deja que la comunidad te ayude.",
    emoji: "📢"
  },
  {
    title: "Recibe alertas",
    desc: "Personas cercanas pueden avisarte si ven algo similar.",
    emoji: "🔔"
  },
  {
    title: "Reencuéntrate ❤️",
    desc: "Coordina y vuelve a casa con tu mascota.",
    emoji: "🐾"
  }
]

const FourSteps = () => {
    const [index, setIndex] = useState(0)

    const next = () => setIndex((prev) => (prev + 1) % steps.length)
    const prev = () => setIndex((prev) => (prev - 1 + steps.length) % steps.length)

  return (
    <section className="py-28 text-center relative overflow-hidden">

        <h2 className="text-4xl font-bold mb-12">
            Así funciona 🐾
        </h2>

        {/* CARD */}
        <div className="relative max-w-3/4 mx-auto">

            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl"
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

            {/* CONTROLES */}
            <div className="flex justify-center gap-4 mt-8">
                <button onClick={prev} className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-[#FFD54F]">
                    <FaArrowCircleLeft />
                </button>
                <button onClick={next} className="px-4 py-2 bg-[#FFD54F] rounded-lg cursor-pointer hover:bg-gray-200">
                    <FaArrowCircleRight />
                </button>
            </div>

            {/* INDICADORES */}
            <div className="flex justify-center gap-2 mt-6">
                {steps.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                        i === index ? "bg-black" : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>
        </div>

        {/* PERRO FLOTANTE */}
        <motion.img
            src={imgDogAnimate}
            className="absolute bottom-2 right-10 w-62.5 hidden md:block"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
        />

    </section>
  )
}

export default FourSteps