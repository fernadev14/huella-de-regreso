import { useEffect, useState, useRef } from 'react'
import { collection, onSnapshot, query, orderBy, where, limit, startAfter, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
import "../styles/responsive.css";
import locationsData from '../data/colombia-municipios.json'

// SVG
import LocationSVG from '../components/SVG/Location';
import CardIcon from '../components/SVG/CardIcon';
import PhoneIcon from '../components/SVG/PhoneIcon';


const Publicaciones = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Carousel
  const [selected, setSelected] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const carouselRef = useRef(null)
  const isHovering = useRef(false)
  


  // filtros
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const [barrioFilter, setBarrioFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [pageSize] = useState(9)
  const [lastDoc, setLastDoc] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const unsubscribeRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    // desactivar la búsqueda por entrada
    const t = setTimeout(() => setDebouncedSearch(searchQuery.trim().toLowerCase()), 300)
    return () => clearTimeout(t)
  }, [searchQuery])

  useEffect(() => {
    // limpiar suscripción anterior
    if (unsubscribeRef.current) {
      try { unsubscribeRef.current() } catch (e) {}
      unsubscribeRef.current = null
    }

    setLoading(true)
    setError(null)

    try {
      const constraints = []
      // Añadir filtros como cláusulas «where».
      if (departmentFilter) constraints.push(where('department', '==', departmentFilter))
      if (cityFilter) constraints.push(where('city', '==', cityFilter))
      if (estadoFilter) constraints.push(where('estado', '==', estadoFilter))
      if (barrioFilter) constraints.push(where('barrio', '==', barrioFilter))

      // orden y límite
      constraints.push(orderBy('createdAt', 'desc'))
      constraints.push(limit(pageSize))

      const q = query(collection(db, 'pets'), ...constraints)
      const unsub = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
        setReports(items)
        setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null)
        setHasMore(snapshot.docs.length === pageSize)
        setLoading(false)
      }, (err) => {
        console.error(err)
        setError('Error cargando publicaciones')
        setLoading(false)
      })

      unsubscribeRef.current = unsub
      return () => {
        try { unsub() } catch (e) {}
      }
    } catch (err) {
      console.error(err)
      setError('Error inicializando feed')
      setLoading(false)
    }
  }, [departmentFilter, cityFilter, barrioFilter, estadoFilter, pageSize])

  // AUTOMOVIMIENTO CAROUSEL
  useEffect(() => {
    if (!selected?.photoURLs?.length) return

    const interval = setInterval(() => {
      if (isHovering.current) return

      setSelectedIndex(prev =>
        prev === selected.photoURLs.length - 1 ? 0 : prev + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [selected])

  useEffect(() => {
    if (!carouselRef.current) return
    const width = 112 + 8
    carouselRef.current.style.transform = `translateX(-${selectedIndex * width}px)`
  }, [selectedIndex])



  const departments = locationsData.map(d => d.departamento)

  const getCitiesByDepartment = (dept) => {
    const found = locationsData.find(d => d.departamento === dept)
    return found ? found.ciudades : []
  }


  const loadMore = async () => {
    if (!lastDoc) return
    try {
      const constraints = []
      if (departmentFilter) constraints.push(where('department', '==', departmentFilter))
      if (cityFilter) constraints.push(where('city', '==', cityFilter))
      if (barrioFilter) constraints.push(where('barrio', '==', barrioFilter))
      if (estadoFilter) constraints.push(where('estado', '==', estadoFilter))
      constraints.push(orderBy('createdAt', 'desc'))
      constraints.push(startAfter(lastDoc))
      constraints.push(limit(pageSize))

      const q = query(collection(db, 'pets'), ...constraints)
      const snap = await getDocs(q)
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setReports(prev => [...prev, ...items])
      setLastDoc(snap.docs[snap.docs.length - 1] || null)
      setHasMore(snap.docs.length === pageSize)
    } catch (err) {
      console.error('Error loading more:', err)
      setError('Error cargando más publicaciones')
    }
  }

  // Derivar opciones de filtro
  const barrios = Array.from(new Set(reports.map(r => r.barrio).filter(Boolean)))
  const estados = ['perdida', 'encontrada']

  const filtered = reports.filter(r => {
    if (cityFilter && r.city !== cityFilter) return false
    if (barrioFilter && r.barrio !== barrioFilter) return false
    if (estadoFilter && r.estado !== estadoFilter) return false
    
    // Búsqueda por título, ciudad, barrio y descripción desde el lado del cliente.
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase()
      const matchesSearch = 
        (r.title && r.title.toLowerCase().includes(searchLower)) ||
        (r.city && r.city.toLowerCase().includes(searchLower)) ||
        (r.barrio && r.barrio.toLowerCase().includes(searchLower)) ||
        (r.description && r.description.toLowerCase().includes(searchLower))
      if (!matchesSearch) return false
    }
    
    return true
  })

// Color according to status "lost" or "found"
const estadoBadge = (estado = "") => {
  const e = estado.trim().toLowerCase();
  if (e === "perdida" || e === "perdido")
    return "bg-red-100 text-red-800 ring-1 ring-red-200";
  if (e === "encontrada" || e === "encontrado")
    return "bg-green-100 text-green-800 ring-1 ring-green-200";
  return "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200"; // fallback
};


  return (
    <div className='min-h-screen bg-gray-100 py-12'>
      <div className='max-w-6xl mx-auto px-4'>
        <h1 className='text-3xl font-bold mb-6'>Publicaciones</h1>
        
        <div className='container-search'>
            {/* Entrada de búsqueda */}
            <div className='mb-6'>
            <input 
                type='text' 
                placeholder='Buscar por nombre, ciudad, barrio o descripción...' 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-yellow-400'
            />
            </div>
            
            {/* FILTROS ESCRITORIO */}
            <div className='container-filter-desktop flex gap-3 mb-6 items-center'>
            <div className='flex items-center gap-2'>
                <span className='font-semibold mr-2'>Filtros</span>
                <select
                  value={departmentFilter}
                  onChange={(e) => {
                    setDepartmentFilter(e.target.value)
                    setCityFilter('')
                  }}
                  className='bg-[#FFD54F] text-[#333] px-4 py-2 rounded-full shadow'
                >
                  <option value=''>Departamento</option>
                  {departments.map(dep => (
                    <option key={dep} value={dep}>{dep}</option>
                  ))}
                </select>

                <select
                  value={cityFilter}
                  onChange={(e)=>setCityFilter(e.target.value)}
                  disabled={!departmentFilter}
                  className='bg-[#FFD54F] text-[#333] px-4 py-2 rounded-full shadow'
                >
                  <option value=''>Ciudad</option>
                  {getCitiesByDepartment(departmentFilter).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
            </div>

            <select value={barrioFilter} onChange={(e)=>setBarrioFilter(e.target.value)} className='bg-[#FFD54F] text-[#333] px-4 py-2 rounded-full shadow'>
                <option value=''>Barrio</option>
                {barrios.map(b => <option key={b} value={b}>{b}</option>)}
            </select>

            <select value={estadoFilter} onChange={(e)=>setEstadoFilter(e.target.value)} className='bg-[#FFD54F] text-[#333] px-4 py-2 rounded-full shadow'>
                <option value=''>Estado</option>
                {estados.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <button onClick={()=>{
                  setDepartmentFilter(''), 
                  setCityFilter(''); 
                  setBarrioFilter(''); 
                  setEstadoFilter('')
                }} 
              className='px-3 py-2 rounded border cursor-pointer hover:bg-amber-950 hover:text-amber-50 transition-all duration-300'>
                Limpiar
            </button>
            </div>

            {/* ============ FILTROS MÓVIL ============ */}
            <div className='container-filter-mobile mb-6'>
                {/* Trigger compacto */}
                <button
                    type='button'
                    className='w-full flex items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2'
                    onClick={()=>setMobileFiltersOpen(o => !o)}
                    aria-expanded={mobileFiltersOpen}
                    aria-controls='mobile-filters-panel'
                >
                    <span className='font-semibold'>Filtros</span>
                    {/* icono embudo + chevron */}
                    <span className='flex items-center gap-2'>
                    {/* Embudo */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {/* Chevron */}
                    <svg className={`h-5 w-5 transition-transform ${mobileFiltersOpen ? 'rotate-90' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.293 2.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L11.586 10 6.293 4.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                    </span>
                </button>

                {/* Panel con animación */}
                <div
                    id='mobile-filters-panel'
                    className={`mobile-filters-panel ${mobileFiltersOpen ? 'open' : ''}`}
                >
                    <div className='grid grid-cols-1 gap-3'>
                    <select
                      value={departmentFilter}
                      onChange={(e) => {
                        setDepartmentFilter(e.target.value)
                        setCityFilter('')
                      }}
                      className='bg-[#FFD54F] text-[#333] px-4 py-2 rounded-full shadow'
                    >
                      <option value=''>Departamento</option>
                      {departments.map(dep => (
                        <option key={dep} value={dep}>{dep}</option>
                      ))}
                    </select>
                    
                    <select
                      value={cityFilter}
                      onChange={(e)=>setCityFilter(e.target.value)}
                      disabled={!departmentFilter}
                      className='bg-[#FFD54F] text-[#333] px-4 py-2 rounded-full shadow'
                    >
                      <option value=''>Ciudad</option>
                      {getCitiesByDepartment(departmentFilter).map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>

                    <select value={barrioFilter} onChange={(e)=>setBarrioFilter(e.target.value)} className='bg-[#FFD54F] text-[#333] px-4 py-2 rounded-full shadow w-full'>
                        <option value=''>Barrio</option>
                        {barrios.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>

                    <select value={estadoFilter} onChange={(e)=>setEstadoFilter(e.target.value)} className='bg-[#FFD54F] text-[#333] px-4 py-2 rounded-full shadow w-full'>
                        <option value=''>Estado</option>
                        {estados.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>

                    <button
                        onClick={()=>{setDepartmentFilter(''), setCityFilter(''); setBarrioFilter(''); setEstadoFilter('')}}
                        className='px-3 py-2 rounded border w-full'
                    >
                        Limpiar
                    </button>
                    </div>
                </div>
            </div>
        </div>

        {loading && <div>Cargando publicaciones...</div>}
        {error && <div className='text-red-600'>{error}</div>}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {filtered.map(r => (
            <div key={r.id} className='bg-white rounded shadow p-3 cursor-pointer' onClick={()=>setSelected(r)}>
              <div className='h-48 w-full overflow-hidden rounded mb-3 bg-gray-200 flex items-center justify-center'>
                {r.photoURLs && r.photoURLs[0] ? (
                  <img src={r.photoURLs[0]} alt={r.title} className='h-full w-full object-cover'/>
                ) : (
                  <div className='text-gray-400'>Sin imagen</div>
                )}
              </div>
              <h3 className='font-bold'>{r.title}</h3>
              <p className='text-sm text-gray-600'>{r.city} {r.barrio ? `· ${r.barrio}` : ''}</p>
              <p className={`text-xs mt-2 inline-block px-2 py-1 rounded font-semibold ${estadoBadge(r.estado)}`}>
                {r.estado}
              </p>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className='mt-6 text-center'>
            <button onClick={loadMore} className='px-4 py-2 bg-[#FFD54F] rounded shadow'>Cargar más</button>
          </div>
        )}

        {/* Modal */}
        {selected && (
          <div className='fixed inset-0 bg-[#000000c4] flex items-center justify-center z-50 p-4'>
            <div className='container-modal bg-[#f9f9f9] w-full max-w-4xl p-6 rounded-lg shadow-lg overflow-auto'>
              <div className='flex justify-between items-start mb-4'>
                <h2 className='text-2xl font-bold'>{selected.title}</h2>
                <button 
                    onClick={()=>{ setSelected(null); setSelectedIndex(0) }} 
                    className='text-amber-50 bg-red-800 px-4 py-2 rounded-md cursor-pointer'>
                  Cerrar ✕
                </button>
              </div>

              <div className='container-modal-all md:flex md:gap-6'>
                <div className='image-container md:w-2/3'>
                  <div className='div-photo-first relative'>
                    <div className='first-image-large h-96 bg-gray-100 rounded overflow-hidden flex items-center justify-center'>
                      {selected.photoURLs && selected.photoURLs.length ? (
                        <img src={selected.photoURLs[selectedIndex]} alt='' className='w-full h-full object-cover' />
                      ) : (
                        <div className='text-gray-400'>No hay imagenes para mostrar</div>
                      )}
                    </div>

                    {selected.photoURLs && selected.photoURLs.length > 1 && (
                      <>
                        <button onClick={()=>setSelectedIndex((i)=> Math.max(0, i-1))} className='absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow'>◀</button>
                        <button onClick={()=>setSelectedIndex((i)=> Math.min(selected.photoURLs.length-1, i+1))} className='absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow'>▶</button>
                      </>
                    )}
                  </div>

                  {/* thumbnails */}
                  <div className='thumbnails flex gap-2 mt-3 overflow-x-auto'>
                    {(selected.photoURLs || []).map((u, i) => (
                      <button key={i} onClick={()=>setSelectedIndex(i)} className={`btn-image-thumbnails h-20 w-28 rounded overflow-hidden border ${i===selectedIndex? 'border-yellow-400':'border-transparent'}`}>
                        <img src={u} className='h-full w-full object-cover' alt={`thumb-${i}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className='div-description md:w-1/3 mt-4 md:mt-0 bg-[#ffffff] p-5 rounded-lg shadow-lg'>
                  <p className='estado-modal mb-2'>
                    <span className={`inline-block px-2 py-1 rounded font-semibold ${estadoBadge(selected.estado)}`}>
                      {selected.estado}
                    </span>
                  </p>
                  <p className='mb-4 flex items-center'>
                    <LocationSVG />
                    <strong className='description-title mr-1'>
                      Ubicación:
                    </strong> {selected.city}{selected.barrio ? `, ${selected.barrio}` : ''}
                  </p>
                  <div className='flex'>
                    <CardIcon />
                    <strong className='description-title mr-2'>
                      Descripción:
                    </strong>
                  </div>
                  <p className='mb-4 -mt-5 ml-8 text-md'>
                    <br/>{selected.description}
                    </p>
                  <p className='mb-4 flex'>
                    <PhoneIcon />
                    <strong className='description-title mr-2'>Contacto:</strong> {selected.contact}
                  </p>

                  <hr className='mt-10 text-gray-300'/>

                  {/* CAROUSEL */}
                  <div
                    className="thumbnails overflow-hidden mt-3"
                    onMouseEnter={() => (isHovering.current = true)}
                    onMouseLeave={() => (isHovering.current = false)}
                  >
                    <div
                      ref={carouselRef}
                      className="flex gap-2 transition-transform duration-500 ease-in-out"
                    >
                      {(selected.photoURLs || []).map((u, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSelectedIndex(i)
                          }}
                          className={`h-20 w-28 shrink-0 rounded overflow-hidden border ${
                            i === selectedIndex ? "border-yellow-400" : "border-transparent"
                          }`}
                        >
                          <img src={u} className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center gap-2 mt-4">
                    {(selected.photoURLs || []).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedIndex(i)
                        }}
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                          i === selectedIndex
                            ? "bg-yellow-400 w-6"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Ir a imagen ${i + 1}`}
                      />
                    ))}
                  </div>
                  <p className='text-md text-gray-500 mt-6 w-full text-center'>Publicado por: {selected.authorName}</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Publicaciones
