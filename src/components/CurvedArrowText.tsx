
import { useEffect, useState, useRef } from 'react';

interface CurvedArrowTextProps {
  className?: string;
}

const CurvedArrowText = ({ className = '' }: CurvedArrowTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [arrowProgress, setArrowProgress] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Start the appearance animation after a short delay
    setTimeout(() => {
      setIsVisible(true);
    }, 800);
    
    // Animate the arrow drawing
    const arrowAnimation = setTimeout(() => {
      // Start the arrow animation after the text appears
      const duration = 1500; // 1.5 seconds for the arrow to complete
      const startTime = Date.now();
      
      const animateArrow = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setArrowProgress(progress);
        
        if (progress < 1) {
          requestAnimationFrame(animateArrow);
        }
      };
      
      requestAnimationFrame(animateArrow);
    }, 1200);
    
    // Subtle parallax effect on scroll
    const handleScroll = () => {
      if (!elementRef.current || !arrowRef.current) return;
      
      const scrolled = window.scrollY;
      if (scrolled < 400) {
        // Subtle movement for the text as user scrolls
        elementRef.current.style.transform = `translateY(${scrolled * 0.02}px)`;
        // Slightly different movement for the arrow
        arrowRef.current.style.transform = `translateY(${scrolled * 0.03}px) rotate(${scrolled * 0.01}deg)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(arrowAnimation);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Right text block - Source of the arrow */}
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
        className={`absolute inset-0 transition-all duration-1000 ease-out delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <svg width="100%" height="100%" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path 
            d="M500,80 Q350,250 150,300" 
            stroke="#cf66cf"
            strokeWidth="4"
            strokeDasharray="6,4"
            strokeDashoffset="0"
            style={{
              strokeDasharray: 500,
              strokeDashoffset: 500 - (500 * arrowProgress),
              transition: 'stroke-dashoffset 1.5s ease-out'
            }}
          />
          {/* Arrow head with improved shape */}
          <path 
            d="M170,310 L150,300 L170,290" 
            stroke="#cf66cf"
            strokeWidth="4" 
            style={{
              opacity: arrowProgress > 0.9 ? 1 : 0,
              transition: 'opacity 0.3s ease-out'
            }}
          />
        </svg>
      </div>
      
      {/* Left text block - Destination of the arrow */}
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
          className="bg-purple text-white text-sm font-medium px-6 py-2 rounded-full inline-block hover:bg-green hover:text-white transition-colors duration-300"
        >
          Schon jetzt mehr erfahren
        </a>
        
        <div className="mt-6 text-lg md:text-xl lg:text-2xl font-serif text-foreground/70">
          <p>Unsere Website befindet sich noch im Aufbau.</p>
          <p className="mt-1">Unsere Idee ist aber schon Wirklichkeit.</p>
        </div>
      </div>
    </div>
  );
};

export default CurvedArrowText;
