
import React from 'react';
import { Button } from '@/components/ui/button';

interface CallToActionProps {
  addToRefs: (el: HTMLDivElement) => void;
  onApplyClick: () => void;
}

const CallToAction = ({ addToRefs, onApplyClick }: CallToActionProps) => {
  return (
    <section className="py-16 px-6 md:px-12 bg-purple/10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 text-gray-800" ref={addToRefs}>
          Bereit, Teil unseres Teams zu werden?
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8" ref={addToRefs}>
          Wir freuen uns über Ihre Kontaktaufnahme und darauf, Sie kennen zu lernen!
        </p>
        <Button 
          className="bg-purple hover:bg-purple-dark text-white px-8 py-6 text-lg"
          onClick={onApplyClick}
        >
          Jetzt bewerben
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
