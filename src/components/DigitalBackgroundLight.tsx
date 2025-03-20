
import { useEffect, useRef } from 'react';

const DigitalBackgroundLight = () => {
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
    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    
    // Array to store vertical positions for each column
    const drops: number[] = Array(columns).fill(1);
    
    // Create color gradient for text (darker version for contrast)
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(147, 112, 219, 0.4)'); // Light purple with lower opacity
    gradient.addColorStop(0.5, 'rgba(124, 252, 0, 0.4)'); // Light green with lower opacity
    gradient.addColorStop(1, 'rgba(147, 112, 219, 0.4)'); // Light purple with lower opacity
    
    const draw = () => {
      // Dark background with high transparency to create a fading trail effect
      ctx.fillStyle = 'rgba(18, 18, 18, 0.1)';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = gradient;
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Random binary digit
        const text = binaryDigits[Math.floor(Math.random() * binaryDigits.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Random opacity to make some characters brighter
        const opacity = Math.random() * 0.4 + 0.1; // Lower opacity range
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
    };
    
    const interval = setInterval(draw, 40);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.5, zIndex: 0, background: '#1A1A1A' }}
    />
  );
};

export default DigitalBackgroundLight;
