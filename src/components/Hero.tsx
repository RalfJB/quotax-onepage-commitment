
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroRef.current && scrolled < 500) {
        heroRef.current.style.opacity = `${1 - scrolled / 700}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Set animation delay
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-background">
      {/* Gradient orbs - these will be replaced by the AnimatedCircles component */}
      <div className="absolute top-1/4 -left-10 w-96 h-96 rounded-full bg-green/10 filter blur-[120px] animate-pulse-glow z-0"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-purple/10 filter blur-[100px] animate-pulse-glow z-0"></div>
      
      <div 
        ref={heroRef}
        className={`z-10 w-full max-w-4xl px-4 md:px-6 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="mb-8 lg:mb-10 text-center">
          <h1 className="font-display text-5xl sm:text-7xl md:text-9xl font-bold mb-2 tracking-tight">
            <span className="text-purple">quo</span>
            <span className="text-green-dark">tax</span>
          </h1>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground mb-3 tracking-tight">
            Steuerberatung
          </h2>
        </div>
        
        <div className="mt-4 mb-8 text-center">
          <div className="inline-block text-lg sm:text-xl md:text-2xl font-medium text-orange-600 py-1 px-4 sm:py-2 sm:px-8 rounded-full">
            Eröffnung Sommer 2025
          </div>
        </div>
        
        <div className={`my-6 sm:my-10 flex justify-center transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex flex-col items-center space-y-1">
            <span className="text-xl sm:text-2xl md:text-3xl font-medium text-purple">
              digital
            </span>
            
            <span className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground">
              und
            </span>
            
            <span className="text-xl sm:text-2xl md:text-3xl font-medium text-green-dark">
              persönlich
            </span>
            
            <span className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground">.</span>
          </div>
        </div>
        
        <div className={`mt-8 mb-10 transition-all duration-1000 delay-500 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="py-4 px-4 sm:px-8 max-w-3xl mx-auto">
            <blockquote className="text-base sm:text-lg md:text-xl text-foreground text-balance italic text-center">
              "Unsere Vision: Steuerberatung, die durch menschliche Verbundenheit berührt, durch persönliches Engagement beeindruckt und durch digitale Lösungen Ihren Erfolg sichert."
              <footer className="text-right mt-4 text-muted-foreground not-italic text-sm md:text-base">
                — Ralf Julius Baumgartner, Steuerberater und Gründer von quotax
              </footer>
            </blockquote>
          </div>
        </div>
        
        {isMobile ? (
          <div className={`flex flex-col items-center justify-center gap-3 mt-8 transition-all duration-1000 delay-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <a 
              href="#contact" 
              className="w-64 py-3 bg-purple text-white rounded-lg font-medium text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              Gespräch vereinbaren
            </a>
            
            <a 
              href="#services" 
              className="w-64 py-3 text-foreground rounded-lg font-medium transition-all duration-300 hover:text-purple text-center mt-2"
            >
              Unsere Dienstleistungen
            </a>
          </div>
        ) : (
          <div className={`flex flex-row items-center justify-center gap-5 mt-12 transition-all duration-1000 delay-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <a 
              href="#contact" 
              className="px-8 py-4 bg-purple text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple/20 hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2 group"
            >
              Gespräch vereinbaren
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="#services" 
              className="px-8 py-4 border border-border bg-card/50 text-foreground rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:border-purple/50 hover:bg-purple/5 w-full sm:w-auto flex items-center justify-center gap-2 group mt-4 sm:mt-0"
            >
              Unsere Dienstleistungen
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-10">
        <a href="#about" className="text-muted-foreground hover:text-purple transition-colors duration-300">
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
