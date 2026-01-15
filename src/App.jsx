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

import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* RUTAS SOLO PARA NO LOGUEADOS */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* RUTAS PROTEGIDAS */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/nuevo-reporte"
          element={
            <ProtectedRoute>
              <NuevoReporte />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mis-reportes"
          element={
            <ProtectedRoute>
              <MisReportes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editar-reporte/:id"
          element={
            <ProtectedRoute>
              <EditarReporte />
            </ProtectedRoute>
          }
        />

        <Route path="/publicaciones" element={<Publicaciones />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
