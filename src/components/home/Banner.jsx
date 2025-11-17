import { Link } from "react-router-dom"
import maskBannerImg from "../../assets/Mask-banner-home.png"

const Banner = () => {

  return (
    <>
        <div className='banner-container relative h-full bg-[#A8C7DC] flex text-center'>
            <img src={maskBannerImg} alt="banner-mask" className="min-w-full"/>
            <div className="absolute top-[20%] right-[55%]">
                {/* línea 1 */}
                <p className="mb-1 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
                  <span className="text-[#FFD54F] text-6xl">Encuentra</span>{" "}
                  <span className="text-[#1B1B1B] text-6xl">a tu</span>
                </p>

                {/* línea 2 (blanca grande) */}
                <h1 className="mb-4 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl md:text-6xl">
                  mejor amigo
                </h1>

                <p className="text-center mb-8 ml-3 max-w-md text-lg leading-6 text-[#535353] sm:text-base w-[85%]">
                  Publica reportes y ayuda a otros a reencontrarse con sus mascotas.
                </p>

                <div className="flex justify-center">
                  <Link to="/nuevo-reporte" className="inline-flex items-center justify-center rounded-xl bg-[#F7D047] px-6 py-3 text-sm font-bold text-[#333333] shadow-md transition hover:-translate-y-0.5 hover:bg-[#eac236] active:translate-y-0 cursor-pointer">
                    <span className="text-2xl mr-1">+</span>
                    Reportar mascota
                  </Link>
                </div>
            </div>
        </div>   
    </>
  )
}

export default Banner
