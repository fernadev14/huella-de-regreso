import Banner from "../components/home/Banner"
import Faq from "../components/home/Faq"
import FourSteps from "../components/home/FourSteps"
import Help from "../components/home/Help"
import Stats from "../components/home/Stats"
import "../styles/home.css"

const Home = () => {
  return (
    <>
        <Banner />
        <Stats />
        <FourSteps />
        <Help />
        <Faq />
    </>
  )
}

export default Home
