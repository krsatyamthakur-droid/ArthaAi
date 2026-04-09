import './Footer.css';

const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Roadmap', 'Security', 'Changelog'],
  Company: ['About Us', 'Careers', 'Blog', 'Press Kit', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'SEBI Disclosure', 'Cookie Policy'],
  Connect: ['Twitter / X', 'LinkedIn', 'WhatsApp Channel', 'YouTube'],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        {/* Brand column */}
        <div className="footer-brand">
          <a href="#" className="footer-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="url(#fLogoGrad)" />
              <path d="M8 18 L14 8 L20 18" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="14" cy="19" r="1.5" fill="#FFD700"/>
              <defs>
                <linearGradient id="fLogoGrad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#5C6BC0"/>
                  <stop offset="1" stopColor="#26A69A"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="footer-logo-text">ArthaMind <span className="footer-logo-ai">AI</span></span>
          </a>
          <p className="footer-tagline">
            India's most intelligent personal finance platform. Built for the modern Indian investor.
          </p>
          <div className="footer-social">
            {[
              { icon: 'fa-brands fa-x-twitter', href: '#', label: 'Twitter' },
              { icon: 'fa-brands fa-linkedin-in', href: '#', label: 'LinkedIn' },
              { icon: 'fa-brands fa-youtube', href: '#', label: 'YouTube' },
              { icon: 'fa-brands fa-whatsapp', href: '#', label: 'WhatsApp' },
            ].map(({ icon, href, label }) => (
              <a key={label} href={href} className="social-btn" aria-label={label} id={`footer-social-${label.toLowerCase()}`}>
                <i className={icon} />
              </a>
            ))}
          </div>
          <div style={{ marginTop: '24px', color: 'var(--text-light-2)', fontSize: '14.5px', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ textTransform: 'capitalize' }}>shreyash singh</span>
            <span>+91 91795 57033</span>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading} className="footer-col">
            <h4 className="footer-col-title">{heading}</h4>
            <ul className="footer-col-links">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="footer-link">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">
            © 2026 ArthaMind AI Technologies Pvt. Ltd. · SEBI Registered IA · CIN: U72900KA2026PTC000001
          </p>
          <div className="footer-compliance">
            <span><i className="fas fa-shield-halved" style={{ color: 'var(--accent-teal)', marginRight: 5 }} />SEBI Compliant</span>
            <span><i className="fas fa-lock" style={{ color: 'var(--accent-indigo-light)', marginRight: 5 }} />256-bit Encrypted</span>
            <span><i className="fas fa-flag" style={{ color: '#FF9933', marginRight: 5 }} />Made in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
