
import { useEffect, useRef, useState, ReactNode } from 'react';

interface ParallaxContainerProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  speed?: number;
  delay?: number;
}

const ParallaxContainer = ({ 
  children, 
  direction = 'left', 
  speed = 0.2,
  delay = 0
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
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      
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

    // Apply delay to initial visibility for staggered animations
    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll);
      // Trigger once to check initial visibility
      handleScroll();
    }, delay);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, delay]);

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
        transitionProperty: 'opacity, transform',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxContainer;
