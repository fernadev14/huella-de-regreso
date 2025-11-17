import { useState, useContext, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { AuthContext } from '../context/AuthContext'
import { uploadToCloudinary } from '../config/cloudinary'

const NuevoReporte = () => {
  const navigate = useNavigate()
  const { user, userData } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [barrio, setBarrio] = useState('')
  const [estado, setEstado] = useState('perdida')
  const [description, setDescription] = useState('')
  const [contact, setContact] = useState('')
  const [foundDate, setFoundDate] = useState('')
  const [foundPlaceDetails, setFoundPlaceDetails] = useState('')
  const [microchipped, setMicrochipped] = useState(false)
  const [chipId, setChipId] = useState('')
  const [images, setImages] = useState([]) // Objetos de archivo
  const [previews, setPreviews] = useState([]) // preview URLs
  const fileInput = useRef(null)
  const dragIndexRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <p className='mb-4'>Debes iniciar sesión para crear un reporte.</p>
      </div>
    )
  }

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    // merge but limit to 4
    const nextFiles = [...images, ...files].slice(0, 4)
    setImages(nextFiles)
  }

  useEffect(() => {
    // generate previews
    const urls = images.map((f) => URL.createObjectURL(f))
    setPreviews(urls)

    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u))
    }
  }, [images])

  const removeImage = (index) => {
    const next = images.filter((_, i) => i !== index)
    setImages(next)
  }

  const onDragStart = (e, idx) => {
    dragIndexRef.current = idx
    e.dataTransfer.effectAllowed = 'move'
  }

  const onDrop = (e, idx) => {
    e.preventDefault()
    const from = dragIndexRef.current
    if (from === null || from === undefined) return
    if (from === idx) return
    const next = [...images]
    const [moved] = next.splice(from, 1)
    next.splice(idx, 0, moved)
    setImages(next)
    dragIndexRef.current = null
  }

  const triggerFileInput = () => fileInput.current?.click()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // La validación varía en función del estado.
    if (estado === 'perdida') {
      if (!name.trim()) {
        setError('El nombre es requerido para mascotas perdidas')
        return
      }
    }
    if (!city.trim() || !contact.trim()) {
      setError('Ciudad y contacto son requeridos')
      return
    }
    if (estado === 'encontrada') {
      // Prefiero al menos algunos detalles sobre dónde y cuándo se encontró.
      if (!foundPlaceDetails.trim() && !foundDate) {
        setError('Indica al menos la fecha o lugar donde se encontró la mascota')
        return
      }
    }

    setLoading(true)

    try {
      // subir imagenes a Cloudinary y obtener URLs
      const imageUrls = []
      for (const file of images) {
        const url = await uploadToCloudinary(file)
        imageUrls.push(url)
      }

      const payload = {
        // Título: utilizar el nombre cuando se trate de perdida, y en caso contrario, un título descriptivo para encontrada.
        title: estado === 'perdida' ? name : `Mascota encontrada en ${city}${barrio ? ' - ' + barrio : ''}`,
        description,
        city,
        barrio,
        estado,
        photoURLs: imageUrls,
        contact,
        // campos específicos de 'encontrada'
        foundDate: foundDate || null,
        foundPlaceDetails: foundPlaceDetails || null,
        microchipped: microchipped || false,
        chipId: microchipped ? chipId || null : null,
        authorUid: user.uid,
        authorName: userData?.firstName ? `${userData.firstName} ${userData.lastName || ''}`.trim() : user.email,
        createdAt: new Date().toISOString(),
      }

      await addDoc(collection(db, 'pets'), payload)

      setLoading(false)
      navigate('/publicaciones')
    } catch (err) {
      console.error(err)
      setError('Error publicando el reporte: ' + err.message)
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen py-12 bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-3xl'>
        <h1 className='text-2xl font-bold mb-6'>Crear nuevo reporte</h1>

        {error && <div className='text-red-600 mb-4'>{error}</div>}

        <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {estado === 'perdida' ? (
            <div>
              <label className='block text-sm font-semibold mb-1'>Nombre</label>
              <input value={name} onChange={(e)=>setName(e.target.value)} className='w-full border px-3 py-2 rounded' />
            </div>
          ) : (
            <div>
              <label className='block text-sm font-semibold mb-1'>Fecha en que se encontró</label>
              <input type='date' value={foundDate} onChange={(e)=>setFoundDate(e.target.value)} className='w-full border px-3 py-2 rounded' />
            </div>
          )}

          <div>
            <label className='block text-sm font-semibold mb-1'>Ciudad</label>
            <input value={city} onChange={(e)=>setCity(e.target.value)} className='w-full border px-3 py-2 rounded' />
          </div>

          <div>
            <label className='block text-sm font-semibold mb-1'>Barrio</label>
            <input value={barrio} onChange={(e)=>setBarrio(e.target.value)} className='w-full border px-3 py-2 rounded' />
          </div>

          <div>
            <label className='block text-sm font-semibold mb-1'>Estado</label>
            <select value={estado} onChange={(e)=>setEstado(e.target.value)} className='w-full border px-3 py-2 rounded'>
              <option value='perdida'>Perdida</option>
              <option value='encontrada'>Encontrada</option>
            </select>
          </div>

          <div className='md:col-span-2'>
            <label className='block text-sm font-semibold mb-1'>Descripción</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full border px-3 py-2 rounded' rows={4} />
          </div>

          <div className='md:col-span-2'>
            <label className='block text-sm font-semibold mb-1'>Contacto (email/telefono/facebook)</label>
            <input value={contact} onChange={(e)=>setContact(e.target.value)} className='w-full border px-3 py-2 rounded' />
          </div>

          {estado === 'encontrada' && (
            <>
              <div className='md:col-span-2'>
                <label className='block text-sm font-semibold mb-1'>Lugar aproximado donde se encontró</label>
                <input value={foundPlaceDetails} onChange={(e)=>setFoundPlaceDetails(e.target.value)} placeholder='Ej: Parque central, cerca a la entrada norte' className='w-full border px-3 py-2 rounded' />
              </div>

              <div className='md:col-span-2'>
                <label className='inline-flex items-center gap-2'>
                  <input type='checkbox' checked={microchipped} onChange={(e)=>setMicrochipped(e.target.checked)} />
                  <span className='text-sm font-semibold'>¿La mascota tiene microchip?</span>
                </label>
                {microchipped && (
                  <input value={chipId} onChange={(e)=>setChipId(e.target.value)} placeholder='Número de microchip (si aplica)' className='mt-2 w-full border px-3 py-2 rounded' />
                )}
              </div>
            </>
          )}

          <div className='md:col-span-2'>
            <label className='block text-sm font-semibold mb-1'>Subir fotos (máx 4)</label>

            <input
              ref={fileInput}
              type='file'
              accept='image/*'
              multiple
              onChange={handleFiles}
              className='hidden'
            />

            <div className='grid grid-cols-2 gap-3 w-64'>
              {previews.map((p, idx) => (
                  <div
                    key={idx}
                    className='relative h-36 w-36 bg-gray-100 rounded overflow-hidden cursor-grab'
                    draggable
                    onDragStart={(e) => onDragStart(e, idx)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => onDrop(e, idx)}
                  >
                    <img src={p} alt={`preview-${idx}`} className='h-full w-full object-cover' />
                    <button
                      type='button'
                      onClick={() => removeImage(idx)}
                      className='absolute top-1 right-1 bg-white rounded-full p-1 text-xs shadow'
                      aria-label='Eliminar imagen'
                    >
                      ✕
                    </button>
                  </div>
                ))}

              {previews.length < 4 && (
                <button type='button' onClick={triggerFileInput} className='h-36 w-36 flex items-center justify-center bg-gray-200 rounded border-2 border-dashed text-3xl text-gray-500'>
                  +
                </button>
              )}
            </div>
          </div>

          <div className='md:col-span-2 flex gap-3'>
            <button type='submit' disabled={loading} className='bg-green-600 text-white px-4 py-2 rounded'>
              {loading ? 'Publicando...' : 'Publicar'}
            </button>
            <button type='button' onClick={()=>navigate('/')} className='px-4 py-2 rounded border'>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NuevoReporte
