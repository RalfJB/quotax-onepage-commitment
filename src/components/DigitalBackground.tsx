
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
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    
    // Array to store vertical positions for each column
    const drops: number[] = Array(columns).fill(1);
    
    // Create color gradient for text
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(147, 112, 219, 0.1)'); // Light purple with low opacity
    gradient.addColorStop(0.5, 'rgba(124, 252, 0, 0.1)'); // Light green with low opacity
    gradient.addColorStop(1, 'rgba(147, 112, 219, 0.1)'); // Light purple with low opacity
    
    const draw = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = gradient;
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = binaryDigits[Math.floor(Math.random() * binaryDigits.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        ctx.fillText(text, x, y);
        
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 35);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
};

export default DigitalBackground;
