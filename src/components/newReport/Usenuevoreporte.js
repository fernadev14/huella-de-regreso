import { useState, useEffect, useRef, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { AuthContext } from '../../context/AuthContext'
import { uploadToCloudinary } from '../../config/cloudinary'

const normalizeBarrio = (text = '') =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase())

export function useNuevoReporte() {
  const navigate    = useNavigate()
  const { user, userData } = useContext(AuthContext)

  // ── Form fields ────────────────────────────────────────────────
  const [name,              setName]              = useState('')
  const [department,        setDepartment]        = useState('')
  const [city,              setCity]              = useState('')
  const [barrio,            setBarrio]            = useState('')
  const [estado,            setEstado]            = useState('perdida')
  const [description,       setDescription]       = useState('')
  const [contact,           setContact]           = useState('')
  const [foundDate,         setFoundDate]         = useState('')
  const [foundPlaceDetails, setFoundPlaceDetails] = useState('')
  const [microchipped,      setMicrochipped]      = useState(false)
  const [chipId,            setChipId]            = useState('')

  // ── Images ─────────────────────────────────────────────────────
  const [images,   setImages]   = useState([])
  const [previews, setPreviews] = useState([])
  const fileInput    = useRef(null)
  const dragIndexRef = useRef(null)

  // ── UI ─────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  // ── Location data ──────────────────────────────────────────────
  const [locationsData, setLocationsData] = useState([])

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
    return locationsData.find((d) => d.departamento === department)?.ciudades ?? []
  }, [department, locationsData])

  // ── Redirect if not logged in ──────────────────────────────────
  useEffect(() => {
    if (user) navigate('/nuevo-reporte')
  }, [user, navigate])

  // ── Image previews ─────────────────────────────────────────────
  useEffect(() => {
    const urls = images.map((f) => URL.createObjectURL(f))
    setPreviews(urls)
    return () => urls.forEach((u) => URL.revokeObjectURL(u))
  }, [images])

  // ── Image handlers ─────────────────────────────────────────────
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setImages((prev) => [...prev, ...files].slice(0, 4))
  }

  const removeImage = (index) =>
    setImages((prev) => prev.filter((_, i) => i !== index))

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
      setError('Indica al menos la fecha o lugar donde se encontró la mascota')
      return
    }

    setLoading(true)
    try {
      const imageUrls = await Promise.all(images.map((f) => uploadToCloudinary(f)))

      const barrioNorm = normalizeBarrio(barrio)

      await addDoc(collection(db, 'pets'), {
        title: estado === 'perdida'
          ? name
          : `Mascota encontrada en ${city}${barrio ? ' - ' + barrioNorm : ''}`,
        description,
        department,
        city,
        barrio:     barrioNorm,
        barrioSlug: barrioNorm.toLowerCase().replace(/\s/g, ''),
        estado,
        photoURLs:  imageUrls,
        contact,
        foundDate:        foundDate        || null,
        foundPlaceDetails: foundPlaceDetails || null,
        microchipped:     microchipped || false,
        chipId:           microchipped ? chipId || null : null,
        authorUid:  user.uid,
        authorName: userData?.firstName
          ? `${userData.firstName} ${userData.lastName || ''}`.trim()
          : user.email,
        createdAt: new Date().toISOString(),
      })

      navigate('/publicaciones')
    } catch (err) {
      console.error(err)
      setError('Error publicando el reporte: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    // auth
    user,
    // fields
    name,              setName,
    department,        setDepartment,
    city,              setCity,
    barrio,            setBarrio,
    estado,            setEstado,
    description,       setDescription,
    contact,           setContact,
    foundDate,         setFoundDate,
    foundPlaceDetails, setFoundPlaceDetails,
    microchipped,      setMicrochipped,
    chipId,            setChipId,
    // images
    previews, fileInput,
    handleFiles, removeImage, onDragStart, onDrop, triggerFileInput,
    // location
    departments, cities,
    // ui
    loading, error,
    // actions
    handleSubmit, navigate,
  }
}