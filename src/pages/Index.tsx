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
import PixelLogo from '@/components/logo/PixelLogo';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const handleAnimationComplete = () => {
    setInitialAnimationComplete(true);
    
    setTimeout(() => {
      setShowHero(true);
      
      document.body.style.overflow = 'auto';
      
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setShowContent(true);
          window.removeEventListener('scroll', handleScroll);
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      
      setTimeout(() => {
        setShowContent(true);
      }, 5000);
    }, 500);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
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
    
    if (showContent) {
      observeElements();
    }
    
    return () => {
      window.removeEventListener('scroll', updateProgressBar);
      document.body.style.overflow = 'auto';
    };
  }, [showContent]);

  return (
    <div className="flex flex-col min-h-screen text-foreground bg-background overflow-hidden">
      {!initialAnimationComplete && (
        <PixelLogo onAnimationComplete={handleAnimationComplete} />
      )}
      
      <div className="progress-container">
        <div id="progressBar" className="progress-bar"></div>
      </div>
      
      {initialAnimationComplete && <AnimatedCircles scrollY={scrollY} />}
      
      <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
      </div>
      
      <div 
        className={`transition-all duration-1000 delay-200 ${showHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <Hero />
      </div>
      
      <div 
        ref={contentRef}
        className={`transition-opacity duration-1000 delay-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}
      >
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
