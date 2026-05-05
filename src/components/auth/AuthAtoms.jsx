/**
 * AuthAtoms.jsx
 * Átomos reutilizables entre LoginForm y SignupForm:
 * - AuthField (input con ícono)
 * - AuthError
 * - AuthDivider
 * - GoogleButton
 * - Spinner
 */

import SVGGoogleIcon from '../SVG/GoogleIcon.jsx'

/* ── Spinner ── */
export const Spinner = () => <span className='auth-spinner' aria-hidden='true' />

/* ── Error ── */
export const AuthError = ({ message }) =>
  message ? (
    <div className='auth-error' role='alert'>
      <svg width='15' height='15' viewBox='0 0 24 24' fill='none'
        stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'>
        <circle cx='12' cy='12' r='10'/>
        <line x1='12' y1='8' x2='12' y2='12'/>
        <circle cx='12' cy='16' r='0.5' fill='currentColor'/>
      </svg>
      {message}
    </div>
  ) : null

/* ── Divider "o" ── */
export const AuthDivider = () => (
  <div className='auth-divider'>
    <span>o continúa con</span>
  </div>
)

/* ── Google button ── */
export const GoogleButton = ({ onClick, loading }) => (
  <button
    type='button'
    onClick={onClick}
    disabled={loading}
    className='auth-btn-google'
  >
    {loading ? <Spinner /> : <SVGGoogleIcon />}
    <span>{loading ? 'Cargando…' : 'Continuar con Google'}</span>
  </button>
)

/* ── Field with icon ── */
const ICONS = {
  email: (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <rect x='2' y='4' width='20' height='16' rx='2'/>
      <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'/>
    </svg>
  ),
  password: (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <rect x='3' y='11' width='18' height='11' rx='2' ry='2'/>
      <path d='M7 11V7a5 5 0 0 1 10 0v4'/>
    </svg>
  ),
  text: (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/>
      <circle cx='12' cy='7' r='4'/>
    </svg>
  ),
}

export const AuthField = ({ type = 'text', icon = 'text', placeholder, value, onChange, autoComplete }) => (
  <div className='auth-field'>
    <span className='auth-input-icon'>{ICONS[icon] ?? ICONS.text}</span>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      className='auth-input'
    />
  </div>
)