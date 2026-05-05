import { useEffect, useState, useRef } from 'react'
import {
  collection, onSnapshot, query,
  orderBy, where, limit, startAfter, getDocs
} from 'firebase/firestore'
import { db } from '../../config/firebase'

const PAGE_SIZE = 9

/**
 * Custom hook que gestiona:
 * - Suscripción en tiempo real a Firestore
 * - Filtros por departamento, ciudad, barrio y estado
 * - Búsqueda client-side con debounce
 * - Paginación (load more)
 */
export function usePublicaciones({ departmentFilter, cityFilter, barrioFilter, estadoFilter }) {
  const [reports, setReports]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [lastDoc, setLastDoc]     = useState(null)
  const [hasMore, setHasMore]     = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const unsubscribeRef            = useRef(null)

  /* ─── Real-time listener ─── */
  useEffect(() => {
    if (unsubscribeRef.current) {
      try { unsubscribeRef.current() } catch (_) {}
      unsubscribeRef.current = null
    }

    setLoading(true)
    setError(null)

    try {
      const constraints = []
      if (departmentFilter) constraints.push(where('department', '==', departmentFilter))
      if (cityFilter)        constraints.push(where('city',       '==', cityFilter))
      if (estadoFilter)      constraints.push(where('estado',     '==', estadoFilter))
      if (barrioFilter)      constraints.push(where('barrio',     '==', barrioFilter))
      constraints.push(orderBy('createdAt', 'desc'))
      constraints.push(limit(PAGE_SIZE))

      const q   = query(collection(db, 'pets'), ...constraints)
      const unsub = onSnapshot(
        q,
        (snap) => {
          setReports(snap.docs.map(d => ({ id: d.id, ...d.data() })))
          setLastDoc(snap.docs[snap.docs.length - 1] ?? null)
          setHasMore(snap.docs.length === PAGE_SIZE)
          setLoading(false)
        },
        (err) => {
          console.error(err)
          setError('Error cargando publicaciones')
          setLoading(false)
        }
      )

      unsubscribeRef.current = unsub
      return () => { try { unsub() } catch (_) {} }
    } catch (err) {
      console.error(err)
      setError('Error inicializando feed')
      setLoading(false)
    }
  }, [departmentFilter, cityFilter, barrioFilter, estadoFilter])

  /* ─── Load more (paginación) ─── */
  const loadMore = async () => {
    if (!lastDoc || loadingMore) return
    setLoadingMore(true)
    try {
      const constraints = []
      if (departmentFilter) constraints.push(where('department', '==', departmentFilter))
      if (cityFilter)        constraints.push(where('city',       '==', cityFilter))
      if (barrioFilter)      constraints.push(where('barrio',     '==', barrioFilter))
      if (estadoFilter)      constraints.push(where('estado',     '==', estadoFilter))
      constraints.push(orderBy('createdAt', 'desc'))
      constraints.push(startAfter(lastDoc))
      constraints.push(limit(PAGE_SIZE))

      const snap  = await getDocs(query(collection(db, 'pets'), ...constraints))
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      setReports(prev => [...prev, ...items])
      setLastDoc(snap.docs[snap.docs.length - 1] ?? null)
      setHasMore(snap.docs.length === PAGE_SIZE)
    } catch (err) {
      console.error('Error loading more:', err)
      setError('Error cargando más publicaciones')
    } finally {
      setLoadingMore(false)
    }
  }

  return { reports, loading, error, hasMore, loadingMore, loadMore }
}