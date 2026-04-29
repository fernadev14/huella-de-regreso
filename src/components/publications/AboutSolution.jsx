import { FaPaw } from "react-icons/fa"

const AboutSolution = () => {
  return (
    <section className="py-24 px-6 bg-white">

      <div className="max-w-5xl mx-auto text-center">

        <div className="flex justify-center mb-4 text-green-600 text-3xl">
          <FaPaw />
        </div>

        <h2 className="text-3xl font-bold text-gray-800">
          Creamos Huella de Regreso
        </h2>

        <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
          Una plataforma que conecta personas, reportes y comunidad para aumentar las probabilidades
          de encontrar a tu mascota de forma rápida y segura.
        </p>

      </div>
    </section>
  )
}

export default AboutSolution