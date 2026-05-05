/**
 * SearchBar.jsx
 * Barra de búsqueda con ícono y estado visual de "buscando".
 */

const SearchBar = ({ value, onChange }) => (
  <div className='relative w-full'>
    {/* ícono lupa */}
    <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>
      <svg width='18' height='18' viewBox='0 0 24 24' fill='none'
        stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
        <circle cx='11' cy='11' r='8' />
        <path d='m21 21-4.35-4.35' />
      </svg>
    </span>

    <input
      type='text'
      placeholder='Buscar por nombre, ciudad, barrio o descripción…'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='
        w-full pl-11 pr-4 py-3
        bg-white border border-gray-200 rounded-2xl
        shadow-sm text-sm text-gray-800 placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
        transition-all duration-200
      '
    />

    {value && (
      <button
        onClick={() => onChange('')}
        className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
        aria-label='Limpiar búsqueda'
      >
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none'
          stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'>
          <path d='M18 6 6 18M6 6l12 12' />
        </svg>
      </button>
    )}
  </div>
)

export default SearchBar