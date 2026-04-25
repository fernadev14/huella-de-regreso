import { Link } from "react-router-dom"
import maskBannerImg from "../../assets/pet-flot.webp"
import { motion } from "framer-motion"
import "../../styles/responsive.css"

const Banner = () => {

  return (
    <>
      <div className="banner-container relative h-[90vh] flex items-center justify-center overflow-hidden">

        {/* FONDO GRADIENTE */}
        <div className="absolute inset-0 bg-linear-to-br from-[#A8C7DC] via-[#dbeef7] to-[#ffffff]" />
        
        {/* GLOW */}
        <div className="absolute w-125 h-125 bg-[#FFD54F]/30 blur-[120px] rounded-full -top-25 -left-25" />

        {/* IMAGEN ANIMADA */}
        <motion.img
          src={maskBannerImg}
          className="absolute bottom-0 right-10 w-100"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        {/* CONTENIDO */}
        <div className="relative z-10 text-center px-6">
        
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            <span className="text-[#FFD54F]">Encuentra</span>{" "}
            <span className="text-[#1B1B1B]">a tu</span>
            <br />
            <span className="text-white drop-shadow-lg">mejor amigo</span>
          </h1>
        
          <p className="mt-6 max-w-lg mx-auto text-[#444] text-lg">
            Publica reportes y ayuda a otros a reencontrarse con sus mascotas.
          </p>
        
          <div className="mt-8">
            <Link
              to="/nuevo-reporte"
              className="px-8 py-4 rounded-xl bg-[#FFD54F] font-bold text-black
                         shadow-lg hover:scale-105 transition"
            >
              + Reportar mascota
            </Link>
          </div>
        </div>

      </div>  
    </>
  )
}

export default Banner
