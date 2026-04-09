import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Features.css';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: 'fas fa-chart-pie',
    title: 'Smart Dashboard',
    desc: 'Income, expenses, savings rate, EMI burden, investment value, health score and AI-generated insights — all updated in real time.',
    tags: ['Real-time', 'All-in-one', 'AI Insights'],
    stat: 'Live sync',
  },
  {
    icon: 'fas fa-building-columns',
    title: 'EMI & Loan Manager',
    desc: 'Tracks all your loans in one place. Shows exact outstanding amount, monthly EMI, interest paid, and amortisation schedule.',
    tags: ['Prepayment simulator', 'Loan comparison', 'AI insights'],
    stat: 'Live tracking',
  },
  {
    icon: 'fas fa-chart-line-up',
    title: 'Investment Portfolio Tracker',
    desc: 'Add SIPs, MFs, stocks, FDs, PPF, NPS. See projected maturity value, total gains, and inflation-adjusted real value.',
    tags: ['Asset allocation', 'AI rebalancing', 'Real returns'],
    stat: '100% automated',
  },
  {
    icon: 'fas fa-bullseye-arrow',
    title: 'Goal Planner',
    desc: 'Set financial goals like buying a house or child\'s education. Calculates exact monthly SIP needed and feasibility status.',
    tags: ['SIP calculator', 'Inflation adjusted', 'Risk alerts'],
    stat: 'Smart tracking',
  },
  {
    icon: 'fas fa-heart-pulse',
    title: 'Financial Health Score',
    desc: 'Score from 0 to 100 based on 6 pillars: savings ratio, EMI burden, investment ratio, emergency fund, and wealth building rate.',
    tags: ['6 Pillars', 'AI tips', 'Personalised'],
    stat: 'Instant score',
  },
  {
    icon: 'fas fa-house-chimney-heart',
    title: 'Retirement Planner',
    desc: 'Calculates how much corpus you need to retire comfortably. Shows 3 scenarios accounting for inflation and life expectancy.',
    tags: ['Corpus calculator', 'Inflation model', 'SIP required'],
    stat: 'Life planning',
  },
  {
    icon: 'fas fa-umbrella',
    title: 'Insurance Coverage Analyser',
    desc: 'Calculates your Human Life Value and recommended term/health cover. Shows exact coverage gap and protection score.',
    tags: ['HLV Calculator', 'Gap analysis', 'AI advice'],
    stat: '100% protection',
  },
  {
    icon: 'fas fa-people-group',
    title: 'Family Income Analyser',
    desc: 'Analyses multi-earner household income. Shows dependency ratio, savings rate, and financial stress index per family.',
    tags: ['Household view', 'Dependency ratio', 'Savings rate'],
    stat: 'Family overview',
  },
  {
    icon: 'fas fa-arrow-trend-up',
    title: 'Career Income Projection',
    desc: 'Projects salary and wealth over 10 years. Compares passive growth vs job-switching. AI tells you optimal switch timing.',
    tags: ['10-year projection', 'Job switch vs stay', 'Upskill strategy'],
    stat: 'Career planning',
  },
  {
    icon: 'fas fa-radar',
    title: 'Financial Risk Radar',
    desc: 'Spider chart showing 5 risk dimensions. Get an overall risk score and 3 immediate actions to reduce biggest risks.',
    tags: ['5 dimensions', 'Risk score', 'Actionable steps'],
    stat: 'Real-time alerts',
  },
  {
    icon: 'fas fa-gem',
    title: 'Net Worth Tracker',
    desc: 'Enter all assets and liabilities to see your actual wealth, debt-to-asset ratio, and financial grade over 5 years.',
    tags: ['Assets vs Debt', 'Financial grade', 'Wealth growth'],
    stat: 'Total tracking',
  },
  {
    icon: 'fas fa-file-invoice-dollar',
    title: 'Tax Optimiser',
    desc: 'Compares Old vs New Regime (FY 25-26). Highlights unused 80C, 80D, NPS deductions. AI tells you how to reduce tax legally.',
    tags: ['Old vs New', '80C & 80D gap', 'Legal savings'],
    stat: 'Max savings',
  },
  {
    icon: 'fas fa-head-side-brain',
    title: 'AI Financial Advisor Chat',
    desc: 'Real-time AI powered by Groq LLaMA3. Ask context-aware questions personalised to your exact data and goals.',
    tags: ['LLaMA3 powered', 'Context aware', 'On demand'],
    stat: 'Instant replies',
  },
  {
    icon: 'fas fa-graduation-cap',
    title: 'Education Cost Planner',
    desc: 'Projects future education costs factoring in 7–10% inflation. Benchmarks IIT, medical, or study abroad targets.',
    tags: ['Education inflation', 'SIP required', 'Global benchmarks'],
    stat: 'Child future',
  },
  {
    icon: 'fas fa-chart-candlestick',
    title: 'Market Data Dashboard',
    desc: 'Displays RBI repo rate, CPI inflation, USD/INR rate, gold prices, and FD rates to provide macro context for decisions.',
    tags: ['RBI Repo', 'CPI Inflation', 'Live FD Rates'],
    stat: 'Live data',
  },
];

