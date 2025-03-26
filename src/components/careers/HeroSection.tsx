
import React, { RefObject } from 'react';

interface HeroSectionProps {
  addToRefs: (el: HTMLDivElement) => void;
}

const HeroSection = ({ addToRefs }: HeroSectionProps) => {
  return (
    <section className="bg-background text-foreground pt-32 pb-24 px-6 md:px-12 relative">
      {/* Background accent */}
      <div className="absolute left-0 top-40 w-80 h-80 bg-green/10 rounded-full -z-10 blur-3xl"></div>
      <div className="absolute right-0 bottom-20 w-96 h-96 bg-purple/5 rounded-full -z-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center" ref={addToRefs}>
          <div className="bg-purple/10 text-purple px-4 py-2 rounded-full inline-block mb-6 animate-on-scroll text-sm font-medium">
            Karriere
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 animate-on-scroll delay-100 text-foreground">
            Werden Sie Teil unseres <span className="text-purple">innovativen</span> Teams
          </h2>
          <p className="text-lg md:text-xl animate-on-scroll delay-200 text-muted-foreground max-w-3xl mx-auto">
            Wir sind immer auf der Suche nach qualifizierten, engagierten Mitarbeitern und AI-Talenten, die mit uns gemeinsam die Zukunft der Steuerberatung gestalten möchten.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
