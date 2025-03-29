
import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import Benefits from '@/components/Benefits';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AnimatedCircles from '@/components/AnimatedCircles';
import ParallaxContainer from '@/components/ParallaxContainer';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showContent, setShowContent] = useState(true);
  const [showHero, setShowHero] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Enable scrolling immediately when the page loads
    document.body.style.overflow = 'auto';
    
    document.title = "quotax - Digitale Steuerberatung";
    
    const updateProgressBar = () => {
      const scrollTop = window.scrollY;
      setScrollY(scrollTop);
      
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollTop / (docHeight - windowHeight)) * 100;
      const progressBar = document.getElementById('progressBar');
      if (progressBar) {
        progressBar.style.width = scrollPercentage + '%';
      }
    };
    
    const observeElements = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { threshold: 0.1 });
      
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    };
    
    window.addEventListener('scroll', updateProgressBar);
    observeElements();
    
    return () => {
      window.removeEventListener('scroll', updateProgressBar);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-foreground bg-background overflow-hidden">
      <div className="progress-container">
        <div id="progressBar" className="progress-bar"></div>
      </div>
      
      <AnimatedCircles scrollY={scrollY} />
      
      <div className="opacity-100">
        <Navbar />
      </div>
      
      <div className="opacity-100 translate-y-0">
        <Hero />
      </div>
      
      <div ref={contentRef} className="opacity-100">
        <main className="flex-grow">
          <div className="relative z-10 bg-background/95 backdrop-blur-lg mt-12">
            <ParallaxContainer direction="left" delay={200}>
              <AboutUs />
            </ParallaxContainer>
            
            <ParallaxContainer direction="right" delay={250}>
              <Services />
            </ParallaxContainer>
            
            <ParallaxContainer direction="left" delay={300}>
              <Benefits />
            </ParallaxContainer>
            
            <ParallaxContainer direction="right" delay={350}>
              <Team />
            </ParallaxContainer>
            
            <ParallaxContainer direction="up" delay={400}>
              <Contact />
            </ParallaxContainer>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
