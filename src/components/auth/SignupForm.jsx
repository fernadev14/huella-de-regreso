import { useState } from 'react'
import { AuthField, AuthError, AuthDivider, GoogleButton, Spinner } from './AuthAtoms'

/**
 * SignupForm — cara trasera de la flip card
 * Props:
 *   prefillEmail  — email pre-rellenado desde navegación
 *   onFlip        — callback para voltear a Login
 *   auth          — { loading, error, signupWithEmail, authWithGoogle }
 */
const SignupForm = ({ prefillEmail = '', onFlip, auth }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName]  = useState('')
  const [email,     setEmail]     = useState(prefillEmail)
  const [password,  setPassword]  = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    auth.signupWithEmail({ firstName, lastName, email, password })
  }

  return (
    <div className='auth-fade-in'>
      {/* Encabezado */}
      <div className='mb-6'>
        <p className='text-xs font-semibold uppercase tracking-widest text-amber-600 mb-1'>
          Únete a la comunidad
        </p>
        <h1 className='auth-title'>Crear cuenta</h1>
        <p className='auth-subtitle'>Registra tu mascota y ayuda a otros a encontrar la suya</p>
      </div>

      <AuthError message={auth.error} />

      <form onSubmit={handleSubmit} noValidate>
        {/* Nombre y apellido en fila */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <AuthField
            type='text' icon='text'
            placeholder='Nombre'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete='given-name'
          />
          <AuthField
            type='text' icon='text'
            placeholder='Apellido'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete='family-name'
          />
        </div>

        <AuthField
          type='email' icon='email'
          placeholder='Correo electrónico'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='email'
        />
        <AuthField
          type='password' icon='password'
          placeholder='Contraseña (mín. 6 caracteres)'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='new-password'
        />

        <button type='submit' disabled={auth.loading} className='auth-btn-primary'>
          {auth.loading
            ? <span className='flex items-center justify-center gap-2'><Spinner /> Creando cuenta…</span>
            : 'Crear cuenta'}
        </button>
      </form>

      <AuthDivider />

      <GoogleButton onClick={auth.authWithGoogle} loading={auth.loading} />

      {/* Switch a Login */}
      <div className='auth-switch-link'>
        ¿Ya tienes cuenta?{' '}
        <button type='button' onClick={onFlip} className='auth-switch-btn'>
          ← Iniciar sesión
        </button>
      </div>
    </div>
  )
}

export default SignupForm