import { useEffect, useRef } from 'react';

interface Circle {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  speedY: number;
  speedX: number;
  parallaxFactor: number;
}

interface AnimatedCirclesProps {
  scrollY?: number;
}

const AnimatedCircles = ({ scrollY = 0 }: AnimatedCirclesProps) => {
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
      canvas.height = window.innerHeight * 2; // Make canvas taller so circles can move off-screen
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create initial circles
    const createCircles = () => {
      const purpleColors = ['rgba(203, 94, 203, 0.15)', 'rgba(217, 126, 217, 0.1)', 'rgba(178, 83, 178, 0.12)'];
      const greenColors = ['rgba(104, 124, 88, 0.15)', 'rgba(120, 143, 103, 0.1)', 'rgba(88, 106, 73, 0.12)'];
      const grayColors = ['rgba(169, 169, 169, 0.2)', 'rgba(150, 150, 150, 0.15)', 'rgba(190, 190, 190, 0.1)'];
      
      const allColors = [...purpleColors, ...greenColors, ...grayColors];
      
      const circles: Circle[] = [];
      
      // Create 15-20 circles with varying sizes and positions
      const numCircles = Math.floor(Math.random() * 6) + 15;
      
      for (let i = 0; i < numCircles; i++) {
        const radius = Math.random() * 300 + 150; // Circles between 150-450px radius
        const x = Math.random() * (canvas.width + radius * 2) - radius;
        const y = Math.random() * (canvas.height + radius * 2) - radius;
        const color = allColors[Math.floor(Math.random() * allColors.length)];
        const opacity = Math.random() * 0.15 + 0.05; // Lower opacity between 0.05-0.2
        const speedY = (Math.random() * 0.3 + 0.1) * (Math.random() > 0.5 ? 1 : -1); // Random direction
        const speedX = (Math.random() * 0.2 + 0.05) * (Math.random() > 0.5 ? 1 : -1); // Random direction
        const parallaxFactor = Math.random() * 0.4 + 0.2; // Different parallax factors
        
        circles.push({ x, y, radius, color, opacity, speedY, speedX, parallaxFactor });
      }
      
      return circles;
    };
    
    circlesRef.current = createCircles();
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update circles
      circlesRef.current.forEach(circle => {
        // Apply parallax effect based on scrollY
        const parallaxOffsetY = scrollY * circle.parallaxFactor;
        
        // Draw circle
        ctx.beginPath();
        ctx.arc(circle.x, circle.y - parallaxOffsetY * 0.5, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();
        
        // Move circle
        circle.y += circle.speedY;
        circle.x += circle.speedX;
        
        // If circle moves off screen, reset its position
        if (
          circle.y + circle.radius < -300 || 
          circle.y - circle.radius > canvas.height + 300 ||
          circle.x + circle.radius < -300 ||
          circle.x - circle.radius > canvas.width + 300
        ) {
          circle.y = Math.random() * canvas.height;
          circle.x = Math.random() * canvas.width;
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollY]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default AnimatedCircles;
