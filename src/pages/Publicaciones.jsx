import { lazy, Suspense, useState, useMemo, useEffect } from 'react'
import { usePublicaciones } from '../components/publicationCard/Usepublicaciones'
import SearchBar  from '../components/publicationCard/SearchBar'
import FilterBar  from '../components/publicationCard/Filterbar'
import StatsBar   from '../components/publicationCard/StatsBar'
import PetGrid    from '../components/publicationCard/PetGrid'

// Modal con lazy load (componente pesado)
const ReportModal = lazy(() => import('../components/myReports/ReportModal'))

/* ─────────────────────────────────────────────
   Publicaciones — página principal
   ────────────────────────────────────────────*/
const Publicaciones = () => {
  /* Filtros Firestore */
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [cityFilter,       setCityFilter]       = useState('')
  const [barrioFilter,     setBarrioFilter]      = useState('')
  const [estadoFilter,     setEstadoFilter]      = useState('')

  /* Búsqueda client-side */
  const [searchQuery,    setSearchQuery]    = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  /* Modal */
  const [selected,      setSelected]      = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  /* Debounce búsqueda */
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery.trim().toLowerCase()), 300)
    return () => clearTimeout(t)
  }, [searchQuery])

  /* Datos */
  const { reports, loading, error, hasMore, loadingMore, loadMore } = usePublicaciones({
    departmentFilter,
    cityFilter,
    barrioFilter,
    estadoFilter,
  })

  /* Opciones de barrio derivadas de los reportes cargados */
  const barrios = useMemo(
    () => Array.from(new Set(reports.map(r => r.barrio).filter(Boolean))),
    [reports]
  )

  /* Filtrado client-side (búsqueda) */
  const filtered = useMemo(() => {
    if (!debouncedSearch) return reports
    return reports.filter(r => {
      const s = debouncedSearch
      return (
        r.title?.toLowerCase().includes(s)       ||
        r.city?.toLowerCase().includes(s)         ||
        r.barrio?.toLowerCase().includes(s)       ||
        r.description?.toLowerCase().includes(s)
      )
    })
  }, [reports, debouncedSearch])

  const hasFilters = !!(departmentFilter || cityFilter || barrioFilter || estadoFilter || debouncedSearch)

  return (
    <div className='min-h-screen bg-gray-50 mt-20'>
      {/* ── Hero / Header ── */}
      <div className='bg-white border-b border-gray-100'>
        <div className='max-w-6xl mx-auto px-4 py-10'>
          <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8'>
            <div>
              <h1 className='text-amber-500 text-3xl font-semibold uppercase tracking-widest mb-1'>
                Mascotas en Colombia
              </h1>
              {/* <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight'>
                Publicaciones
              </h1> */}
              <p className='text-gray-500 text-sm mt-1.5'>
                Reportes de mascotas perdidas y encontradas en tiempo real.
              </p>
            </div>

            {/* Indicador en tiempo real */}
            <div className='flex items-center gap-2 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 self-start sm:self-auto'>
              <span className='relative flex h-2.5 w-2.5'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'/>
                <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500'/>
              </span>
              En vivo
            </div>
          </div>

          {/* Búsqueda */}
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      {/* ── Contenido ── */}
      <div className='max-w-6xl mx-auto px-4 py-8'>

        {/* Filtros */}
        <div className='mb-6'>
          <FilterBar
            departmentFilter={departmentFilter} setDepartmentFilter={setDepartmentFilter}
            cityFilter={cityFilter}             setCityFilter={setCityFilter}
            barrioFilter={barrioFilter}         setBarrioFilter={setBarrioFilter}
            estadoFilter={estadoFilter}         setEstadoFilter={setEstadoFilter}
            barrios={barrios}
          />
        </div>

        {/* Error */}
        {error && (
          <div className='mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm'>
            <svg className='w-4 h-4 shrink-0' viewBox='0 0 24 24' fill='none'
              stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
              <circle cx='12' cy='12' r='10'/>
              <line x1='12' y1='8' x2='12' y2='12'/>
              <line x1='12' y1='16' x2='12.01' y2='16'/>
            </svg>
            {error}
          </div>
        )}

        {/* Stats */}
        <StatsBar reports={filtered} loading={loading} />

        {/* Grid */}
        <PetGrid
          reports={filtered}
          loading={loading}
          hasMore={hasMore}
          loadingMore={loadingMore}
          loadMore={loadMore}
          hasFilters={hasFilters}
          onSelect={(r) => { setSelected(r); setSelectedIndex(0) }}
        />
      </div>

      {/* Modal */}
      <Suspense fallback={null}>
        <ReportModal
          selected={selected}
          setSelected={setSelected}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          mode='public'
        />
      </Suspense>
    </div>
  )
}

export default Publicaciones