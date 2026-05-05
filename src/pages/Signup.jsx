import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'

const AuthPage = lazy(() => import('../components/auth/AuthPage.jsx'))

/**
 * Signup — wrapper de ruta para /signup
 * Delega todo el UI/lógica a AuthPage con mode='signup'
 * (la card arranca volteada mostrando el formulario de registro)
 */
const Signup = () => {
  const location     = useLocation()
  const prefillEmail = location.state?.email || ''

  return (
    <Suspense fallback={null}>
      <AuthPage initialMode='signup' prefillEmail={prefillEmail} />
    </Suspense>
  )
}

export default Signup