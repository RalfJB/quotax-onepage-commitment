
import { useEffect, useRef, useState, ReactNode } from 'react';

interface ParallaxContainerProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  speed?: number;
}

const ParallaxContainer = ({ 
  children, 
  direction = 'left', 
  speed = 0.2 
}: ParallaxContainerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateValue, setTranslateValue] = useState(0);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const handleScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        setIsVisible(true);
        
        // Calculate parallax effect
        const scrollPosition = window.scrollY;
        const sectionTop = section.offsetTop;
        const scrollRelative = scrollPosition - sectionTop + window.innerHeight;
        
        if (scrollRelative > 0) {
          const parallaxValue = Math.min(scrollRelative * speed, 100);
          setTranslateValue(parallaxValue);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once to check initial visibility
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  // Determine transform based on direction
  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'left':
          return 'translateX(-100px)';
        case 'right':
          return 'translateX(100px)';
        case 'up':
          return 'translateY(100px)';
        case 'down':
          return 'translateY(-100px)';
        default:
          return 'translateX(-100px)';
      }
    }
    
    switch (direction) {
      case 'left':
        return `translateX(${-100 + translateValue}px)`;
      case 'right':
        return `translateX(${100 - translateValue}px)`;
      case 'up':
        return `translateY(${100 - translateValue}px)`;
      case 'down':
        return `translateY(${-100 + translateValue}px)`;
      default:
        return `translateX(${-100 + translateValue}px)`;
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxContainer;
