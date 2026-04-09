import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    let mx = 0, my = 0;
    let cx = 0, cy = 0;
    let animFrame;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      cx = lerp(cx, mx, 0.18);
      cy = lerp(cy, my, 0.18);
      dot.style.transform = `translate(${cx - 6}px, ${cy - 6}px)`;
      animFrame = requestAnimationFrame(animate);
    };

    const onEnter = () => dot.classList.add('expanded');
    const onLeave = () => dot.classList.remove('expanded');

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
