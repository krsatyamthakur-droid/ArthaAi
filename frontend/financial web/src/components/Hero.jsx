import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import WorldMap from './WorldMap';
import './Hero.css';

gsap.registerPlugin();

const STATS = [
  { value: '2.4Cr+', label: 'Indian Investors', color: 'var(--orange)' },
  { value: '₹8,200Cr', label: 'Assets Tracked', color: 'var(--green)' },
  { value: '94%', label: 'Tax Save Accuracy', color: 'var(--orange)' },
  { value: '4.9★', label: 'User Rating', color: 'var(--green)' },
];

export default function Hero({ onOpenWaitlist }) {
  const sectionRef  = useRef(null);
  const taglineRef  = useRef(null);
  const headlineRef = useRef(null);
  const subRef      = useRef(null);
  const ctaRef      = useRef(null);
  const trustRef    = useRef(null);
  const visualRef   = useRef(null);
  const cardRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from(taglineRef.current,           { opacity: 0, y: 16, duration: 0.6 })
        .from(headlineRef.current?.children, { opacity: 0, y: 50, stagger: 0.1, duration: 0.75 }, '-=0.3')
        .from(subRef.current,               { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from(trustRef.current?.children,   { opacity: 0, y: 10, stagger: 0.06, duration: 0.4 }, '-=0.3')
        .from(visualRef.current,            { opacity: 0, x: 30, duration: 0.9, ease: 'power3.out' }, 0.3)
        .from(cardRef.current,              { opacity: 0, y: 20, scale: 0.95, duration: 0.7, ease: 'back.out(1.6)' }, 1.2);

      // Card gentle float — starts after card appears
      gsap.to(cardRef.current, {
        y: -10, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.8,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="hero section-light">
      <div className="hero-noise" />

      <div className="container hero-inner">
        {/* ── LEFT ── */}
        <div className="hero-content">
          <h1 ref={headlineRef} className="hero-h1">
            <span className="h1-line">Your Personal AI</span>
            <span className="h1-line">Financial Advisor</span>
            <span className="h1-line hero-h1-india">Built for India.</span>
          </h1>

          <p ref={subRef} className="hero-sub">
            Stop guessing with your money. ArthaMind AI analyses your income, loans,
            investments, taxes, and retirement — then tells you exactly what to do next.
          </p>
          <p className="hero-sub-line">Trusted by 2.4 Cr+ Indian investors. Zero jargon. Just clarity.</p>

          <div className="hero-ctas">
            <a href="#waitlist" onClick={(e) => { e.preventDefault(); onOpenWaitlist(); }} className="btn btn-orange hero-cta-main" id="hero-cta-primary">
              Join the Waitlist — Free <i className="fas fa-arrow-right" />
            </a>
          </div>

          <div ref={trustRef} className="hero-trust">
            <span className="trust-label">Secured & Regulated</span>
            {['SEBI Compliant', 'ISO 27001', 'RBI Sandbox', 'SOC 2 Type II'].map(t => (
              <span key={t} className="trust-badge">
                <i className="fas fa-shield-halved" />{t}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT — World map + floating card ── */}
        <div ref={visualRef} className="hero-visual">
          {/* World map dot grid */}
          <WorldMap />

          {/* Floating card on top of map */}
          <div ref={cardRef} className="hero-float-card">
            <div className="hfc-header">
              <div className="hfc-header-left">
                <div className="hfc-icon"><i className="fas fa-wallet" /></div>
                <div>
                  <div className="hfc-title">Portfolio Overview</div>
                  <div className="hfc-sub">April 2026 · All accounts</div>
                </div>
              </div>
              <span className="hfc-live">
                <span className="live-dot" /> Live
              </span>
            </div>

            <div className="hfc-rows">
              {[
                { flag: '🇮🇳', label: 'Equity Portfolio',  sub: 'Zerodha · NSE/BSE', amount: '₹7,72,300', chg: '+14.2%' },
                { flag: '📈', label: 'Mutual Funds',       sub: 'Groww · MF Central', amount: '₹2,98,450', chg: '+9.7%'  },
                { flag: '🥇', label: 'Gold / Bonds',       sub: 'SGBs · RBI Bonds',   amount: '₹1,77,610', chg: '+5.1%'  },
              ].map(row => (
                <div key={row.label} className="hfc-row">
                  <div className="hfc-row-left">
                    <span className="hfc-flag">{row.flag}</span>
                    <div>
                      <div className="hfc-row-label">{row.label}</div>
                      <div className="hfc-row-sub">{row.sub}</div>
                    </div>
                  </div>
                  <div className="hfc-row-right">
                    <div className="hfc-row-amount">{row.amount}</div>
                    <div className="hfc-row-change positive">{row.chg}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hfc-footer">
              <span className="hfc-tag completed"><i className="fas fa-check-circle" /> Synced</span>
              <span className="hfc-tag ai"><i className="fas fa-sparkles" /> AI Optimised</span>
              <span className="hfc-tag outgoing"><i className="fas fa-arrow-trend-up" /> +18.4% YTD</span>
            </div>
          </div>

          <div className="hero-pill pill-tl">
            <i className="fas fa-arrow-trend-up" style={{ color: 'var(--green)' }} />
            ₹2.1L tax saved this year
          </div>
          <div className="hero-pill pill-br">
            <i className="fas fa-percent" style={{ color: 'var(--orange)' }} />
            16.2% avg. return
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="hero-stats">
        {STATS.map(({ value, label, color }) => (
          <div key={label} className="stat-item">
            <span className="stat-value" style={{ color }}>{value}</span>
            <span className="stat-label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
