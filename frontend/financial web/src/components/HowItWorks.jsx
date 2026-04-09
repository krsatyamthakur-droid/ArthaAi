import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HowItWorks.css';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    icon: 'fas fa-plug-circle-bolt',
    label: 'Connect',
    title: 'Link all your accounts in seconds',
    desc: 'Securely connect Zerodha, Groww, CAMS, NSDL, and your bank accounts via encrypted OAuth. Zero credential storage — read-only access only.',
    features: ['Multi-broker sync', 'Bank-grade OAuth 2.0', 'Zero data stored on-device'],
    visual: <ConnectVisual />,
  },
  {
    num: '02',
    icon: 'fas fa-wand-magic-sparkles',
    label: 'Analyse',
    title: 'AI maps your entire net worth',
    desc: 'ArthaMind aggregates stocks, MFs, FDs, bonds, real estate, and gold — building a unified intelligence layer in under 60 seconds.',
    features: ['All asset classes unified', 'Real-time refresh', 'Tax-lot level tracking'],
    visual: <MapVisual />,
  },
  {
    num: '03',
    icon: 'fas fa-sparkles',
    label: 'Insight',
    title: 'Get your personalised AI digest daily',
    desc: "Every morning, ArthaMind surfaces tax-saving opportunities, rebalancing alerts, and goal progress — in plain Hindi or English.",
    features: ['Daily AI digest', 'Hinglish + English chat', 'Actionable goal tracking'],
    visual: <InsightVisual />,
  },
  {
    num: '04',
    icon: 'fas fa-bolt',
    label: 'Execute',
    title: 'Act on insights in one click',
    desc: 'Place SIPs, rebalance portfolios, or file your taxes — all from within ArthaMind, backed by SEBI-registered advisors.',
    features: ['SIP automation', 'One-click rebalancing', 'Integrated tax filing'],
    visual: <ExecuteVisual />,
  },
];

/* ─── Mini Visual Components ─── */

