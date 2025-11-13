import iconForm from "../../assets/icon_form1.png";
import iconNotification from "../../assets/icon_notificacion.png";
import iconEncuentro from "../../assets/icon_reencuentro.png";

const Help = () => {
  return (
    <>
      <div className='help-container'>
        <h3 className='text-center mt-20 text-4xl'>¿Cómo te ayudamos?</h3>

        <div className="flex justify-center mt-14">
          <div className="flex flex-col items-center mr-50">
            <img src={iconForm} alt="icon-form" className="w-fit"/>
            <div>
              <h3 className="text-2xl">Publica tu reporte facilmente</h3>
              <p className="w-80 text-center text-sm">
                Carga una foto, describe a tu mascota y marca el lugar donde se perdió.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img src={iconNotification} alt="icon-notification" />
            <div>
              <h3 className="text-2xl">Activa la alerta en tu zona</h3>
              <p className="w-80 text-center text-sm">
                Notificamos a usuarios cercanos y a quienes han visto mascotas similares recientemente.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-12">
            <img src={iconEncuentro} alt="icon-encuentro" className="w-fit"/>
            <div>
              <h3 className="text-2xl">Conecta con quien la encuentrea</h3>
              <p className="w-90 text-center text-sm">
                Recibe mensjaes seguros dentro de la plataforma o alguna red social que no comprometa 
                datos que no quieras compartir y coordina el reencuentro.
              </p>
            </div>
        </div>
      </div> 
    </>
  )
}

export default Help
