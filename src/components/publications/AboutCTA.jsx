import { Link } from "react-router-dom"

const AboutCTA = () => {
  return (
    <section className="py-24 px-6 text-center">

      <div className="max-w-4xl mx-auto bg-[#FFD54F] rounded-3xl p-12 shadow-xl">

        <h2 className="text-3xl font-bold text-black">
          Conoce cómo funciona la plataforma
        </h2>

        <p className="mt-4 text-black/70">
          Mira nuestros reportes activos, únete a la comunidad y ayuda a que más mascotas regresen a casa.
        </p>

        <Link
          to="/publicaciones"
          className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-xl hover:scale-105 transition"
        >
          Ver reportes
        </Link>

      </div>

    </section>
  )
}

export default AboutCTA