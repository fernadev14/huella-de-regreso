import { Link } from 'react-router-dom'

const BADGE = {
  perdida:    'bg-red-50 text-red-600 ring-1 ring-red-200',
  encontrada: 'bg-green-50 text-green-600 ring-1 ring-green-200',
}

const BADGE_DOT = {
  perdida:    'bg-red-400',
  encontrada: 'bg-green-400',
}

const ReportCard = ({ r, activeId, setActiveId, isTouchRef, onDelete, onView }) => {
  const estado = r.estado?.trim().toLowerCase() || ''
  const badgeCls = BADGE[estado] || 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200'
  const dotCls   = BADGE_DOT[estado] || 'bg-yellow-400'
  const location = [r.city, r.barrio].filter(Boolean).join(' · ')

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer">

      {/* Imagen */}
      <div
        className="relative h-52 overflow-hidden"
        onClick={(e) => {
          if (isTouchRef.current) {
            const tag = e.target.tagName.toLowerCase()
            if (['button', 'a'].includes(tag)) return
            setActiveId(prev => prev === r.id ? null : r.id)
          } else {
            onView(r)
          }
        }}
      >
        {r.photoURLs?.[0]
          ? <img
              src={r.photoURLs[0]}
              alt={r.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          : <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-300 gap-2">
              <span className="text-4xl">🐾</span>
              <span className="text-xs">Sin imagen</span>
            </div>
        }

        {/* Overlay de acciones */}
        <div className={`
          absolute inset-0 bg-black/40 backdrop-blur-[1px]
          flex items-center justify-center gap-2
          transition-opacity duration-200
          md:opacity-0 md:group-hover:opacity-100
          ${activeId === r.id ? 'opacity-100' : 'opacity-0'}
        `}>
          <button
            onClick={(e) => { e.stopPropagation(); onView(r) }}
            className="bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-xl hover:bg-yellow-400 transition-colors"
          >
            Ver
          </button>
          <Link
            to={`/editar-reporte/${r.id}`}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FFD54F] text-gray-900 text-xs font-bold px-4 py-2 rounded-xl hover:bg-yellow-300 transition-colors"
          >
            Editar
          </Link>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(r.id) }}
            className="bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-red-600 transition-colors"
          >
            Eliminar
          </button>
        </div>

        {/* Badge de estado flotante */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/90 ${badgeCls}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotCls}`} />
            {r.estado}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-3">
        <h3 className="font-bold text-gray-900 text-base leading-tight truncate">
          {r.title || 'Sin nombre'}
        </h3>
        {location && (
          <p className="text-xs text-gray-400 mt-0.5 truncate flex items-center gap-1">
            <span>📍</span>{location}
          </p>
        )}
      </div>
    </article>
  )
}

export default ReportCard