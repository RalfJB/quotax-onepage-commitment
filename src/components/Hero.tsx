
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
    }, 400);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-background py-32 md:py-0">
      {/* Gradient orbs - these will blend with the AnimatedCircles component */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-green/10 filter blur-[180px] animate-pulse-slow z-0"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-purple/10 filter blur-[180px] animate-pulse-slow z-0" style={{ animationDelay: "2s" }}></div>
      
      <div 
        ref={heroRef}
        className={`z-10 w-full max-w-5xl px-6 md:px-8 transition-all duration-1500 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        {/* Central logo section */}
        <div className="mb-24 lg:mb-32 text-center">
          <h1 className="font-display text-7xl sm:text-8xl md:text-9xl font-bold mb-6 tracking-tighter">
            <span className="bg-gradient-to-r from-purple via-purple-light to-purple bg-clip-text text-transparent">quo</span>
            <span className="bg-gradient-to-r from-green-dark via-green to-green-light bg-clip-text text-transparent">tax</span>
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground tracking-tight">
            Steuerberatung
          </h2>
        </div>
        
        <div className="mt-12 mb-16 text-center">
          <div className="inline-block text-lg sm:text-xl md:text-2xl font-medium text-orange-600 py-2 px-6 sm:py-3 sm:px-10 rounded-full bg-orange-50/20 backdrop-blur-sm border border-orange-200/20">
            Eröffnung Sommer 2025
          </div>
        </div>
        
        <div className={`my-20 sm:my-24 flex justify-center transition-all duration-1500 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex flex-col items-center space-y-6">
            <span className="text-2xl sm:text-3xl md:text-4xl font-medium bg-gradient-to-r from-purple to-purple-light bg-clip-text text-transparent">
              digital
            </span>
            
            <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-muted-foreground">
              und
            </span>
            
            <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-green-dark">
              persönlich
            </span>
            
            <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-muted-foreground">.</span>
          </div>
        </div>
        
        <div className={`mt-16 mb-20 transition-all duration-1500 delay-500 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="py-10 px-8 sm:px-12 max-w-4xl mx-auto bg-foreground/5 backdrop-blur-sm rounded-2xl border border-foreground/10">
            <blockquote className="text-lg sm:text-xl md:text-2xl text-foreground text-balance italic text-center">
              "Unsere Vision: Steuerberatung, die durch menschliche Verbundenheit berührt, durch persönliches Engagement beeindruckt und durch digitale Lösungen Ihren Erfolg sichert."
              <footer className="text-right mt-6 text-muted-foreground not-italic text-sm md:text-base">
                — Ralf Julius Baumgartner, Steuerberater und Gründer von quotax
              </footer>
            </blockquote>
          </div>
        </div>
        
        {isMobile ? (
          <div className={`flex flex-col items-center justify-center gap-4 mt-16 transition-all duration-1500 delay-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <a 
              href="#contact" 
              className="w-72 py-4 bg-gradient-to-r from-purple to-purple-dark text-white rounded-xl font-medium text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-white/10"
            >
              Gespräch vereinbaren
            </a>
            
            <a 
              href="#services" 
              className="w-72 py-4 text-foreground rounded-xl font-medium transition-all duration-300 hover:text-purple text-center mt-2 border border-foreground/10 bg-foreground/5"
            >
              Unsere Dienstleistungen
            </a>
          </div>
        ) : (
          <div className={`flex flex-row items-center justify-center gap-10 mt-16 transition-all duration-1500 delay-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <a 
              href="#contact" 
              className="px-10 py-5 bg-gradient-to-r from-purple to-purple-dark text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple/20 hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2 group border border-white/10"
            >
              Gespräch vereinbaren
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="#services" 
              className="px-10 py-5 border border-foreground/20 bg-foreground/5 backdrop-blur-sm text-foreground rounded-xl font-medium transition-all duration-300 hover:shadow-md hover:border-purple/50 hover:bg-purple/5 w-full sm:w-auto flex items-center justify-center gap-2 group"
            >
              Unsere Dienstleistungen
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-10">
        <a href="#about" className="text-muted-foreground hover:text-purple transition-colors duration-300 bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/10">
          <ArrowDown size={28} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
