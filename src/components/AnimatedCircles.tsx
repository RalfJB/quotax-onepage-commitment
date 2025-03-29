
import { useEffect, useRef } from 'react';

interface Circle {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  speedY: number;
}

const AnimatedCircles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circlesRef = useRef<Circle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 1.5; // Make canvas taller so circles can move off-screen
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create initial circles
    const createCircles = () => {
      const purpleColors = ['rgba(203, 94, 203, 0.2)', 'rgba(217, 126, 217, 0.15)', 'rgba(178, 83, 178, 0.18)'];
      const greenColors = ['rgba(104, 124, 88, 0.2)', 'rgba(120, 143, 103, 0.15)', 'rgba(88, 106, 73, 0.18)'];
      const grayColors = ['rgba(169, 169, 169, 0.25)', 'rgba(150, 150, 150, 0.2)', 'rgba(190, 190, 190, 0.15)'];
      
      const allColors = [...purpleColors, ...greenColors, ...grayColors];
      
      const circles: Circle[] = [];
      
      // Create 10-15 circles with varying sizes and positions
      const numCircles = Math.floor(Math.random() * 6) + 10;
      
      for (let i = 0; i < numCircles; i++) {
        const radius = Math.random() * 300 + 100; // Circles between 100-400px radius
        const x = Math.random() * (canvas.width + radius * 2) - radius;
        const y = Math.random() * (canvas.height + radius * 2) - radius;
        const color = allColors[Math.floor(Math.random() * allColors.length)];
        const opacity = Math.random() * 0.2 + 0.1; // Opacity between 0.1-0.3
        const speedY = Math.random() * 0.4 + 0.1; // Slow upward movement
        
        circles.push({ x, y, radius, color, opacity, speedY });
      }
      
      return circles;
    };
    
    circlesRef.current = createCircles();
    
    // Handle scroll effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Move circles based on scroll position
      circlesRef.current.forEach(circle => {
        circle.y += scrollY * 0.05; // Move circles down as user scrolls
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update circles
      circlesRef.current.forEach(circle => {
        // Draw circle
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();
        
        // Move circle
        circle.y -= circle.speedY; // Move up slowly
        
        // If circle moves off top, reset to bottom
        if (circle.y + circle.radius < -300) {
          circle.y = canvas.height + circle.radius;
          circle.x = Math.random() * canvas.width;
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default AnimatedCircles;
