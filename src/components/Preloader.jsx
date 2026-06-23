import { useEffect, useState } from 'react'

export default function Preloader({ progress, done }) {
  return (
    <div 
      className={`preloader${done ? ' done' : ''}`} 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        backgroundColor: '#000000', 
        zIndex: 9999,
        transition: 'opacity 0.8s ease-in-out',
        opacity: done ? 0 : 1,
        pointerEvents: done ? 'none' : 'all',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Elegant Element on the Left */}
      <div 
        style={{
          position: 'absolute',
          left: '8vw',
          top: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* Glowing Copper Line */}
        <div style={{
          width: '1px',
          height: '100vh',
          background: 'linear-gradient(to bottom, transparent 10%, rgba(184, 115, 51, 0.4) 50%, transparent 90%)',
          marginRight: '4vw'
        }} />
        
        {/* Massive Faint Vertical Typography */}
        <div style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: '12vh',
          fontWeight: '700',
          letterSpacing: '0.15em',
          color: 'rgba(255, 255, 255, 0.03)',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          whiteSpace: 'nowrap',
          userSelect: 'none'
        }}>
          VERITAS ET AEQUITAS
        </div>
      </div>

      {/* Lady Justice Cut in Half */}
      <div 
        style={{ 
          position: 'absolute', 
          right: 0,
          bottom: 0,
          height: '100vh', 
          width: '50vw',
        }}
      >
        <img 
          src="/images/lady_justice.png" 
          alt="Lady Justice" 
          style={{ 
            height: '100%', 
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'center bottom',
            transform: 'translateX(45%)', /* Shifts image so center aligns with right edge */
            filter: 'drop-shadow(-20px 0 50px rgba(0, 0, 0, 0.8))' 
          }} 
        />
      </div>
    </div>
  )
}

