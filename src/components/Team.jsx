import { useEffect, useRef } from 'react'

const attorneys = [
  {
    name: 'Arjun Sharma',
    title: 'Managing Partner — Corporate Litigation',
    serious: '/images/attorney_1_serious.png',
    smile: '/images/attorney_1_smile.png'
  },
  {
    name: 'Priya Verma',
    title: 'Senior Partner — Constitutional Law',
    serious: '/images/attorney_2_serious.png',
    smile: '/images/attorney_2_smile.png'
  },
  {
    name: 'Rajesh Kapoor',
    title: 'Senior Partner — White Collar Defence',
    serious: '/images/attorney_3_serious.png',
    smile: '/images/attorney_3_smile.png'
  }
]

export default function Team() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    const els = sectionRef.current?.querySelectorAll('.reveal')
    els?.forEach(el => observer.observe(el))
    return () => els?.forEach(el => observer.unobserve(el))
  }, [])

  return (
    <section className="team" ref={sectionRef} id="team-section">
      <div className="team__header reveal">
        <div className="team__label">Leadership</div>
        <h2 className="team__title">The Minds Behind the Mandate</h2>
      </div>

      <div className="team__grid">
        {attorneys.map((a, i) => (
          <div className="team__card reveal" key={i} style={{ transitionDelay: `${i * 0.15}s` }}>
            {/* Smile layer (underneath) */}
            <div className="team__card-img team__card-img--smile" style={{ backgroundImage: `url(${a.smile})` }} />
            {/* Serious layer (on top, fades out on hover) */}
            <div className="team__card-img team__card-img--serious" style={{ backgroundImage: `url(${a.serious})` }} />
            <div className="team__card-info">
              <div className="team__card-name">{a.name}</div>
              <div className="team__card-title">{a.title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
