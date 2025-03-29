
import { useEffect, useRef, useState, ReactNode } from 'react';

interface ParallaxContainerProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  speed?: number;
  delay?: number;
  startVisible?: boolean;
}

const ParallaxContainer = ({ 
  children, 
  direction = 'left', 
  speed = 0.2,
  delay = 0,
  startVisible = false
}: ParallaxContainerProps) => {
  const [isVisible, setIsVisible] = useState(startVisible);
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateValue, setTranslateValue] = useState(0);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const handleScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      // Make element visible when it's closer to the viewport
      const isVisible = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
      
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
  }, [speed, delay, startVisible]);

  // Determine transform based on direction
  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'left':
          return 'translateX(-120px)';
        case 'right':
          return 'translateX(120px)';
        case 'up':
          return 'translateY(120px)';
        case 'down':
          return 'translateY(-120px)';
        default:
          return 'translateX(-120px)';
      }
    }
    
    switch (direction) {
      case 'left':
        return `translateX(${-120 + translateValue}px)`;
      case 'right':
        return `translateX(${120 - translateValue}px)`;
      case 'up':
        return `translateY(${120 - translateValue}px)`;
      case 'down':
        return `translateY(${-120 + translateValue}px)`;
      default:
        return `translateX(${-120 + translateValue}px)`;
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full transition-all duration-1200 ease-out"
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
