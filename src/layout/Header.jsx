import { Link, useNavigate } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { AuthContext } from "../context/AuthContext"
import Avatar from "../components/Avatar"
import "../styles/header.css"
import "../styles/responsive.css"
import huellaRegresoSide from "../assets/huella-lado.png"
import plusSVG from "../../public/plus.svg"

const Header = () => {
  const navigate = useNavigate()
  const { user, userData } = useContext(AuthContext)
  const [showMenu, setShowMenu] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/')
      setShowMenu(false)
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <>
        <header className='w-full bg-[#F5F5F5] header'>
          <div className='container mx-auto flex items-center justify-between py-3 px-4'>
            <div className='flex items-center gap-4'>
              <Link to="/" className='flex items-center'>
                <img src={huellaRegresoSide} alt='logo-huella-de-regreso' className='h-12 md:h-14' />
              </Link>
            </div>

            {/* Desktop nav */}
            <nav className='hidden md:flex items-center gap-8'>
              <ul className='flex gap-8 text-lg items-center'>
                <Link to="/"><li className='cursor-pointer'>Inicio</li></Link>
                <Link to="/quienes-somos"><li className='cursor-pointer'>Quiénes somos</li></Link>
                <Link to="/publicaciones"><li className='cursor-pointer'>Publicaciones</li></Link>
              </ul>
            </nav>

            {/* Actions - desktop */}
            <div className='hidden md:flex items-center gap-4'>
              <Link to="/nuevo-reporte" className='bg-[#FFD54F] text-[#333333] py-2 px-4 rounded-md flex items-center gap-2'>
                <img src={plusSVG} alt="icon-plusSVG" className='w-5' />
                <span className='font-semibold'>Nuevo reporte</span>
              </Link>

              {user ? (
                <div className='relative'>
                  <button onClick={() => setShowMenu(!showMenu)} className='flex items-center gap-2 border-2 border-[#1E1E1E] py-2 px-3 rounded-md hover:bg-gray-100'>
                    <Avatar photoURL={userData?.photoURL} firstName={userData?.firstName} size='sm' />
                    <span className='text-sm'>{userData?.firstName || userData?.email?.split('@')[0] || 'Perfil'}</span>
                  </button>

                  {showMenu && (
                    <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50 flex flex-col'>
                      <Link to="/mis-reportes" onClick={() => setShowMenu(false)} className='block px-4 py-2 text-gray-700 hover:bg-gray-100 border-b'>📋 Mis Reportes</Link>
                      <Link to="/profile" onClick={() => setShowMenu(false)} className='block px-4 py-2 text-gray-700 hover:bg-gray-100 border-b'>👤 Editar Perfil</Link>
                      <button onClick={handleLogout} className='w-full text-left px-4 py-2 text-red-600 hover:bg-red-50'>🚪 Cerrar Sesión</button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className='border-2 border-[#1E1E1E] py-2 px-4 rounded-md'>Cuenta</Link>
              )}
            </div>

            {/* Mobile actions: hamburger */}
            <div className='md:hidden flex items-center gap-3'>
              <button onClick={() => setMobileOpen(!mobileOpen)} aria-label='Abrir menú' className='p-2 rounded-md border'>
                {mobileOpen ? (
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                ) : (
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu panel */}
          {mobileOpen && (
            <div className='md:hidden bg-white border-t border-gray-200 shadow-sm'>
              <div className='px-4 pt-4 pb-6 space-y-3'>
                <div className='flex flex-col gap-2'>
                  <Link to='/' onClick={() => setMobileOpen(false)} className='py-2 px-3 rounded hover:bg-gray-50'>Inicio</Link>
                  <Link to='/quienes-somos' onClick={() => setMobileOpen(false)} className='py-2 px-3 rounded hover:bg-gray-50'>Quiénes somos</Link>
                  <Link to='/publicaciones' onClick={() => setMobileOpen(false)} className='py-2 px-3 rounded hover:bg-gray-50'>Publicaciones</Link>
                </div>

                <div className='pt-2 border-t border-gray-100'>
                  <Link to='/nuevo-reporte' onClick={() => setMobileOpen(false)} className='block bg-[#FFD54F] text-[#333] py-2 px-3 rounded-md text-center'>+ Nuevo reporte</Link>
                </div>

                <div className='pt-2 border-t border-gray-100'>
                  {user ? (
                    <>
                      <div className='flex items-center gap-3 py-2 px-3'>
                        <Avatar photoURL={userData?.photoURL} firstName={userData?.firstName} size='md' />
                        <div>
                          <div className='font-semibold'>{userData?.firstName || userData?.email?.split('@')[0]}</div>
                          <div className='text-xs text-gray-500'>{userData?.email}</div>
                        </div>
                      </div>
                      <Link to='/mis-reportes' onClick={() => setMobileOpen(false)} className='block py-2 px-3 rounded hover:bg-gray-50'>📋 Mis Reportes</Link>
                      <Link to='/profile' onClick={() => setMobileOpen(false)} className='block py-2 px-3 rounded hover:bg-gray-50'>👤 Editar Perfil</Link>
                      <button onClick={() => { handleLogout(); setMobileOpen(false); }} className='w-full text-left py-2 px-3 text-red-600'>🚪 Cerrar Sesión</button>
                    </>
                  ) : (
                    <Link to='/login' onClick={() => setMobileOpen(false)} className='block py-2 px-3 rounded hover:bg-gray-50'>Cuenta</Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </header>
    </>
  )
}

export default Header
