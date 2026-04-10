import { useState, useEffect } from 'react';
import './Waitlist.css';

const QUESTIONS = [
  { q: 'What is your monthly take-home income?', opts: ['Under 30K', '30K – 75K', '75K – 1.5L', 'Above 1.5L', 'Other'] },
  { q: 'What % of income do you currently save?', opts: ['Less than 5%', '5–15%', '15–30%', 'More than 30%', 'Other'] },
  { q: 'Which investments do you currently use?', opts: ['Only FD / Savings', 'Mutual Funds', 'Stocks + MFs', 'All asset classes', 'Other'] },
  { q: 'Do you have any active loans or EMIs?', opts: ['No loans', 'Home loan only', 'Car / Personal loan', 'Multiple loans', 'Other'] },
  { q: 'How many months of emergency fund do you have?', opts: ['None', '1–2 months', '3–4 months', '6+ months', 'Other'] },
  { q: 'Do you plan taxes before year end?', opts: ['Never', 'I just file ITR', 'Use 80C deductions', 'Full tax strategy', 'Other'] },
  { q: 'What is your primary financial goal?', opts: ['Buying a home', 'Retirement', 'Education fund', 'Building wealth', 'Other'] },
  { q: 'Do you have life and health insurance?', opts: ['No insurance', 'Employer cover only', 'Term + health plan', 'Full family cover', 'Other'] },
  { q: 'How are you planning for retirement?', opts: ['Not yet', 'EPF only', 'EPF + NPS / PPF', 'Active portfolio', 'Other'] },
  { q: 'How confident are you with finance decisions?', opts: ['Very confused', 'I know basics', 'Fairly confident', 'Very knowledgeable', 'Other'] },
  { q: 'What is your investment risk appetite?', opts: ['Very conservative', 'Moderate', 'Aggressive', 'Very aggressive', 'Other'] },
  { q: 'Do you know your portfolio XIRR / returns?', opts: ['No idea', 'Roughly yes', 'Yes, I track it', 'Yes and I optimise it', 'Other'] },
  { q: 'Do you track your monthly expenses?', opts: ['Never', 'Occasionally', 'Spreadsheet', 'Budgeting app', 'Other'] },
  { q: 'Worked with a financial advisor before?', opts: ['Never', 'Once or twice', 'Yes but unsatisfied', 'Yes, regularly', 'Other'] },
  { q: 'What should ArthaMind help you most with?', opts: ['Save more', 'Reduce taxes', 'Invest smarter', 'All of the above', 'Other'] },
];

