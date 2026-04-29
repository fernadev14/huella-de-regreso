import dogImg from "../../assets/pet-flot.webp"
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#A8C7DC] via-[#cfe6f5] to-white py-24">

      {/* BLOBS decorativos */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-400/20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center justify-center gap-12 h-[70vh]">

        {/* TEXTO */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            <span className="text-[#FFD54F]">Encuentra</span>{" "}
            <span className="text-[#1B1B1B]">a tu</span>
            <br />
            <span className="text-white">mejor amigo</span>
          </motion.h1>

          <p className="mt-6 text-gray-700 max-w-md font-semibold">
            Publica reportes y conecta con personas que pueden ayudarte
            a reencontrarte con tu mascota.
          </p>

          {/* CTA */}
          <div className="mt-8 flex gap-4">
            <Link
              to="/nuevo-reporte"
              className="px-6 py-3 rounded-xl bg-[#F7D047] font-bold shadow-lg hover:scale-105 transition"
            >
              Reportar mascota
            </Link>

            <Link
              to="/publicaciones"
              className="px-6 py-3 rounded-xl border border-black/20 backdrop-blur-md hover:bg-[#282723] hover:text-amber-50 hover:scale-105 transition">
              Ver reportes
            </Link>
          </div>

          {/* STATS */}
          <div className="flex gap-8 mt-10 text-sm text-gray-600">
            <div>
              <p className="text-xl font-bold text-black">+500</p>
              <span>Mascotas encontradas</span>
            </div>
            <div>
              <p className="text-xl font-bold text-black">+1200</p>
              <span>Reportes activos</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black">+3000</h3>
              <span>Usuarios ayudando</span>
            </div>
          </div>
        </div>

        {/* IMAGEN ANIMADA */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="hidden md:block"
        >
          <img
            src={dogImg}
            alt="Mascota"
            className="w-full max-w-md mx-auto drop-shadow-2xl"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Banner;
