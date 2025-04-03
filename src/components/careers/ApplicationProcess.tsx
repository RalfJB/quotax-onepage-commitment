
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

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
    <section className="py-20 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" ref={addToRefs}>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4 text-foreground animate-on-scroll">
            Bewerbungsprozess
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto animate-on-scroll delay-100">
            So einfach können Sie sich bei uns bewerben:
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <Card className="bg-white border border-gray-100 w-full md:w-1/3 shadow-sm" ref={addToRefs}>
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 bg-[#f3e6f3] flex items-center justify-center text-[#a04ca0] font-bold mx-auto mb-4">{step.number}</div>
                  <h3 className="text-xl font-display font-semibold mb-2 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block w-20 h-0.5 bg-border"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationProcess;
