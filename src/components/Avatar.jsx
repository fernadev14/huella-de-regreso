/**
 * Avatar.jsx — actualizado
 * Ahora usa la paleta amber de la app en lugar de blue-500.
 * Compatible con el diseño existente del Navbar y otras vistas.
 */

const SIZE_CLASSES = {
  xs:  'w-6 h-6 text-xs',
  sm:  'w-8 h-8 text-xs',
  md:  'w-10 h-10 text-sm',
  lg:  'w-16 h-16 text-2xl',
  xl:  'w-20 h-20 text-3xl',
}

const Avatar = ({ photoURL, firstName, lastName, size = 'md', className = '' }) => {
  const sizeClass = SIZE_CLASSES[size] ?? SIZE_CLASSES.md

  const initial =
    firstName?.charAt(0).toUpperCase() ||
    lastName?.charAt(0).toUpperCase()  || 'U'

  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt={`Avatar de ${firstName ?? 'usuario'}`}
        loading='lazy'
        className={`${sizeClass} rounded-full object-cover flex-shrink-0 ${className}`}
      />
    )
  }

  return (
    <div
      aria-label={`Iniciales de ${firstName ?? 'usuario'}`}
      className={`
        ${sizeClass} rounded-full flex-shrink-0
        bg-amber-400 text-gray-900
        flex items-center justify-center
        font-bold select-none
        ${className}
      `}
      style={{ fontFamily: "'Fraunces', serif" }}
    >
      {initial}
    </div>
  )
}

export default Avatar