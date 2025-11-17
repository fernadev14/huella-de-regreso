import { useState, useContext, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { AuthContext } from '../context/AuthContext'
import { uploadToCloudinary } from '../config/cloudinary'
import Avatar from '../components/Avatar'

const Profile = () => {
  const navigate = useNavigate()
  const { user, userData, setUserData } = useContext(AuthContext)
  const fileInputRef = useRef(null)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || '')
      setLastName(userData.lastName || '')
      setPhotoURL(userData.photoURL || '')
    }
    setIsMounted(true)
  }, [userData])

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <p className='text-gray-600'>Debes iniciar sesión para acceder a tu perfil</p>
          <button
            onClick={() => navigate('/login')}
            className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
          >
            Ir a Login
          </button>
        </div>
      </div>
    )
  }

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no debe superar 5MB')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const url = await uploadToCloudinary(file)
      setPhotoURL(url)

      await updateProfile(user, { photoURL: url })

      const userRef = doc(db, 'users', user.uid)
      await setDoc(
        userRef,
        { photoURL: url, updatedAt: new Date() },
        { merge: true }
      )

      setUserData((prev) => ({
        ...prev,
        photoURL: url,
      }))

      setSuccess('Foto actualizada correctamente')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('Error al subir la foto: ' + err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!firstName.trim()) {
      setError('El nombre es requerido')
      return
    }

    setLoading(true)

    try {
      const displayName = `${firstName} ${lastName}`.trim()

      await updateProfile(user, { displayName })

      const userUpdated = {
        firstName,
        lastName,
        email: user.email,
        photoURL: photoURL || null,
        uid: user.uid,
        updatedAt: new Date().toISOString(),
      }

      const userRef = doc(db, 'users', user.uid)
      await setDoc(userRef, userUpdated, { merge: true })

      if (setUserData) {
        setUserData(userUpdated)
      }

      setSuccess('Perfil actualizado correctamente ✓')
      setTimeout(() => {
        if (isMounted) {
          navigate('/')
        }
      }, 1500)
    } catch (err) {
      console.error('Error:', err)
      setError('Error al actualizar el perfil: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isMounted) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <div className='text-gray-600'>Cargando perfil...</div>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Editar Perfil</h1>

        {error && <div className='text-red-500 mb-4 p-2 bg-red-100 rounded text-sm'>{error}</div>}
        {success && <div className='text-green-500 mb-4 p-2 bg-green-100 rounded text-sm'>{success}</div>}

        <div className='flex flex-col items-center mb-6'>
          <Avatar
            photoURL={photoURL}
            firstName={firstName}
            size='lg'
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className='mt-3 text-blue-500 hover:text-blue-700 text-sm disabled:opacity-50'
            disabled={loading}
            type='button'
          >
            {photoURL ? 'Cambiar foto' : 'Subir foto'}
          </button>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={handlePhotoChange}
            className='hidden'
            disabled={loading}
          />
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Nombre
            </label>
            <input
              type='text'
              placeholder='Tu nombre'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500'
              disabled={loading}
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Apellido
            </label>
            <input
              type='text'
              placeholder='Tu apellido'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500'
              disabled={loading}
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>
              Correo
            </label>
            <input
              type='email'
              value={user.email}
              disabled
              className='w-full border border-gray-300 px-4 py-2 rounded-md bg-gray-100 text-gray-600'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className='mt-4 w-full text-blue-500 hover:text-blue-700 text-sm'
          type='button'
        >
          ← Volver al inicio
        </button>
      </div>
    </div>
  )
}

export default Profile
