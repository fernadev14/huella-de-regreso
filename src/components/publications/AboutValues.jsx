import { FaUsers, FaHeart, FaShieldAlt } from "react-icons/fa"

const values = [
  {
    icon: <FaUsers />,
    title: "Comunidad",
    desc: "Creemos en el poder de las personas ayudando a personas."
  },
  {
    icon: <FaHeart />,
    title: "Empatía",
    desc: "Sabemos lo que significa perder una mascota."
  },
  {
    icon: <FaShieldAlt />,
    title: "Confianza",
    desc: "Cuidamos la información y la seguridad de los usuarios."
  }
]

const AboutValues = () => {
  return (
    <section className="py-24 px-6 bg-white">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Nuestros valores
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {values.map((item, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition text-center"
            >
              <div className="text-3xl text-[#43A047] mb-4 flex justify-center">
                {item.icon}
              </div>

              <h3 className="font-bold text-lg">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default AboutValues