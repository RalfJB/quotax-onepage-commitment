
import { useEffect, useRef, useState } from 'react';
import { Particle, BinaryDrop, LogoSize } from './types';
import { generateBinaryRain, generateParticles, drawBinaryRain, updateParticles } from './animationUtils';

interface UseLogoAnimationProps {
  onAnimationComplete?: () => void;
}

export const useLogoAnimation = ({ onAnimationComplete }: UseLogoAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const completionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const binaryRainRef = useRef<BinaryDrop[]>([]);
  const logoSizeRef = useRef<LogoSize>({ width: 0, height: 0 });
  const animationStartTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full window size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initAnimation();
    };
    
    const initAnimation = () => {
      if (!ctx || !canvas) return;
      
      // Generate particles and binary rain
      const { particles, logoSize } = generateParticles(ctx, canvas);
      particlesRef.current = particles;
      logoSizeRef.current = logoSize;
      binaryRainRef.current = generateBinaryRain(canvas.width, canvas.height);
      
      // Set animation start time if not already set
      if (animationStartTimeRef.current === 0) {
        animationStartTimeRef.current = performance.now();
      }
    };
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas with semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw binary rain
      binaryRainRef.current = drawBinaryRain(ctx, binaryRainRef.current, canvas.height, canvas.width);
      
      // Update and draw particles
      const currentTime = performance.now();
      const { particles, completedParticles } = updateParticles(ctx, particlesRef.current, currentTime);
      particlesRef.current = particles;
      
      // Check if animation is complete or has been running too long (fail-safe)
      const completionRatio = completedParticles / particlesRef.current.length;
      const animationRuntime = currentTime - animationStartTimeRef.current;
      
      if ((completionRatio > 0.95 || animationRuntime > 6000) && !isAnimationComplete) {
        setIsAnimationComplete(true);
        if (onAnimationComplete) {
          // Start a timer to allow particles to settle before calling onAnimationComplete
          if (completionTimerRef.current) {
            clearTimeout(completionTimerRef.current);
          }
          completionTimerRef.current = setTimeout(() => {
            onAnimationComplete();
          }, 800); // Slightly longer delay for better visual effect
        }
      }
      
      // Only continue animation if not complete
      if (!isAnimationComplete) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    
    // Handle scroll events to force animation completion
    const handleScroll = () => {
      if (!isAnimationComplete) {
        setIsAnimationComplete(true);
        if (onAnimationComplete) {
          if (completionTimerRef.current) {
            clearTimeout(completionTimerRef.current);
          }
          // Call onAnimationComplete immediately when user scrolls
          onAnimationComplete();
        }
      }
    };
    
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', handleScroll);
    resize();
    animate();
    
    // Set a maximum animation time (10 seconds)
    const maxAnimationTimeout = setTimeout(() => {
      if (!isAnimationComplete && onAnimationComplete) {
        setIsAnimationComplete(true);
        onAnimationComplete();
      }
    }, 10000);
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (completionTimerRef.current) {
        clearTimeout(completionTimerRef.current);
      }
      clearTimeout(maxAnimationTimeout);
    };
  }, [onAnimationComplete, isAnimationComplete]);

  return { canvasRef };
};
