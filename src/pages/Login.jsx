import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'

const AuthPage = lazy(() => import('../components/auth/AuthPage.jsx'))

/**
 * Login — wrapper de ruta para /login
 * Delega todo el UI/lógica a AuthPage con mode='login'
 */
const Login = () => {
  const location     = useLocation()
  const prefillEmail = location.state?.email || ''

  return (
    <Suspense fallback={null}>
      <AuthPage initialMode='login' prefillEmail={prefillEmail} />
    </Suspense>
  )
}

export default Login