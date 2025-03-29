
import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import Benefits from '@/components/Benefits';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ParallaxContainer from '@/components/ParallaxContainer';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);
  
  useEffect(() => {
    // Enable scrolling immediately
    document.body.style.overflow = 'auto';
    
    document.title = "quotax - Digitale Steuerberatung";
    
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      setScrollY(scrollTop);
      
      // Show navbar after scrolling down
      if (scrollTop > 50 && !showNavbar) {
        setShowNavbar(true);
      } else if (scrollTop <= 50 && showNavbar) {
        setShowNavbar(false);
      }
      
      // Update progress bar
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollTop / (docHeight - windowHeight)) * 100;
      const progressBar = document.getElementById('progressBar');
      if (progressBar) {
        progressBar.style.width = scrollPercentage + '%';
      }
    };
    
    window.addEventListener('scroll', updateScroll);
    
    return () => {
      window.removeEventListener('scroll', updateScroll);
      document.body.style.overflow = 'auto';
    };
  }, [showNavbar]);

  return (
    <div className="flex flex-col min-h-screen text-foreground bg-background">
      <div className="progress-container">
        <div id="progressBar" className="progress-bar"></div>
      </div>
      
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${showNavbar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <Navbar />
      </div>
      
      <Hero />
      
      <main className="flex-grow">
        <div className="relative z-10 bg-background">
          <ParallaxContainer direction="up" delay={100} speed={0.1}>
            <AboutUs />
          </ParallaxContainer>
            
          <ParallaxContainer direction="up" delay={100} speed={0.1}>
            <Services />
          </ParallaxContainer>
            
          <ParallaxContainer direction="up" delay={100} speed={0.1}>
            <Benefits />
          </ParallaxContainer>
            
          <ParallaxContainer direction="up" delay={100} speed={0.1}>
            <Team />
          </ParallaxContainer>
            
          <ParallaxContainer direction="up" delay={100} speed={0.1}>
            <Contact />
          </ParallaxContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
