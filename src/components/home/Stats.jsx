import React from 'react'

const Stats = () => {
  return (
    <section className="py-20 text-center">
      <div className="flex justify-center gap-16 flex-wrap">

        <div>
          <h3 className="text-4xl font-bold text-[#43A047]">+1200</h3>
          <p className="text-gray-600">Mascotas encontradas</p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-[#43A047]">+500</h3>
          <p className="text-gray-600">Reportes activos</p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-[#43A047]">+3000</h3>
          <p className="text-gray-600">Usuarios ayudando</p>
        </div>

      </div>
    </section>
  )
}

export default Stats
