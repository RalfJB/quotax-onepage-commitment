
import { useEffect, useState, useRef } from 'react';

interface CurvedArrowTextProps {
  className?: string;
}

const CurvedArrowText = ({ className = '' }: CurvedArrowTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 800);
    
    // Subtle parallax effect on scroll
    const handleScroll = () => {
      if (!elementRef.current || !arrowRef.current) return;
      
      const scrolled = window.scrollY;
      if (scrolled < 400) {
        // Subtle movement for the text as user scrolls
        elementRef.current.style.transform = `translateY(${scrolled * 0.02}px)`;
        // Slightly different movement for the arrow
        arrowRef.current.style.transform = `translateY(${scrolled * 0.03}px) rotate(${-scrolled * 0.01}deg)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Right text block */}
      <div 
        ref={elementRef}
        className={`absolute right-4 md:right-8 top-0 text-right transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ maxWidth: '340px' }}
      >
        <p className="text-xl md:text-2xl lg:text-3xl font-serif leading-tight text-foreground">
          Wir glauben fest <br />
          daran, dass uns die <br />
          Digitalisierung <br />
          Zeit schenken wird.
        </p>
      </div>
      
      {/* Curved arrow - Using SVG for precise curved line */}
      <div 
        ref={arrowRef}
        className={`absolute left-4 md:left-20 bottom-0 transition-all duration-1000 ease-out delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <svg width="120" height="260" viewBox="0 0 120 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M10,240 Q60,100 110,20" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeDasharray="6,4"
            className="text-purple"
          />
          <path d="M100,10 L110,20 L120,5" stroke="currentColor" strokeWidth="2" className="text-purple" />
        </svg>
      </div>
      
      {/* Left text block */}
      <div 
        className={`absolute left-4 md:left-8 bottom-0 transition-all duration-1000 ease-out delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ maxWidth: '300px' }}
      >
        <p className="text-lg md:text-xl lg:text-2xl font-serif leading-tight text-foreground mb-6">
          Zeit <br />
          für mehr Miteinander, <br />
          für mehr Verständnis, <br />
          für bessere Beratung.
        </p>
        
        <a 
          href="#services" 
          className="bg-foreground text-background text-sm font-medium px-6 py-2 rounded-full inline-block hover:bg-purple hover:text-white transition-colors duration-300"
        >
          Schon jetzt mehr erfahren
        </a>
        
        <div className="mt-6 text-xs text-foreground/70">
          <p>Unsere Website befindet sich noch im Aufbau.</p>
          <p className="mt-1">
            Unsere Idee ist aber schon Wirklichkeit: wir sind eine Steuerberatungskanzlei <br />
            mit Sitz in XXXXX, XXXXXX, XXXXXXXX und XXXXXXX
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurvedArrowText;
