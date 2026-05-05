import { useState, useEffect, lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthForm } from './Useauthform.js'

const LoginForm  = lazy(() => import('./LoginForm.jsx'))
const SignupForm = lazy(() => import('./SignupForm.jsx'))

// Skeleton mínimo mientras cargan los forms
const FormSkeleton = () => (
  <div className='space-y-4 animate-pulse'>
    <div className='h-5 w-1/3 bg-gray-100 rounded' />
    <div className='h-8 w-2/3 bg-gray-100 rounded' />
    <div className='h-4 w-1/2 bg-gray-100 rounded mt-1' />
    {[1,2,3].map(i => <div key={i} className='h-11 bg-gray-100 rounded-xl' />)}
  </div>
)

/**
 * AuthCard
 * Props:
 *   initialMode — 'login' | 'signup'
 *   prefillEmail — email pre-rellenado
 */
const AuthCard = ({ initialMode = 'login', prefillEmail = '' }) => {
  const navigate    = useNavigate()
  const auth        = useAuthForm()
  const [mode, setMode] = useState(initialMode)
  const isFlipped   = mode === 'signup'

  // Sincronizar URL con el estado del flip
  const handleFlip = () => {
    auth.clearError()
    const next = mode === 'login' ? 'signup' : 'login'
    setMode(next)
    navigate(`/${next}`, { replace: true })
  }

  // Si la ruta cambia externamente, sincronizar
  useEffect(() => {
    setMode(initialMode)
  }, [initialMode])

  return (
    <div className='flip-scene'>
      {/*
        Altura dinámica: el card tiene posición relative;
        la cara trasera es absolute, por lo que necesitamos
        una min-height estimada. Se puede ajustar con CSS
        si el contenido cambia de tamaño.
      */}
      <div
        className={`flip-card ${isFlipped ? 'is-flipped' : ''}`}
        style={{ minHeight: isFlipped ? '620px' : '520px' }}
      >
        {/* ── FRENTE: Login ── */}
        <div className='flip-face flip-face--front'>
          <Suspense fallback={<FormSkeleton />}>
            <LoginForm
              prefillEmail={prefillEmail}
              onFlip={handleFlip}
              auth={auth}
            />
          </Suspense>
        </div>

        {/* ── REVERSO: Signup ── */}
        <div className='flip-face flip-face--back'>
          <Suspense fallback={<FormSkeleton />}>
            <SignupForm
              prefillEmail={prefillEmail}
              onFlip={handleFlip}
              auth={auth}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default AuthCard