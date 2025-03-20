
import { useEffect, useRef } from 'react';

const GradientBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
      {/* Erstes Bild: Regenbogen-Gradient */}
      <div 
        className="absolute inset-0 w-full h-full opacity-60"
        style={{
          backgroundImage: "url('/lovable-uploads/5997b3e6-c3f0-4516-acee-ee0e3d3e0d64.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "soft-light"
        }}
      />
      
      {/* Zweites Bild: Blaues Licht mit Blasen */}
      <div 
        className="absolute inset-0 w-full h-full opacity-40"
        style={{
          backgroundImage: "url('/lovable-uploads/03e0372c-2ebc-4543-bb31-9304a710fa03.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "screen"
        }}
      />
      
      {/* Overlay für besseren Kontrast zu Texten */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
      
      {/* Subtile animierte Elemente */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl top-1/4 -left-64 animate-pulse" 
        style={{animationDuration: '15s'}} 
      />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-green-300/10 blur-3xl bottom-1/4 -right-32 animate-pulse" 
        style={{animationDuration: '12s'}} 
      />
    </div>
  );
};

export default GradientBackground;
