
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CallToActionProps {
  addToRefs: (el: HTMLDivElement) => void;
  onApplyClick: () => void;
}

const CallToAction = ({ addToRefs, onApplyClick }: CallToActionProps) => {
  return (
    <section className="py-16 px-6 md:px-12 bg-black text-white border-t border-white/5 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-purple/10 filter blur-[100px] animate-pulse-glow"></div>
      <div className="absolute bottom-1/3 -right-20 w-72 h-72 rounded-full bg-green/10 filter blur-[90px] animate-pulse-glow"></div>
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent" ref={addToRefs}>
          Bereit für den digitalen Wandel?
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-8" ref={addToRefs}>
          Lassen Sie uns gemeinsam Ihr Unternehmen zukunftsfähig machen. Unsere digitalen Lösungen und unsere Expertise in der Steuerberatung sind der Schlüssel zu Ihrem Erfolg.
        </p>
        <Button 
          className="bg-gradient-to-r from-purple to-purple-dark hover:from-purple-light hover:to-purple text-white px-8 py-6 text-lg border border-white/10 hover:shadow-lg hover:shadow-purple/20 transition-all duration-300 group"
          onClick={onApplyClick}
        >
          Jetzt bewerben
          <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
