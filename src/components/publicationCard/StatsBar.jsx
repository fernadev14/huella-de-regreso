/**
 * StatsBar.jsx
 * Barra informativa debajo de los filtros que muestra:
 * - Total de resultados visibles
 * - Conteo de perdidos vs encontrados
 * - Tiempo de la última actualización
 */

const StatsBar = ({ reports, loading }) => {
  if (loading) return null

  const total      = reports.length
  const perdidos   = reports.filter(r => ['perdida','perdido'].includes(r.estado?.toLowerCase())).length
  const encontrados = reports.filter(r => ['encontrada','encontrado'].includes(r.estado?.toLowerCase())).length

  return (
    <div className='flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 mb-6 py-3 border-y border-gray-100'>
      <span className='font-medium text-gray-700'>
        {total === 0 ? 'Sin resultados' : `${total} resultado${total !== 1 ? 's' : ''}`}
      </span>

      {total > 0 && (
        <>
          <span className='flex items-center gap-1.5'>
            <span className='inline-block w-2 h-2 rounded-full bg-red-400'/>
            {perdidos} perdid{perdidos === 1 ? 'o' : 'os'}
          </span>
          <span className='flex items-center gap-1.5'>
            <span className='inline-block w-2 h-2 rounded-full bg-emerald-400'/>
            {encontrados} encontrad{encontrados === 1 ? 'o' : 'os'}
          </span>
        </>
      )}

      {/* Timestamp */}
      <span className='ml-auto flex items-center gap-1 text-xs text-gray-400'>
        <svg className='w-3.5 h-3.5' viewBox='0 0 24 24' fill='none'
          stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
          <circle cx='12' cy='12' r='10'/>
          <polyline points='12 6 12 12 16 14'/>
        </svg>
        Actualizado en tiempo real
      </span>
    </div>
  )
}

export default StatsBar