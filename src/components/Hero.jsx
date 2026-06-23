import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

const PREAMBLE = `WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity; and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation; IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION. `

// Scramble text utility
const chars = '!<>-_\\\\/[]{}—=+*^?#________';
function scrambleText(element, newText, duration = 1) {
  let frame = 0;
  const queue = [];
  for (let i = 0; i < newText.length; i++) {
    queue.push({ from: chars[Math.floor(Math.random() * chars.length)], to: newText[i], start: Math.floor(Math.random() * 40), end: Math.floor(Math.random() * 40) + 20 });
  }
  
  const update = () => {
    let output = '';
    let complete = 0;
    for (let i = 0, n = queue.length; i < n; i++) {
      let { from, to, start, end, char } = queue[i];
      if (frame >= end) {
        complete++;
        output += to;
      } else if (frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = chars[Math.floor(Math.random() * chars.length)];
          queue[i].char = char;
        }
        output += `<span style="color: rgba(255,255,255,0.4)">${char}</span>`;
      } else {
        output += from;
      }
    }
    element.innerHTML = output;
    if (complete === queue.length) {
      // Done
    } else {
      frame++;
      requestAnimationFrame(update);
    }
  };
  update();
}

export default function Hero() {
  const heroRef = useRef(null)
  const lensContainerRef = useRef(null)
  const borderRef = useRef(null)
  const complexRef = useRef(null)
  const [sublineVisible, setSublineVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSublineVisible(true)
      if (complexRef.current) {
        scrambleText(complexRef.current, "Complex.");
      }
    }, 2000) // Trigger after preloader finishes
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    const lens = lensContainerRef.current
    const border = borderRef.current
    if (!hero || !lens || !border) return

    let rafId
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let targetX = mouseX
    let targetY = mouseY

    const onMouseMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const animate = () => {
      // Smooth lerp for lens following
      mouseX += (targetX - mouseX) * 0.15;
      mouseY += (targetY - mouseY) * 0.15;

      lens.style.clipPath = `circle(150px at ${mouseX}px ${mouseY}px)`
      border.style.transform = `translate(${mouseX - 150}px, ${mouseY - 150}px)`
      border.style.left = '0'
      border.style.top = '0'
      rafId = requestAnimationFrame(animate)
    }

    hero.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(animate)

    return () => {
      hero.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const preambleRepeated = (PREAMBLE + ' ').repeat(12)

  return (
    <section className="hero" ref={heroRef} id="hero-section">
      {/* Layer 1: Preamble Text */}
      <div className="hero__preamble" aria-hidden="true">
        {preambleRepeated}
      </div>

      {/* Layer 2: Background Video (Dark, Desaturated) */}
      <video 
        className="hero__bg-video"
        autoPlay loop muted playsInline
        src="/videos/hero-bg.mp4"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          filter: 'grayscale(0.8) brightness(0.4) contrast(1.2)', zIndex: 2
        }}
      />

      {/* Hero Overlay for strict WCAG contrast */}
      <div className="hero__overlay" style={{
        position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.9) 100%)'
      }} />

      {/* Layer 3: Interactive Portal Lens Container */}
      <div className="hero__lens-container" ref={lensContainerRef} style={{
        position: 'absolute', inset: 0, zIndex: 4, willChange: 'clip-path'
      }}>
        <video 
          className="hero__lens-video"
          autoPlay loop muted playsInline
          src="/videos/hero-bg.mp4"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            transform: 'scale(1.15)', /* Magnifying effect */
            filter: 'grayscale(0.2) brightness(0.9) contrast(1.1)' /* Richer, vivid glimpse */
          }}
        />
      </div>

      {/* Lens Border */}
      <div className="hero__lens-border" ref={borderRef} style={{
        position: 'absolute', width: '300px', height: '300px', borderRadius: '50%',
        border: '1px solid rgba(184, 115, 51, 0.4)', boxShadow: 'inset 0 0 40px rgba(184, 115, 51, 0.2), 0 0 60px rgba(0,0,0,0.8)',
        pointerEvents: 'none', zIndex: 5, transform: 'translate(-50%, -50%)',
        backdropFilter: 'blur(2px)'
      }} />

      {/* Content */}
      <div className="hero__content" style={{ zIndex: 6 }}>
        <h1 className="hero__headline">
          We Navigate<br />the <em 
            ref={complexRef} 
            className="hero__complex-word"
            style={{ 
              display: 'inline-block', fontStyle: 'italic', color: '#B87333', 
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'pointer' 
            }}
            onMouseEnter={(e) => {
              e.target.style.fontFamily = 'var(--font-sans)';
              e.target.style.fontStyle = 'normal';
              e.target.style.letterSpacing = '-0.05em';
              e.target.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.target.style.fontFamily = 'inherit';
              e.target.style.fontStyle = 'italic';
              e.target.style.letterSpacing = 'normal';
              e.target.style.color = '#B87333';
            }}
          >
            Complex.
          </em>
        </h1>
        <p className="hero__subline">
          <span className={sublineVisible ? 'visible' : ''} style={{ transitionDelay: '0.1s' }}>Rooted&nbsp;</span>
          <span className={sublineVisible ? 'visible' : ''} style={{ transitionDelay: '0.2s' }}>in&nbsp;</span>
          <span className={sublineVisible ? 'visible' : ''} style={{ transitionDelay: '0.3s' }}>Law.&nbsp;&nbsp;</span>
          <span className={sublineVisible ? 'visible' : ''} style={{ transitionDelay: '0.5s' }}>Driven&nbsp;</span>
          <span className={sublineVisible ? 'visible' : ''} style={{ transitionDelay: '0.6s' }}>by&nbsp;</span>
          <span className={sublineVisible ? 'visible' : ''} style={{ transitionDelay: '0.7s' }}>Strategy.</span>
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll-indicator" style={{ zIndex: 6 }}>
        <div className="hero__scroll-line" />
        <span className="hero__scroll-text">Scroll</span>
      </div>
    </section>
  )
}
