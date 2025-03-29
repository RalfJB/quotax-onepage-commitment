
import React, { useEffect, useState, useRef } from 'react';

interface HeroSectionProps {
  addToRefs: (el: HTMLDivElement) => void;
}

const HeroSection = ({ addToRefs }: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="bg-background text-foreground pt-32 pb-24 px-6 md:px-12 relative"
    >
      <div className="absolute left-0 top-40 w-80 h-80 bg-green/3 rounded-full -z-10 blur-3xl"></div>
      <div className="absolute right-0 bottom-20 w-96 h-96 bg-purple/3 rounded-full -z-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div 
          className={`text-center transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} 
          ref={addToRefs}
        >
          <div className="bg-purple/10 text-[#cf66cf] px-4 py-2 rounded-full inline-block mb-6 text-sm font-medium">
            Karriere
          </div>
          <h2 className="text-4xl md:text-5xl font-outfit tracking-tighter font-normal mb-6 text-foreground/90">
            Werden Sie Teil unseres <span className="text-[#cf66cf]">innovativen</span> Teams
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            Wir sind immer auf der Suche nach qualifizierten, engagierten Mitarbeitern und AI-Talenten, die mit uns gemeinsam die Zukunft der Steuerberatung gestalten möchten.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
