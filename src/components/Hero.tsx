
import { useEffect, useRef } from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';

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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-purple/5 to-white z-0"></div>
      
      {/* Animated background shapes */}
      <div ref={heroRef} className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple/10 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-green/10 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-purple/5 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Hero content */}
      <div className="z-10 max-w-4xl text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="quotax-badge bg-purple/10 text-purple mb-6">
          Eröffnung Sommer 2025 in Weinheim
        </div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-balance leading-tight">
          Ihre finanzielle Zukunft. <br/>
          <span className="text-purple">Digital</span> und <span className="text-green">persönlich</span>.
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10 text-balance">
          Wir arbeiten für ihre finanzielle Zukunft - mit digitaler Expertise, Transparenz und persönlichem Engagement.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a 
            href="#contact" 
            className="px-8 py-4 bg-purple text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:bg-purple-dark hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Gespräch vereinbaren
            <ChevronRight size={18} />
          </a>
          <a 
            href="#services" 
            className="px-8 py-4 border border-gray-300 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:border-purple hover:text-purple flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Unsere Dienstleistungen
            <ChevronRight size={18} />
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-10">
        <a href="#about" className="text-gray-500 hover:text-purple transition-colors duration-300">
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
