
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface BenefitItemProps {
  title: string;
  description: string;
  addToRefs: (el: HTMLDivElement) => void;
}

const BenefitItem = ({ title, description, addToRefs }: BenefitItemProps) => (
  <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow" ref={addToRefs}>
    <CardContent className="p-8">
      <h3 className="text-xl font-display font-semibold mb-4 text-foreground">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </CardContent>
  </Card>
);

interface CompanyBenefitsProps {
  addToRefs: (el: HTMLDivElement) => void;
}

const CompanyBenefits = ({ addToRefs }: CompanyBenefitsProps) => {
  const benefits = [
    {
      title: "Innovation & Digitalisierung",
      description: "Arbeiten Sie mit modernsten Technologien und tragen Sie zur digitalen Transformation der Steuerberatung bei."
    },
    {
      title: "Flexible Arbeitszeiten",
      description: "Wir bieten flexible Arbeitszeiten und die Möglichkeit zum mobilen Arbeiten, um Beruf und Privatleben in Einklang zu bringen."
    },
    {
      title: "Persönliche Entwicklung",
      description: "Kontinuierliche Weiterbildung und individuelle Entwicklungsmöglichkeiten sind uns wichtig."
    },
    {
      title: "Kollegiales Arbeitsumfeld",
      description: "Ein freundliches, unterstützendes Team und eine offene Kommunikationskultur prägen unseren Arbeitsalltag."
    },
    {
      title: "Zukunftssicherheit",
      description: "Als wachsendes Unternehmen bieten wir langfristige Perspektiven und Sicherheit in einer zukunftsorientierten Branche."
    },
    {
      title: "Faire Vergütung",
      description: "Wir bieten eine leistungsgerechte Vergütung und zusätzliche Benefits wie betriebliche Altersvorsorge."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" ref={addToRefs}>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4 text-foreground animate-on-scroll">
            Warum <span className="text-[#a04ca0]">quotax</span>?
          </h2>
          <p className="text-foreground/70 max-w-3xl mx-auto animate-on-scroll delay-100">
            Bei quotax bieten wir mehr als nur einen Arbeitsplatz. Entdecken Sie, was uns als Arbeitgeber auszeichnet.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitItem 
              key={index}
              title={benefit.title}
              description={benefit.description}
              addToRefs={addToRefs}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyBenefits;
