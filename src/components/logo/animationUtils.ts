
import { Particle, BinaryDrop } from './types';

export const generateBinaryRain = (canvasWidth: number, canvasHeight: number): BinaryDrop[] => {
  const numDrops = Math.floor(canvasWidth / 20); // One drop every ~20px
  const binaryRain: BinaryDrop[] = [];
  
  for (let i = 0; i < numDrops; i++) {
    binaryRain.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight * 2 - canvasHeight,
      value: Math.random() > 0.5 ? '1' : '0',
      speed: 1 + Math.random() * 3,
      opacity: 0.1 + Math.random() * 0.5
    });
  }
  
  return binaryRain;
};

export const generateParticles = (
  ctx: CanvasRenderingContext2D, 
  canvas: HTMLCanvasElement
): { particles: Particle[], logoSize: { width: number, height: number } } => {
  // Calculate logo size responsive to screen
  const fontSize = Math.min(canvas.width * 0.15, 180);
  const logoSize = {
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
  
  return { particles, logoSize };
};

export const drawBinaryRain = (
  ctx: CanvasRenderingContext2D, 
  binaryRain: BinaryDrop[],
  canvasHeight: number,
  canvasWidth: number
): BinaryDrop[] => {
  const updatedRain = [...binaryRain];
  
  updatedRain.forEach((drop, i) => {
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
    if (drop.y > canvasHeight) {
      drop.y = -20;
      drop.x = Math.random() * canvasWidth;
      drop.value = Math.random() > 0.5 ? '1' : '0';
      drop.speed = 1 + Math.random() * 3;
    }
    
    // Randomly change value sometimes
    if (Math.random() > 0.95) {
      drop.value = Math.random() > 0.5 ? '1' : '0';
    }
  });
  
  return updatedRain;
};

export const updateParticles = (
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  currentTime: number
): { particles: Particle[], completedParticles: number } => {
  // Animation settings
  const easing = 0.08;
  const friction = 0.9;
  let completedParticles = 0;
  const updatedParticles = [...particles];
  
  // Draw and update logo particles
  updatedParticles.forEach((particle, index) => {
    // Only start animating after delay
    if (!particle.active && currentTime > particle.delay) {
      updatedParticles[index] = { ...particle, active: true };
      particle.active = true;
    }
    
    if (particle.active) {
      // Calculate distance to original position
      const dx = particle.originalX - particle.x;
      const dy = particle.originalY - particle.y;
      
      // Apply velocity with easing
      let vx = particle.vx + dx * easing;
      let vy = particle.vy + dy * easing;
      
      // Apply friction
      vx *= friction;
      vy *= friction;
      
      // Update position
      const x = particle.x + vx;
      const y = particle.y + vy;
      
      // Update particle
      updatedParticles[index] = {
        ...particle,
        x,
        y,
        vx,
        vy
      };
      
      // Draw particle
      ctx.fillStyle = particle.color;
      ctx.fillRect(x, y, particle.size, particle.size);
      
      // Check if particle is close to its original position
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 0.5) {
        completedParticles++;
      }
    }
  });
  
  return { particles: updatedParticles, completedParticles };
};