export default function Waitlist({ isOpen, onClose }) {
  const [name, setName]       = useState('');
  const [mobile, setMobile]   = useState('');
  const [email, setEmail]     = useState('');
  const [answers, setAnswers] = useState({});
  const [otherText, setOtherText] = useState({}); // Stores text for "Other" options
  const [quizOpen, setQuizOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const answered = Object.keys(answers).length;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (!/^[6-9]\d{9}$/.test(mobile)) { setError('Enter a valid 10-digit mobile number.'); return; }
    if (!email) { setError('Please enter your email.'); return; }
    
    setError('');
    setLoading(true);

    try {
      // Merge answers with "Other" text
      const finalAnswers = { ...answers };
      Object.keys(finalAnswers).forEach(qi => {
        const questionIdx = parseInt(qi);
        const selectedIdx = finalAnswers[qi];
        const isOther = QUESTIONS[questionIdx].opts[selectedIdx] === 'Other';
        if (isOther && otherText[qi]) {
          finalAnswers[qi] = `Other: ${otherText[qi]}`;
        }
      });

      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/quiz/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          mobileno: mobile,
          email: email,
          answers: finalAnswers
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error("Waitlist submission error:", err);
      setError('Connection failed. Is the backend server running?');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="waitlist-modal-overlay" onClick={onClose} data-lenis-prevent>
      <section className="waitlist-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="waitlist-close-btn" onClick={onClose} aria-label="Close">
          <i className="fas fa-times" />
        </button>
        <div className="waitlist-inner">

        {/* ── LEFT ── */}
        <div className="waitlist-content">
          <p className="eyebrow">Early Access</p>
          <h2 className="section-h2-light waitlist-h2">
            Start building today —<br />
            <span className="text-gradient">it is free forever.</span>
          </h2>
          <p className="waitlist-sub">
            Be among the first 10,000 users to access ArthaMind AI at founding-member pricing.
            No spam, ever. Cancel anytime.
          </p>

          <div className="waitlist-counter">
            <div className="counter-dots">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="counter-avatar" style={{ '--i': i }}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="counter-text">
              <strong>2,841</strong> investors joined this week
            </span>
          </div>

          <div className="waitlist-trust">
            {[
              { icon: 'fas fa-shield-halved', text: 'SEBI Compliant',    color: 'var(--orange)' },
              { icon: 'fas fa-lock',          text: '256-bit Encrypted', color: 'var(--green)'  },
              { icon: 'fas fa-flag',          text: 'Made in India',     color: '#FF9933'       },
            ].map(({ icon, text, color }) => (
              <span key={text} className="wl-trust-item">
                <i className={icon} style={{ color }} />
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Form ── */}
        <div className="waitlist-form-wrap">
          <div className="waitlist-badge-top">
            <i className="fas fa-hourglass-half" style={{ color: 'var(--orange)' }} />
            Limited slots — Early Access
          </div>

          {!submitted ? (
            <form className="waitlist-form" onSubmit={handleSubmit} id="waitlist-form">

              {/* Name */}
              <div className="form-field">
                <label className="form-label" htmlFor="wl-name">Full Name</label>
                <div className="form-input-wrap">
                  <i className="fas fa-user form-icon" />
                  <input
                    id="wl-name"
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Mobile */}
              <div className="form-field">
                <label className="form-label" htmlFor="wl-mobile">Mobile Number</label>
                <div className="form-input-wrap wl-mobile-wrap">
                  <span className="wl-dial-code">+91</span>
                  <input
                    id="wl-mobile"
                    type="tel"
                    placeholder="98XXXXXXXX"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    className="form-input wl-mobile-input"
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-field">
                <label className="form-label" htmlFor="wl-email">Email Address</label>
                <div className="form-input-wrap">
                  <i className="fas fa-envelope form-icon" />
                  <input
                    id="wl-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* 15-Question toggle */}
              <div className="wl-quiz-section">
                <button
                  type="button"
                  className="wl-quiz-toggle"
                  onClick={() => setQuizOpen(!quizOpen)}
                >
                  <span className="wl-quiz-toggle-left">
                    <i className="fas fa-circle-question" />
                    Financial Profile Quiz
                    {answered > 0 && (
                      <span className="wl-quiz-badge">{answered}/15 done</span>
                    )}
                  </span>
                  <span className="wl-quiz-toggle-right">
                    {quizOpen ? 'Hide' : 'Optional — takes 2 min'}
                    <i className={`fas fa-chevron-${quizOpen ? 'up' : 'down'}`} />
                  </span>
                </button>

                {quizOpen && (
                  <div className="wl-quiz-body" data-lenis-prevent>
                    {QUESTIONS.map((item, qi) => (
                      <div key={qi} className="wl-q-row">
                        <p className="wl-q-text">
                          <span className="wl-q-num">{qi + 1}.</span> {item.q}
                        </p>
                        <div className="wl-q-opts">
                          {item.opts.map((opt, oi) => (
                            <button
                              key={oi}
                              type="button"
                              className={`wl-opt${answers[qi] === oi ? ' wl-opt-sel' : ''}`}
                              onClick={() => setAnswers({ ...answers, [qi]: oi })}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        {/* Conditional "Other" input field */}
                        {item.opts[answers[qi]] === 'Other' && (
                          <div className="wl-q-other-input-wrap">
                            <input
                              type="text"
                              className="wl-q-other-input"
                              placeholder="Please specify..."
                              value={otherText[qi] || ''}
                              onChange={(e) => setOtherText({ ...otherText, [qi]: e.target.value })}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {error && (
                <div className="wl-error">
                  <i className="fas fa-circle-exclamation" /> {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-orange waitlist-submit"
                id="waitlist-submit"
                disabled={loading}
              >
                {loading
                  ? <><i className="fas fa-circle-notch fa-spin" /> Processing...</>
                  : <> Secure My Spot <i className="fas fa-arrow-right" /></>
                }
              </button>
              <p className="form-disclaimer">Free forever plan available · No credit card required</p>
            </form>
          ) : (
            <div className="waitlist-success">
              <div className="success-icon">
                <i className="fas fa-circle-check" />
              </div>
              <h3>You are on the list! 🎉</h3>
              <p>We will send your invite to <strong>{email}</strong> when ArthaMind launches.</p>
              {answered > 0 && (
                <p className="wl-quiz-note">
                  <i className="fas fa-sparkles" /> {answered} quiz answers saved — your plan is being personalised.
                </p>
              )}
            </div>
          )}

          <div className="waitlist-press">
            <span className="press-label">As seen in</span>
            {['Economic Times', 'YourStory', 'MoneyControl', 'Inc42'].map((pub) => (
              <span key={pub} className="press-pub">{pub}</span>
            ))}
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
