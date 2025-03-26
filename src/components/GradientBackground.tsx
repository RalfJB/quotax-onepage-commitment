
import { useEffect, useRef } from 'react';

const GradientBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
      {/* Light purple background */}
      <div 
        className="absolute inset-0 w-full h-full opacity-100"
        style={{
          backgroundColor: "#f6f2ff", // Light purple background
        }}
      />
      
      {/* Subtle purple pattern overlay */}
      <div 
        className="absolute inset-0 w-full h-full opacity-10"
        style={{
          backgroundImage: "url('/lovable-uploads/03e0372c-2ebc-4543-bb31-9304a710fa03.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "multiply"
        }}
      />
      
      {/* Subtle animierte Elemente */}
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
