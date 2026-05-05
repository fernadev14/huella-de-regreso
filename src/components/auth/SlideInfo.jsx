import loginPNGMascota from "../../assets/login-pet-motion-float.webp"

const FEATURES = [
  { icon: '📍', text: 'Reportes por ubicación' },
  { icon: '🐶', text: 'Comunidad que ayuda'    },
  { icon: '🔔', text: 'Alertas inmediatas'      },
]

const SlideInfo = () => (
  <div className='slide-info'>
    <p className='text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3'>
      🐾 PetFinder Colombia
    </p>

    <h2 className='slide-info__title'>
      Nunca pierdas a<br />
      <em style={{ fontStyle: 'italic', fontWeight: 300 }}>tu mejor amigo</em>
    </h2>

    <p className='slide-info__sub'>
      Reporta, busca y conecta con personas que quieren ayudar a reunirte con tu mascota.
    </p>

    <img
      className='slide-info__img'
      src={loginPNGMascota}
      alt='Mascota con camisa roja'
      loading='lazy'
    />

    <ul className='slide-info__features'>
      {FEATURES.map(f => (
        <li key={f.text} className='slide-info__feature'>
          <span className='text-lg leading-none'>{f.icon}</span>
          {f.text}
        </li>
      ))}
    </ul>
  </div>
)

export default SlideInfo