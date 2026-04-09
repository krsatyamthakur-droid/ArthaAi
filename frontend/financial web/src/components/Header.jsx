import { useEffect, useRef, useState } from 'react';
import './Header.css';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#testimonials' },
];

export default function Header({ onOpenWaitlist }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#" className="header-logo" onClick={(e) => handleNavClick(e, 'body')}>
          <div className="logo-mark">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="url(#logoGrad)" />
              <path d="M8 18 L14 8 L20 18" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="14" cy="19" r="1.5" fill="#fff"/>
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E8501A"/>
                  <stop offset="1" stopColor="#FF7A45"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span>ArthaMind <span className="logo-ai">AI</span></span>
        </a>

        <nav className="header-nav">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link" onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <button onClick={onOpenWaitlist} className="header-cta" id="header-cta">
            Join Waitlist →
          </button>
        </div>
      </div>
    </header>
  );
}
