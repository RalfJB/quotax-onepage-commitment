
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
    // Increase font size for a cleaner, more subtle effect
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    
    // Array to store vertical positions for each column
    const drops: number[] = Array(columns).fill(1);
    
    // Create color gradient for text - extremely light and subtle for minimalist design
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(155, 135, 245, 0.06)'); // Very light purple
    gradient.addColorStop(0.5, 'rgba(124, 252, 0, 0.04)'); // Very light green
    gradient.addColorStop(1, 'rgba(155, 135, 245, 0.06)'); // Very light purple
    
    const draw = () => {
      // Almost fully transparent background for ultra-subtle trail
      ctx.fillStyle = 'rgba(246, 242, 255, 0.06)';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = gradient;
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Only render every fifth column for improved performance and minimalist aesthetic
        if (i % 5 === 0) {
          const text = binaryDigits[Math.floor(Math.random() * binaryDigits.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          
          // Very low opacity for ultra-subtle effect
          const opacity = Math.random() * 0.15 + 0.03;
          ctx.globalAlpha = opacity;
          
          ctx.fillText(text, x, y);
          ctx.globalAlpha = 1;
          
          // Randomly reset the drop position to create varied effect
          if (y > height && Math.random() > 0.99) {
            drops[i] = 0;
          }
          
          // Increase drop position
          drops[i]++;
        }
      }
    };
    
    // Slow down the animation rate for subtle effect
    const interval = setInterval(draw, 100);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.25, background: '#f6f2ff' }}
    />
  );
};

export default DigitalBackground;
