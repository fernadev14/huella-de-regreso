import iconForm from "../../assets/icon_form1.png";
import iconNotification from "../../assets/icon_notificacion.png";
import iconEncuentro from "../../assets/icon_reencuentro.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Help = () => {
  return (
    <>
      <section className="py-24 px-6">

        {/* TITLE */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold">
            ¿Cómo te ayudamos?
          </h2>
          <p className="text-gray-500 mt-3">
            Tecnología + comunidad para encontrar mascotas más rápido
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">

          {/* CARD */}
          {[{
            img: iconForm,
            title: "Publica tu reporte",
            desc: "Fácil, rápido y desde cualquier dispositivo"
          },{
            img: iconNotification,
            title: "Activa alertas",
            desc: "Notificamos a personas cercanas automáticamente"
          },{
            img: iconEncuentro,
            title: "Conecta y recupera",
            desc: "Coordina de forma segura el reencuentro"
          }].map((item, i) => (

            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-md hover:shadow-2xl transition overflow-hidden"
            >

              {/* Glow hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-yellow-200/30 to-green-200/30 blur-2xl"></div>

              {/* ICON */}
              <motion.img
                src={item.img}
                className="w-16 mb-6 mx-auto relative z-10"
                whileHover={{ scale: 1.1, rotate: 3 }}
              />

              <h3 className="text-xl font-bold text-center relative z-10">
                {item.title}
              </h3>

              <p className="text-center text-gray-600 mt-2 relative z-10">
                {item.desc}
              </p>

            </motion.div>

          ))}
        </div>
      </section>

      {/* 💛 SECCIÓN EMOCIONAL */}
      <section className="text-center py-24 px-6 bg-linear-to-b from-transparent to-yellow-50">

        <h2 className="text-3xl font-bold">
          No es solo tecnología… es esperanza 🐾
        </h2>

        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Cada reporte es una historia, cada notificación una posibilidad,
          y cada reencuentro… un final feliz.
        </p>

      </section>

      {/* 📊 STATS MODERNAS */}
      <section className="py-16">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">

          {[
            { value: "+500", label: "Mascotas encontradas" },
            { value: "+1200", label: "Reportes activos" },
            { value: "+3000", label: "Usuarios ayudando" },
            { value: "24/7", label: "Sistema activo" }
          ].map((stat, i) => (

            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-3xl font-bold text-[#43A047]">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {stat.label}
              </p>
            </div>

          ))}

        </div>

      </section>

      {/* 🚀 CTA PRO */}
      <section className="py-24 px-6">

        <div className="relative bg-[#FFD54F] rounded-3xl py-20 px-8 max-w-5xl mx-auto shadow-2xl overflow-hidden">

          {/* Glow background */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/30 blur-3xl rounded-full"></div>

          <div className="relative text-center">

            <h2 className="text-4xl font-bold text-black">
              Empieza ahora mismo
            </h2>

            <p className="mt-4 text-black/70">
              Tu mascota puede aparecer en cualquier momento
            </p>

            <Link
              to="/nuevo-reporte"
              className="mt-8 inline-block bg-black text-white px-8 py-4 rounded-xl 
                        hover:scale-105 hover:shadow-lg transition"
            >
              Crear reporte
            </Link>

          </div>

        </div>

      </section>
    </>
  );
};

export default Help;