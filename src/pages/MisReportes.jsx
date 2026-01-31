import { useEffect, useState, useContext, useRef } from 'react'
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import LocationSVG from '../components/SVG/Location';
import CardIcon from '../components/SVG/CardIcon';
import PhoneIcon from '../components/SVG/PhoneIcon';
import PlayIcon from '../components/SVG/PlayIcon';

const MisReportes = () => {
  const { user } = useContext(AuthContext)
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const unsubscribeRef = useRef(null)
  const [activeId, setActiveId] = useState(null);
  const isTouchRef = useRef(false);
  
  // Carousel
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const carouselRef = useRef(null)
  const isHovering = useRef(false)

  useEffect(() => {
    // true en móviles/tablets táctiles
    isTouchRef.current = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  }, []);

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const q = query(
        collection(db, 'pets'),
        where('authorUid', '==', user.uid)
      )

      const unsub = onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
        // ordenar por fecha descendente
        items.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        setReports(items)
        setLoading(false)
      }, (err) => {
        console.error(err)
        setError('Error cargando tus reportes')
        setLoading(false)
      })

      unsubscribeRef.current = unsub
      return () => {
        try { unsub() } catch (e) {}
      }
    } catch (err) {
      console.error(err)
      setError('Error inicializando tus reportes')
      setLoading(false)
    }
  }, [user])

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

  // MOVIMIENTO CAROUSEL MINIATURA
  useEffect(() => {
    if (!carouselRef.current) return
    const width = 112 + 8
    carouselRef.current.style.transform = `translateX(-${selectedIndex * width}px)`
  }, [selectedIndex])

  const handleDelete = async (reportId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este reporte?')) {
      return
    }

    try {
      await deleteDoc(doc(db, 'pets', reportId))
      setReports(prev => prev.filter(r => r.id !== reportId))
      setSelected(null)
    } catch (err) {
      console.error('Error al eliminar:', err)
      setError('Error al eliminar el reporte')
    }
  }

  const estadoBadge = (estado = "") => {
    const e = estado.trim().toLowerCase()
    if (e === "perdida" || e === "perdido")
      return "bg-red-100 text-red-800 ring-1 ring-red-200"
    if (e === "encontrada" || e === "encontrado")
      return "bg-green-100 text-green-800 ring-1 ring-green-200"
    return "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200"
  }

  if (!user) {
    return (
      <div className='min-h-screen bg-gray-100 py-12 flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-xl mb-4'>Debes iniciar sesión para ver tus reportes</p>
          <Link to="/login" className='bg-[#FFD54F] text-[#333] px-6 py-2 rounded-lg'>
            Iniciar Sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-100 py-12'>
      <div className='max-w-6xl mx-auto px-4'>
        <h1 className='text-3xl font-bold mb-6'>Mis Reportes</h1>

        {loading && <div className='text-center py-8'>Cargando tus reportes...</div>}
        {error && <div className='text-red-600 mb-4'>{error}</div>}

        {!loading && reports.length === 0 && (
          <div className='bg-white rounded shadow p-8 text-center'>
            <p className='text-gray-600 mb-4'>No tienes reportes aún</p>
            <Link to="/nuevo-reporte" className='bg-[#FFD54F] text-[#333] px-6 py-2 rounded-lg'>
              Crear Reporte
            </Link>
          </div>
        )}

        <div 
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
            onClick={() => { if (isTouchRef.current && activeId) setActiveId(null); }}
        >
          {reports.map(r => (
            <div key={r.id} className='bg-white rounded shadow p-3 cursor-pointer hover:shadow-lg transition'>
              <div 
                    className='h-48 w-full overflow-hidden rounded mb-3 bg-gray-200 flex items-center 
                    justify-center relative group select-none'
                    onClick={(e) => {
                      // solo togglear en táctiles para no romper el click de desktop
                      if (isTouchRef.current) {
                        // si ya hay overlay abierto y el click vino desde un botón, no cierres
                        const tag = (e.target.tagName || '').toLowerCase();
                        if (['button','a'].includes(tag)) return;
                        setActiveId(prev => (prev === r.id ? null : r.id));
                      }
                    }}
              >
                {r.photoURLs && r.photoURLs[0] ? (
                  <img src={r.photoURLs[0]} alt={r.title} className='h-full w-full object-cover' />
                ) : (
                  <div className='text-gray-400'>Sin imagen</div>
                )}

                {/* Overlay con botones - visible en móvil, con hover en desktop */}
                <div 
                    className={[
                      "absolute inset-0 flex items-center justify-center gap-2 transition",
                      // Desktop: aparece con hover
                      "md:opacity-0 md:group-hover:opacity-100",
                      "md:group-hover:bg-white/20 md:group-hover:backdrop-blur-sm md:group-hover:backdrop-saturate-150",
                      // Móviles: aparece si activeId === r.id
                      (activeId === r.id) ? "opacity-100 backdrop-blur-sm backdrop-saturate-150 bg-white/20" : "opacity-0",
                      // Para que los botones reciban eventos solo cuando visible en móvil
                      (activeId === r.id) ? "pointer-events-auto" : "pointer-events-none md:pointer-events-auto",
                    ].join(' ')}
                    onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelected(r)}
                    className='bg-blue-500/90 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm shadow cursor-pointer'
                  >
                    Ver
                  </button>
                  <Link
                    to={`/editar-reporte/${r.id}`}
                    className='bg-yellow-500/90 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm shadow'
                  >
                    Editar
                  </Link>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(r.id); }}
                    className='bg-red-500/90 hover:bg-red-600 text-white px-3 py-2 rounded text-sm shadow cursor-pointer'
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              <h3 className='font-bold'>{r.title}</h3>
              <p className='text-sm text-gray-600'>{r.city} {r.barrio ? `· ${r.barrio}` : ''}</p>
              <p className={`text-xs mt-2 inline-block px-2 py-1 rounded font-semibold ${estadoBadge(r.estado)}`}>
                {r.estado}
              </p>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <div className='fixed inset-0 bg-[#00000082] flex items-center justify-center z-50 p-4'>
            <div className='bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg overflow-auto max-h-[90vh]'>
              <div className='flex justify-between items-start mb-4'>
                <h2 className='text-2xl font-bold'>{selected.title}</h2>
                <button onClick={() => { setSelected(null); setSelectedIndex(0) }} className='text-amber-50 bg-red-800 px-4 py-2 rounded-md cursor-pointer'>
                  Cerrar ✕
                </button>
              </div>

              <div className='md:flex md:gap-6'>
                <div className='md:w-2/3'>
                  <div className='relative'>
                    <div className='h-96 bg-gray-100 rounded overflow-hidden flex items-center justify-center'>
                      {selected.photoURLs && selected.photoURLs.length ? (
                        <img src={selected.photoURLs[selectedIndex]} alt='' className='w-full h-full object-cover' />
                      ) : (
                        <div className='text-gray-400'>No image</div>
                      )}
                    </div>

                    {selected.photoURLs && selected.photoURLs.length > 1 && (
                      <>
                      <button onClick={()=>setSelectedIndex((i)=> Math.max(0, i-1))} className='absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow cursor-pointer hover:scale-110 duration-300'> <PlayIcon /> </button>
                        <button onClick={()=>setSelectedIndex((i)=> Math.min(selected.photoURLs.length-1, i+1))} className='absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow cursor-pointer hover:scale-110 duration-300'><PlayIcon className="rotate-180"/></button>
                        
                      </>
                    )}
                  </div>

                  {/* miniaturas */}
                  {/* <div className='flex gap-2 mt-3 overflow-x-auto'>
                    {(selected.photoURLs || []).map((u, i) => (
                      <button key={i} onClick={() => setSelectedIndex(i)} className={`h-20 w-28 rounded overflow-hidden border ${i === selectedIndex ? 'border-yellow-400' : 'border-transparent'}`}>
                        <img src={u} className='h-full w-full object-cover' alt={`thumb-${i}`} />
                      </button>
                    ))}
                  </div> */}
                </div>

                <div className='div-description md:w-1/3 mt-4 md:mt-0 bg-[#ffffff] p-5 rounded-lg shadow-lg'>
                  <p className='mb-2'>
                    <span className={`inline-block px-2 py-1 rounded font-semibold ${estadoBadge(selected.estado)}`}>
                      {selected.estado}
                    </span>
                  </p>
                  <p className='mb-2 flex'>
                    <LocationSVG />
                    <strong className='mr-2'>Ubicación:</strong> {selected.city}
                    {selected.barrio ? `, ${selected.barrio}` : ''}
                  </p>
                  <p className='mb-2 flex'>
                    <CardIcon />
                    <strong>Descripción:</strong>
                    <br />
                    {selected.description}
                  </p>
                  <p className='mb-2 flex'>
                    <PhoneIcon />
                    <strong className='mr-2'>Contacto:</strong> {selected.contact}
                  </p>

                  {/* Campos de encontrada */}
                  {selected.estado === 'encontrada' && (
                    <>
                      {selected.foundDate && (
                        <p className='mb-2'>
                          <strong>Fecha de hallazgo:</strong> {selected.foundDate}
                        </p>
                      )}
                      {selected.foundPlaceDetails && (
                        <p className='mb-2'>
                          <strong>Lugar de hallazgo:</strong> {selected.foundPlaceDetails}
                        </p>
                      )}
                      {selected.microchipped && (
                        <p className='mb-2'>
                          <strong>Microchip ID:</strong> {selected.chipId || 'No especificado'}
                        </p>
                      )}
                    </>
                  )}

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

                  {/* BUTTONS PUNTOS CAROUSEL */}
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

                  <div className='flex gap-2 mt-4'>
                    <Link
                      to={`/editar-reporte/${selected.id}`}
                      onClick={() => setSelected(null)}
                      className='flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-center'
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => {
                        handleDelete(selected.id)
                      }}
                      className='flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer'
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MisReportes
