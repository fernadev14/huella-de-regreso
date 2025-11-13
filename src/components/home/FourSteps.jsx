import imgDogAnimate from "../../assets/perrito animado-4-pasos.png";

const FourSteps = () => {
  return (
    <>
        <h5 className="text-4xl text-center mt-20">4 pasos para encontrar a tu mascota</h5>
        <div className="flex mt-20 justify-around">
            <img 
                src={imgDogAnimate} 
                alt="perrito animado-4-pasos" 
                className="h-[400px] -mr-80"
            />

            <ul className="flex flex-col gap-4">
                <li className="step-item">
                    <div className="bg-[#43A047] rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                        <span>1</span>
                    </div>
                    <h3 className="font-bold text-[#1b1b1b] text-2xl">Crear un reporte</h3>
                </li>
                <li className="step-item">
                    <div className="bg-[#43A047] rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                        <span>2</span>
                    </div>
                    <h3 className="font-bold text-[#1b1b1b] text-2xl">Comparte y difunde</h3>
                </li>
                <li className="step-item">
                    <div className="bg-[#43A047] rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                        <span>3</span>
                    </div>
                    <h3 className="font-bold text-[#1b1b1b] text-2xl">Resibe alertas y mensajes</h3>
                </li>
                <li className="step-item">
                    <div className="bg-[#43A047] rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                        <span>4</span>
                    </div>
                    <h3 className="font-bold text-[#1b1b1b] text-2xl">Reencuentrate ❤️</h3>
                </li>
            </ul>
        </div>

    </>
  )
}

export default FourSteps
