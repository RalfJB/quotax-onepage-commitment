
import { useEffect, useState } from 'react';
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

  useEffect(() => {
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
    
    // Simplified Intersection Observer for animations
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
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-foreground bg-background overflow-hidden">
      {/* Progress bar */}
      <div className="progress-container">
        <div id="progressBar" className="progress-bar"></div>
      </div>
      
      {/* Animated background circles */}
      <AnimatedCircles scrollY={scrollY} />
      
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
  );
};

export default Index;
