
import React from 'react';

interface ApplicationProcessProps {
  addToRefs: (el: HTMLDivElement) => void;
}

const ApplicationProcess = ({ addToRefs }: ApplicationProcessProps) => {
  const steps = [
    {
      number: 1,
      title: "Bewerbung",
      description: "Nutzen Sie unser Bewerbungsformular und teilen Sie uns Ihr Interesse mit."
    },
    {
      number: 2,
      title: "Gespräch",
      description: "Wir laden Sie zu einem persönlichen oder virtuellen Gespräch ein."
    },
    {
      number: 3,
      title: "Willkommen im Team",
      description: "Nach positiver Entscheidung begrüßen wir Sie in unserem Team."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" ref={addToRefs}>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4 text-gray-800 animate-on-scroll">
            Bewerbungsprozess
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto animate-on-scroll delay-100">
            So einfach können Sie sich bei uns bewerben:
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="bg-gray-50 p-8 rounded-xl w-full md:w-1/3 text-center" ref={addToRefs}>
                <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center text-purple font-bold mx-auto mb-4">{step.number}</div>
                <h3 className="text-xl font-display font-semibold mb-2 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block w-20 h-0.5 bg-gray-200"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationProcess;
