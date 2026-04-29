const stats = [
  { value: "+500", label: "Mascotas encontradas" },
  { value: "+1200", label: "Reportes activos" },
  { value: "24/7", label: "Comunidad activa" }
]

const AboutImpact = () => {
  return (
    <section className="py-20 px-6 bg-white">

      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Ya estamos ayudando 🐾
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-[#f8fafc] p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-3xl font-bold text-[#43A047]">
                {item.value}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                {item.label}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  )
}

export default AboutImpact