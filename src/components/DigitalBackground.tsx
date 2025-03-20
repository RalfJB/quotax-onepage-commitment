
import { useEffect, useRef } from 'react';

const DigitalBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const binaryDigits = ['0', '1'];
    // Reduce number of characters by increasing font size
    const fontSize = 18;
    const columns = Math.floor(width / fontSize);
    
    // Array to store vertical positions for each column
    const drops: number[] = Array(columns).fill(1);
    
    // Create color gradient for text
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(147, 112, 219, 0.8)'); // Light purple with higher opacity
    gradient.addColorStop(0.5, 'rgba(124, 252, 0, 0.8)'); // Light green with higher opacity
    gradient.addColorStop(1, 'rgba(147, 112, 219, 0.8)'); // Light purple with higher opacity
    
    const draw = () => {
      // Black background with some transparency to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = gradient;
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Only render every other column to improve performance
        if (i % 2 === 0) {
          const text = binaryDigits[Math.floor(Math.random() * binaryDigits.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          
          // Random opacity to make some characters brighter
          const opacity = Math.random() * 0.5 + 0.5;
          ctx.globalAlpha = opacity;
          
          ctx.fillText(text, x, y);
          ctx.globalAlpha = 1;
          
          // Randomly reset the drop position to create varied effect
          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          
          // Increase drop position
          drops[i]++;
        }
      }
    };
    
    // Slow down the animation rate to improve performance
    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.7, background: '#000000' }}
    />
  );
};

export default DigitalBackground;
