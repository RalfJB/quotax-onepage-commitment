import { useEffect, useRef } from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroRef.current && scrolled < 500) {
        heroRef.current.style.opacity = `${1 - scrolled / 700}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black">
      <div className="absolute inset-0 bg-black z-0"></div>
      
      <div 
        ref={heroRef}
        className="z-10 max-w-4xl text-center animate-fade-in-up px-6 md:px-0" 
        style={{ animationDelay: '0.3s' }}
      >
        <div className="mb-4 lg:mb-6">
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-4">
            <span className="text-purple">quo</span>
            <span className="text-green">tax</span>
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white mb-6">
            Steuerberatung
          </h2>
        </div>
        
        <div className="mt-4 mb-10">
          <div className="inline-block text-xl md:text-2xl font-medium text-orange-600 py-2 px-8 rounded-full bg-white/70 backdrop-blur-sm border border-gray-200 shadow-sm">
            Eröffnung Sommer 2025
          </div>
        </div>
        
        <div className="my-12 flex justify-center">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-lg shadow-sm">
              <span className="text-2xl md:text-3xl font-medium text-purple">digital</span>
            </div>
            
            <span className="text-2xl md:text-3xl font-medium text-white">und</span>
            
            <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-lg shadow-sm">
              <span className="text-2xl md:text-3xl font-medium text-green">persönlich</span>
            </div>
            
            <span className="text-2xl md:text-3xl font-medium text-white">.</span>
          </div>
        </div>
        
        <div className="mt-16 mb-14">
          <div className="bg-white/10 py-10 px-8 md:px-12 rounded-xl shadow-sm max-w-3xl mx-auto backdrop-blur-sm">
            <blockquote className="text-lg md:text-xl text-white text-balance italic">
              "Unsere Vision: Steuerberatung, die durch menschliche Verbundenheit berührt, durch persönliches Engagement beeindruckt und durch digitale Lösungen Ihren Erfolg sichert."
              <footer className="text-right mt-4 text-gray-400 not-italic text-sm md:text-base">
                — Ralf Julius Baumgartner, Steuerberater und Gründer von quotax
              </footer>
            </blockquote>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12">
          <a 
            href="#contact" 
            className="px-8 py-4 bg-purple text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2 group"
          >
            Gespräch vereinbaren
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a 
            href="#services" 
            className="px-8 py-4 border border-white/20 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:border-purple hover:text-purple w-full sm:w-auto flex items-center justify-center gap-2 group mt-4 sm:mt-0"
          >
            Unsere Dienstleistungen
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-10">
        <a href="#about" className="text-white hover:text-purple transition-colors duration-300">
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
