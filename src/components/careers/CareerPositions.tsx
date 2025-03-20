
import React from 'react';
import { UserPlus, GraduationCap, Briefcase, Code } from 'lucide-react';
import JobPositionCard from './JobPositionCard';

interface CareerPositionsProps {
  addToRefs: (el: HTMLDivElement) => void;
  onApply: (position: string) => void;
}

const CareerPositions = ({ addToRefs, onApply }: CareerPositionsProps) => {
  const careers = [
    {
      title: "Steuerberater/in",
      description: "Wir suchen Steuerberater/innen mit Leidenschaft für digitale Lösungen und innovatives Denken, die unsere Mandanten bei ihren steuerlichen Herausforderungen unterstützen.",
      icon: <Briefcase className="h-10 w-10 text-purple" />,
      skills: ["Steuerliche Fachkenntnisse", "Digitale Affinität", "Kommunikationsstärke", "Teamfähigkeit"]
    },
    {
      title: "Steuerfachangestellte/r",
      description: "Unterstützen Sie unser Team bei der Erstellung von Steuererklärungen und Jahresabschlüssen mit Hilfe modernster digitaler Tools und Prozesse.",
      icon: <UserPlus className="h-10 w-10 text-green" />,
      skills: ["Buchhaltung", "Digitale Tools", "Eigenverantwortliches Arbeiten", "Mandantenorientierung"]
    },
    {
      title: "AI-Talent / Entwickler/in",
      description: "Als AI-Talent oder Entwickler/in gestalten Sie mit uns die Zukunft der digitalen Steuerberatung durch innovative KI-Lösungen und Automatisierungsprozesse.",
      icon: <Code className="h-10 w-10 text-purple" />,
      skills: ["Programmierkenntnisse", "KI/ML Erfahrung", "Lösungsorientierung", "Innovationsbereitschaft"]
    },
    {
      title: "Werkstudent/in",
      description: "Wir bieten Studierenden die Möglichkeit, praktische Erfahrungen im Bereich der digitalen Steuerberatung zu sammeln und an spannenden Projekten mitzuwirken.",
      icon: <GraduationCap className="h-10 w-10 text-green" />,
      skills: ["Lernbereitschaft", "Engagement", "Flexibilität", "Interesse an Steuerthemen"]
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" ref={addToRefs}>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4 text-gray-800 animate-on-scroll">
            Offene <span className="text-purple">Positionen</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto animate-on-scroll delay-100">
            Entdecken Sie unsere aktuellen Stellenangebote und werden Sie Teil eines Teams, das die digitale Transformation in der Steuerberatung vorantreibt.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {careers.map((career, index) => (
            <JobPositionCard 
              key={index} 
              title={career.title}
              description={career.description}
              icon={career.icon}
              skills={career.skills}
              onApply={() => onApply(career.title)}
              ref={addToRefs}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerPositions;
