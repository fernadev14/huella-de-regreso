import { FaExclamationTriangle } from "react-icons/fa"

const AboutProblem = () => {
  return (
    <section className="py-24 px-6 bg-[#fff7ed]">

      <div className="max-w-5xl mx-auto text-center">

        <div className="flex justify-center mb-4 text-orange-500 text-3xl">
          <FaExclamationTriangle />
        </div>

        <h2 className="text-3xl font-bold text-gray-800">
          Cada día miles de mascotas se pierden
        </h2>

        <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
          Muchas familias no saben qué hacer, dónde publicar o cómo llegar a más personas.
          El tiempo pasa… y las posibilidades disminuyen.
        </p>

      </div>
    </section>
  )
}

export default AboutProblem