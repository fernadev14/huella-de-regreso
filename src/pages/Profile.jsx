import { lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../components/profile/UseProfile.js'
import '../styles/profile.css'

// Componentes lazy — no están en el bundle inicial
const AvatarUpload  = lazy(() => import('../components/profile/AvatarUpload.jsx'))
const ProfileStats  = lazy(() => import('../components/profile/ProfileStats.jsx'))

/* ─── Skeleton ─── */
const ProfileSkeleton = () => (
  <div className='profile-skeleton'>
    <div className='skel-block' style={{ height: 140, borderRadius: 0 }} />
    <div style={{ padding: '0 2rem 2rem' }}>
      <div style={{ marginTop: -48, marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
        <div className='skel-block' style={{ width: 96, height: 96, borderRadius: '50%', flexShrink: 0 }} />
        <div style={{ paddingBottom: '0.5rem', flex: 1 }}>
          <div className='skel-block' style={{ height: 22, width: '55%', marginBottom: 8 }} />
          <div className='skel-block' style={{ height: 14, width: '35%' }} />
        </div>
      </div>
      {[1, 2, 3, 4].map(i => (
        <div key={i} className='skel-block' style={{ height: 44, marginBottom: 12 }} />
      ))}
    </div>
  </div>
)

/* ─── Acceso denegado ─── */
const AccessDenied = () => {
  const navigate = useNavigate()
  return (
    <div className='profile-page' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className='profile-card profile-fade' style={{ maxWidth: 380, padding: '2.5rem 2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔒</p>
        <p style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Acceso restringido
        </p>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          Debes iniciar sesión para acceder a tu perfil.
        </p>
        <button className='profile-btn-save' style={{ display: 'block', width: '100%' }}
          onClick={() => navigate('/login')}>
          Ir a iniciar sesión
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   Profile — página principal
   ═══════════════════════════════════════ */
const Profile = () => {
  const navigate = useNavigate()
  const {
    user, ready,
    firstName, setFirstName,
    lastName,  setLastName,
    phone,     setPhone,
    bio,       setBio,
    photoURL,
    handlePhotoChange,
    handleSubmit,
    loading, uploadingImg, error, toast,
  } = useProfile()

  if (!ready) return <div className='profile-page'><ProfileSkeleton /></div>
  if (!user)  return <AccessDenied />

  const displayName = [firstName, lastName].filter(Boolean).join(' ') || 'Tu perfil'

  return (
    <div className='profile-page mt-20'>
      <div className='profile-fade' style={{ paddingTop: '2rem', paddingLeft: '1rem', paddingRight: '1rem' }}>

        <div className='profile-card'>

          {/* ── Banner ── */}
          <div className='profile-banner' />

          {/* ── Avatar + nombre ── */}
          <div className='profile-header-body'>
            <Suspense fallback={
              <div className='skel-block' style={{ width: 96, height: 96, borderRadius: '50%', flexShrink: 0, border: '4px solid #fff' }} />
            }>
              <AvatarUpload
                photoURL={photoURL}
                firstName={firstName}
                uploading={uploadingImg}
                onFileSelect={handlePhotoChange}
                disabled={loading}
              />
            </Suspense>

            <div className='profile-header-meta'>
              <p className='profile-display-name'>{displayName}</p>
              <p className='profile-display-email'>{user.email}</p>
            </div>
          </div>

          {/* ── Stats ── */}
          <Suspense fallback={null}>
            <ProfileStats uid={user.uid} />
          </Suspense>

          <div className='profile-divider' />

          {/* ── Alerts ── */}
          {error && (
            <div className='profile-alert profile-alert--error' role='alert'>
              <svg width='14' height='14' viewBox='0 0 24 24' fill='none'
                stroke='currentColor' strokeWidth='2.5' strokeLinecap='round'>
                <circle cx='12' cy='12' r='10'/>
                <line x1='12' y1='8' x2='12' y2='12'/>
                <circle cx='12' cy='16.5' r='0.5' fill='currentColor'/>
              </svg>
              {error}
            </div>
          )}

          {/* ── Formulario ── */}
          <form onSubmit={handleSubmit} noValidate>

            {/* Información personal */}
            <div className='profile-form-section'>
              <p className='profile-section-title'>Información personal</p>
              <div className='profile-fields-grid'>
                <div className='profile-field'>
                  <label className='profile-label' htmlFor='firstName'>Nombre *</label>
                  <input id='firstName' type='text' placeholder='Tu nombre'
                    value={firstName} onChange={e => setFirstName(e.target.value)}
                    className='profile-input' disabled={loading} autoComplete='given-name' />
                </div>

                <div className='profile-field'>
                  <label className='profile-label' htmlFor='lastName'>Apellido</label>
                  <input id='lastName' type='text' placeholder='Tu apellido'
                    value={lastName} onChange={e => setLastName(e.target.value)}
                    className='profile-input' disabled={loading} autoComplete='family-name' />
                </div>

                <div className='profile-field'>
                  <label className='profile-label' htmlFor='email'>Correo</label>
                  <input id='email' type='email' value={user.email}
                    className='profile-input' disabled readOnly
                    title='El correo no se puede cambiar' />
                </div>

                <div className='profile-field'>
                  <label className='profile-label' htmlFor='phone'>
                    Teléfono de contacto
                    <span style={{ fontWeight: 400, color: '#aaa', marginLeft: 4 }}>
                      (visible en tus reportes)
                    </span>
                  </label>
                  <input id='phone' type='text' placeholder='Ej. 310 123 4567'
                    value={phone} onChange={e => setPhone(e.target.value)}
                    className='profile-input' disabled={loading} autoComplete='tel' />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className='profile-form-section' style={{ marginTop: '1.5rem' }}>
              <p className='profile-section-title'>Sobre ti</p>
              <div className='profile-field'>
                <label className='profile-label' htmlFor='bio'>
                  Bio
                  <span style={{ fontWeight: 400, color: '#aaa', marginLeft: 4 }}>
                    (aparece en tus publicaciones)
                  </span>
                </label>
                <textarea id='bio' placeholder='Cuéntanos sobre ti y tus mascotas…'
                  value={bio} onChange={e => setBio(e.target.value)}
                  className='profile-input profile-textarea'
                  disabled={loading} maxLength={280} rows={3}
                />
                <span style={{ fontSize: '0.72rem', color: '#bbb', textAlign: 'right' }}>
                  {bio.length}/280
                </span>
              </div>
            </div>

            {/* Acciones */}
            <div className='profile-actions'>
              <button type='submit' disabled={loading || uploadingImg} className='profile-btn-save'>
                {loading
                  ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <span className='profile-spinner' /> Guardando…
                    </span>
                  : 'Guardar cambios'}
              </button>
              <button type='button' onClick={() => navigate('/')} className='profile-btn-back'>
                ← Volver
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* ── Toast de éxito ── */}
      {toast && <div className='profile-toast' role='status'>{toast}</div>}
    </div>
  )
}

export default Profile