const PROBLEM_SOLUTIONS = [
  {
    icon: 'fas fa-chart-scatter',
    problem: 'Scattered data across 10+ financial apps, brokers, and banks.',
    solution: '100% automated consolidation in one live performance dashboard.'
  },
  {
    icon: 'fas fa-calculator',
    problem: 'Guessing tax regimes and missing Section 80C/80D deductions.',
    solution: 'AI tax engine computes exact optimal regimes and finds hidden savings.'
  },
  {
    icon: 'fas fa-route',
    problem: 'Investing blindly without knowing if you\'ll hit your life goals.',
    solution: 'Inflation-adjusted planners tell you the exact SIP amount needed.'
  }
];

export default function Features() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {

    // Title animation
    const titleObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const tl = gsap.timeline();
          tl.fromTo(titleRef.current?.querySelector('.eyebrow'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
          )
          .fromTo(headlineRef.current?.children,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out' },
            '-=0.2'
          )
          .fromTo(titleRef.current?.querySelector('.section-sub'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            '-=0.4'
          )
          .fromTo(titleRef.current?.querySelector('.features-ps-grid'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.4'
          );
          
          titleObs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (titleRef.current) titleObs.observe(titleRef.current);

    return () => {
      titleObs.disconnect();
    };
  }, []);

  return (
    <section id="features" ref={sectionRef} className="features section-padding section-light-alt">
      <div className="container">
        <div ref={titleRef} className="section-title-block">
          <p className="eyebrow">Platform Features</p>
          <h2 ref={headlineRef} className="section-h2-light" style={{ fontWeight: 800 }}>
            <span style={{ display: 'block' }}>Everything your wealth needs,</span>
            <span className="text-gradient-orange" style={{ display: 'block' }}>nothing you don&apos;t.</span>
          </h2>
          <p className="section-sub">
            Fifteen powerful modules working in unison — purpose-built for the complexities
            of the Indian financial ecosystem.
          </p>
        </div>

        <div className="features-ps-grid">
          {PROBLEM_SOLUTIONS.map((item, i) => (
            <div key={i} className="features-ps-card">
              <div className="ps-icon"><i className={item.icon} /></div>
              <div className="ps-content">
                <div className="ps-block ps-problem-block">
                  <h4 className="ps-headline ps-red">Problem</h4>
                  <p className="ps-text strike-through">{item.problem}</p>
                </div>
                <div className="ps-block ps-solution-block">
                  <h4 className="ps-headline ps-green">Solution</h4>
                  <p className="ps-text">{item.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="features-marquee-wrapper w-full px-0 mx-0">
        {/* Row 1 - Slides Left (Standard) */}
        <div className="marquee-wrap">
            <div className="marquee-track features-track">
              {[...FEATURES.slice(0, 8), ...FEATURES.slice(0, 8)].map((f, i) => (
                <div key={`${f.title}-${i}`} className="feature-card">
                  <div className="feature-card-top">
                    <div className="feature-icon-wrap">
                      <i className={f.icon} />
                    </div>
                    <span className="feature-stat">{f.stat}</span>
                  </div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                  <div className="feature-tags">
                    {f.tags.map((t) => (
                      <span key={t} className="feature-tag">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Slides Right (Reverse) */}
          <div className="marquee-wrap marquee-reverse">
            <div className="marquee-track marquee-track-reverse features-track">
              {[...FEATURES.slice(8, 15), ...FEATURES.slice(8, 15)].map((f, i) => (
                <div key={`${f.title}-r2-${i}`} className="feature-card">
                  <div className="feature-card-top">
                    <div className="feature-icon-wrap">
                      <i className={f.icon} />
                    </div>
                    <span className="feature-stat">{f.stat}</span>
                  </div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                  <div className="feature-tags">
                    {f.tags.map((t) => (
                      <span key={t} className="feature-tag">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}
