import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 via-white to-green-50 px-6">

      {/* BLOBS */}
      <div className="absolute w-125 h-125 bg-yellow-300/20 blur-3xl rounded-full -top-30 -left-30" /> 
      <div className="absolute w-100 h-100 bg-blue-300/20 blur-3xl rounded-full -bottom-25 right-[10%]" /> 
      <div className="absolute w-75 h-75 bg-green-300/20 blur-3xl rounded-full top-[30%] right-[20%]" />

      {/* PAWS */}
      <motion.span
        className="absolute text-2xl opacity-10 top-[15%] left-[10%]"
        animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        🐾
      </motion.span>

      <motion.span
        className="absolute text-3xl opacity-10 bottom-[20%] right-[10%]"
        animate={{ y: [0, -20, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        🐾
      </motion.span>

      {/* CONTENIDO */}
      <div className="relative z-10 text-center max-w-3xl">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-nunito text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight"
        >
          Devolviendo{" "}
          <span className="text-yellow-500">mascotas</span>
          <br />
          a sus familias 🐾
        </motion.h1>

        {/* SUB */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 font-inter text-gray-600 text-lg md:text-xl leading-relaxed"
        >
          Somos una comunidad colombiana que usa tecnología y empatía
          para reunir mascotas perdidas con quienes más las aman.
        </motion.p>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            { num: "+500", label: "Mascotas encontradas" },
            { num: "+1200", label: "Reportes activos" },
            { num: "+3000", label: "Personas ayudando" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-md"
            >
              <p className="font-nunito text-2xl font-extrabold text-gray-900">
                {stat.num}
              </p>
              <p className="font-inter text-sm text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* SCROLL */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={() =>
            window.scrollBy({
              top: window.innerHeight,
              behavior: "smooth",
            })
          }
          className="mt-12 flex flex-col items-center gap-2 cursor-pointer"
        >
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-150" />
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-300" />
        </motion.div>
      </div>
    </section>
  );
}