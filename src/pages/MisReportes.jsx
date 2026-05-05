import { useEffect, useState, useContext, useRef } from 'react'
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

import ReportCard  from '../components/myReports/ReportCard'
import ReportModal from '../components/myReports/ReportModal'

// ── Empty state ────────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="col-span-3 flex flex-col items-center justify-center py-24 gap-4 text-center">
    <span className="text-6xl">🐾</span>
    <div>
      <p className="text-lg font-bold text-gray-700">Aún no tienes reportes</p>
      <p className="text-sm text-gray-400 mt-1">
        Crea tu primer reporte para ayudar a encontrar una mascota
      </p>
    </div>
    <Link
      to="/nuevo-reporte"
      className="mt-2 bg-[#FFD54F] hover:bg-yellow-400 text-gray-900 font-bold text-sm px-6 py-2.5 rounded-xl transition-colors"
    >
      + Nuevo reporte
    </Link>
  </div>
)

// ── Loading skeleton ───────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
    <div className="h-52 bg-gray-100" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-100 rounded w-2/3" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="h-5 bg-gray-100 rounded w-1/4 mt-1" />
    </div>
  </div>
)

// ── Main ───────────────────────────────────────────────────────────────────────
const MisReportes = () => {
  const { user } = useContext(AuthContext)

  const [reports,       setReports]       = useState([])
  const [loading,       setLoading]       = useState(true)
  const [selected,      setSelected]      = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeId,      setActiveId]      = useState(null)

  const isTouchRef = useRef(false)

  useEffect(() => {
    isTouchRef.current = window.matchMedia('(hover: none)').matches
  }, [])

  useEffect(() => {
    if (!user) return

    const q = query(
      collection(db, 'pets'),
      where('authorUid', '==', user.uid)
    )

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      setReports(data)
      setLoading(false)
    })

    return () => unsub()
  }, [user])

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este reporte?')) return
    await deleteDoc(doc(db, 'pets', id))
    setReports(prev => prev.filter(r => r.id !== id))
    setSelected(null)
  }

  const handleView = (r) => {
    setSelected(r)
    setSelectedIndex(0)
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis Reportes</h1>
            {!loading && reports.length > 0 && (
              <p className="text-sm text-gray-400 mt-1">
                {reports.length} reporte{reports.length !== 1 ? 's' : ''} publicado{reports.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <Link
            to="/nuevo-reporte"
            className="bg-[#FFD54F] hover:bg-yellow-400 text-gray-900 font-bold text-sm px-5 py-2.5 rounded-xl transition-colors hidden sm:flex items-center gap-1.5"
          >
            + Nuevo reporte
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : reports.length === 0
              ? <EmptyState />
              : reports.map(r => (
                  <ReportCard
                    key={r.id}
                    r={r}
                    activeId={activeId}
                    setActiveId={setActiveId}
                    isTouchRef={isTouchRef}
                    onDelete={handleDelete}
                    onView={handleView}
                  />
                ))
          }
        </div>

      </div>

      {/* Modal */}
      <ReportModal
        selected={selected}
        setSelected={setSelected}
        handleDelete={handleDelete}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </div>
  )
}

export default MisReportes