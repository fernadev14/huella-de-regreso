import { useState } from 'react'
import { AuthField, AuthError, AuthDivider, GoogleButton, Spinner } from './AuthAtoms.jsx'

/**
 * LoginForm — cara frontal de la flip card
 * Props:
 *   prefillEmail  — email pre-rellenado desde navegación
 *   onFlip        — callback para voltear a Signup
 *   auth          — { loading, error, loginWithEmail, authWithGoogle }
 */
const LoginForm = ({ prefillEmail = '', onFlip, auth }) => {
  const [email,    setEmail]    = useState(prefillEmail)
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    auth.loginWithEmail({ email, password })
  }

  return (
    <div className='auth-fade-in'>
      {/* Encabezado */}
      <div className='mb-6'>
        <p className='text-xs font-semibold uppercase tracking-widest text-amber-600 mb-1'>
          Bienvenido de vuelta
        </p>
        <h1 className='auth-title'>Iniciar sesión</h1>
        <p className='auth-subtitle'>Accede a tu cuenta para gestionar tus reportes</p>
      </div>

      <AuthError message={auth.error} />

      <form onSubmit={handleSubmit} noValidate>
        <AuthField
          type='email' icon='email'
          placeholder='Correo electrónico'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='email'
        />
        <AuthField
          type='password' icon='password'
          placeholder='Contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
        />

        <button type='submit' disabled={auth.loading} className='auth-btn-primary'>
          {auth.loading
            ? <span className='flex items-center justify-center gap-2'><Spinner /> Verificando…</span>
            : 'Iniciar sesión'}
        </button>
      </form>

      <AuthDivider />

      <GoogleButton onClick={auth.authWithGoogle} loading={auth.loading} />

      {/* Switch a Signup */}
      <div className='auth-switch-link'>
        ¿No tienes cuenta?{' '}
        <button type='button' onClick={onFlip} className='auth-switch-btn'>
          Crear cuenta →
        </button>
      </div>
    </div>
  )
}

export default LoginForm