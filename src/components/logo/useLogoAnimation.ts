
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
      
      // Check if animation is complete
      const completionRatio = completedParticles / particlesRef.current.length;
      if (completionRatio > 0.95 && !isAnimationComplete) {
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
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', resize);
    resize();
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (completionTimerRef.current) {
        clearTimeout(completionTimerRef.current);
      }
    };
  }, [onAnimationComplete, isAnimationComplete]);

  return { canvasRef };
};
