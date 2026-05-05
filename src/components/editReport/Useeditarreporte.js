import { useState, useEffect, useMemo, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export function useEditarReporte() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  // ── Campos del formulario ──────────────────────────────────────
  const [name, setName]                       = useState('')
  const [department, setDepartment]           = useState('')
  const [city, setCity]                       = useState('')
  const [barrio, setBarrio]                   = useState('')
  const [estado, setEstado]                   = useState('perdida')
  const [description, setDescription]         = useState('')
  const [contact, setContact]                 = useState('')
  const [foundDate, setFoundDate]             = useState('')
  const [foundPlaceDetails, setFoundPlaceDetails] = useState('')
  const [microchipped, setMicrochipped]       = useState(false)
  const [chipId, setChipId]                   = useState('')

  // ── Imágenes ───────────────────────────────────────────────────
  const [images, setImages]                   = useState([])
  const [previews, setPreviews]               = useState([])
  const [existingPhotos, setExistingPhotos]   = useState([])
  const [photoToRemove, setPhotoToRemove]     = useState([])
  const fileInput                             = useRef(null)
  const dragIndexRef                          = useRef(null)

  // ── UI state ───────────────────────────────────────────────────
  const [loading, setLoading]                 = useState(true)
  const [saving, setSaving]                   = useState(false)
  const [error, setError]                     = useState(null)
  const [reportAuthorUid, setReportAuthorUid] = useState(null)
  const [locationsData, setLocationsData]     = useState([])

  // ── Datos de ubicación ─────────────────────────────────────────
  useEffect(() => {
    import('../../data/colombia-municipios.json')
      .then((mod) => setLocationsData(mod.default))
  }, [])

  const departments = useMemo(
    () => locationsData.map((d) => d.departamento),
    [locationsData]
  )

  const cities = useMemo(() => {
    if (!department || !locationsData.length) return []
    const found = locationsData.find((d) => d.departamento === department)
    return found ? found.ciudades : []
  }, [department, locationsData])

  // ── Cargar reporte ─────────────────────────────────────────────
  useEffect(() => {
    if (!locationsData.length) return

    const fetchReport = async () => {
      if (!id) return
      try {
        const [{ doc, getDoc }, { db }] = await Promise.all([
          import('firebase/firestore'),
          import('../../config/firebase'),
        ])
        const docSnap = await getDoc(doc(db, 'pets', id))

        if (!docSnap.exists()) {
          setError('Reporte no encontrado')
          setLoading(false)
          return
        }

        const data = docSnap.data()
        setReportAuthorUid(data.authorUid)

        if (data.authorUid !== user?.uid) {
          setError('No tienes permiso para editar este reporte')
          setLoading(false)
          return
        }

        setName(data.title || '')
        setCity(data.city || '')

        // Restaurar departamento: campo guardado o detectarlo por ciudad
        if (data.department) {
          setDepartment(data.department)
        } else if (data.city) {
          const deptFound = locationsData.find((d) => d.ciudades.includes(data.city))
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
  }, [id, user, locationsData])

  // ── Previews de nuevas imágenes ────────────────────────────────
  useEffect(() => {
    const urls = images.map((f) => URL.createObjectURL(f))
    setPreviews(urls)
    return () => urls.forEach((u) => URL.revokeObjectURL(u))
  }, [images])

  // ── Handlers de imágenes ───────────────────────────────────────
  const totalPhotos = existingPhotos.length + images.length

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    if (totalPhotos + files.length > 4) {
      setError('Máximo 4 imágenes por reporte')
      return
    }
    setImages((prev) => [...prev, ...files])
  }

  const removeNewImage = (index) =>
    setImages((prev) => prev.filter((_, i) => i !== index))

  const removeExistingPhoto = (url) => {
    setExistingPhotos((prev) => prev.filter((p) => p !== url))
    setPhotoToRemove((prev) => [...prev, url])
  }

  const onDragStart = (e, idx) => {
    dragIndexRef.current = idx
    e.dataTransfer.effectAllowed = 'move'
  }

  const onDrop = (e, idx) => {
    e.preventDefault()
    const from = dragIndexRef.current
    if (from == null || from === idx) return
    const next = [...images]
    const [moved] = next.splice(from, 1)
    next.splice(idx, 0, moved)
    setImages(next)
    dragIndexRef.current = null
  }

  const triggerFileInput = () => fileInput.current?.click()

  // ── Submit ─────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (estado === 'perdida' && !name.trim()) {
      setError('El nombre es requerido para mascotas perdidas')
      return
    }
    if (!department || !city || !contact.trim()) {
      setError('Departamento, ciudad y contacto son requeridos')
      return
    }
    if (estado === 'encontrada' && !foundPlaceDetails.trim() && !foundDate) {
      setError('Indica al menos la fecha o lugar donde se encontró')
      return
    }

    setSaving(true)
    try {
      const [{ doc, updateDoc }, { db }, { uploadToCloudinary }] = await Promise.all([
        import('firebase/firestore'),
        import('../../config/firebase'),
        import('../../config/cloudinary'),
      ])

      const newPhotoURLs = await Promise.all(images.map((img) => uploadToCloudinary(img)))
      const finalPhotos  = [...existingPhotos, ...newPhotoURLs]

      await updateDoc(doc(db, 'pets', id), {
        title:            name,
        department,
        city,
        barrio,
        estado,
        description,
        contact,
        photoURLs:        finalPhotos,
        foundDate:        estado === 'encontrada' ? foundDate : '',
        foundPlaceDetails: estado === 'encontrada' ? foundPlaceDetails : '',
        microchipped:     estado === 'encontrada' ? microchipped : false,
        chipId:           estado === 'encontrada' ? chipId : '',
        updatedAt:        new Date().toISOString(),
      })

      navigate('/mis-reportes')
    } catch (err) {
      console.error(err)
      setError('Error actualizando el reporte')
    } finally {
      setSaving(false)
    }
  }

  return {
    // form fields
    name, setName,
    department, setDepartment,
    city, setCity,
    barrio, setBarrio,
    estado, setEstado,
    description, setDescription,
    contact, setContact,
    foundDate, setFoundDate,
    foundPlaceDetails, setFoundPlaceDetails,
    microchipped, setMicrochipped,
    chipId, setChipId,
    // images
    images, previews,
    existingPhotos, totalPhotos,
    fileInput,
    handleFiles, removeNewImage, removeExistingPhoto,
    onDragStart, onDrop, triggerFileInput,
    // ui
    loading, saving, error,
    reportAuthorUid, user,
    // location
    departments, cities,
    // actions
    handleSubmit, navigate,
  }
}