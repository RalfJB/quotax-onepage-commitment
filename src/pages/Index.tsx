
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
import PixelLogo from '@/components/PixelLogo';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Handle animation completion
  const handleAnimationComplete = () => {
    setInitialAnimationComplete(true);
    
    // Add slight delay before showing content for smoother transition
    setTimeout(() => {
      setShowContent(true);
      
      // Enable scrolling once content is shown
      document.body.style.overflow = 'auto';
    }, 300);
  };

  useEffect(() => {
    // Initially disable scrolling until animation completes
    document.body.style.overflow = 'hidden';
    
    // Update page title
    document.title = "quotax - Digitale Steuerberatung";
    
    // Progress bar for scrolling
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
    
    // Fade in sections as they come into view
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
    
    // Only initialize intersection observer after initial animation
    if (showContent) {
      observeElements();
    }
    
    return () => {
      window.removeEventListener('scroll', updateProgressBar);
      document.body.style.overflow = 'auto'; // Restore scrolling on unmount
    };
  }, [showContent]);

  return (
    <div className="flex flex-col min-h-screen text-foreground bg-background overflow-hidden">
      {/* Initial Pixel Animation */}
      {!initialAnimationComplete && (
        <PixelLogo onAnimationComplete={handleAnimationComplete} />
      )}
      
      {/* Progress bar */}
      <div className="progress-container">
        <div id="progressBar" className="progress-bar"></div>
      </div>
      
      {/* Animated background circles - only visible after animation */}
      {initialAnimationComplete && <AnimatedCircles scrollY={scrollY} />}
      
      {/* Content container - hidden until animation completes */}
      <div 
        ref={contentRef}
        className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}
      >
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <div className="relative z-10 bg-background/95 backdrop-blur-lg">
            <ParallaxContainer>
              <AboutUs />
            </ParallaxContainer>
            
            <ParallaxContainer>
              <Services />
            </ParallaxContainer>
            
            <ParallaxContainer>
              <Benefits />
            </ParallaxContainer>
            
            <ParallaxContainer>
              <Team />
            </ParallaxContainer>
            
            <ParallaxContainer>
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
