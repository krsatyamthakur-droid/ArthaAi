import { useState } from 'react';
import './FinancialAssessment.css';

const QUESTIONS = [
  {
    id: 1,
    category: 'Income',
    icon: 'fas fa-indian-rupee-sign',
    question: 'What is your monthly take-home income?',
    options: ['Under ₹30,000', '₹30,000 – ₹75,000', '₹75,000 – ₹1.5L', 'Above ₹1.5L'],
  },
  {
    id: 2,
    category: 'Savings',
    icon: 'fas fa-piggy-bank',
    question: 'What percentage of your income do you currently save?',
    options: ['Less than 5%', '5% – 15%', '15% – 30%', 'More than 30%'],
  },
  {
    id: 3,
    category: 'Investments',
    icon: 'fas fa-chart-line',
    question: 'Which investment instruments do you currently use?',
    options: ['Only FD / Savings', 'Mutual Funds / SIPs', 'Stocks + MFs', 'Stocks, MFs, Real Estate & more'],
  },
  {
    id: 4,
    category: 'Debt',
    icon: 'fas fa-credit-card',
    question: 'Do you have any active loans or EMIs?',
    options: ['No loans at all', 'Home loan only', 'Car / Personal loan', 'Multiple loans'],
  },
  {
    id: 5,
    category: 'Emergency Fund',
    icon: 'fas fa-shield-halved',
    question: 'How many months of expenses do you have as an emergency fund?',
    options: ['None', '1 – 2 months', '3 – 4 months', '6+ months'],
  },
  {
    id: 6,
    category: 'Taxes',
    icon: 'fas fa-file-invoice',
    question: 'Do you actively plan your taxes before the financial year ends?',
    options: ['Never thought about it', 'I file ITR but skip planning', 'I use 80C & some deductions', 'I have a full tax strategy'],
  },
  {
    id: 7,
    category: 'Goals',
    icon: 'fas fa-bullseye',
    question: 'What is your primary financial goal right now?',
    options: ['Buying a home', 'Retirement planning', 'Education fund', 'Building wealth / FIRE'],
  },
  {
    id: 8,
    category: 'Insurance',
    icon: 'fas fa-umbrella',
    question: 'Do you have adequate life and health insurance?',
    options: ['No insurance at all', 'Only employer health cover', 'Term + health insurance', 'Full cover for family'],
  },
  {
    id: 9,
    category: 'Retirement',
    icon: 'fas fa-house-chimney-heart',
    question: 'How are you planning for retirement?',
    options: ['Not thinking about it', 'EPF only', 'EPF + NPS / PPF', 'Active retirement portfolio'],
  },
  {
    id: 10,
    category: 'Knowledge',
    icon: 'fas fa-brain',
    question: 'How confident are you about personal finance decisions?',
    options: ['Very confused', 'I know basics', 'Fairly confident', 'Very knowledgeable'],
  },
  {
    id: 11,
    category: 'Risk',
    icon: 'fas fa-gauge-high',
    question: 'What is your risk appetite for investments?',
    options: ['Very conservative', 'Moderate — some risk', 'Aggressive — high growth', 'Very aggressive'],
  },
  {
    id: 12,
    category: 'Portfolio',
    icon: 'fas fa-wallet',
    question: 'Do you know your portfolio XIRR / actual returns?',
    options: ['What is XIRR?', 'Roughly yes', 'Yes, I track it', 'Yes, I optimise it regularly'],
  },
  {
    id: 13,
    category: 'Spending',
    icon: 'fas fa-receipt',
    question: 'Do you track your monthly expenses?',
    options: ['Never', 'Occasionally glance', 'Yes, in a spreadsheet', 'Yes, I use a budgeting app'],
  },
  {
    id: 14,
    category: 'Advisor',
    icon: 'fas fa-user-tie',
    question: 'Have you ever worked with a financial advisor?',
    options: ['Never', 'Once or twice', 'Yes, but not satisfied', 'Yes, regularly'],
  },
  {
    id: 15,
    category: 'AI',
    icon: 'fas fa-sparkles',
    question: 'What would you most want ArthaMind AI to help you with?',
    options: ['Saving more money', 'Reducing taxes', 'Investing smarter', 'All of the above'],
  },
];

const STEP_INFO = 0;
const STEP_FORM = 1;
const STEP_QUIZ = 2;
const STEP_RESULT = 3;

