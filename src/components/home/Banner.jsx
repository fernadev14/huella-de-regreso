import { Link } from "react-router-dom"
import dogImg from "../../assets/pet-flot.webp"
import { motion } from "framer-motion"
import "../../styles/responsive.css"

const Banner = () => {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-linear-to-br from-[#A8C7DC] via-[#e6f4fb] to-white" />

      {/* GLOW */}
      <div className="absolute w-150 h-150 bg-[#FFD54F]/30 blur-[140px] rounded-full -top-50 -left-50" />

      {/* CONTENIDO */}
      <div className="relative z-10 text-center px-6 max-w-5xl">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight"
        >
          <span className="text-[#FFD54F]">Encuentra</span>{" "}
          <span className="text-[#1B1B1B]">a tu</span>
          <br />
          <span className="text-white drop-shadow-xl">
            mejor amigo 🐾
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg font-semibold text-[#444] max-w-xl mx-auto"
        >
          Conecta con personas que pueden ayudarte a reencontrarte con tu mascota.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10"
        >
          <Link
            to="/nuevo-reporte"
            className="px-8 py-4 rounded-xl bg-[#FFD54F] text-black font-bold
                       shadow-lg hover:scale-105 transition
                       hover:shadow-[0_0_30px_rgba(255,213,79,0.6)]"
          >
            + Reportar mascota
          </Link>
        </motion.div>
      </div>

      {/* IMAGEN FLOTANTE */}
      <motion.img
        src={dogImg}
        className="absolute bottom-10 right-10 w-87.5 hidden md:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

    </section>
  )
}

export default Banner
