
import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import CurvedArrowText from '@/components/CurvedArrowText';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Einfacher Parallax-Effekt beim Scrollen
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroRef.current && scrolled < 500) {
        heroRef.current.style.opacity = `${1 - scrolled / 1000}`; // Langsameres Ausblenden für weicheren Übergang
        heroRef.current.style.transform = `translateY(${scrolled * 0.05}px)`; // Subtilere Bewegung
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initiales Einblenden
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[100vh] w-full flex flex-col items-center bg-background py-0 mb-4">
      {/* Subtile Hintergrundelemente */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-green/3 filter blur-[200px] z-0"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-purple/3 filter blur-[200px] z-0"></div>
      
      <div 
        ref={heroRef}
        className={`z-10 w-full max-w-5xl px-6 md:px-8 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} flex flex-col items-center justify-center pt-24 pb-16`}
      >
        <div className="mb-6 text-center">
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-normal tracking-tighter">
            <span className="font-outfit tracking-tighter">
              <span className="text-[#cf66cf]">quo</span><span className="text-[#687c58]">tax</span>
            </span>
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground tracking-tight">
            Steuerberatung
          </h2>
        </div>
        
        {/* CurvedArrowText component placement */}
        <div className="w-full relative h-[550px] my-8">
          <CurvedArrowText className="w-full h-full" />
        </div>
        
        <div className="mt-4 mb-6 text-center">
          <div className="inline-block text-lg sm:text-xl md:text-2xl font-medium text-orange-600 py-2 px-6 sm:py-3 sm:px-10 rounded-full bg-orange-50/20 backdrop-blur-sm border border-orange-200/20">
            Eröffnung Sommer 2025
          </div>
        </div>
        
        <div className={`my-6 flex flex-col items-center transition-all duration-700 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex flex-row items-center gap-3 sm:gap-4 mb-8">
            <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#cf66cf]">
              digital
            </span>
            
            <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground/90">
              und
            </span>
            
            <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#687c58]">
              persönlich
            </span>
          </div>
          
          {/* Button moved from CurvedArrowText to here */}
          <a 
            href="#services" 
            className="bg-purple text-white text-sm font-medium px-6 py-2 rounded-full inline-block hover:bg-green hover:text-white transition-colors duration-300"
          >
            Schon jetzt mehr erfahren
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 cursor-pointer z-10 animate-bounce">
        <a href="#about" className="text-foreground hover:text-green transition-colors duration-300 bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/10">
          <ArrowDown size={28} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
