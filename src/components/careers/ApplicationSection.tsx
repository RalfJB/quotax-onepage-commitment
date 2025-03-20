
import React from 'react';
import ApplicationForm from '@/components/ApplicationForm';

interface ApplicationSectionProps {
  position: string;
  addToRefs: (el: HTMLDivElement) => void;
  forwardedRef: React.RefObject<HTMLDivElement>;
}

const ApplicationSection = ({ position, addToRefs, forwardedRef }: ApplicationSectionProps) => {
  return (
    <section id="apply" className="py-20 px-6 md:px-12 bg-black" ref={forwardedRef}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12" ref={addToRefs}>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4 text-white animate-on-scroll">
            Ihre <span className="text-green">Bewerbung</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto animate-on-scroll delay-100">
            Füllen Sie das folgende Formular aus, um sich bei quotax zu bewerben. Wir freuen uns auf Ihre Unterlagen.
          </p>
        </div>
        
        <div ref={addToRefs}>
          <ApplicationForm position={position} />
        </div>
      </div>
    </section>
  );
};

export default ApplicationSection;
