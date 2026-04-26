import imgDogAnimate from "../../assets/perrito-motion-fourSteps.webp";
import { motion } from "framer-motion"
import "../../styles/responsive.css"

const FourSteps = () => {
  return (
    <>
        <h5 className="title-fourSteps text-4xl text-center mt-20">4 pasos para encontrar a tu mascota</h5>
        <div className="Container-fourSteps flex mt-20 justify-around">
            {/* <div className="img-fourSteps">
                <img 
                    src={imgDogAnimate} 
                    alt="perrito animado-4-pasos" 
                    className="h-100 -mr-80"
                />
            </div> */}

            {/* IMAGEN FLOTANTE */}
            <motion.img
              src={imgDogAnimate}
              className="bottom-0 right-10 hidden md:block"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <ul className="flex flex-col gap-4">
                <li className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition hover:-translate-y-2">
                    {/* <div className="bg-[#43A047] rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                        <span>1</span>
                    </div> */}
                    <h3 className="font-bold text-[#1b1b1b] text-2xl">Crear un reporte</h3>
                </li>
                <li className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition hover:-translate-y-2">
                    {/* <div className="bg-[#43A047] rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                        <span>2</span>
                    </div> */}
                    <h3 className="font-bold text-[#1b1b1b] text-2xl">Comparte y difunde</h3>
                </li>
                <li className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition hover:-translate-y-2">
                    {/* <div className="bg-[#43A047] rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                        <span>3</span>
                    </div> */}
                    <h3 className="font-bold text-[#1b1b1b] text-2xl">Resibe alertas y mensajes</h3>
                </li>
                <li className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition hover:-translate-y-2">
                    {/* <div className="bg-[#43A047] rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                        <span>4</span>
                    </div> */}
                    <h3 className="font-bold text-[#1b1b1b] text-2xl">Reencuentrate ❤️</h3>
                </li>
            </ul>
        </div>

    </>
  )
}

export default FourSteps
