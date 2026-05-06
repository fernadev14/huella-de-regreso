import { Link, useNavigate } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { AuthContext } from "../context/AuthContext"
import Avatar from "../components/Avatar"
import "../styles/header.css"
import "../styles/responsive.css"
import huellaRegresoSide from "../assets/huella-lado.png"
import plusSVG from "../assets/plus.svg"

const Header = () => {
  const navigate = useNavigate()
  const { user, userData } = useContext(AuthContext)
  const [showMenu, setShowMenu] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
     // Bloquear scroll cuando el menú móvil está abierto
    useEffect(() => {
      if (mobileOpen) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "";
      return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10)
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])

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
        <header className={`w-full fixed top-0 z-50 transition-all
                ${scrolled 
                  ? "bg-white/80 backdrop-blur-xl shadow-md" 
                  : "bg-transparent"}
              `}
        >
          <div className='container mx-auto flex items-center justify-between py-3 px-4'>
            <div className='flex items-center gap-4'>
              <Link to="/" className='flex items-center'>
                <img 
                  src={huellaRegresoSide} 
                  alt='logo-huella-de-regreso' 
                  className='h-12 md:h-14 hover:scale-105 transition' 
                />
              </Link>
            </div>

            {/* Desktop nav */}
            <nav className='hidden lg:flex items-center gap-8'>
              <ul className='flex gap-8 text-lg items-center'>
                <Link to="/">
                  <li className='cursor-pointer relative group'>
                    Inicio
                    <span className='absolute left-0 -bottom-1 w-0 h-0.5 bg-[#FFD54F] transition-all group-hover:w-full'></span>
                  </li>
                </Link>
                <Link to="/quienes-somos">
                  <li className='cursor-pointer relative group'>
                    Quiénes somos
                    <span className='absolute left-0 -bottom-1 w-0 h-0.5 bg-[#FFD54F] transition-all group-hover:w-full'></span>
                  </li>
                </Link>
                <Link to="/publicaciones">
                  <li className='cursor-pointer relative group'>
                    Publicaciones
                    <span className='absolute left-0 -bottom-1 w-0 h-0.5 bg-[#FFD54F] transition-all group-hover:w-full'></span>
                  </li>
                </Link>
              </ul>
            </nav>

            {/* Actions - desktop */}
            <div className='hidden lg:flex items-center gap-4'>
              <Link 
                to="/nuevo-reporte" 
                className='flex items-center gap-2 px-5 py-2.5 rounded-xl
                          bg-[#FFD54F] text-[#333] font-semibold
                          shadow-md hover:shadow-xl
                          hover:scale-105 transition-all duration-300'
              >
                <img src={plusSVG} className='w-5' />
                Nuevo reporte
              </Link>

              {user ? (
                <div className='relative'>
                  <button onClick={() => setShowMenu(!showMenu)} className='flex items-center gap-2 bg-white/70 backdrop-blur-md border border-gray-200 py-2 px-3 rounded-xl hover:shadow-md transition cursor-pointer'>
                    <Avatar photoURL={userData?.photoURL} firstName={userData?.firstName} size='sm' />
                    <span className='text-sm'>{userData?.firstName || userData?.email?.split('@')[0] || 'Perfil'}</span>
                  </button>

                  {showMenu && (
                    <div className='absolute right-0 mt-3 w-56 
  bg-white/80 backdrop-blur-xl 
  border border-gray-200 
  rounded-2xl shadow-xl 
  overflow-hidden'>
                      <Link to="/mis-reportes" onClick={() => setShowMenu(false)} className='block px-4 py-2 text-gray-700 hover:bg-gray-100 border-b'>📋 Mis Reportes</Link>
                      <Link to="/profile" onClick={() => setShowMenu(false)} className='block px-4 py-2 text-gray-700 hover:bg-gray-100 border-b'>👤 Editar Perfil</Link>
                      <button onClick={handleLogout} className='w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer'>🚪 Cerrar Sesión</button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className='border-2 border-[#1E1E1E] py-2 px-4 rounded-md'>Cuenta</Link>
              )}
            </div>



            {/* Mobile actions: hamburger */}
            <div className='menu-burger lg:hidden flex items-center gap-3'>
              <button onClick={() => setMobileOpen(!mobileOpen)} 
                aria-label='Abrir menú' 
                className='p-2 rounded-xl border border-gray-200 bg-white/70 backdrop-blur hover:shadow transition cursor-pointer'
              >
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
          <div
            className={`mobile-backdrop lg:hidden ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(false)}
          />
                      
          {/* Drawer móvil SIEMPRE montado */}
          <div className={`container-menu-profile-primary lg:hidden ${mobileOpen ? 'open' : ''}`}>
            {/* ...contenido del menú... */}
            {mobileOpen && (
                <div className='lg:hidden'>
                <div className='px-4 pt-4 pb-6 space-y-3 bg-white/30 backdrop-blur-xl border-b border-white/30'>
                    <div className="container-menu-primary justify-around items-center flex">
                        <div className='menu-primary justify-around gap-2'>
                        <Link to='/' onClick={() => setMobileOpen(false)} className='py-2 px-3 rounded hover:bg-gray-50'>Inicio</Link>
                        <Link to='/quienes-somos' onClick={() => setMobileOpen(false)} className='py-2 px-3 rounded hover:bg-gray-50'>Quiénes somos</Link>
                        <Link to='/publicaciones' onClick={() => setMobileOpen(false)} className='py-2 px-3 rounded hover:bg-gray-50'>Publicaciones</Link>
                        </div>
                        {/* BOTON NUEVO REPORTE */}
                        <div className='border-t border-gray-100'>
                        <Link to='/nuevo-reporte' onClick={() => setMobileOpen(false)} 
                                className='block bg-[#FFD54F] text-[#333] py-2 px-3 rounded-md text-center'>
                            + Nuevo reporte
                        </Link>
                        </div>
                        <button onClick={() => setMobileOpen(!mobileOpen)} className='absolute top-4 right-4 p-2 rounded-xl border border-gray-200 bg-white/70 backdrop-blur hover:shadow transition cursor-pointer'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </button>
                    </div>


                    <div className='pt-10 border-t border-gray-100'>
                    {user ? (
                        <div className="menu-prifile flex justify-around items-start">
                        <div className='flex items-center gap-3 py-2 px-3'>
                            <Avatar photoURL={userData?.photoURL} firstName={userData?.firstName} size='md' />
                            <div>
                            <div className='font-semibold'>{userData?.firstName || userData?.email?.split('@')[0]}</div>
                            <div className='text-xs text-gray-500'>{userData?.email}</div>
                            </div>
                        </div>

                        {/* BOTONES PERFIL */}
                        <div className="btn-menu-profile">
                            <Link to='/mis-reportes' 
                                    onClick={() => setMobileOpen(false)} 
                                    className='block py-2 px-3 rounded hover:bg-gray-50'>
                                        📋 Mis Reportes
                                </Link>
                            <Link to='/profile' 
                                    onClick={() => setMobileOpen(false)} 
                                    className='block py-2 px-3 rounded hover:bg-gray-50'>
                                        👤 Editar Perfil
                            </Link>
                            <button onClick={() => { handleLogout(); setMobileOpen(false); }} className='w-full text-left py-2 px-3 text-red-600'>
                                🚪 Cerrar Sesión
                            </button>
                        </div>
                        </div>
                    ) : (
                        <Link to='/login' 
                            onClick={() => setMobileOpen(false)} 
                            className='block py-2 px-3 rounded hover:bg-gray-50'>
                                Cuenta
                        </Link>
                    )}
                    </div>
                </div>
                </div>
            )}
          </div>
        </header>
    </>
  )
}

export default Header
