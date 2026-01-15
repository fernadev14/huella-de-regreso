import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, googleProvider, db } from '../config/firebase'
import SlideInfo from '../components/newReport/SlideInfo'
import SVGGoogleIcon from "../components/SVG/GoogleIcon.jsx"

const Signup = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const prefilledEmail = location.state?.email || ''

  const [email, setEmail] = useState(prefilledEmail)
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (!email) return setError('Ingrese un correo válido')
      if (!password) return setError('Ingrese una contraseña')
      if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres')
      if (!firstName.trim()) return setError('Ingrese su nombre')

      // Crea la cuenta con Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Actualizar nombre en Auth
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`.trim(),
      })

      // Guardar datos adicionales en Firestore
      const userRef = doc(db, 'users', user.uid)
      await setDoc(userRef, {
        firstName,
        lastName,
        email,
        photoURL: null,
        uid: user.uid,
        createdAt: new Date(),
      })
      // Si es exitosa, navega al home
      navigate('/')
    } catch (err) {
      // Si el email ya existe
      if (err.code === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado. Intenta iniciar sesión')
        return
      }
      // Si el email es inválido
      if (err.code === 'auth/invalid-email') {
        setError('El correo no es válido')
        return
      }
      // Otros errores
      setError(err.message || 'Error creando la cuenta')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setError(null)
    setLoading(true)

    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      // Guardar datos en Firestore si es nuevo usuario
      const userRef = doc(db, 'users', user.uid)
      const nameParts = user.displayName?.split(' ') || ['User']
      
      await setDoc(
        userRef,
        {
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(' ') || '',
          email: user.email,
          photoURL: user.photoURL || null,
          uid: user.uid,
          createdAt: new Date(),
        },
        { merge: true }
      )
      // Si es exitoso, navega al home
      navigate('/')
    } catch (err) {
      setError(err.message || 'Error al registrarse con Google')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col-reverse md:flex-row-reverse min-h-screen'>
      {/* LADO IZQUIERDO */}
      <div className="md:w-1/2 bg-[#FFD54F] flex items-center justify-center py-5">
        <SlideInfo />
      </div>

      <div className='md:w-1/2 flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <div className='bg-white p-8 rounded-lg shadow-md w-96'>
          <h1 className='text-2xl font-bold mb-6 text-center'>Crear Cuenta</h1>
          {error && <div className='text-red-500 mb-4 p-2 bg-red-100 rounded'>{error}</div>}
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
              type='text'
              placeholder='Nombre'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500'
            />
            <input
              type='text'
              placeholder='Apellido'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500'
            />
            <input
              type='email'
              placeholder='Correo electrónico'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500'
            />
            <input
              type='password'
              placeholder='Contraseña (mín. 6 caracteres)'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500'
            />
            {/* BUTTON LOGIN */}
            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer font-semibold overflow-hidden relative border border-blue-500 px-8 py-2
                          ${loading ? 'pointer-events-none opacity-60' : 'group'}
                        `}
            >
              <span className="relative z-10 text-blue-500 group-hover:text-white text-xl duration-500">
                {loading ? 'Cargando...' : 'Crear cuenta'}
              </span>

              <span className="absolute w-full h-full bg-blue-500 -left-50 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
              <span className="absolute w-full h-full bg-blue-500 -right-50 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
            </button>
          </form>

          <div className='mt-4'>
            <button
              onClick={handleGoogleSignUp}
              disabled={loading}
              type='button'
              className='flex items-center justify-center py-2 px-4 bg-white hover:bg-gray-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg cursor-pointer border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <SVGGoogleIcon />
              <span>{loading ? 'Cargando...' : 'Registrate con Google'}</span>
            </button>
          </div>

          <button
            onClick={() => navigate('/login', { state: { email } })}
            className='mt-4 w-full text-blue-500 hover:text-blue-700 text-sm cursor-pointer'
          >
            ← ¿Ya tienes cuenta? Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup
