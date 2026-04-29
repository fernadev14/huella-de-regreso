import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaPaw } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="mt-32">

        {/* CTA FINAL (LO MÁS IMPORTANTE) */}
        <section className="px-6 mb-20">
            <div className="max-w-5xl mx-auto bg-[#FFD54F] rounded-3xl p-10 text-center shadow-xl">
            
            <h2 className="text-3xl font-bold text-black">
                ¿Listo para encontrar a tu mascota? 🐾
            </h2>

            <p className="text-black/70 mt-3">
                Publica un reporte y deja que la comunidad te ayude
            </p>

            <Link
                to="/nuevo-reporte"
                className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-xl hover:scale-105 transition"
            >
                Crear reporte
            </Link>

            </div>
        </section>

      {/* FOOTER PRINCIPAL */}
        <div className="bg-[#0f172a] text-white py-16 px-6">

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">

            {/* BRAND */}
            <div>
                <h3 className="text-2xl font-bold flex items-center gap-2">
                <FaPaw /> Huella de Regreso
                </h3>

                <p className="text-gray-400 mt-4 text-sm">
                Conectamos personas para ayudar a que más mascotas vuelvan a casa 🐾
                </p>
            </div>

            {/* LINKS */}
            <div>
                <h4 className="font-semibold mb-4">Información</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer">Términos de servicio</li>
                <li className="hover:text-white cursor-pointer">Política de privacidad</li>
                <li className="hover:text-white cursor-pointer">Seguridad y estafas</li>
                </ul>
            </div>

            {/* CONTACTO + REDES */}
            <div>
                <h4 className="font-semibold mb-4">Contacto</h4>

                <p className="text-gray-400 text-sm">
                info@huelladeregreso.com
                </p>

                <div className="flex gap-4 mt-6">

                <a className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#1877F2] transition cursor-pointer">
                    <FaFacebook />
                </a>

                <a className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#E1306C] transition cursor-pointer">
                    <FaInstagram />
                </a>

                </div>
            </div>

            </div>

            {/* LINEA FINAL */}
            <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()-1} Huella de Regreso — Todos los derechos reservados
            </div>

        </div>
    </footer>
  )
}

export default Footer