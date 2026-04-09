import { useEffect, useRef, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import './WorldMap.css';

const MAP_ROWS = [
  "000000000000000000001110000000000000000000000000000000000000",
  "000000000000000000111111100000000000001100000001100000000000",
  "001000001000000001111111100000000001101111110001110000000000",
  "001111011100000011111111000000001111101111111011111000000000",
  "001111111110000011111110000000001111111111111111111110000000",
  "011111111111100001111100000000011111111111111111111111100000",
  "011111111111110011000000000001111111111111111111111111110000",
  "001111111111110000000000000001111111111011111111111111111000",
  "001111111111000000000110110011111111111011111111111111111000",
  "000111111110000000001111111101111011011111111111111111100000",
  "000011111100000000001111111101011011011111111111111100000000",
  "000001111100000000011111111100001011111111111111110000000000",
  "000000111100000000101111111111110001001111101111110000000000",
  "000000011110000011111111111111100000001001111011110000000000",
  "000000011100000011111111111111100000000000001000001100000000",
  "000000011100000011111100111110000000000000001000000001110000",
  "000000011100000011111000011100000000000000001000001001110000",
  "000000011100000011111000011000000000000000001001001111110000",
  "000000001100000001111000001000000000000000000001001111100000",
  "000000001100000001110000000000000000000000000000000111100000",
  "000000001100000001100000000000000000000000000000000011000000",
  "000000001100000001100000000000000000000000000000000001001100",
  "000000000100000001000000000000000000000000000000000000001100",
  "000000000000000000000000000000000000000000000000000000001000",
  "000000000000000001111111111111111111111111111100000000000000",
  "000000011111111111111111111111111111111111111111110000000000",
  "000001111111111111111111111111111111111111111111111100000000",
  "000000000000000000000000000000000000000000000000000000000000",
];

const COLS = 60;
const ROWS = 28;
const DOT_COLOR = '#00B4A0';

const CITIES = [
  { id: 'mumbai',    name: 'Mumbai',    col: 42, row: 11, color: '#E8501A', value: '₹8.2L',  change: '+2.4%' },
  { id: 'delhi',     name: 'Delhi',     col: 43, row: 9,  color: '#00C896', value: '₹12.7L', change: '+1.8%' },
  { id: 'bengaluru', name: 'Bengaluru', col: 43, row: 12, color: '#E8501A', value: '₹6.9L',  change: '+3.1%' },
  { id: 'london',    name: 'London',    col: 29, row: 6,  color: '#00C896', value: '$4,200',  change: '+0.9%' },
  { id: 'newyork',   name: 'New York',  col: 17, row: 8,  color: '#E8501A', value: '$18.4K', change: '+1.2%' },
  { id: 'singapore', name: 'Singapore', col: 47, row: 13, color: '#00C896', value: 'S$6.1K', change: '+2.7%' },
];

const LIVE_TX = [
  { city: 'Mumbai',    action: 'SIP Invested',        amount: '₹5,000',  icon: '📈' },
  { city: 'Delhi',     action: 'Tax Optimised',        amount: '₹12,400', icon: '💰' },
  { city: 'Bengaluru', action: 'Portfolio Rebalanced', amount: '₹2.1L',   icon: '⚖️' },
  { city: 'Mumbai',    action: 'Goal Reached',         amount: '₹50L',    icon: '🎯' },
  { city: 'Hyderabad', action: 'SIP Started',          amount: '₹3,000',  icon: '🚀' },
  { city: 'Chennai',   action: 'Gold Sold',            amount: '₹8,200',  icon: '🥇' },
];

export default function WorldMap() {
  const wrapRef   = useRef(null);
  const canvasRef = useRef(null);
  const progRef   = useRef({ value: 0 });
  const [txIdx, setTxIdx]       = useState(0);
  const [txVisible, setTxVisible] = useState(false); // hidden until delay

  // Pre-compute land dot positions once
  const landDots = useMemo(() => {
    const dots = [];
    MAP_ROWS.forEach((row, r) => {
      [...row].forEach((cell, c) => {
        if (cell === '1') dots.push({ col: c, row: r });
      });
    });
    return dots;
  }, []);

  // Canvas draw — reveals dots left→right, fades edges with radial mask
  const draw = (progress) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width;
    const H = canvas.height;
    const cellW = W / COLS;
    const cellH = H / ROWS;
    const r = Math.min(cellW, cellH) * 0.22; // smaller dots
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = DOT_COLOR;

    // 1. Draw land dots at low opacity
    landDots.forEach(dot => {
      const dotProgress = dot.col / COLS;
      if (dotProgress > progress) return;
      const fade = Math.min(1, (progress - dotProgress) * 12);
      ctx.globalAlpha = fade * 0.40; // subtle
      ctx.beginPath();
      ctx.arc(
        (dot.col + 0.5) * cellW,
        (dot.row + 0.5) * cellH,
        r, 0, Math.PI * 2
      );
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // 2. Radial edge-fade mask (dots fade toward all edges)
    const maskX = W * 0.5;
    const maskY = H * 0.45;
    const innerR = Math.min(W, H) * 0.22;
    const outerR = Math.max(W, H) * 0.78;
    const mask = ctx.createRadialGradient(maskX, maskY, innerR, maskX, maskY, outerR);
    mask.addColorStop(0, 'rgba(255,255,255,0)');
    mask.addColorStop(0.55, 'rgba(255,255,255,0)');
    mask.addColorStop(1, 'rgba(255,255,255,0.88)');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = mask;
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';
  };

  // Resize canvas to match container
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;

    const resize = () => {
      canvas.width  = wrap.clientWidth;
      canvas.height = wrap.clientHeight;
      draw(progRef.current.value);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [landDots]);

  // GSAP animate progress 0→1 after 1s delay
  useEffect(() => {
    const tween = gsap.to(progRef.current, {
      value: 1,
      duration: 2.5,
      delay: 1,
      ease: 'power2.out',
      onUpdate: () => draw(progRef.current.value),
    });
    return () => tween.kill();
  }, [landDots]);

  // Live ticker cycling
  useEffect(() => {
    // show ticker after 1.5s
    const show = setTimeout(() => setTxVisible(true), 1500);
    const interval = setInterval(() => {
      setTxVisible(false);
      setTimeout(() => {
        setTxIdx(i => (i + 1) % LIVE_TX.length);
        setTxVisible(true);
      }, 300);
    }, 2800);
    return () => { clearTimeout(show); clearInterval(interval); };
  }, []);

  const tx = LIVE_TX[txIdx];

  return (
    <div ref={wrapRef} className="wm-wrap">
      {/* Canvas for dot grid */}
      <canvas ref={canvasRef} className="wm-canvas" />

      {/* City ping overlays */}
      {CITIES.map(city => (
        <div
          key={city.id}
          className="wm-city"
          style={{
            left: `${((city.col + 0.5) / COLS) * 100}%`,
            top:  `${((city.row + 0.5) / ROWS) * 100}%`,
          }}
        >
          <span className="wm-ping"   style={{ '--clr': city.color }} />
          <span className="wm-ping p2" style={{ '--clr': city.color }} />
          <span className="wm-dot-city" style={{ background: city.color }} />
          <div className="wm-tooltip">
            <span className="wm-t-name">{city.name}</span>
            <span className="wm-t-val">{city.value}</span>
            <span className="wm-t-chg" style={{ color: city.color }}>{city.change}</span>
          </div>
        </div>
      ))}

      {/* Live ticker */}
      <div className={`wm-ticker ${txVisible ? 'in' : 'out'}`}>
        <span className="wm-live">
          <span className="wm-live-dot" />
          LIVE
        </span>
        <span className="wm-tx-icon">{tx.icon}</span>
        <span className="wm-tx-text">
          <strong>{tx.city}:</strong> {tx.action} ·{' '}
          <span className="wm-tx-amt">{tx.amount}</span>
        </span>
      </div>
    </div>
  );
}
