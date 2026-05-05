import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel from './Carousel'

const BADGE = {
  perdida:    'bg-red-50 text-red-600 ring-1 ring-red-200',
  encontrada: 'bg-green-50 text-green-600 ring-1 ring-green-200',
}

const InfoRow = ({ icon, label, value }) => {
  if (!value) return null
  return (
    <div className="flex gap-3">
      <span className="text-lg leading-none mt-0.5">{icon}</span>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm text-gray-800 mt-0.5 leading-relaxed">{value}</p>
      </div>
    </div>
  )
}

const ReportModal = ({ selected, setSelected, handleDelete, selectedIndex, setSelectedIndex }) => {
  const [closing, setClosing] = useState(false)

  const close = () => {
    setClosing(true)
    setTimeout(() => {
      setSelected(null)
      setClosing(false)
    }, 180)
  }

  // Cerrar con Escape
  useEffect(() => {
    if (!selected) return
    const handler = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selected])

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  if (!selected) return null

  const estado = selected.estado?.trim().toLowerCase() || ''
  const badgeCls = BADGE[estado] || 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200'
  const location = [selected.city, selected.barrio].filter(Boolean).join(', ')

  const overlayAnim = closing ? 'opacity-0' : 'opacity-100'
  const panelAnim   = closing ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${overlayAnim}`}
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={close}
    >
      <div
        className={`bg-white w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl transition-all duration-200 ${panelAnim}`}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900">
              {selected.title || 'Sin nombre'}
            </h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeCls}`}>
              {selected.estado}
            </span>
          </div>
          <button
            onClick={close}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-gray-500 hover:text-gray-800"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Body — dos columnas */}
        <div className="grid md:grid-cols-[1fr_280px] divide-y md:divide-y-0 md:divide-x divide-gray-100">

          {/* Izquierda: carousel */}
          <div className="p-5">
            {selected.photoURLs?.length
              ? <Carousel
                  images={selected.photoURLs}
                  index={selectedIndex}
                  setIndex={setSelectedIndex}
                />
              : <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-xl text-gray-300 gap-2">
                  <span className="text-5xl">🐾</span>
                  <span className="text-sm">Sin imágenes</span>
                </div>
            }
          </div>

          {/* Derecha: info + acciones */}
          <div className="flex flex-col p-5 gap-4">

            {/* Datos */}
            <div className="space-y-4 flex-1">
              <InfoRow icon="📍" label="Ubicación"    value={location} />
              <InfoRow icon="📝" label="Descripción"  value={selected.description} />
              <InfoRow icon="📞" label="Contacto"     value={selected.contact} />
              {selected.foundDate && (
                <InfoRow icon="📅" label="Fecha de hallazgo" value={selected.foundDate} />
              )}
              {selected.foundPlaceDetails && (
                <InfoRow icon="🗺️" label="Lugar de hallazgo" value={selected.foundPlaceDetails} />
              )}
              {selected.microchipped && (
                <InfoRow icon="📡" label="Microchip" value={selected.chipId || 'Sí'} />
              )}
            </div>

            {/* Acciones */}
            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <Link
                to={`/editar-reporte/${selected.id}`}
                className="flex-1 bg-[#FFD54F] hover:bg-yellow-400 text-gray-900 font-bold text-sm py-2.5 px-4 rounded-xl transition-colors text-center"
              >
                ✏️ Editar
              </Link>
              <button
                onClick={() => {
                  if (window.confirm('¿Eliminar este reporte?')) handleDelete(selected.id)
                }}
                className="flex-1 bg-red-50 hover:bg-red-500 hover:text-white text-red-600 font-bold text-sm py-2.5 px-4 rounded-xl transition-all border border-red-200 hover:border-red-500"
              >
                🗑️ Eliminar
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default ReportModal