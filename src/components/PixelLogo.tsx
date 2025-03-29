
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
  delay: number;
  active: boolean;
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
  const binaryRainRef = useRef<{x: number, y: number, value: string, speed: number, opacity: number}[]>([]);
  const logoSizeRef = useRef({ width: 0, height: 0 });

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
    
    // Generate binary rain drops
    const generateBinaryRain = () => {
      const numDrops = Math.floor(canvas.width / 20); // One drop every ~20px
      binaryRainRef.current = [];
      
      for (let i = 0; i < numDrops; i++) {
        binaryRainRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 2 - canvas.height,
          value: Math.random() > 0.5 ? '1' : '0',
          speed: 1 + Math.random() * 3,
          opacity: 0.1 + Math.random() * 0.5
        });
      }
    };
    
    // Create logo text
    const generateParticles = () => {
      if (!ctx) return;
      
      // Clear existing particles
      particlesRef.current = [];
      
      // Calculate logo size responsive to screen
      const fontSize = Math.min(canvas.width * 0.15, 180);
      logoSizeRef.current = {
        width: fontSize * 5, // Approximate width of "quotax"
        height: fontSize * 1.2
      };
      
      // Set text properties for perfect center positioning
      ctx.font = `bold ${fontSize}px 'Plus Jakarta Sans', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Draw logo text with colored parts
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw "quo" in purple
      ctx.fillStyle = '#9b87f5'; // Purple color
      ctx.fillText('quo', centerX - fontSize * 0.65, centerY);
      
      // Draw "tax" in green
      ctx.fillStyle = '#687c58'; // Green color
      ctx.fillText('tax', centerX + fontSize * 0.65, centerY);
      
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
            
            // All particles start from random positions at the top
            const randomY = -Math.random() * canvas.height * 2;
            
            // Make particles fall vertically toward their final position
            const randomX = x;
            
            // Add random delay for cascading Matrix effect
            const delay = Math.random() * 1500;
            
            particles.push({
              x: randomX,
              y: randomY,
              size: pixelSize,
              color,
              originalX: x,
              originalY: y,
              vx: 0,
              vy: 0,
              delay: delay,
              active: false
            });
          }
        }
      }
      
      particlesRef.current = particles;
      generateBinaryRain(); // Initialize binary rain after creating particles
    };
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas with semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw binary rain (digital rain effect)
      binaryRainRef.current.forEach((drop, i) => {
        // Vary color between green and purple with slight randomization
        if (Math.random() > 0.95) {
          ctx.fillStyle = Math.random() > 0.7 
            ? `rgba(155, 135, 245, ${drop.opacity})` // Purple
            : `rgba(104, 124, 88, ${drop.opacity})`; // Green
        } else {
          ctx.fillStyle = `rgba(104, 124, 88, ${drop.opacity})`;
        }
        
        // Draw the binary value
        ctx.font = `${14 + Math.random() * 6}px "JetBrains Mono", monospace`;
        ctx.fillText(drop.value, drop.x, drop.y);
        
        // Move the drop down
        drop.y += drop.speed;
        
        // Reset if it goes off screen
        if (drop.y > canvas.height) {
          drop.y = -20;
          drop.x = Math.random() * canvas.width;
          drop.value = Math.random() > 0.5 ? '1' : '0';
          drop.speed = 1 + Math.random() * 3;
        }
        
        // Randomly change value sometimes
        if (Math.random() > 0.95) {
          drop.value = Math.random() > 0.5 ? '1' : '0';
        }
      });
      
      // Animation settings
      const easing = 0.08;
      const friction = 0.9;
      let completedParticles = 0;
      const currentTime = performance.now();
      
      // Draw and update logo particles
      particlesRef.current.forEach(particle => {
        // Only start animating after delay
        if (!particle.active && currentTime > particle.delay) {
          particle.active = true;
        }
        
        if (particle.active) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0"
      />
    </div>
  );
};

export default PixelLogo;
