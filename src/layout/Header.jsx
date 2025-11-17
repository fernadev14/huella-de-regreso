import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { AuthContext } from "../context/AuthContext"
import Avatar from "../components/Avatar"
import "../styles/header.css"
import huellaRegresoSide from "../assets/huella-lado.png"
import plusSVG from "../../public/plus.svg"

const Header = () => {
  const navigate = useNavigate()
  const { user, userData } = useContext(AuthContext)
  const [showMenu, setShowMenu] = useState(false)

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
        <div className='w-full flex justify-around bg-[#F5F5F5] h-20 items-center font-bold header'>
            <div className='w-33'>
                <Link to="/">
                    <img src={huellaRegresoSide} alt='logo-huella-de-regreso'className='w-full'/>
                </Link>
            </div>
            <nav className='flex items-center justify-around gap-30'>
                <ul className='flex gap-8 text-xl'>
                <Link to="/">
                  <li>Inicio</li>
                </Link>
                <Link to="/quienes-somos">
                  <li>Quiénes somos</li>
                </Link>
                <Link to="/publicaciones">
                  <li>Publicaciones</li>
                </Link>
              </ul>
                {/* BOTONES CUENTA-REPORTE */}
                <div className='flex gap-4 items-center'>
                    <ul className='flex gap-4 text-xl'>
                      <Link to="/nuevo-reporte" className='bg-[#FFD54F] text-[#333333] py-2 px-4 rounded-md flex items-center gap-1'>
                        <img src={plusSVG} alt="icon-plusSVG" className='w-6'/>
                        <li>Nuevo reporte</li>
                      </Link>

                        {user ? (
                          <div className='relative'>
                            <button
                              onClick={() => setShowMenu(!showMenu)}
                              className='border-2 border-[#1E1E1E] text-[#333333] py-2 px-4 rounded-md flex gap-2 items-center hover:bg-gray-100 transition'
                            >
                              <Avatar
                                photoURL={userData?.photoURL}
                                firstName={userData?.firstName}
                                size="sm"
                              />
                              <span className='text-sm'>
                                {userData?.firstName || userData?.email?.split('@')[0] || 'Perfil'}
                              </span>
                            </button>

                            {showMenu && (
                              <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50'>
                                <Link
                                  to="/mis-reportes"
                                  onClick={() => setShowMenu(false)}
                                  className='block px-4 py-2 text-gray-700 hover:bg-gray-100 border-b'
                                >
                                  📋 Mis Reportes
                                </Link>
                                <Link
                                  to="/profile"
                                  onClick={() => setShowMenu(false)}
                                  className='block px-4 py-2 text-gray-700 hover:bg-gray-100 border-b'
                                >
                                  👤 Editar Perfil
                                </Link>
                                <button
                                  onClick={handleLogout}
                                  className='w-full text-left px-4 py-2 text-red-600 hover:bg-red-50'
                                >
                                  🚪 Cerrar Sesión
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link to="/login" className='border-2 border-[#1E1E1E] text-[#333333] py-2 px-4 rounded-md flex gap-2'>
                              <li>Cuenta</li>
                          </Link>
                        )}
                    </ul>

                </div>
            </nav>
        </div> 
    </>
  )
}

export default Header
