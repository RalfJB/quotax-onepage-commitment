
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
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
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-10 w-96 h-96 rounded-full bg-green/10 filter blur-[120px] animate-pulse-glow z-0"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-purple/10 filter blur-[100px] animate-pulse-glow z-0"></div>
      
      <div 
        ref={heroRef}
        className={`z-10 max-w-4xl text-center px-6 md:px-0 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="mb-4 lg:mb-6">
          <h1 className="font-display text-7xl md:text-9xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-purple via-purple-light to-purple bg-clip-text text-transparent">quo</span>
            <span className="bg-gradient-to-r from-green-dark via-green to-green-light bg-clip-text text-transparent">tax</span>
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground mb-6 tracking-tight">
            Steuerberatung
          </h2>
        </div>
        
        <div className="mt-6 mb-10">
          <div className="inline-block text-xl md:text-2xl font-medium text-orange-600 py-2 px-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 shadow-sm">
            Eröffnung Sommer 2025
          </div>
        </div>
        
        <div className={`my-12 flex justify-center transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="bg-card px-5 py-3 rounded-lg border border-border shadow-lg">
              <span className="text-2xl md:text-3xl font-medium bg-gradient-to-r from-purple to-purple-light bg-clip-text text-transparent">digital</span>
            </div>
            
            <span className="text-2xl md:text-3xl font-medium text-muted-foreground">und</span>
            
            <div className="bg-card px-5 py-3 rounded-lg border border-border shadow-lg">
              <span className="text-2xl md:text-3xl font-medium bg-gradient-to-r from-green to-green-light bg-clip-text text-transparent">persönlich</span>
            </div>
            
            <span className="text-2xl md:text-3xl font-medium text-muted-foreground">.</span>
          </div>
        </div>
        
        <div className={`mt-16 mb-14 transition-all duration-1000 delay-500 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="bg-card py-10 px-8 md:px-12 rounded-xl border border-border shadow-xl max-w-3xl mx-auto">
            <blockquote className="text-lg md:text-xl text-foreground text-balance italic">
              "Unsere Vision: Steuerberatung, die durch menschliche Verbundenheit berührt, durch persönliches Engagement beeindruckt und durch digitale Lösungen Ihren Erfolg sichert."
              <footer className="text-right mt-4 text-muted-foreground not-italic text-sm md:text-base">
                — Ralf Julius Baumgartner, Steuerberater und Gründer von quotax
              </footer>
            </blockquote>
          </div>
        </div>
        
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-5 mt-12 transition-all duration-1000 delay-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <a 
            href="#contact" 
            className="px-8 py-4 bg-gradient-to-r from-purple to-purple-dark text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple/20 hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2 group border border-white/10"
          >
            Gespräch vereinbaren
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a 
            href="#services" 
            className="px-8 py-4 border border-border bg-card text-foreground rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:border-purple/50 hover:bg-purple/5 w-full sm:w-auto flex items-center justify-center gap-2 group mt-4 sm:mt-0"
          >
            Unsere Dienstleistungen
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
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
