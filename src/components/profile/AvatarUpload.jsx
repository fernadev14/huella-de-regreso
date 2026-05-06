import { useRef } from 'react'

const CameraIcon = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none'
    stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z'/>
    <circle cx='12' cy='13' r='4'/>
  </svg>
)

/**
 * AvatarUpload
 * Muestra la foto del usuario (o iniciales) con overlay de cámara al hover.
 *
 * Props:
 *   photoURL     — URL de la foto actual
 *   firstName    — para las iniciales si no hay foto
 *   uploading    — bool: mostrar spinner de carga
 *   onFileSelect — fn(File) llamado al seleccionar imagen
 *   disabled     — deshabilitar interacción
 */
const AvatarUpload = ({ photoURL, firstName = '', uploading = false, onFileSelect, disabled = false }) => {
  const inputRef = useRef(null)
  const initial  = firstName?.charAt(0).toUpperCase() || 'U'

  const handleClick = () => {
    if (!disabled && !uploading) inputRef.current?.click()
  }

  const handleChange = (e) => {
    const file = e.target.files?.[0]
    if (file) onFileSelect?.(file)
    // reset para permitir re-subir el mismo archivo
    e.target.value = ''
  }

  return (
    <div className='profile-avatar-wrap' onClick={handleClick} tabIndex={0}
      role='button' aria-label='Cambiar foto de perfil'
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* Imagen o iniciales */}
      {photoURL ? (
        <img src={photoURL} alt='Avatar' className='profile-avatar-img' />
      ) : (
        <div className='profile-avatar-initials'>{initial}</div>
      )}

      {/* Spinner de carga */}
      {uploading && <span className='profile-avatar-loading' />}

      {/* Overlay cámara */}
      {!uploading && !disabled && (
        <div className='profile-avatar-overlay'>
          <CameraIcon />
          <span>{photoURL ? 'Cambiar' : 'Subir'}</span>
        </div>
      )}

      {/* Input oculto */}
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        onChange={handleChange}
        className='hidden'
        disabled={disabled || uploading}
        aria-hidden='true'
      />
    </div>
  )
}

export default AvatarUpload