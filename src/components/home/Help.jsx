import iconForm from "../../assets/icon_form1.png";
import iconNotification from "../../assets/icon_notificacion.png";
import iconEncuentro from "../../assets/icon_reencuentro.png";
// import "../../styles/responsive.css";

const Help = () => {
  return (
    <>
      <div className='help-container'>
        <h3 className='text-center mt-20 text-4xl'>¿Cómo te ayudamos?</h3>

        <div className="flex mt-14 justify-center gap-3 px-5">
          {/* CARD 1 */}
          <div className="group max-w-lg bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-2">
            <img src={iconForm} className="mb-4 w-16 mx-auto group-hover:scale-110 transition" />
            
            <h3 className="text-xl font-bold text-center">
              Publica tu reporte fácilmente
            </h3>
            
            <p className="text-center text-sm mt-2 text-gray-600">
              Carga una foto y describe tu mascota
            </p>
          </div>

          {/* CARD 2 */}
          <div className="group max-w-lg bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-2">
            <img src={iconNotification} className="mb-4 w-16 mx-auto group-hover:scale-110 transition" />

            <h3 className="text-xl font-bold text-center">
              Activa la alerta en tu zona
            </h3>

            <p className="text-center text-sm mt-2 text-gray-600">
              Notificamos a usuarios cercanos y a quienes han visto mascotas similares recientemente.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="group max-w-lg bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:-translate-y-2">
            <img src={iconEncuentro} className="mb-4 w-16 mx-auto group-hover:scale-110 transition" />

            <h3 className="text-xl font-bold text-center">
              Conecta con quien la encuentrea
            </h3>

            <p className="text-center text-sm mt-2 text-gray-600">
              Recibe mensjaes seguros dentro de la plataforma o alguna red social que no comprometa 
                datos que no quieras compartir y coordina el reencuentro.
            </p>
          </div>

        </div>
      </div> 

      {/* SENTIDO EMOCIONAL */}
      <section className="text-center py-20">
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
    </>
  )
}

export default Help
