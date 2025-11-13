import "../styles/header.css"
import huellaRegresoSide from "../assets/huella-lado.png"
import plusSVG from "../../public/plus.svg"
import accountCircleSVG from "../../public/account-circle.svg"

const Header = () => {
  return (
    <>
        <div className='w-full flex justify-around bg-[#F5F5F5] h-20 items-center font-bold header'>
            <div className='w-33'>
                <img src={huellaRegresoSide} alt='logo-huella-de-regreso'className='w-full'/>
            </div>
            <nav className='flex items-center justify-around gap-30'>
                <ul className='flex gap-8 text-xl'>
                    <a href="">
                    <li>Inicio</li>
                    </a>
                    <a href="">
                        <li>Quiénes somos</li>
                    </a>
                    <a href="">
                        <li>Publicaciones</li>
                    </a>
                </ul>
                {/* BOTONES CUENTA-REPORTE */}
                <div className='flex gap-4'>
                    <ul className='flex gap-4 text-xl'>
                        <a href="#" className='bg-[#FFD54F] text-[#333333] py-2 px-4 rounded-md flex items-center gap-1'>
                            <img src={plusSVG} alt="icon-plusSVG" className='w-6'/>
                            <li>Nuevo reporte</li>
                        </a>
                        <a href="" className='border-2 border-[#1E1E1E] text-[#333333] py-2 px-4 rounded-md flex gap-2'>
                            <img src={accountCircleSVG} alt="icon-accountCircle" className='w-6'/>
                            <li>Cuenta</li>
                        </a>
                    </ul>

                </div>
            </nav>
        </div> 
    </>
  )
}

export default Header
