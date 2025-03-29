
import { useEffect, useRef, useState, ReactNode } from 'react';

interface ParallaxContainerProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  speed?: number;
  delay?: number;
  startVisible?: boolean;
  className?: string;
}

const ParallaxContainer = ({ 
  children, 
  direction = 'up', 
  speed = 0.05, // Reduzierter Wert für subtileren Effekt
  delay = 0,
  startVisible = false,
  className = ''
}: ParallaxContainerProps) => {
  const [isVisible, setIsVisible] = useState(startVisible);
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const handleScroll = () => {
      if (!section) return;
      
      // Prüfe, ob Element im Viewport ist
      const rect = section.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInView) {
        setIsVisible(true);
        
        // Berechne subtilen Parallaxeffekt
        const scrollPosition = window.scrollY;
        const sectionTop = section.offsetTop;
        const scrollRelative = scrollPosition - sectionTop + window.innerHeight;
        
        if (scrollRelative > 0) {
          setOffset(Math.min(scrollRelative * speed, 20)); // Begrenze die maximale Bewegung für Subtilität
        }
      }
    };

    // Delay für gestaffelte Animationen anwenden
    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll);
      // Prüfe initiale Sichtbarkeit
      handleScroll();
    }, delay);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, delay, startVisible]);

  // Transformationsberechnung basierend auf der Richtung
  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'left':
          return 'translateX(-20px)'; // Reduzierte Bewegungsdistanz
        case 'right':
          return 'translateX(20px)';
        case 'up':
          return 'translateY(20px)';
        case 'down':
          return 'translateY(-20px)';
        default:
          return 'translateY(20px)';
      }
    }
    
    // Subtilen Parallaxeffekt anwenden, wenn sichtbar
    switch (direction) {
      case 'left':
        return `translateX(${-20 + offset}px)`;
      case 'right':
        return `translateX(${20 - offset}px)`;
      case 'up':
        return `translateY(${20 - offset}px)`;
      case 'down':
        return `translateY(${-20 + offset}px)`;
      default:
        return `translateY(${20 - offset}px)`;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full transition-all duration-500 ease-out overflow-hidden ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: 'opacity, transform',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxContainer;
