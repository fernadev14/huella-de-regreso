const QuienesSomos = () => {
  return (
    <div className='min-h-screen bg-gray-100 py-12'>
      <div className='max-w-4xl mx-auto bg-white p-8 rounded-lg shadow'>
        <h1 className='text-3xl font-bold mb-4'>Quiénes somos</h1>
        <p className='text-gray-700 mb-4'>Somos un equipo comprometido con ayudar a las mascotas y sus familias a reencontrarse.
         Nuestra misión es proporcionar una plataforma sencilla y accesible para publicar reportes de mascotas perdidas y encontradas, compartir información de contacto y facilitar la colaboración entre la comunidad.</p>

        <h2 className='text-2xl font-semibold mt-4 mb-2'>Qué hacemos</h2>
        <ul className='list-disc list-inside text-gray-700 mb-4'>
          <li>Publicación de reportes de mascotas perdidas y encontradas.</li>
          <li>Buscador y filtros por ciudad, barrio y estado.</li>
          <li>Contactos directos entre propietarios y encontradores.</li>
          <li>Consejos y recursos para la recuperación de mascotas.</li>
        </ul>

        <h2 className='text-2xl font-semibold mt-4 mb-2'>Contacto</h2>
        <p className='text-gray-700'>Si quieres colaborar con nosotros, reportar una mascota o dar feedback, escríbenos a <strong>contacto@huella-de-regreso.example</strong>.</p>
      </div>
    </div>
  )
}

export default QuienesSomos
