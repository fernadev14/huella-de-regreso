import Banner from "../components/home/Banner"
import Faq from "../components/home/Faq"
import FourSteps from "../components/home/fourSteps"
import Help from "../components/home/Help"
import "../styles/home.css"

const Home = () => {
  return (
    <>
        <Banner />
        <FourSteps />
        <Help />
        <Faq />
    </>
  )
}

export default Home
