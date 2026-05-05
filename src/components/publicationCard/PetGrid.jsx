import { lazy, Suspense } from 'react'
import { SkeletonGrid } from './PetCardSkeleton'

const PetCard = lazy(() => import('./PetCard'))

/* ─── Empty state ─── */
const EmptyState = ({ hasFilters }) => (
  <div className='col-span-full flex flex-col items-center justify-center py-24 gap-4 text-center'>
    <div className='w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center'>
      <svg className='w-10 h-10 text-amber-300' viewBox='0 0 24 24' fill='none'
        stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'>
        <circle cx='11' cy='11' r='8'/>
        <path d='m21 21-4.35-4.35'/>
        <path d='M8 11h6M11 8v6'/>
      </svg>
    </div>
    <div>
      <p className='text-gray-800 font-semibold text-lg'>No se encontraron publicaciones</p>
      <p className='text-gray-400 text-sm mt-1'>
        {hasFilters
          ? 'Intenta ajustar o limpiar los filtros activos.'
          : 'Aún no hay reportes publicados.'}
      </p>
    </div>
  </div>
)

/**
 * PetGrid
 * Props:
 *   reports    — array de reportes filtrados
 *   loading    — carga inicial
 *   hasMore    — hay más páginas
 *   loadingMore— cargando página siguiente
 *   loadMore   — fn para cargar más
 *   hasFilters — hay filtros activos (para mensaje empty state)
 *   onSelect   — fn(report) al hacer clic
 */
const PetGrid = ({ reports, loading, hasMore, loadingMore, loadMore, hasFilters, onSelect }) => {
  if (loading) return <SkeletonGrid count={9} />

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {reports.length === 0
          ? <EmptyState hasFilters={hasFilters} />
          : reports.map(r => (
              <Suspense key={r.id} fallback={<div className='h-80 rounded-2xl bg-gray-100 animate-pulse' />}>
                <PetCard report={r} onClick={() => onSelect(r)} />
              </Suspense>
            ))
        }
      </div>

      {/* Load more */}
      {hasMore && (
        <div className='mt-10 text-center'>
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className='
              inline-flex items-center gap-2
              px-6 py-3 bg-amber-400 hover:bg-amber-500
              text-white font-semibold text-sm rounded-2xl shadow-sm
              disabled:opacity-60 disabled:cursor-not-allowed
              transition-all duration-200
            '
          >
            {loadingMore ? (
              <>
                <svg className='w-4 h-4 animate-spin' viewBox='0 0 24 24' fill='none'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'/>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z'/>
                </svg>
                Cargando…
              </>
            ) : 'Cargar más publicaciones'}
          </button>
        </div>
      )}
    </>
  )
}

export default PetGrid