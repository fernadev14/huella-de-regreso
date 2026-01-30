import { useState, useContext, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { AuthContext } from '../context/AuthContext'
import { uploadToCloudinary } from '../config/cloudinary'
import locationsData from '../data/colombia-municipios.json'


const EditarReporte = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [department, setDepartment] = useState('')
  const [city, setCity] = useState('')
  const [barrio, setBarrio] = useState('')
  const [estado, setEstado] = useState('perdida')
  const [description, setDescription] = useState('')
  const [contact, setContact] = useState('')
  const [foundDate, setFoundDate] = useState('')
  const [foundPlaceDetails, setFoundPlaceDetails] = useState('')
  const [microchipped, setMicrochipped] = useState(false)
  const [chipId, setChipId] = useState('')
  
  const [images, setImages] = useState([])
  const [previews, setPreviews] = useState([])
  const [existingPhotos, setExistingPhotos] = useState([]) // fotos actuales
  const [photoToRemove, setPhotoToRemove] = useState([]) // fotos a eliminar
  
  const fileInput = useRef(null)
  const dragIndexRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [reportAuthorUid, setReportAuthorUid] = useState(null)

  // Cargar datos del reporte
  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return

      try {
        const docRef = doc(db, 'pets', id)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
          setError('Reporte no encontrado')
          setLoading(false)
          return
        }

        const data = docSnap.data()
        setReportAuthorUid(data.authorUid)

        // Verificar que el usuario actual sea el autor
        if (data.authorUid !== user?.uid) {
          setError('No tienes permiso para editar este reporte')
          setLoading(false)
          return
        }

        // Llenar los campos
        setName(data.title || '')
        setCity(data.city || '')
        // Detectar departamento automáticamente según la ciudad guardada
        if (data.city) {
          const deptFound = locationsData.find(d => d.ciudades.includes(data.city))
          if (deptFound) setDepartment(deptFound.departamento)
        }

        setBarrio(data.barrio || '')
        setEstado(data.estado || 'perdida')
        setDescription(data.description || '')
        setContact(data.contact || '')
        setFoundDate(data.foundDate || '')
        setFoundPlaceDetails(data.foundPlaceDetails || '')
        setMicrochipped(data.microchipped || false)
        setChipId(data.chipId || '')
        setExistingPhotos(data.photoURLs || [])

        setLoading(false)
      } catch (err) {
        console.error(err)
        setError('Error cargando el reporte')
        setLoading(false)
      }
    }

    fetchReport()
  }, [id, user])

  // Generar previews para nuevas imágenes
  useEffect(() => {
    const urls = images.map((f) => URL.createObjectURL(f))
    setPreviews(urls)

    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u))
    }
  }, [images])

  const departments = locationsData.map(d => d.departamento)

  const getCitiesByDepartment = (dept) => {
    const found = locationsData.find(d => d.departamento === dept)
    return found ? found.ciudades : []
  }


  const handleFiles = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    // Limitar total a 4 imágenes (existentes + nuevas)
    const totalPhotos = existingPhotos.length - photoToRemove.length + images.length + files.length
    if (totalPhotos > 4) {
      setError('Máximo 4 imágenes por reporte')
      return
    }

    const nextFiles = [...images, ...files]
    setImages(nextFiles)
  }

  const removeNewImage = (index) => {
    const next = images.filter((_, i) => i !== index)
    setImages(next)
  }

  const removeExistingPhoto = (url) => {
    setExistingPhotos(prev => prev.filter(p => p !== url))
    setPhotoToRemove(prev => [...prev, url])
  }

  const undoRemovePhoto = (url) => {
    setExistingPhotos(prev => [...prev, url])
    setPhotoToRemove(prev => prev.filter(p => p !== url))
  }

  const onDragStart = (e, idx) => {
    dragIndexRef.current = idx
    e.dataTransfer.effectAllowed = 'move'
  }

  const onDrop = (e, idx) => {
    e.preventDefault()
    const from = dragIndexRef.current
    if (from === null || from === undefined || from === idx) return
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

    if (estado === 'perdida' && !name.trim()) {
      setError('El nombre es requerido para mascotas perdidas')
      return
    }
    if (!department || !city || !contact.trim()) {
      setError('Ciudad y contacto son requeridos')
      return
    }
    if (estado === 'encontrada' && !foundPlaceDetails.trim() && !foundDate) {
      setError('Indica al menos la fecha o lugar donde se encontró')
      return
    }

    setSaving(true)

    try {
      // Subir nuevas imágenes a Cloudinary
      const newPhotoURLs = []
      for (const img of images) {
        const url = await uploadToCloudinary(img)
        newPhotoURLs.push(url)
      }

      // Combinar fotos: existentes (no eliminadas) + nuevas
      const finalPhotos = [...existingPhotos, ...newPhotoURLs]

      // Actualizar documento
      await updateDoc(doc(db, 'pets', id), {
        title: name,
        department,
        city,
        barrio,
        estado,
        description,
        contact,
        photoURLs: finalPhotos,
        foundDate: estado === 'encontrada' ? foundDate : '',
        foundPlaceDetails: estado === 'encontrada' ? foundPlaceDetails : '',
        microchipped: estado === 'encontrada' ? microchipped : false,
        chipId: estado === 'encontrada' ? chipId : '',
        updatedAt: new Date().toISOString(),
      })

      navigate('/mis-reportes')
    } catch (err) {
      console.error(err)
      setError('Error actualizando el reporte')
    } finally {
      setSaving(false)
    }
  }

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <p className='mb-4'>Debes iniciar sesión</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <p>Cargando reporte...</p>
      </div>
    )
  }

  if (error && reportAuthorUid && reportAuthorUid !== user.uid) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <p className='text-red-600 mb-4'>{error}</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-100 py-12'>
      <div className='max-w-2xl mx-auto px-4'>
        <h1 className='text-3xl font-bold mb-6'>Editar Reporte</h1>

        {error && <div className='bg-red-100 text-red-700 p-3 rounded mb-4'>{error}</div>}

        <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow'>
          {/* ESTADO */}
          <div className='mb-4'>
            <label className='block font-bold mb-2'>Tipo de reporte</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value)} className='w-full border rounded p-2'>
              <option value='perdida'>Mascota Perdida</option>
              <option value='encontrada'>Mascota Encontrada</option>
            </select>
          </div>

          {/* NOMBRE (solo para perdida) */}
          {estado === 'perdida' && (
            <div className='mb-4'>
              <label className='block font-bold mb-2'>Nombre de la mascota *</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full border rounded p-2'
                placeholder='ej. Firulais'
              />
            </div>
          )}

          {/* CIUDAD Y BARRIO */}
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='block font-bold mb-2'>Departamento *</label>
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value)
                  setCity('')
                }}
                className='w-full border rounded p-2'
              >
                <option value="">Seleccione departamento</option>
                {departments.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            </div>
            <div>
              <label className='block font-bold mb-2'>Ciudad</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!department}
                className='w-full border rounded p-2'
              >
                <option value="">Seleccione ciudad</option>
                {getCitiesByDepartment(department).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
            <label className='block text-sm font-semibold mb-1'>Barrio</label>
            <input value={barrio} 
              onChange={(e) => setBarrio(normalizeBarrio(e.target.value))}
              className='w-full border px-3 py-2 rounded'
            />
          </div>
          </div>

          {/* DESCRIPCIÓN */}
          <div className='mb-4'>
            <label className='block font-bold mb-2'>Descripción *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full border rounded p-2 h-24'
              placeholder='Describe a tu mascota...'
            />
          </div>

          {/* CONTACTO */}
          <div className='mb-4'>
            <label className='block font-bold mb-2'>Contacto *</label>
            <input
              type='text'
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className='w-full border rounded p-2'
              placeholder='Teléfono o email'
            />
          </div>

          {/* Campos de encontrada */}
          {estado === 'encontrada' && (
            <>
              <div className='mb-4'>
                <label className='block font-bold mb-2'>Fecha de hallazgo</label>
                <input
                  type='date'
                  value={foundDate}
                  onChange={(e) => setFoundDate(e.target.value)}
                  className='w-full border rounded p-2'
                />
              </div>

              <div className='mb-4'>
                <label className='block font-bold mb-2'>Lugar de hallazgo</label>
                <input
                  type='text'
                  value={foundPlaceDetails}
                  onChange={(e) => setFoundPlaceDetails(e.target.value)}
                  className='w-full border rounded p-2'
                  placeholder='Describe el lugar'
                />
              </div>

              <div className='mb-4 flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='microchipped'
                  checked={microchipped}
                  onChange={(e) => setMicrochipped(e.target.checked)}
                  className='w-4 h-4'
                />
                <label htmlFor='microchipped' className='font-bold'>¿Tiene microchip?</label>
              </div>

              {microchipped && (
                <div className='mb-4'>
                  <label className='block font-bold mb-2'>ID del Microchip</label>
                  <input
                    type='text'
                    value={chipId}
                    onChange={(e) => setChipId(e.target.value)}
                    className='w-full border rounded p-2'
                    placeholder='Número del microchip'
                  />
                </div>
              )}
            </>
          )}

          {/* IMÁGENES EXISTENTES */}
          {existingPhotos.length > 0 && (
            <div className='mb-6'>
              <h3 className='font-bold mb-2'>Imágenes actuales</h3>
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                {existingPhotos.map((url, idx) => (
                  <div key={idx} className='relative group'>
                    <img src={url} alt={`existing-${idx}`} className='w-full h-24 object-cover rounded' />
                    <button
                      type='button'
                      onClick={() => removeExistingPhoto(url)}
                      className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition'
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NUEVAS IMÁGENES */}
          <div className='mb-6'>
            <h3 className='font-bold mb-2'>Agregar más imágenes ({existingPhotos.length + images.length}/4)</h3>
            <input
              type='file'
              ref={fileInput}
              onChange={handleFiles}
              multiple
              accept='image/*'
              className='hidden'
            />

            {/* Preview + Add tile */}
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
              {previews.map((url, idx) => (
                <div key={idx} className='relative group' draggable onDragStart={(e) => onDragStart(e, idx)} onDrop={(e) => onDrop(e, idx)} onDragOver={(e) => e.preventDefault()}>
                  <img src={url} alt={`preview-${idx}`} className='w-full h-24 object-cover rounded cursor-move' />
                  <button
                    type='button'
                    onClick={() => removeNewImage(idx)}
                    className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition'
                  >
                    ✕
                  </button>
                </div>
              ))}

              {existingPhotos.length + images.length < 4 && (
                <button
                  type='button'
                  onClick={triggerFileInput}
                  className='border-2 border-dashed border-gray-300 rounded h-24 flex items-center justify-center hover:bg-gray-50 cursor-pointer'
                >
                  <span className='text-2xl'>+</span>
                </button>
              )}
            </div>
          </div>

          {/* BOTONES */}
          <div className='flex gap-4'>
            <button
              type='submit'
              disabled={saving}
              className='flex-1 bg-[#FFD54F] text-[#333] font-bold py-2 px-4 rounded hover:bg-yellow-400 disabled:opacity-50'
            >
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
            <button
              type='button'
              onClick={() => navigate('/mis-reportes')}
              className='flex-1 bg-gray-300 text-[#333] font-bold py-2 px-4 rounded hover:bg-gray-400'
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditarReporte
