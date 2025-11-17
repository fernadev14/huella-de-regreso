import { Routes, Route } from 'react-router-dom'
import Footer from "./layout/Footer"
import Header from "./layout/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import NuevoReporte from './pages/NuevoReporte'
import Publicaciones from './pages/Publicaciones'
import QuienesSomos from './pages/QuienesSomos'
import MisReportes from './pages/MisReportes'
import EditarReporte from './pages/EditarReporte'

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/nuevo-reporte" element={<NuevoReporte />} />
        <Route path="/publicaciones" element={<Publicaciones />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/mis-reportes" element={<MisReportes />} />
        <Route path="/editar-reporte/:id" element={<EditarReporte />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
