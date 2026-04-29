import { Link } from "react-router-dom"

const AboutCTA = () => {
  return (
    <section className="py-24 px-6 text-center">

      <div className="max-w-4xl mx-auto bg-[#FFD54F] rounded-3xl p-12 shadow-xl">

        <h2 className="text-3xl font-bold text-black">
          Tú también puedes ayudar 🐾
        </h2>

        <p className="mt-4 text-black/70">
          Publica un reporte o comparte uno existente
        </p>

        <Link
          to="/nuevo-reporte"
          className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-xl hover:scale-105 transition"
        >
          Crear reporte
        </Link>

      </div>

    </section>
  )
}

export default AboutCTA