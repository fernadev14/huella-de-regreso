import { motion } from "framer-motion"

const AboutHero = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center py-28 min-h-screen px-6 bg-linear-to-b from-[#f8fafc] to-white">

      {/* HUELLA FLOTANTE 1 */}
      <motion.div
          className="absolute opacity-20 text-6xl"
          animate={{ x: [10, 60, 10], y: [0, -50, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          >
          🐾
      </motion.div>

          {/* HUELLA FLOTANTE 2 */}
      <motion.div
          className="absolute opacity-20 text-6xl"
          animate={{ x: [10, 60, 10], y: [0, -50, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          🐾
      </motion.div>

      {/* TITULO */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-gray-800"
      >
        <h1 className="text-4xl md:text-5xl font-bold">
          Tu mascota no está perdida,
          <br /> está en camino a casa 🐾
        </h1>
      </motion.h1>

      <div className="flex justify-center gap-3 mt-6 flex-wrap">
        <span className="px-4 py-1 bg-[#FFD54F]/30 rounded-full text-sm">Comunidad real</span>
        <span className="px-4 py-1 bg-[#43A047]/20 rounded-full text-sm">Alertas rápidas</span>
        <span className="px-4 py-1 bg-black/10 rounded-full text-sm">100% gratuito</span>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-gray-600 max-w-2xl mx-auto"
      >
        Es parte de tu familia. Por eso creamos una forma más rápida y humana de ayudar a que regresen a casa 
      </motion.p>

    </section>
  )
}

export default AboutHero