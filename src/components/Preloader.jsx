import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const text = "VERITAS ET AEQUITAS"

export default function Preloader({ progress, done }) {
  const containerRef = useRef(null)
  const leftPanelRef = useRef(null)
  const rightPanelRef = useRef(null)
  const textLeftRef = useRef(null)
  const textRightRef = useRef(null)

  useEffect(() => {
    if (!textLeftRef.current || !textRightRef.current) return
    const spansLeft = textLeftRef.current.children
    const spansRight = textRightRef.current.children
    const total = text.length
    const filled = Math.floor((progress / 100) * total)

    for (let i = 0; i < total; i++) {
      const color = i < filled ? '#B87333' : '#2A2A2A'
      gsap.to(spansLeft[i], { color, duration: 0.3, overwrite: 'auto' })
      gsap.to(spansRight[i], { color, duration: 0.3, overwrite: 'auto' })
    }
  }, [progress])

  useEffect(() => {
    if (done) {
      const tl = gsap.timeline()
      tl.to([leftPanelRef.current, rightPanelRef.current], {
        xPercent: (i) => i === 0 ? -100 : 100,
        duration: 1.6,
        ease: "power4.inOut",
        delay: 0.2 // Small pause at 100% before opening
      })
      tl.set(containerRef.current, { display: 'none' })
    }
  }, [done])

  const renderText = (ref, leftPosition) => (
    <div 
      ref={ref}
      style={{
        position: 'absolute',
        top: '50%',
        left: leftPosition,
        transform: 'translate(-50%, -50%)',
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: '4vw',
        fontWeight: '700',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        display: 'flex',
        whiteSpace: 'nowrap',
        zIndex: 10
      }}
    >
      {text.split('').map((char, index) => (
        <span key={index} style={{ color: '#2A2A2A' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 9999, 
        display: 'flex', 
        overflow: 'hidden', 
        pointerEvents: done ? 'none' : 'all',
        backgroundColor: '#000'
      }}
    >
      <style>{`
        @keyframes kenburns { 
          0% { transform: scale(1); } 
          100% { transform: scale(1.15); } 
        }
      `}</style>

      {/* LEFT PANEL */}
      <div 
        ref={leftPanelRef}
        style={{ 
          position: 'relative', 
          width: '50vw', 
          height: '100vh', 
          overflow: 'hidden', 
          backgroundColor: '#050505',
          borderRight: '1px solid rgba(184, 115, 51, 0.1)'
        }}
      >
        <img 
          src="/images/dark_marble.png" 
          alt="Marble Background Left"
          style={{
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            objectFit: 'cover',
            filter: 'brightness(0.3)', 
            animation: 'kenburns 20s ease-out forwards'
          }}
        />
        {/* Text centered on screen (50vw from left edge of left panel) */}
        {renderText(textLeftRef, '50vw')}
      </div>

      {/* RIGHT PANEL */}
      <div 
        ref={rightPanelRef}
        style={{ 
          position: 'relative', 
          width: '50vw', 
          height: '100vh', 
          overflow: 'hidden', 
          backgroundColor: '#050505',
          borderLeft: '1px solid rgba(184, 115, 51, 0.1)'
        }}
      >
        <img 
          src="/images/dark_marble.png" 
          alt="Marble Background Right"
          style={{
            position: 'absolute', 
            top: 0, 
            left: '-50vw', 
            width: '100vw', 
            height: '100vh', 
            objectFit: 'cover',
            filter: 'brightness(0.3)', 
            animation: 'kenburns 20s ease-out forwards'
          }}
        />
        {/* Text centered on screen (0vw from left edge of right panel) */}
        {renderText(textRightRef, '0')}
      </div>
    </div>
  )
}

