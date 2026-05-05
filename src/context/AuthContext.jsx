import { createContext, useState, useEffect } from 'react'
// import { onAuthStateChanged } from 'firebase/auth'
// import { doc, getDoc } from 'firebase/firestore'
// import { auth, db } from '../config/firebase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe

    const initAuth = async () => {
      try {
        const [
          { onAuthStateChanged },
          { doc, getDoc },
          { auth, db }
        ] = await Promise.all([
          import('firebase/auth'),
          import('firebase/firestore'),
          import('../config/firebase')
        ])

        unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          setUser(currentUser)

          if (currentUser) {
            setUserData(null)
            try {
              const userDocRef = doc(db, 'users', currentUser.uid)
              const userDocSnap = await getDoc(userDocRef)

              if (userDocSnap.exists()) {
                const data = userDocSnap.data()
                setUserData({
                  firstName: data.firstName || '',
                  lastName: data.lastName || '',
                  email: data.email || currentUser.email,
                  photoURL: data.photoURL || currentUser.photoURL || null,
                  uid: currentUser.uid,
                })
              } else {
                const nameParts = currentUser.displayName?.split(' ') || ['User']
                setUserData({
                  firstName: nameParts[0] || '',
                  lastName: nameParts.slice(1).join(' ') || '',
                  email: currentUser.email,
                  photoURL: currentUser.photoURL || null,
                  uid: currentUser.uid,
                })
              }
            } catch (error) {
              console.error('Error fetching user data:', error)
              setUserData(null)
            }
          } else {
            setUserData(null)
          }

          setLoading(false)
        })
      } catch (error) {
        console.error('Error initializing auth:', error)
        setLoading(false)
      }
    }

    initAuth()

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, userData, loading, setUserData }}>
      {children}
    </AuthContext.Provider>
  )
}
