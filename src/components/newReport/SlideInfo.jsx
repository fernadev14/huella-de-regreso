import loginPNGMascota from "../../assets/pub-camisa-roja-login.png"

const SlideInfo = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="text-5xl font-bold w-112.5">
        🐾 Nunca pierdas a tu mejor amigo
      </h3>
      <p className="w-80 mt-4 font-medium text-[#636363]">Reporta, busca y conecta con personas que quieren ayudar.</p>

      <img
        className="my-10 max-h-80 drop-shadow-[0_20px_20px_rgba(0,0,0,0.25)]"
        src={loginPNGMascota}
        alt="pub-rojo-camiseta"
      />

      <div>
        <ul className="text-start text-gray-900 font-bold">
          <li>📍 Reportes por ubicación</li>
          <li>🐶 Comunidad que ayuda</li>
          <li>🔔 Alertas inmediatas</li>
        </ul>
      </div>
    </div>
  )
}

export default SlideInfo
