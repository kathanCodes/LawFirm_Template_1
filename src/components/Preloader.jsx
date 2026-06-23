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
            objectPosition: 'right bottom',
            filter: 'drop-shadow(-20px 0 50px rgba(0, 0, 0, 0.8))' 
          }} 
        />
      </div>
    </div>
  )
}

