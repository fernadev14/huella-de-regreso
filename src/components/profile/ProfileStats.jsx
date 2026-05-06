import { useEffect, useState } from 'react'

/**
 * ProfileStats
 * Obtiene y muestra los totales de reportes del usuario:
 * - Total publicados
 * - Perdidos activos
 * - Encontrados
 * Firebase se importa dinámicamente.
 */

const pluralize = (count, singular, plural) => count === 1 ? singular : plural

const ProfileStats = ({ uid }) => {
  const [stats,   setStats]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!uid) return
    let cancelled = false

    const load = async () => {
      try {
        const [{ collection, query, where, getCountFromServer }, { db }] =
          await Promise.all([
            import('firebase/firestore'),
            import('../../config/firebase'),
          ])

        const base = collection(db, 'pets')

        const [total, perdidos, encontrados] = await Promise.all([
          getCountFromServer(query(base, where('authorUid', '==', uid))),
          getCountFromServer(query(base, where('authorUid', '==', uid), where('estado', 'in', ['perdida','perdido']))),
          getCountFromServer(query(base, where('authorUid', '==', uid), where('estado', 'in', ['encontrada','encontrado']))),
        ])

        if (!cancelled) {
          setStats({
            total:       total.data().count,
            perdidos:    perdidos.data().count,
            encontrados: encontrados.data().count,
          })
        }
      } catch {
        // silencioso: stats son opcionales
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [uid])

  if (loading) {
    return (
      <ul className='flex flex-col justify-center items-center'>
        <li>
          <div className="loader">
            <div className="child"></div>
          </div>
        </li>

        <li>
          <div className="text"></div>
        </li>
      </ul>
    )
  }

  if (!stats) return null

  const items = [
    { icon: '📋', label: pluralize(stats.total, 'Publicación', 'Publicaciones'), value: stats.total },
    { icon: '🔴', label: pluralize(stats.perdidos, 'Perdido', 'Perdidos'), value: stats.perdidos },
    { icon: '🟢', label: pluralize(stats.encontrados, 'Encontrado', 'Encontrados'), value: stats.encontrados },
  ]

  return (
    <>
      <div className='profile-stats justify-center'>
      {items.map((item, i) => (
        <div key={i} className='profile-stat-chip'>
          <span>{item.icon}</span>
          <span className='stat-num'>{item.value}</span>
          <span style={{ color: '#6b7280', fontWeight: 500 }}>
            {item.label}
          </span>
        </div>
      ))}

    </div>
      {/* <ul className='flex flex-col justify-center items-center'>
        <li>
          <div className="loader">
            <div className="child"></div>
          </div>
        </li>
        <li>
          <div className="text"></div>
        </li>
      </ul> */}
    </>
  )
}

export default ProfileStats