function scoreAnswers(answers) {
  const scoreMap = { 0: 1, 1: 2, 2: 3, 3: 4 };
  const total = Object.values(answers).reduce((s, v) => s + (scoreMap[v] ?? 1), 0);
  const max = QUESTIONS.length * 4;
  return Math.round((total / max) * 100);
}

function getScoreLabel(score) {
  if (score < 35) return {
    label: 'Financial Beginner',
    color: '#EF4444',
    icon: 'fas fa-seedling',
    msg: "You are just getting started — and that is totally fine. ArthaMind will build your foundation from scratch.",
  };
  if (score < 55) return {
    label: 'Getting There',
    color: '#F59E0B',
    icon: 'fas fa-chart-line',
    msg: "You have some basics in place but there are significant gaps. ArthaMind can fill them fast.",
  };
  if (score < 75) return {
    label: 'Financially Aware',
    color: '#3B82F6',
    icon: 'fas fa-brain',
    msg: "Good instincts! A few smart moves with ArthaMind will supercharge your wealth journey.",
  };
  return {
    label: 'Financial Pro',
    color: '#00C896',
    icon: 'fas fa-trophy',
    msg: "You are ahead of 90% of Indians. ArthaMind will help you optimise every rupee.",
  };
}

export default function FinancialAssessment() {
  const [step, setStep] = useState(STEP_INFO);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [formError, setFormError] = useState('');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleFormNext = (e) => {
    e.preventDefault();
    if (!name.trim()) { setFormError('Please enter your name.'); return; }
    if (!/^[6-9]\d{9}$/.test(mobile)) { setFormError('Enter a valid 10-digit Indian mobile number.'); return; }
    setFormError('');
    setStep(STEP_QUIZ);
  };

  const handleAnswer = (qIdx, optIdx) => {
    const updated = { ...answers, [qIdx]: optIdx };
    setAnswers(updated);
    setTimeout(() => {
      if (qIdx + 1 < QUESTIONS.length) {
        setCurrent(qIdx + 1);
      } else {
        setScore(scoreAnswers(updated));
        setStep(STEP_RESULT);
      }
    }, 320);
  };

  const scoreData = score !== null ? getScoreLabel(score) : null;

  return (
    <section id="assessment" className="fa-section section-dark section-padding">
      <div className="fa-bg-glow" />
      <div className="dot-grid" />

      <div className="container">
        {/* HEADER */}
        <div className="fa-header">
          <div className="fa-eyebrow">
            <i className="fas fa-sparkles" />
            Free Financial Health Check
          </div>
          <h2 className="fa-h2">
            Your Personal AI Financial Advisor
            <span className="fa-gradient">Built for India.</span>
          </h2>
          <p className="fa-sub">
            Stop guessing with your money. ArthaMind AI analyses your income, loans, investments,
            taxes, and retirement — then tells you exactly what to do next.
          </p>
        </div>

        {/* CARD */}
        <div className="fa-card">

          {/* STEP 0 — INTRO */}
          {step === STEP_INFO && (
            <div className="fa-intro">
              <div className="fa-intro-grid">
                {[
                  { icon: 'fas fa-clock', val: '3 min', label: 'To complete' },
                  { icon: 'fas fa-question-circle', val: '15', label: 'Questions' },
                  { icon: 'fas fa-chart-pie', val: 'Free', label: 'Health report' },
                ].map(({ icon, val, label }) => (
                  <div key={label} className="fa-intro-stat">
                    <i className={icon} />
                    <span className="fa-intro-val">{val}</span>
                    <span className="fa-intro-label">{label}</span>
                  </div>
                ))}
              </div>
              <p className="fa-intro-note">
                Answer 15 quick questions about your finances. We will give you a personalised
                Financial Health Score and show you exactly where ArthaMind can help.
              </p>
              <button className="btn-fa-primary" onClick={() => setStep(STEP_FORM)}>
                Start My Assessment <i className="fas fa-arrow-right" />
              </button>
              <p className="fa-disclaimer">
                <i className="fas fa-lock" /> 100% private · No credit card · Takes 3 minutes
              </p>
            </div>
          )}

          {/* STEP 1 — FORM */}
          {step === STEP_FORM && (
            <form className="fa-form" onSubmit={handleFormNext}>
              <div className="fa-form-header">
                <i className="fas fa-user-circle" />
                <div>
                  <div className="fa-form-title">Let us get to know you</div>
                  <div className="fa-form-sub">We will personalise your results based on your profile.</div>
                </div>
              </div>

              <div className="fa-field">
                <label htmlFor="fa-name">Full Name</label>
                <div className="fa-input-wrap">
                  <i className="fas fa-user" />
                  <input
                    id="fa-name"
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="fa-field">
                <label htmlFor="fa-mobile">Mobile Number</label>
                <div className="fa-input-wrap">
                  <span className="fa-flag-code">+91</span>
                  <input
                    id="fa-mobile"
                    type="tel"
                    placeholder="98XXXXXXXX"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    autoComplete="tel"
                  />
                </div>
              </div>

              {formError && (
                <div className="fa-error">
                  <i className="fas fa-circle-exclamation" /> {formError}
                </div>
              )}

              <button type="submit" className="btn-fa-primary">
                Continue to Questions <i className="fas fa-arrow-right" />
              </button>
              <p className="fa-disclaimer">
                <i className="fas fa-shield-halved" /> Your data is encrypted and never shared.
              </p>
            </form>
          )}

          {/* STEP 2 — QUIZ */}
          {step === STEP_QUIZ && (
            <div className="fa-quiz">
              <div className="fa-progress-wrap">
                <div className="fa-progress-meta">
                  <span className="fa-q-count">Question {current + 1} of {QUESTIONS.length}</span>
                  <span className="fa-q-cat">
                    <i className={QUESTIONS[current].icon} />
                    {QUESTIONS[current].category}
                  </span>
                </div>
                <div className="fa-progress-bar">
                  <div
                    className="fa-progress-fill"
                    style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="fa-q-block" key={current}>
                <div className="fa-q-icon">
                  <i className={QUESTIONS[current].icon} />
                </div>
                <h3 className="fa-q-text">{QUESTIONS[current].question}</h3>
              </div>

              <div className="fa-options">
                {QUESTIONS[current].options.map((opt, oi) => (
                  <button
                    key={oi}
                    className={`fa-option${answers[current] === oi ? ' fa-option-selected' : ''}`}
                    onClick={() => handleAnswer(current, oi)}
                  >
                    <span className="fa-opt-letter">{String.fromCharCode(65 + oi)}</span>
                    <span className="fa-opt-text">{opt}</span>
                    {answers[current] === oi && <i className="fas fa-check fa-opt-check" />}
                  </button>
                ))}
              </div>

              {current > 0 && (
                <button className="fa-back" onClick={() => setCurrent(current - 1)}>
                  <i className="fas fa-arrow-left" /> Previous
                </button>
              )}
            </div>
          )}

          {/* STEP 3 — RESULT */}
          {step === STEP_RESULT && scoreData && (
            <div className="fa-result">
              <div className="fa-result-avatar">
                <i className={scoreData.icon} style={{ color: scoreData.color }} />
              </div>

              <div className="fa-score-ring">
                <svg viewBox="0 0 120 120" className="fa-score-svg">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="50"
                    fill="none"
                    stroke={scoreData.color}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - score / 100)}`}
                    transform="rotate(-90 60 60)"
                    style={{ transition: 'stroke-dashoffset 1.2s ease' }}
                  />
                </svg>
                <div className="fa-score-inner">
                  <span className="fa-score-num" style={{ color: scoreData.color }}>{score}</span>
                  <span className="fa-score-label">/ 100</span>
                </div>
              </div>

              <h3 className="fa-result-title" style={{ color: scoreData.color }}>{scoreData.label}</h3>
              <p className="fa-result-msg">{scoreData.msg}</p>

              <div className="fa-result-name">
                <i className="fas fa-hand-wave" style={{ color: 'var(--orange-light)' }} />
                Hi <strong>{name}</strong>! Here is your personalised ArthaMind plan.
              </div>

              <div className="fa-result-actions">
                <a href="#waitlist" className="btn-fa-primary">
                  Get My Full Report <i className="fas fa-arrow-right" />
                </a>
                <button
                  className="fa-retake"
                  onClick={() => { setStep(STEP_INFO); setCurrent(0); setAnswers({}); setScore(null); }}
                >
                  <i className="fas fa-rotate-left" /> Retake Assessment
                </button>
              </div>

              <div className="fa-result-trust">
                <i className="fas fa-lock" /> Results never shared · SEBI compliant · Made in India
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
