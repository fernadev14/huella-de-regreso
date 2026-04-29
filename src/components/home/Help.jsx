import iconForm from "../../assets/icon_form1.png";
import iconNotification from "../../assets/icon_notificacion.png";
import iconEncuentro from "../../assets/icon_reencuentro.png";
import { Link } from "react-router-dom"
// import "../../styles/responsive.css";

const Help = () => {
  return (
    <>
      <div className='help-container'>
        <h3 className='text-center mt-20 text-4xl'>¿Cómo te ayudamos?</h3>

        <div className="flex mt-14 justify-center gap-3 px-5">
          
          <div className="grid md:grid-cols-3 gap-8 mt-16 px-6">
            
          {/* CARD 1 */}
            <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg hover:shadow-xl transition hover:-translate-y-2">
              <img src={iconForm} className="w-16 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-center">
                Publica tu reporte
              </h3>
              <p className="text-center text-gray-600 mt-2">
                Fácil, rápido y desde cualquier dispositivo
              </p>
            </div>

          {/* CARD 2 */}
            <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg hover:shadow-xl transition hover:-translate-y-2">
              <img src={iconNotification} className="w-16 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-center">
                Activa la alerta en tu zona
              </h3>
              <p className="text-center text-gray-600 mt-2">
                Notificamos a usuarios cercanos y a quienes han visto mascotas similares recientemente.
              </p>
            </div>

          {/* CARD 3 */}
            <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg hover:shadow-xl transition hover:-translate-y-2">
              <img src={iconEncuentro} className="w-16 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-center">
                Conecta con quien la encuentrea
              </h3>
              <p className="text-center text-gray-600 mt-2">
                Recibe mensjaes seguros dentro de la plataforma o alguna red social que no comprometa 
                datos que no quieras compartir y coordina el reencuentro.
              </p>
            </div>

          </div>

        </div>
      </div> 

      {/* SENTIDO EMOCIONAL */}
      <section className="text-center py-20 px-10">
        <h2 className="text-3xl font-bold">
          Miles de mascotas vuelven a casa 🐾
        </h2>

        <p className="mt-4 text-gray-600">
          Gracias a la comunidad que ayuda todos los días
        </p>
      </section>

    {/* ESTADISTICAS */}
      <div className="flex justify-center gap-10 py-10">
        <div>
          <h3 className="text-3xl font-bold text-[#43A047]">+1200</h3>
          <p>mascotas encontradas</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-[#43A047]">+500</h3>
          <p>reportes activos</p>
        </div>
      </div>

      <section className="py-20 text-center">

        <div className="bg-[#FFD54F] rounded-3xl py-16 px-6 max-w-4xl mx-auto shadow-xl">
        
          <h2 className="text-3xl font-bold text-black">
            Empieza ahora mismo
          </h2>
        
          <p className="mt-4 text-black/70">
            Publica un reporte y deja que la comunidad te ayude
          </p>
        
          <Link
            to="/nuevo-reporte"
            className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition"
          >
            Crear reporte
          </Link>
        
        </div>
        
      </section>
    </>
  )
}

export default Help
