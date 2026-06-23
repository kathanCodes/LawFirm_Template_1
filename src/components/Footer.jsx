export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__brand">Sharma, Verma & Associates</div>
          <p className="footer__tagline">
            One of India's most distinguished law firms, with over four decades of 
            experience in high-stakes litigation, corporate advisory, and constitutional advocacy.
          </p>
        </div>

        <div className="footer__col">
          <h4>Practice</h4>
          <a href="#">Corporate Litigation</a>
          <a href="#">Constitutional Law</a>
          <a href="#">Intellectual Property</a>
          <a href="#">White Collar Defence</a>
          <a href="#">Arbitration</a>
        </div>

        <div className="footer__col">
          <h4>Firm</h4>
          <a href="#">Our Heritage</a>
          <a href="#">Leadership</a>
          <a href="#">Pro Bono</a>
          <a href="#">Careers</a>
          <a href="#">Insights</a>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <a href="#">New Delhi — HQ</a>
          <a href="#">Mumbai</a>
          <a href="#">Bengaluru</a>
          <a href="#">contact@sva-law.in</a>
          <a href="#">+91 11 4567 8900</a>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© 2026 Sharma, Verma & Associates. All Rights Reserved.</span>
        <span>Advocates & Solicitors — Bar Council of India</span>
      </div>
    </footer>
  )
}
