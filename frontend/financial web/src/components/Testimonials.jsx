import { useRef } from 'react';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Senior Software Engineer, Bengaluru',
    rating: 5,
    text: 'ArthaMind finally gave me clarity on my portfolio. Within a week, I discovered I was paying ₹34,000/yr in unnecessary STCG. The AI fixed it while I was on a call.',
  },
  {
    name: 'Rahul Mehta',
    role: 'Entrepreneur, Mumbai',
    rating: 5,
    text: 'Running multiple businesses means chaos across 11 accounts. ArthaMind unified everything and now I get a daily digest before my morning chai. My CA is impressed.',
  },
  {
    name: 'Deepika Nair',
    role: 'Doctor, Kochi',
    rating: 5,
    text: 'I asked in Malayalam-English mix: "should I top up my NPS this year?" and it gave me a specific answer with my exact numbers. Nothing else does this.',
  },
  {
    name: 'Arjun Kapoor',
    role: 'Finance Analyst, Delhi',
    rating: 5,
    text: 'The Monte Carlo risk simulation alone is worth the price. I sleep better knowing my corpus is stress-tested against 10,000 market scenarios every night.',
  },
  {
    name: 'Sunita Reddy',
    role: 'School Principal, Hyderabad',
    rating: 5,
    text: "I'm not a finance person at all. ArthaMind explained everything in simple Telugu-English and helped me set up goals for my daughter's education. Game changer!",
  },
  {
    name: 'Vikram Joshi',
    role: 'NRI Investor, Singapore',
    rating: 5,
    text: 'Managing Indian investments from abroad was stressful. ArthaMind tracks my NRE/NRO accounts, PPF, and holdings — all FEMA compliant.',
  },
];

export default function Testimonials() {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  const row1 = TESTIMONIALS.slice(0, half);
  const row2 = TESTIMONIALS.slice(half);

  return (
    <section id="testimonials" className="testimonials section-padding section-dark">
      <div className="dot-grid" />

      <div className="container">
        <div className="hiw-title-block">
          <p className="eyebrow eyebrow-dark">Social Proof</p>
          <h2 className="section-h2-dark">
            Trusted by investors<br />
            <span className="text-gradient">across every Indian city.</span>
          </h2>
        </div>
      </div>

      <div className="marquee-wrap">
        <div className="marquee-track testimonial-track">
          {[...row1, ...row1].map((t, i) => <TestCard key={`r1-${i}`} t={t} />)}
        </div>
      </div>

      <div className="marquee-wrap marquee-reverse">
        <div className="marquee-track marquee-track-reverse testimonial-track">
          {[...row2, ...row2].map((t, i) => <TestCard key={`r2-${i}`} t={t} />)}
        </div>
      </div>
    </section>
  );
}

function TestCard({ t }) {
  const initials = t.name.split(' ').map(n => n[0]).join('');
  return (
    <div className="testimonial-card">
      <div className="tc-header">
        <div className="tc-avatar">{initials}</div>
        <div>
          <div className="tc-name">{t.name}</div>
          <div className="tc-role">{t.role}</div>
        </div>
        <div className="tc-stars">
          {[...Array(t.rating)].map((_, i) => <i key={i} className="fas fa-star" />)}
        </div>
      </div>
      <p className="tc-text">"{t.text}"</p>
    </div>
  );
}
