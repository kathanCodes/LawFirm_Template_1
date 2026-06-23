import { useEffect, useRef } from 'react'

const practices = [
  {
    title: 'Corporate Litigation',
    desc: 'Strategic representation in high-stakes commercial disputes, shareholder actions, and regulatory enforcement across Indian courts.',
    image: '/images/practice_pen_nib.png'
  },
  {
    title: 'Constitutional Law',
    desc: 'Defending fundamental rights and shaping constitutional jurisprudence before the Supreme Court and High Courts of India.',
    image: '/images/practice_courthouse.png'
  },
  {
    title: 'Intellectual Property',
    desc: 'Comprehensive IP strategy, from patent prosecution to trade secret litigation, protecting innovation across borders.',
    image: '/images/practice_legal_paper.png'
  },
  {
    title: 'White Collar Defence',
    desc: 'Sophisticated defence in complex financial crime, regulatory investigations, and anti-corruption proceedings.',
    image: '/images/practice_books.png'
  }
]

export default function PracticeAreas() {
  const sectionRef = useRef(null)
  const shadowRef = useRef(null)

  useEffect(() => {
    // Subtle swinging shadow animation
    let angle = 0
    let rafId
    const animate = () => {
      angle += 0.003
      if (shadowRef.current) {
        const swing = Math.sin(angle) * 3
        shadowRef.current.style.transform = `translate(-50%, -50%) rotate(${swing}deg)`
      }
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    const cards = sectionRef.current?.querySelectorAll('.reveal')
    cards?.forEach(card => observer.observe(card))
    return () => cards?.forEach(card => observer.unobserve(card))
  }, [])

  return (
    <section className="practice" ref={sectionRef} id="practice-areas">
      {/* Shadow of Equity - Abstract Lady Justice */}
      <div className="practice__shadow" ref={shadowRef}>
        <div className="practice__shadow-scale" />
        <div className="practice__shadow-arm" />
        <div className="practice__shadow-pan-left" />
        <div className="practice__shadow-pan-right" />
      </div>

      <div className="practice__header reveal">
        <div className="practice__label">Areas of Expertise</div>
        <h2 className="practice__title">Precision Across Every Domain of Law</h2>
      </div>

      <div className="practice__grid">
        {practices.map((p, i) => (
          <div className="practice__card reveal" key={i} style={{ transitionDelay: `${i * 0.15}s` }}>
            <div className="practice__card-image" style={{ backgroundImage: `url(${p.image})` }} />
            <div className="practice__card-overlay" />
            <div className="practice__card-content">
              <div className="practice__card-number">0{i + 1}</div>
              <h3 className="practice__card-title">{p.title}</h3>
              <p className="practice__card-desc">{p.desc}</p>
              <div className="practice__card-link">Consult Partner →</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
