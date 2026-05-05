import { lazy, Suspense } from 'react'
import '../../styles/auth.css'

const SlideInfo = lazy(() => import('./SlideInfo.jsx'))
const AuthCard  = lazy(() => import('./AuthCard.jsx'))

/**
 * AuthPage — layout compartido para Login y Signup.
 * Props:
 *   initialMode  — 'login' | 'signup'
 *   prefillEmail — email pre-rellenado
 */
const AuthPage = ({ initialMode = 'login', prefillEmail = '' }) => (
  <div className='auth-page'>

    {/* ── Panel de marca (izquierda en desktop) ── */}
    <div className='auth-brand-panel'>
      <Suspense fallback={null}>
        <SlideInfo />
      </Suspense>
    </div>

    {/* ── Panel de formulario (derecha) ── */}
    <div className='auth-form-panel'>
      <Suspense fallback={
        <div className='flip-scene'>
          <div className='flip-face' style={{ minHeight: 520 }}>
            <div className='space-y-4 animate-pulse p-2'>
              {[1,2,3,4].map(i => <div key={i} className='h-10 bg-gray-100 rounded-xl'/>)}
            </div>
          </div>
        </div>
      }>
        <AuthCard initialMode={initialMode} prefillEmail={prefillEmail} />
      </Suspense>
    </div>

  </div>
)

export default AuthPage