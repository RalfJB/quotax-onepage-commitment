
import { useEffect, useRef } from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';
import DigitalBackground from './DigitalBackground';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * 0.2}px)`;
        heroRef.current.style.opacity = `${1 - scrolled / 1000}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center px-6 md:px-12 lg:px-24">
      <DigitalBackground />
      
      <div 
        ref={heroRef}
        className="z-10 max-w-4xl text-center animate-fade-in-up glass-morphism" 
        style={{ animationDelay: '0.3s' }}
      >
        <div className="quotax-badge bg-purple/10 text-purple mb-6 backdrop-blur-sm">
          Eröffnung Sommer 2025 in Weinheim
        </div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-balance leading-tight">
          Ihre finanzielle Zukunft.
          <br/>
          <div className="mt-2">
            <span className="text-purple bg-black/20 backdrop-blur-sm px-2 py-1 rounded">Digital</span>
            {" "}und{" "}
            <span className="text-green bg-black/20 backdrop-blur-sm px-2 py-1 rounded">persönlich</span>.
          </div>
        </h1>
        <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-10 text-balance bg-black/30 backdrop-blur-sm p-4 rounded-lg">
          Wir arbeiten für ihre finanzielle Zukunft - mit digitaler Expertise, Transparenz und persönlichem Engagement.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a 
            href="#contact" 
            className="px-8 py-4 bg-purple/90 backdrop-blur-sm text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:bg-purple hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center group"
          >
            Gespräch vereinbaren
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#services" 
            className="px-8 py-4 border border-white/30 bg-black/30 backdrop-blur-sm text-white rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:border-purple hover:text-purple flex items-center gap-2 w-full sm:w-auto justify-center group"
          >
            Unsere Dienstleistungen
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-10">
        <a href="#about" className="text-white hover:text-purple transition-colors duration-300">
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
