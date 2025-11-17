const Avatar = ({ photoURL, firstName, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-2xl',
  }

  const getInitial = () => {
    return firstName?.charAt(0).toUpperCase() || 'U'
  }

  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt="Avatar"
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
    )
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-blue-500 text-white flex items-center justify-center font-bold`}
    >
      {getInitial()}
    </div>
  )
}

export default Avatar
