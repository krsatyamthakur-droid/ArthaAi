import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Pricing.css';

const PLANS = [
  {
    name: 'Artha Lite',
    price: '₹0',
    period: 'Forever free',
    desc: 'Perfect for first-time investors getting started with tracking.',
    features: [
      'Portfolio tracking (up to 2 accounts)',
      'Net worth dashboard',
      'Basic goal planning (2 goals)',
      'Monthly AI digest — email',
      'Community access',
    ],
    absent: ['Tax optimisation', 'Advanced AI chat', 'SIP automation', 'Priority support'],
    cta: 'Start Free',
    featured: false,
  },
  {
    name: 'Artha Pro',
    price: '₹399',
    period: 'per month',
    tag: 'Most Popular',
    desc: 'Full AI-powered intelligence across every financial decision.',
    features: [
      'Unlimited account connections',
      'Real-time portfolio intelligence',
      'AI tax optimisation engine',
      'Unlimited goal planning',
      'Daily AI digest (app + WhatsApp)',
      'Natural language finance chat',
      'SIP & mandate execution',
      'ITR-ready tax report',
      'Priority support',
    ],
    absent: [],
    cta: 'Join Waitlist',
    featured: true,
  },
  {
    name: 'Artha Family',
    price: '₹599',
    period: 'per month',
    desc: 'A full financial OS for the entire family — every member gets their own AI advisor.',
    features: [
      'Everything in Artha Pro',
      'Up to 5 family members',
      'Shared family net worth view',
      'Joint goal planning',
      'Inheritance & succession planning',
      'Dedicated relationship manager',
      'Quarterly strategy call',
    ],
    absent: [],
    cta: 'Join Waitlist',
    featured: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const gridRef    = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.pricing-card');
    if (!cards?.length) return;

    // Title animation via IntersectionObserver
    const titleObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            titleRef.current?.children,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out' }
          );
          titleObs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (titleRef.current) titleObs.observe(titleRef.current);

    // Cards animation
    const cardsObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 50, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.7, ease: 'back.out(1.4)' }
          );
          cardsObs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (gridRef.current) cardsObs.observe(gridRef.current);

    return () => {
      titleObs.disconnect();
      cardsObs.disconnect();
    };
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="pricing section-padding section-light">
      <div className="container">

        {/* Title */}
        <div ref={titleRef} className="section-title-block">
          <p className="eyebrow">Pricing</p>
          <h2 className="section-h2-light">
            Transparent pricing,<br />
            <span className="text-gradient-orange">exceptional value.</span>
          </h2>
          <p className="section-sub">
            Start free. Upgrade when your financial life demands more intelligence.
            Cancel anytime — no lock-ins, no contracts.
          </p>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="pricing-grid">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card ${plan.featured ? 'pricing-featured' : ''}`}
            >
              {plan.tag && <div className="pricing-badge">{plan.tag}</div>}

              <div className="pricing-header">
                <span className="plan-name">{plan.name}</span>
                <div className="plan-price-row">
                  <span className="plan-price">{plan.price}</span>
                  <span className="plan-period">{plan.period}</span>
                </div>
                <p className="plan-desc">{plan.desc}</p>
              </div>

              <a
                href="#waitlist"
                className={`btn pricing-cta ${plan.featured ? 'btn-orange' : 'btn-outline-light'}`}
                id={`plan-cta-${plan.name.replace(/\s/g, '-').toLowerCase()}`}
              >
                {plan.cta} <i className="fas fa-arrow-right" />
              </a>

              <div className="plan-divider" />

              <div className="plan-features">
                {plan.features.map((f) => (
                  <div key={f} className="plan-feature plan-yes">
                    <i className="fas fa-check" />
                    <span>{f}</span>
                  </div>
                ))}
                {plan.absent.map((f) => (
                  <div key={f} className="plan-feature plan-no">
                    <i className="fas fa-xmark" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <p className="pricing-note">
          <i className="fas fa-shield-halved" />
          All plans include bank-grade 256-bit encryption, SEBI compliance, and a 7-day money-back guarantee.
        </p>
      </div>
    </section>
  );
}
