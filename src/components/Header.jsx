import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const menuCategories = [
    {
      title: 'Litigation',
      links: ['Corporate Disputes', 'Constitutional Matters', 'Arbitration & Mediation', 'Criminal Defence']
    },
    {
      title: 'Advisory',
      links: ['Mergers & Acquisitions', 'Regulatory Compliance', 'Tax Strategy', 'Real Estate']
    },
    {
      title: 'Firm',
      links: ['Our Heritage', 'Leadership Team', 'Pro Bono', 'Careers']
    }
  ]

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`} id="main-header">
        <div className="header__logo">SV&A</div>
        <nav className="header__nav">
          <span className="header__nav-link" onClick={() => setMenuOpen(true)}>Practice Areas</span>
          <span className="header__nav-link">Our Firm</span>
          <span className="header__nav-link">Insights</span>
          <span className="header__nav-link">Contact</span>
          <button className="header__cta">Schedule Consultation</button>
        </nav>
      </header>

      <div className={`mega-menu${menuOpen ? ' open' : ''}`} id="mega-menu">
        <div className="mega-menu__close" onClick={() => setMenuOpen(false)}>✕</div>
        <div className="mega-menu__grid">
          {menuCategories.map((cat, i) => (
            <div className="mega-menu__category" key={i}>
              <h3>{cat.title}</h3>
              {cat.links.map((link, j) => (
                <div className="mega-menu__link" key={j} onClick={() => setMenuOpen(false)}>
                  {link}
                  <span>→</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
