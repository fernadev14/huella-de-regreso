/**
 * PetCard.jsx
 * Tarjeta individual de reporte. Diseño moderno con:
 * - imagen con zoom en hover
 * - badge de estado con color semántico
 * - metadata accesible (ciudad, barrio, fecha)
 * - overlay de información al hacer hover
 */

const PLACEHOLDER_ICON = (
  <svg className='w-12 h-12 text-gray-300' viewBox='0 0 24 24' fill='none'
    stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5'/>
    <path d='M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5'/>
    <path d='M8 14v.5M16 14v.5'/>
    <path d='M11.25 16.25h1.5L12 17z'/>
    <path d='M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306'/>
  </svg>
)

const estadoBadge = (estado = '') => {
  const e = estado.trim().toLowerCase()
  if (e === 'perdida' || e === 'perdido')
    return { cls: 'bg-red-100 text-red-700 ring-1 ring-red-200', label: '🔴 Perdido' }
  if (e === 'encontrada' || e === 'encontrado')
    return { cls: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200', label: '🟢 Encontrado' }
  return { cls: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200', label: '🟡 ' + estado }
}

const formatDate = (ts) => {
  if (!ts) return null
  try {
    const date = ts?.toDate ? ts.toDate() : new Date(ts)
    return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return null
  }
}

const PetCard = ({ report, onClick }) => {
  const badge   = estadoBadge(report.estado)
  const dateStr = formatDate(report.createdAt)
  const img     = report.photoURLs?.[0]

  return (
    <article
      onClick={onClick}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      aria-label={`Ver reporte: ${report.title}`}
      className='
        group relative bg-white rounded-2xl overflow-hidden
        shadow-sm border border-gray-100
        cursor-pointer
        transition-all duration-300
        hover:shadow-lg hover:-translate-y-1 hover:border-amber-200
        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2
      '
    >
      {/* ── Imagen ── */}
      <div className='relative h-52 w-full overflow-hidden bg-gray-100'>
        {img ? (
          <>
            <img
              src={img}
              alt={report.title}
              loading='lazy'
              className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
            />
            {/* overlay sutil en hover */}
            <div className='absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </>
        ) : (
          <div className='flex h-full w-full flex-col items-center justify-center gap-2'>
            {PLACEHOLDER_ICON}
            <span className='text-xs text-gray-400'>Sin imagen</span>
          </div>
        )}

        {/* Badge de estado — esquina superior derecha */}
        <span className={`
          absolute top-3 right-3
          text-xs font-semibold px-2.5 py-1 rounded-full
          backdrop-blur-sm
          ${badge.cls}
        `}>
          {badge.label}
        </span>

        {/* Múltiples fotos indicator */}
        {report.photoURLs?.length > 1 && (
          <span className='absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm'>
            +{report.photoURLs.length - 1} fotos
          </span>
        )}
      </div>

      {/* ── Contenido ── */}
      <div className='p-4'>
        <h3 className='font-bold text-gray-900 text-base leading-snug mb-1 truncate'>
          {report.title || 'Sin título'}
        </h3>

        {/* Ubicación */}
        <div className='flex items-center gap-1.5 text-gray-500 text-sm mb-2'>
          <svg className='w-3.5 h-3.5 shrink-0 text-amber-400' viewBox='0 0 24 24'
            fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'>
            <path d='M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z'/>
            <circle cx='12' cy='10' r='3'/>
          </svg>
          <span className='truncate'>
            {[report.city, report.barrio].filter(Boolean).join(' · ') || 'Ubicación no especificada'}
          </span>
        </div>

        {/* Descripción (preview) */}
        {report.description && (
          <p className='text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3'>
            {report.description}
          </p>
        )}

        {/* Footer: fecha */}
        {dateStr && (
          <div className='flex items-center gap-1 text-gray-400 text-xs border-t border-gray-100 pt-2.5 mt-1'>
            <svg className='w-3.5 h-3.5' viewBox='0 0 24 24' fill='none'
              stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
              <rect x='3' y='4' width='18' height='18' rx='2' ry='2'/>
              <line x1='16' y1='2' x2='16' y2='6'/>
              <line x1='8' y1='2' x2='8' y2='6'/>
              <line x1='3' y1='10' x2='21' y2='10'/>
            </svg>
            <span>{dateStr}</span>
          </div>
        )}
      </div>
    </article>
  )
}

export default PetCard