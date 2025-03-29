
import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  originalX: number;
  originalY: number;
  vx: number;
  vy: number;
}

interface PixelLogoProps {
  onAnimationComplete?: () => void;
}

const PixelLogo = ({ onAnimationComplete }: PixelLogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const completionTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full window size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateParticles();
    };
    
    // Create logo text
    const generateParticles = () => {
      if (!ctx) return;
      
      // Clear existing particles
      particlesRef.current = [];
      
      // Set text properties - adjust for perfect center positioning
      const fontSize = Math.min(canvas.width * 0.15, 180); // Responsive font size
      ctx.font = `bold ${fontSize}px 'Plus Jakarta Sans', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Draw logo text
      const quoText = 'quo';
      const taxText = 'tax';
      ctx.fillStyle = '#9b87f5'; // Purple color
      ctx.fillText(quoText, canvas.width / 2 - fontSize * 0.65, canvas.height / 2);
      
      ctx.fillStyle = '#687c58'; // Green color
      ctx.fillText(taxText, canvas.width / 2 + fontSize * 0.65, canvas.height / 2);
      
      // Get image data for pixel manipulation
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create particles from pixels
      const particles: Particle[] = [];
      const pixelSize = 4; // Particle size
      const density = 2; // Only create particles for every nth pixel (for performance)
      
      for (let y = 0; y < canvas.height; y += density) {
        for (let x = 0; x < canvas.width; x += density) {
          const index = (y * canvas.width + x) * 4;
          const alpha = data[index + 3];
          
          // Only create particles for non-transparent pixels
          if (alpha > 0) {
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            const color = `rgba(${r}, ${g}, ${b}, ${alpha / 255})`;
            
            // Create particle with random initial position (for animation effect)
            const randomOffsetX = (Math.random() - 0.5) * canvas.width * 1.5;
            const randomOffsetY = (Math.random() - 0.5) * canvas.height * 1.5;
            
            particles.push({
              x: x + randomOffsetX,
              y: y + randomOffsetY,
              size: pixelSize,
              color,
              originalX: x,
              originalY: y,
              vx: 0,
              vy: 0
            });
          }
        }
      }
      
      particlesRef.current = particles;
    };
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Animation settings
      const easing = 0.08;
      const friction = 0.9;
      let completedParticles = 0;
      
      particlesRef.current.forEach(particle => {
        // Calculate distance to original position
        const dx = particle.originalX - particle.x;
        const dy = particle.originalY - particle.y;
        
        // Apply velocity with easing
        particle.vx += dx * easing;
        particle.vy += dy * easing;
        
        // Apply friction
        particle.vx *= friction;
        particle.vy *= friction;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
        
        // Check if particle is close to its original position
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 0.5) {
          completedParticles++;
        }
      });
      
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
  }, [onAnimationComplete]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0"
      />
    </div>
  );
};

export default PixelLogo;
