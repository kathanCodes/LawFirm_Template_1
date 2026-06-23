import { useEffect, useState } from 'react'

export default function Preloader({ progress, done }) {
  return (
    <div 
      className={`preloader${done ? ' done' : ''}`} 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        backgroundColor: '#0A1128', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        zIndex: 9999,
        transition: 'opacity 0.8s ease-in-out',
        opacity: done ? 0 : 1,
        pointerEvents: done ? 'none' : 'all'
      }}
    >
      <div 
        style={{ 
          position: 'relative', 
          height: '40vh', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          animation: 'pulse 2s infinite ease-in-out'
        }}
      >
        <img 
          src="/images/lady_justice.png" 
          alt="Lady Justice" 
          style={{ 
            height: '100%', 
            objectFit: 'contain', 
            filter: 'drop-shadow(0 0 30px rgba(184, 115, 51, 0.3))' 
          }} 
        />
      </div>
      <div 
        style={{ 
          marginTop: '40px', 
          fontFamily: '"Playfair Display", Georgia, serif', 
          color: '#B87333', 
          fontSize: '1.2rem', 
          letterSpacing: '0.3em', 
          textTransform: 'uppercase' 
        }}
      >
        {Math.round(progress)}%
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.02); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

