
import { useEffect, useState, useRef } from 'react';

interface CurvedArrowTextProps {
  className?: string;
}

const CurvedArrowText = ({ className = '' }: CurvedArrowTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Start the appearance animation after a short delay
    setTimeout(() => {
      setIsVisible(true);
    }, 800);
    
    // Subtle parallax effect on scroll
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const scrolled = window.scrollY;
      if (scrolled < 400) {
        // Subtle movement for the text as user scrolls
        elementRef.current.style.transform = `translateY(${scrolled * 0.02}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
      
      {/* Left text block */}
      <div 
        className={`absolute left-4 md:left-8 bottom-0 transition-all duration-1000 ease-out delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ maxWidth: '300px' }}
      >
        <p className="text-lg md:text-xl lg:text-2xl font-serif leading-tight text-foreground mb-6">
          <span className="font-medium">Zeit</span> <br />
          für mehr Miteinander, <br />
          für mehr Verständnis, <br />
          für bessere Beratung.
        </p>
        
        <div className="mt-6 text-lg md:text-xl lg:text-2xl font-serif text-foreground/70">
          <p>Unsere Website befindet sich noch im Aufbau.</p>
          <p className="mt-1">Unsere Idee ist aber schon Wirklichkeit.</p>
        </div>
      </div>
    </div>
  );
};

export default CurvedArrowText;
