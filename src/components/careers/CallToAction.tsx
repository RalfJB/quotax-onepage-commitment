
import React from 'react';
import { Button } from '@/components/ui/button';

interface CallToActionProps {
  addToRefs: (el: HTMLDivElement) => void;
  onApplyClick: () => void;
}

const CallToAction = ({ addToRefs, onApplyClick }: CallToActionProps) => {
  return (
    <section className="py-16 px-6 md:px-12 bg-[#1E2330] text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 text-white" ref={addToRefs}>
          Bereit für den digitalen Wandel?
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-8" ref={addToRefs}>
          Lassen Sie uns gemeinsam Ihr Unternehmen zukunftsfähig machen. Unsere digitalen Lösungen und unsere Expertise in der Steuerberatung sind der Schlüssel zu Ihrem Erfolg.
        </p>
        <Button 
          className="bg-green hover:bg-green-dark text-white px-8 py-6 text-lg"
          onClick={onApplyClick}
        >
          Jetzt bewerben
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
