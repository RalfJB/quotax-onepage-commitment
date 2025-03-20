
import { useEffect, useRef } from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';
import DigitalBackground from './DigitalBackground';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simplified scroll effect without excessive transformations
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
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      <DigitalBackground />
      
      <div 
        ref={heroRef}
        className="z-10 max-w-4xl text-center animate-fade-in-up px-6 md:px-0" 
        style={{ animationDelay: '0.3s' }}
      >
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 text-balance leading-tight mt-[-40px]">
          <span className="text-purple">quo</span>
          <span className="text-green">tax</span>
          <span className="text-gray-800"> Steuerberatung</span>
        </h1>
        
        <div className="mt-4 mb-10">
          <div className="inline-block text-xl md:text-2xl lg:text-3xl font-medium text-orange-600 py-2 px-4 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm">
            Eröffnung Sommer 2025
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-display font-semibold mt-8 mb-12 text-gray-800">
          <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded shadow-sm text-purple">digital</span>
          <span className="mx-4">und</span>
          <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded shadow-sm text-green">persönlich</span>
          <span className="text-gray-800">.</span>
        </h2>
        
        <div className="mt-16 mb-14">
          <blockquote className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto text-balance bg-white/90 backdrop-blur-sm p-8 rounded-lg border-l-4 border-purple shadow-sm italic">
            "Ihr Vertrauen ist die Basis unserer Vision: Menschliche Nähe, persönlicher Einsatz und digitale Innovation für Ihren Erfolg."
            <footer className="text-right mt-4 text-gray-600 not-italic text-sm md:text-base">
              — Ralf Julius Baumgartner, Steuerberater und Inhaber von quotax
            </footer>
          </blockquote>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
          <a 
            href="#contact" 
            className="px-8 py-4 bg-purple text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2 group"
          >
            Gespräch vereinbaren
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#services" 
            className="px-8 py-4 border border-gray-300 bg-white/90 backdrop-blur-sm text-gray-800 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:border-purple hover:text-purple w-full sm:w-auto flex items-center justify-center gap-2 group mt-4 sm:mt-0"
          >
            Unsere Dienstleistungen
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-10">
        <a href="#about" className="text-gray-800 hover:text-purple transition-colors duration-300">
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