function ConnectVisual() {
  const brokers = [
    { name: 'Zerodha', color: '#387ed1', abbr: 'Z' },
    { name: 'Groww', color: '#00B386', abbr: 'G' },
    { name: 'CAMS', color: '#E8501A', abbr: 'C' },
    { name: 'SBI', color: '#2563eb', abbr: 'S' },
    { name: 'HDFC', color: '#d32f2f', abbr: 'H' },
  ];
  return (
    <div className="cv-wrap">
      <div className="cv-center">
        <i className="fas fa-brain-circuit" />
        <span>ArthaMind</span>
      </div>
      <div className="cv-ring">
        {brokers.map((b, i) => (
          <div
            key={b.name}
            className="cv-node"
            style={{
              '--angle': `${(i / brokers.length) * 360}deg`,
              '--color': b.color,
              '--d': `${i * 0.18}s`,
            }}
          >
            <div className="cv-node-avatar">{b.abbr}</div>
            <span className="cv-node-label">{b.name}</span>
            <div className="cv-line" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MapVisual() {
  const assets = [
    { label: 'Equity', pct: 55, val: '₹12.4L', color: '#E8501A' },
    { label: 'Mutual Funds', pct: 22, val: '₹4.9L', color: '#00C896' },
    { label: 'FD / Bonds', pct: 15, val: '₹3.3L', color: '#F59E0B' },
    { label: 'Gold', pct: 8, val: '₹1.8L', color: '#FACC15' },
  ];
  return (
    <div className="mv-wrap">
      <div className="mv-header">
        <span className="mv-label">Net Worth</span>
        <span className="mv-value">₹22.4L</span>
        <span className="mv-change positive">↑ 14.2% YTD</span>
      </div>
      <div className="mv-bars">
        {assets.map((a) => (
          <div key={a.label} className="mv-row">
            <div className="mv-row-meta">
              <span className="mv-dot" style={{ background: a.color }} />
              <span className="mv-name">{a.label}</span>
              <span className="mv-pct">{a.pct}%</span>
            </div>
            <div className="mv-track">
              <div className="mv-fill" style={{ width: `${a.pct}%`, background: a.color }} />
            </div>
            <span className="mv-val">{a.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightVisual() {
  const chips = [
    { icon: '💡', text: 'Move ₹50K → Nifty 50 index. Save ₹8,200 STCG tax', type: 'tip' },
    { icon: '⚠️', text: 'Retirement goal underfunded — increase SIP ₹2,000/mo', type: 'warn' },
    { icon: '✅', text: 'Emergency fund: 100% complete · 6.2 months covered', type: 'ok' },
  ];
  return (
    <div className="iv-wrap">
      <div className="iv-topbar">
        <span className="iv-dot-live" /><span className="iv-live-label">AI Digest • Today</span>
      </div>
      {chips.map((c, i) => (
        <div key={i} className={`iv-chip iv-${c.type}`} style={{ '--d': `${i * 0.12}s` }}>
          <span className="iv-emoji">{c.icon}</span>
          <span className="iv-text">{c.text}</span>
        </div>
      ))}
    </div>
  );
}

function ExecuteVisual() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setDone((d) => !d), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="ev-wrap">
      <div className="ev-action-row">
        <div className="ev-icon-wrap">
          <i className="fas fa-circle-arrow-up" style={{ color: '#00C896' }} />
        </div>
        <div className="ev-action-text">
          <div className="ev-action-title">Start SIP — Parag Parikh Flexi Cap</div>
          <div className="ev-action-sub">₹5,000 / month · Goal: Retirement 2045</div>
        </div>
      </div>
      <div className={`ev-btn ${done ? 'ev-btn-done' : ''}`}>
        {done ? <><i className="fas fa-check" /> Executed!</> : <>Execute Now →</>}
      </div>
      <div className={`ev-status ${done ? 'ev-status-show' : ''}`}>
        <i className="fas fa-check-circle" />
        <span>Order placed · Mandate registered · Goal updated</span>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 82%' },
      });

      // Timeline line grow
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: lineRef.current, start: 'top 75%' },
      });

      // Cards stagger
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          x: i % 2 === 0 ? -40 : 40,
          duration: 0.8,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 95%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="how-it-works section-padding section-dark">
      {/* Background decoration */}
      <div className="hiw-bg-glow" />
      <div className="dot-grid" />

      <div className="container">
        {/* Title */}
        <div className="hiw-title-block" ref={titleRef}>
          <div className="hiw-eyebrow">
            <i className="fas fa-route" />
            How It Works
          </div>
          <h2 className="hiw-h2">
            From zero to financially{' '}
            <span className="text-gradient">brilliant in 4 steps.</span>
          </h2>
          <p className="hiw-sub">
            Works with your existing accounts and investments — no migration, no friction.
          </p>
        </div>

        {/* Steps */}
        <div className="hiw-steps">
          {/* Vertical connector line */}
          <div className="hiw-line" ref={lineRef} />

          {STEPS.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`hiw-step ${i % 2 !== 0 ? 'hiw-step-flip' : ''}`}
            >
              {/* Left / Right: Content */}
              <div className="hiw-content">
                <div className="hiw-num-badge">
                  <span className="hiw-step-num">{step.num}</span>
                  <span className="hiw-step-label">{step.label}</span>
                </div>
                <div className="hiw-step-icon">
                  <i className={step.icon} />
                </div>
                <h3 className="hiw-step-title">{step.title}</h3>
                <p className="hiw-step-desc">{step.desc}</p>
                <ul className="hiw-features">
                  {step.features.map((f) => (
                    <li key={f}>
                      <i className="fas fa-circle-check" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Center: Step dot on the timeline */}
              <div className="hiw-dot-col">
                <div className="hiw-timeline-dot">
                  <i className={step.icon} />
                </div>
              </div>

              {/* Right / Left: Visual panel */}
              <div className="hiw-visual-panel">
                {step.visual}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
