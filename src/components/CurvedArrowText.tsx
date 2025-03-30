
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

  // Calculate positions to create equal spacing between all three text blocks
  // We'll use a total of 450px height to be divided into three equal sections
  const totalHeight = 450;
  const section = totalHeight / 3;

  return (
    <div className={`relative ${className}`}>
      {/* Right text block (top) */}
      <div 
        ref={elementRef}
        className={`absolute right-4 md:right-8 top-0 text-right transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ maxWidth: '340px' }}
      >
        <p className="text-xl md:text-2xl lg:text-3xl font-open-sans leading-tight text-black">
          Wir glauben fest <br />
          daran, dass uns die <br />
          Digitalisierung <br />
          Zeit schenken wird.
        </p>
      </div>
      
      {/* Left middle text block - positioned at 1/3 of the height */}
      <div 
        className={`absolute left-4 md:left-8 top-[${section}px] transition-all duration-1000 ease-out delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ maxWidth: '300px', top: `${section}px` }}
      >
        <p className="text-lg md:text-xl lg:text-2xl font-open-sans leading-tight text-black">
          <span className="font-medium">Zeit</span> <br />
          für mehr Miteinander, <br />
          für mehr Verständnis, <br />
          für bessere Beratung.
        </p>
      </div>
      
      {/* Left bottom text block - positioned at 2/3 of the height */}
      <div 
        className={`absolute left-4 md:left-8 transition-all duration-1000 ease-out delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ maxWidth: '300px', top: `${2 * section}px` }}
      >
        <div className="text-lg md:text-xl lg:text-2xl font-open-sans text-black">
          <p>Unsere Website befindet sich noch im Aufbau.</p>
          <p className="mt-1">Unsere Idee ist aber schon Wirklichkeit.</p>
        </div>
      </div>
    </div>
  );
};

export default CurvedArrowText;
