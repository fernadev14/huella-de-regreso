import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { AuthContext } from '../../context/AuthContext'

export function useProfile() {
  const navigate = useNavigate()
  const { user, userData, setUserData } = useContext(AuthContext)
  const isMounted = useRef(true)
  const toastTimer  = useRef(null)  // ← ref para el timer del toast
  const navTimer    = useRef(null)  // ← ref para el timer de navegación

  const [firstName,    setFirstName]    = useState('')
  const [lastName,     setLastName]     = useState('')
  const [phone,        setPhone]        = useState('')
  const [bio,          setBio]          = useState('')
  const [photoURL,     setPhotoURL]     = useState('')

  const [loading,      setLoading]      = useState(false)
  const [uploadingImg, setUploadingImg] = useState(false)
  const [error,        setError]        = useState(null)
  const [toast,        setToast]        = useState(null)
  const [ready,        setReady]        = useState(false)

  /* ─────────────────────────────────────────────────────────────────
     UN SOLO EFECTO — dependencia únicamente en user?.uid

     Por qué fallaba antes:
       Efecto 1 [userData] → poblaba phone/bio desde contexto (vacíos)
       Efecto 2 [user?.uid] → traía phone/bio de Firestore (correctos)
       Cada vez que userData cambiaba, Efecto 1 corría DE NUEVO y
       sobreescribía los valores correctos con cadenas vacías.

     Solución:
       1. Render inmediato con datos del contexto (nombre/foto) → ready=true
       2. Fetch Firestore en el mismo efecto, sobreescribe TODOS los campos
       3. userData NO está en las dependencias → no hay reescritura posterior
  ─────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!user?.uid) {
      // Sin usuario: mostrar AccessDenied de inmediato
      setReady(true)
      return
    }

    let cancelled = false

    // Paso 1 — render inmediato con cache del contexto (evita skeleton colgado)
    setFirstName(userData?.firstName || '')
    setLastName (userData?.lastName  || '')
    setPhotoURL (userData?.photoURL  || '')
    setPhone    (userData?.phone     || '')
    setBio      (userData?.bio       || '')
    setReady(true)
    

    // Paso 2 — fetch fresco desde Firestore, gana sobre el cache
    const fetchFresh = async () => {
      try {

        const snap = await getDoc(doc(db, 'users', user.uid))

        // console.log('DATA FIRESTORE:', snap.data())
        if (cancelled || !isMounted.current) return

        if (snap.exists()) {
          const d = snap.data()
          setFirstName(d.firstName || '')
          setLastName (d.lastName  || '')
          // setPhone    (d.phone     ?? '')
          // setBio      (d.bio       ?? '')
          setPhotoURL (d.photoURL  || '')
        }
      } catch (err) {
        // Fetch best-effort — el contexto ya mostró nombre y foto
        console.warn('useProfile: Firestore fetch failed:', err.message)
      }
    }

    fetchFresh()
    return () => { cancelled = true }
  }, [user?.uid]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ─── Cleanup timers al desmontar ─── */
  useEffect(() => {
    return () => {
      isMounted.current = false
      clearTimeout(toastTimer.current)
      clearTimeout(navTimer.current)
    }
  }, [])

  /* ─── Toast efímero ─── */
  const showToast = (msg, duration = 2000) => {
    // Cancelar timer anterior si existía
    clearTimeout(toastTimer.current)
    setToast(msg)
    toastTimer.current = setTimeout(() => setToast(null), duration)
  }

  /* ─── Subir foto ─── */
  const handlePhotoChange = async (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) return setError('El archivo debe ser una imagen')
    if (file.size > 5 * 1024 * 1024)    return setError('La imagen no debe superar 5 MB')

    setError(null)
    setUploadingImg(true)
    try {
      const [
        { uploadToCloudinary },
        { updateProfile },
        { doc, setDoc },
        { auth, db },
      ] = await Promise.all([
        import('../../config/cloudinary'),
        import('firebase/auth'),
        import('firebase/firestore'),
        import('../../config/firebase'),
      ])

      const url = await uploadToCloudinary(file)
      if (!isMounted.current) return

      setPhotoURL(url)
      await updateProfile(auth.currentUser, { photoURL: url })
      await setDoc(
        doc(db, 'users', user.uid),
        { photoURL: url, updatedAt: new Date() },
        { merge: true }
      )
      setUserData?.(prev => ({ ...prev, photoURL: url }))
      showToast('📸 Foto actualizada')
    } catch (err) {
      if (isMounted.current) setError('Error al subir la foto: ' + err.message)
    } finally {
      if (isMounted.current) setUploadingImg(false)
    }
  }

  /* ─── Guardar perfil ─── */
  const handleSubmit = async (e) => {
    e?.preventDefault()
    if (!firstName.trim()) return setError('El nombre es requerido')

    setError(null)
    setLoading(true)
    try {
      const [
        { updateProfile },
        { doc, setDoc },
        { auth, db },
      ] = await Promise.all([
        import('firebase/auth'),
        import('firebase/firestore'),
        import('../../config/firebase'),
      ])

      const displayName = `${firstName} ${lastName}`.trim()
      const userUpdated = {
        firstName,
        lastName,
        phone:     phone.trim(),
        bio:       bio.trim(),
        email:     user.email,
        photoURL:  photoURL || null,
        uid:       user.uid,
        updatedAt: new Date().toISOString(),
      }

      await updateProfile(auth.currentUser, { displayName })
      await setDoc(doc(db, 'users', user.uid), userUpdated, { merge: true })
      setUserData?.(prev => ({ ...prev, ...userUpdated }))

      setLoading(false)

      clearTimeout(toastTimer.current)
      clearTimeout(navTimer.current)
      setToast('✓ Perfil guardado correctamente')

      toastTimer.current = setTimeout(() => {
        setToast(null)
        navTimer.current = setTimeout(() => {
          if (isMounted.current) navigate('/')
        }, 150) // pequeño delay para que el fade-out del toast sea visible
      }, 1800)

    } catch (err) {
      if (isMounted.current) {
        setError('Error al guardar: ' + err.message)
        setLoading(false)
      }
    }
  }

  return {
    user, ready,
    firstName, setFirstName,
    lastName,  setLastName,
    phone,     setPhone,
    bio,       setBio,
    photoURL,
    handlePhotoChange,
    handleSubmit,
    loading, uploadingImg, error, toast,
    clearError: () => setError(null),
  }
}