import { useEffect, useRef } from 'react'

const QUOTE = "We do not merely practice law — we uphold the architecture of justice that our Republic was built upon. Every argument we craft, every precedent we cite, carries the weight of a Constitution forged in the fire of independence."

export default function Heritage() {
  const sectionRef = useRef(null)
  const emblemRef = useRef(null)
  const wordsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate emblem
            emblemRef.current?.classList.add('animate')

            // Animate words progressively
            wordsRef.current.forEach((word, i) => {
              setTimeout(() => {
                word?.classList.add('active')
              }, 300 + i * 80)
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const words = QUOTE.split(' ')

  return (
    <section className="heritage" ref={sectionRef} id="heritage-section">
      {/* Ashoka Stambh - SVG Line Art */}
      <div className="heritage__emblem" ref={emblemRef}>
        <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
          {/* Abacus / Platform */}
          <line x1="25" y1="145" x2="95" y2="145" />
          <line x1="20" y1="150" x2="100" y2="150" />
          <line x1="15" y1="155" x2="105" y2="155" />
          
          {/* Central Pillar */}
          <line x1="45" y1="145" x2="40" y2="110" />
          <line x1="75" y1="145" x2="80" y2="110" />
          
          {/* Capital Base */}
          <line x1="35" y1="110" x2="85" y2="110" />
          <line x1="33" y1="105" x2="87" y2="105" />
          
          {/* Bell Shape */}
          <path d="M 33 105 Q 35 95 40 90 Q 50 80 60 78 Q 70 80 80 90 Q 85 95 87 105" />
          
          {/* Dharma Chakra on abacus */}
          <circle cx="60" cy="95" r="8" />
          <line x1="60" y1="87" x2="60" y2="103" />
          <line x1="52" y1="95" x2="68" y2="95" />
          <line x1="54" y1="89" x2="66" y2="101" />
          <line x1="66" y1="89" x2="54" y2="101" />
          
          {/* Lions - Abstracted */}
          {/* Left Lion */}
          <path d="M 35 78 Q 30 70 32 60 Q 34 52 40 48 Q 44 46 46 50 Q 48 55 45 62 Q 42 68 40 78" />
          <circle cx="37" cy="54" r="3" />
          
          {/* Right Lion */}
          <path d="M 85 78 Q 90 70 88 60 Q 86 52 80 48 Q 76 46 74 50 Q 72 55 75 62 Q 78 68 80 78" />
          <circle cx="83" cy="54" r="3" />
          
          {/* Center Lion (front facing) */}
          <path d="M 50 48 Q 48 40 50 32 Q 52 26 56 22 Q 58 20 60 20 Q 62 20 64 22 Q 68 26 70 32 Q 72 40 70 48" />
          <circle cx="56" cy="32" r="2" />
          <circle cx="64" cy="32" r="2" />
          <path d="M 57 36 Q 60 38 63 36" />
          
          {/* Mane details */}
          <path d="M 48 38 Q 45 30 48 24 Q 52 18 60 16 Q 68 18 72 24 Q 75 30 72 38" />
          
          {/* Crown wheel */}
          <circle cx="60" cy="12" r="4" />
          <line x1="60" y1="8" x2="60" y2="4" />
          <line x1="56" y1="12" x2="52" y2="10" />
          <line x1="64" y1="12" x2="68" y2="10" />
        </svg>
      </div>

      {/* Manifesto */}
      <blockquote className="heritage__quote">
        {words.map((word, i) => (
          <span
            className="heritage__quote-word"
            key={i}
            ref={el => wordsRef.current[i] = el}
          >
            {word}
          </span>
        ))}
      </blockquote>

      <div className="heritage__attribution">— The Partners, Sharma, Verma & Associates</div>
    </section>
  )
}
