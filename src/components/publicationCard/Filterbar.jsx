import { useState } from 'react'
import locationsData from '../../data/colombia-municipios.json'

const ESTADOS = ['perdida', 'encontrada']

const selectCls = `
  appearance-none bg-white border border-gray-200 text-gray-700 text-sm
  px-4 py-2.5 pr-8 rounded-xl shadow-sm cursor-pointer
  focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
  transition-all duration-200 hover:border-amber-300
`

const ChevronDown = () => (
  <svg className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500'
    viewBox='0 0 20 20' fill='currentColor'>
    <path fillRule='evenodd'
      d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z'
      clipRule='evenodd' />
  </svg>
)

const SelectWrapper = ({ children }) => (
  <div className='relative'>{children}<ChevronDown /></div>
)

/**
 * FilterBar
 * Props:
 *   departmentFilter, cityFilter, barrioFilter, estadoFilter  — valores actuales
 *   setDepartmentFilter, setCityFilter, setBarrioFilter, setEstadoFilter — setters
 *   barrios — array de barrios derivado de los reportes cargados
 */
const FilterBar = ({
  departmentFilter, setDepartmentFilter,
  cityFilter,       setCityFilter,
  barrioFilter,     setBarrioFilter,
  estadoFilter,     setEstadoFilter,
  barrios = [],
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const departments = locationsData.map(d => d.departamento)
  const cities = departmentFilter
    ? (locationsData.find(d => d.departamento === departmentFilter)?.ciudades ?? [])
    : []

  const activeCount = [departmentFilter, cityFilter, barrioFilter, estadoFilter].filter(Boolean).length

  const clearAll = () => {
    setDepartmentFilter('')
    setCityFilter('')
    setBarrioFilter('')
    setEstadoFilter('')
  }

  const onDeptChange = (e) => {
    setDepartmentFilter(e.target.value)
    setCityFilter('')
  }

  /* ─── Shared filter selects ─── */
  const FilterSelects = () => (
    <>
      <SelectWrapper>
        <select value={departmentFilter} onChange={onDeptChange} className={selectCls}>
          <option value=''>Departamento</option>
          {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
        </select>
      </SelectWrapper>

      <SelectWrapper>
        <select value={cityFilter} onChange={e => setCityFilter(e.target.value)}
          disabled={!departmentFilter} className={selectCls + (!departmentFilter ? ' opacity-50 cursor-not-allowed' : '')}>
          <option value=''>Ciudad</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </SelectWrapper>

      <SelectWrapper>
        <select value={barrioFilter} onChange={e => setBarrioFilter(e.target.value)} className={selectCls}>
          <option value=''>Barrio</option>
          {barrios.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </SelectWrapper>

      <SelectWrapper>
        <select value={estadoFilter} onChange={e => setEstadoFilter(e.target.value)} className={selectCls}>
          <option value=''>Estado</option>
          {ESTADOS.map(s => (
            <option key={s} value={s} className='capitalize'>{s}</option>
          ))}
        </select>
      </SelectWrapper>
    </>
  )

  return (
    <div className='w-full'>
      {/* ── DESKTOP ── */}
      <div className='hidden md:flex items-center gap-3 flex-wrap'>
        <span className='text-sm font-semibold text-gray-600 mr-1 flex items-center gap-1.5'>
          <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor'
            strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' />
          </svg>
          Filtros
        </span>

        <FilterSelects />

        {activeCount > 0 && (
          <button onClick={clearAll}
            className='flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all duration-200'>
            <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'>
              <path d='M18 6 6 18M6 6l12 12' />
            </svg>
            Limpiar ({activeCount})
          </button>
        )}
      </div>

      {/* ── MÓVIL ── */}
      <div className='md:hidden'>
        <button
          type='button'
          onClick={() => setMobileOpen(o => !o)}
          className='w-full flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm'
          aria-expanded={mobileOpen}
        >
          <span className='flex items-center gap-2 text-sm font-semibold text-gray-700'>
            <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor'
              strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' />
            </svg>
            Filtros
            {activeCount > 0 && (
              <span className='bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded-full'>
                {activeCount}
              </span>
            )}
          </span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${mobileOpen ? 'rotate-180' : ''}`}
            viewBox='0 0 20 20' fill='currentColor'>
            <path fillRule='evenodd'
              d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z'
              clipRule='evenodd' />
          </svg>
        </button>

        {/* Panel animado */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
          <div className='bg-white border border-gray-200 rounded-2xl p-4 shadow-sm grid grid-cols-1 gap-3'>
            <FilterSelects />
            {activeCount > 0 && (
              <button onClick={clearAll}
                className='w-full py-2 text-sm text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-all'>
                Limpiar filtros ({activeCount})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar