import iconFacebook from "../assets/brand-facebook-solid.png";
import iconInstagram from "../assets/brand-instagram.png";
import imgMascotaReencuentro from "../assets/mascota-reencuentro-footer-removebg-preview 1.png";
import "../styles/footer.css"

const Footer = () => {
  return (
    <footer>
        <div className="flex justify-around">
            {/* INFO */}
            <section className="mt-20">
                <div className="contacto mb-18">
                    <h4 className="text-2xl font-bold mb-2">Ponte en contacto</h4>
                    <a href="#">info@huelladeregreso.com</a>
                </div>

                <div>
                    <h4 className="text-2xl font-bold mb-2">Información</h4>
                    <ul className="info">
                        <a href="#">
                            <li>Terminos de servicios</li>
                        </a>
                        <a href="#">
                            <li>Politicas de privacidad</li>
                        </a>
                        <a href="#">
                            <li>Estafas de mascotas perdidas</li>
                        </a>
                    </ul>
                </div>
            </section>

            {/* REDES */}
            <section className="mt-20">
                <h4 className="text-2xl font-bold mb-4">Sigenos en:</h4>
                <ul className="flex gap-7">
                    <a href="#">
                        <li>
                            <img src={iconFacebook} alt="icon-facebook" />
                        </li>
                    </a>
                    <a href="#">
                        <li>
                            <img src={iconInstagram} alt="icon-instagram" />
                        </li>
                    </a>
                </ul>
            </section>

            {/* IMAGENES */}
            <section>
                <img src={imgMascotaReencuentro} alt="" />
            </section>
        </div>
    </footer>
  )
}

export default Footer
