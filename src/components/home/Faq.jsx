import React from 'react'

const Faq = () => {
    const FAQS = [
      {
        q: "¿Cómo funciona Huella de Regreso?",
        a: "Creas un reporte con foto, ubicación y datos de contacto. Lo publicamos y lo difundimos para que la comunidad ayude a encontrar a tu mascota."
      },
      {
        q: "¿Cuáles son las posibilidades de encontrar mi mascota?",
        a: "Aumentan cuando el reporte tiene buena foto, descripción precisa, y compartes el enlace en redes y grupos locales."
      },
      {
        q: "¿Huella de Regreso funciona para todo tipo de mascotas?",
        a: "Sí. Perros, gatos y también otras especies. Solo escoge la categoría adecuada al crear el reporte."
      },
      {
        q: "¿Qué pasa si lleva mucho tiempo mi reporte?",
        a: "Puedes reactivarlo y actualizar la información para que vuelva a circular entre los usuarios cercanos."
      },
      {
        q: "¿Cuánto demora en notificar mi reporte?",
        a: "La publicación es inmediata. Las notificaciones a la comunidad cercana se envían en minutos."
      },
      {
        q: "¿Qué pasa después de encontrar mi mascota perdida?",
        a: "Marca el reporte como 'Encontrada' para cerrar la búsqueda y agradecer a quienes ayudaron."
      }
    ];
  return (
    <>
        <section className="bg-[#D9D9D9] py-14 mt-20">
            <div className="mx-auto w-full max-w-5xl px-6">
                <h3 className="mb-8 text-center text-3xl font-bold text-[#2b2b2b] sm:text-4xl">
                Preguntas frecuentes
                </h3>

                <ul className="divide-y divide-black/5">
                    {FAQS.map((item, idx) => (
                        <li key={idx} className="py-2">

                            <details className="group">
                                <summary
                                className="flex cursor-pointer list-none items-center justify-between rounded-lg
                                            px-2 py-4 outline-none transition hover:bg-black/5
                                            focus-visible:ring-2 focus-visible:ring-black/20"
                                >
                                <div className="flex items-start gap-3">
                                    {/* icono verde */}
                                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#43A047] text-white text-[12px] font-bold">
                                    i
                                    </span>

                                    <span className="text-base font-bold leading-6 text-[#2E7D32]">
                                    {item.q}
                                    </span>
                                </div>
                                <svg
                                    className="ml-4 h-5 w-5 shrink-0 text-[#2b2b2b] transition-transform duration-200 group-open:rotate-90"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M6.293 2.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L11.586 10 6.293 4.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                                </svg>
                                </summary>

                                {/* Contenido con animación */}
                                <div
                                className="
                                    grid grid-rows-[0fr] overflow-hidden transition-all duration-300 ease-in-out
                                    group-open:grid-rows-[1fr]
                                "
                                >
                                    <div className="min-h-0">
                                        <div className="px-2 pb-5 pl-[3.25rem] text-sm leading-6 text-[#3f3f3f]
                                                        opacity-0 translate-y-2 transition-all duration-300
                                                        group-open:opacity-100 group-open:translate-y-0">
                                        {item.a}
                                        </div>
                                    </div>
                                </div>
                            </details>

                        </li>
                    ))}
                </ul>
            </div>
        </section>
    </>
  )
}

export default Faq
