export default function TrustBar() {
  const items = [
    'Supreme Court Bar Association',
    'Forbes Legal 500',
    'Bar Council of India',
    'NITI Aayog Advisory',
    'ICC Arbitration',
    'Asia Law Profiles'
  ]

  return (
    <section className="trust-bar" id="trust-bar">
      <div className="trust-bar__inner">
        {items.map((item, i) => (
          <div className="trust-bar__item" key={i}>{item}</div>
        ))}
      </div>
    </section>
  )
}
