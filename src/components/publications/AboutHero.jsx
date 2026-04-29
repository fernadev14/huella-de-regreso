import { motion } from "framer-motion"

const AboutHero = () => {
  return (
    <section className="py-28 text-center px-6 bg-gradient-to-b from-[#f8fafc] to-white">

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-gray-800"
      >
        No es solo una mascota…
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-gray-600 max-w-2xl mx-auto"
      >
        Es parte de tu familia. Por eso creamos una forma más rápida y humana de ayudar a que regresen a casa 🐾
      </motion.p>

    </section>
  )
}

export default AboutHero