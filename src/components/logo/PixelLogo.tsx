
import { useLogoAnimation } from './useLogoAnimation';

interface PixelLogoProps {
  onAnimationComplete?: () => void;
}

const PixelLogo = ({ onAnimationComplete }: PixelLogoProps) => {
  const { canvasRef } = useLogoAnimation({ onAnimationComplete });
  
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
