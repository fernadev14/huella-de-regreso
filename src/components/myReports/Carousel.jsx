import { useEffect, useRef, useState, useCallback } from 'react'

const Carousel = ({ images, index, setIndex }) => {
  const isHovering  = useRef(false)
  const touchStartX = useRef(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState(null) // 'left' | 'right'

  const go = useCallback((next, dir) => {
    if (isAnimating) return
    setDirection(dir)
    setIsAnimating(true)
    setTimeout(() => {
      setIndex(next)
      setIsAnimating(false)
    }, 220)
  }, [isAnimating, setIndex])

  const prev = () => go(index === 0 ? images.length - 1 : index - 1, 'right')
  const next = () => go(index === images.length - 1 ? 0 : index + 1, 'left')

  // Auto-play
  useEffect(() => {
    if (!images?.length || images.length < 2) return
    const id = setInterval(() => {
      if (!isHovering.current) next()
    }, 3500)
    return () => clearInterval(id)
  }, [images, index])

  // Touch swipe
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev()
    touchStartX.current = null
  }

  if (!images?.length) return null

  const slideStyle = isAnimating
    ? { opacity: 0, transform: direction === 'left' ? 'translateX(-8px)' : 'translateX(8px)' }
    : { opacity: 1, transform: 'translateX(0)' }

  return (
    <div
      className="select-none"
      onMouseEnter={() => isHovering.current = true}
      onMouseLeave={() => isHovering.current = false}
    >
      {/* Imagen principal */}
      <div
        className="relative overflow-hidden rounded-xl bg-gray-100"
        style={{ height: '320px' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={images[index]}
          alt={`foto ${index + 1}`}
          className="w-full h-full object-cover"
          style={{ transition: 'opacity 0.22s ease, transform 0.22s ease', ...slideStyle }}
        />

        {/* Flechas — solo si hay más de 1 */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white flex items-center justify-center shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white flex items-center justify-center shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </>
        )}

        {/* Contador */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
            {index + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 justify-center flex-wrap">
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => go(i, i > index ? 'left' : 'right')}
              className={`cursor-pointer w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                i === index
                  ? 'border-yellow-400 scale-105 shadow-md'
                  : 'border-transparent opacity-60 hover:opacity-90'
              }`}
            >
              <img src={url} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Dots — solo si hay thumbnails no alcanzables por espacio */}
      <div className="flex gap-1.5 mt-2.5 justify-center">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > index ? 'left' : 'right')}
            className={`rounded-full transition-all duration-200 ${
              i === index ? 'w-5 h-2 bg-yellow-400' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel