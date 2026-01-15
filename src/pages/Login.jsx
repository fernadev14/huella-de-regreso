import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, googleProvider, db } from '../config/firebase'
import SVGGoogleIcon from "../components/SVG/GoogleIcon.jsx"
import SlideInfo from '../components/newReport/SlideInfo.jsx'

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/'
  const prefill = location.state?.email || ''

  const [email, setEmail] = useState(prefill)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (!email) return setError('Ingrese su correo')
      if (!password) return setError('Ingrese su contraseña')

      // Intenta iniciar sesión con Firebase
      await signInWithEmailAndPassword(auth, email, password)
      // Si es exitoso, navega al home
      navigate(from, { replace: true })
    } catch (err) {
      // Si el usuario no existe, redirige a signup
      if (err.code === 'auth/user-not-found') {
        navigate('/signup', { state: { email } })
        return
      }
      // Si la contraseña es incorrecta
      if (err.code === 'auth/wrong-password') {
        setError('Contraseña incorrecta')
        return
      }
      // Otros errores
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    setLoading(true)

    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      // Guardar/actualizar datos en Firestore
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
        },
        { merge: true }
      )

      // Si es exitoso, navega al home
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión con Google')
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

      <div className='md:w-1/2 flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-8 rounded-lg shadow-md w-96'>
          <h1 className='text-2xl font-bold mb-6 text-center'>Iniciar Sesión</h1>
          {error && <div className='text-red-500 mb-4 p-2 bg-red-100 rounded'>{error}</div>}
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
              type='email'
              placeholder='Correo electrónico'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500'
            />
            <input
              type='password'
              placeholder='Contraseña'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500'
            />

            {/* BUTTON LOGIN */}
            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer font-semibold overflow-hidden relative border border-red-500 px-8 py-2
                          ${loading ? 'pointer-events-none opacity-60' : 'group'}
                        `}
            >
              <span className="relative z-10 text-red-500 group-hover:text-white text-xl duration-500">
                {loading ? 'Cargando...' : 'Iniciar sesión'}
              </span>

              <span className="absolute w-full h-full bg-red-500 -left-50 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
              <span className="absolute w-full h-full bg-red-500 -right-50 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
            </button>
          </form>

          {/* BUTTON GOOGLE LOGIN */}
          <div className='mt-4'>
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              type='button'
              className='flex items-center justify-center py-2 px-4 bg-white hover:bg-gray-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg cursor-pointer border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <SVGGoogleIcon />
              )}
              <span>{loading ? 'Cargando...' : 'Iniciar con Google'}</span>
            </button>
          </div>

          <div className='mt-4 flex flex-col gap-2'>
            <button
              onClick={() => navigate('/signup', { state: { email } })}
              className='w-full text-red-500 hover:text-red-700 text-sm cursor-pointer'
            >
              ¿No tienes cuenta? Crear cuenta
            </button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Login
