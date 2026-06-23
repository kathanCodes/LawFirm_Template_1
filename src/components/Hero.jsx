import { useRef, useEffect, useState } from 'react'

const PREAMBLE = `WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity; and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation; IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION. `

export default function Hero() {
  const heroRef = useRef(null)
  const lensRef = useRef(null)
  const borderRef = useRef(null)
  const [sublineVisible, setSublineVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setSublineVisible(true), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    const lens = lensRef.current
    const border = borderRef.current
    if (!hero || !lens || !border) return

    let rafId
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      lens.style.clipPath = `circle(130px at ${mouseX}px ${mouseY}px)`
      border.style.transform = `translate(${mouseX - 130}px, ${mouseY - 130}px)`
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

      {/* Layer 2: Blurred BG (Gray Area) */}
      <div className="hero__bg" />

      {/* Layer 3: Sharp Lens */}
      <div className="hero__lens" ref={lensRef} />

      {/* Lens Border */}
      <div className="hero__lens-border" ref={borderRef} />

      {/* Overlay */}
      <div className="hero__overlay" />

      {/* Content */}
      <div className="hero__content">
        <h1 className="hero__headline">
          We Navigate<br />the <em>Complex.</em>
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
      <div className="hero__scroll-indicator">
        <div className="hero__scroll-line" />
        <span className="hero__scroll-text">Scroll</span>
      </div>
    </section>
  )
}
