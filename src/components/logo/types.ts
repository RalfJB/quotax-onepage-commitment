
export interface Particle {
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

export interface BinaryDrop {
  x: number;
  y: number;
  value: string;
  speed: number;
  opacity: number;
}

export interface LogoSize {
  width: number;
  height: number;
}
