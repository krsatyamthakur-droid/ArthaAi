import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Cursor from './components/Cursor';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';

import './App.css';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    // Hook Lenis into GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <>
      <Cursor />
      <Header onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <main>
        <Hero onOpenWaitlist={() => setIsWaitlistOpen(true)} />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <Waitlist isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      </main>
      <Footer />
    </>
  );
}
