
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
  direction = 'up', 
  speed = 0.08, // Reduced speed for more subtle effect
  delay = 0,
  startVisible = false
}: ParallaxContainerProps) => {
  const [isVisible, setIsVisible] = useState(startVisible);
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const handleScroll = () => {
      if (!section) return;
      
      // Check if element is in viewport
      const rect = section.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight * 0.95 && rect.bottom > 0;
      
      if (isInView) {
        setIsVisible(true);
        
        // Calculate subtle parallax effect
        const scrollPosition = window.scrollY;
        const sectionTop = section.offsetTop;
        const scrollRelative = scrollPosition - sectionTop + window.innerHeight;
        
        if (scrollRelative > 0) {
          setOffset(Math.min(scrollRelative * speed, 40)); // Cap the maximum movement for subtlety
        }
      }
    };

    // Apply delay for staggered animations
    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll);
      // Check initial visibility
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
          return 'translateX(-30px)'; // Reduced movement distance
        case 'right':
          return 'translateX(30px)';
        case 'up':
          return 'translateY(30px)';
        case 'down':
          return 'translateY(-30px)';
        default:
          return 'translateY(30px)';
      }
    }
    
    // Apply subtle parallax effect when visible
    switch (direction) {
      case 'left':
        return `translateX(${-30 + offset}px)`;
      case 'right':
        return `translateX(${30 - offset}px)`;
      case 'up':
        return `translateY(${30 - offset}px)`;
      case 'down':
        return `translateY(${-30 + offset}px)`;
      default:
        return `translateY(${30 - offset}px)`;
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full transition-all duration-700 ease-out"
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
