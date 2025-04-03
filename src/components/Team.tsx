
import { useEffect, useRef } from 'react';
import { Users, Award, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Team = () => {
  const animatedElements = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    const currentElements = animatedElements.current;
    currentElements.forEach(el => observer.observe(el));
    
    return () => {
      currentElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !animatedElements.current.includes(el)) {
      animatedElements.current.push(el);
    }
  };

  const expertise = [
    {
      icon: <Users strokeWidth={1.5} className="h-10 w-10 text-purple" />,
      title: "Erfahrenes Team",
      description: "Unser Team besteht aus erfahrenen Steuerberatern, Wirtschaftsprüfern und Digitalisierungsexperten."
    },
    {
      icon: <Award strokeWidth={1.5} className="h-10 w-10 text-green" />,
      title: "Zertifizierte Experten",
      description: "Wir investieren kontinuierlich in die Weiterbildung und Zertifizierung unseres Teams."
    },
    {
      icon: <BookOpen strokeWidth={1.5} className="h-10 w-10 text-purple" />,
      title: "Branchenkenntnis",
      description: "Spezialisierte Berater mit fundiertem Wissen in verschiedenen Branchen und Unternehmensformen."
    }
  ];

  return (
    <section id="team" className="quotax-section bg-background text-foreground relative">
      {/* Background accent */}
      <div className="absolute left-0 top-40 w-80 h-80 bg-green/10 rounded-full -z-10 blur-3xl"></div>
      <div className="absolute right-0 bottom-20 w-96 h-96 bg-purple/5 rounded-full -z-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center" ref={addToRefs}>
          <div className="quotax-badge bg-purple/10 text-purple mb-6 animate-on-scroll">
            Unser Team
          </div>
          <h2 className="section-title animate-on-scroll delay-100 text-foreground">
            <span className="text-purple">Expertise</span> und <span className="text-green">Leidenschaft</span> für Ihren Erfolg
          </h2>
          <p className="section-subtitle animate-on-scroll delay-200 text-foreground/70">
            Hinter quotax steht ein Team aus erfahrenen Steuerexperten mit langjähriger Berufserfahrung und digitaler Kompetenz. Wir vereinen das Beste aus beiden Welten, um Ihnen einen erstklassigen Service zu bieten.
          </p>
        </div>
        
        <Card className="mt-16 bg-white border border-gray-100 shadow-md animate-on-scroll" ref={addToRefs}>
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="md:w-1/2">
                <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4 text-foreground">
                  Jahrzehnte an Expertise
                </h3>
                <div className="h-1 w-24 bg-purple/50 mb-6"></div>
                <p className="text-foreground/70 mb-6">
                  Unser Gründerteam bringt über 20 Jahre Erfahrung in der Steuerberatung mit. Unsere Mitarbeiter sind langjährige Experten auf ihrem Gebiet und verfügen über umfassendes Fachwissen in allen steuerlichen und betriebswirtschaftlichen Belangen.
                </p>
                <p className="text-foreground/70 mb-6">
                  Was uns besonders auszeichnet, ist die Kombination aus steuerlichem Know-how und digitaler Kompetenz. Wir verstehen nicht nur die komplexen steuerlichen Anforderungen, sondern auch die Chancen und Herausforderungen der Digitalisierung.
                </p>
                <p className="text-foreground/70">
                  Bei quotax arbeiten Sie mit einem Team, das sich kontinuierlich weiterbildet und stets auf dem neuesten Stand der steuerlichen Gesetzgebung und digitalen Entwicklungen ist.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="h-full flex items-center justify-center">
                  <Card className="bg-white border border-gray-100 shadow-sm w-full max-w-sm">
                    <CardContent className="p-8">
                      <div className="flex justify-center mb-4">
                        <Users strokeWidth={1.5} className="h-16 w-16 text-purple" />
                      </div>
                      <h4 className="text-center text-xl font-semibold mb-2 text-foreground">Unser Team in Zahlen</h4>
                      <div className="grid grid-cols-2 gap-6 mt-6">
                        <div className="text-center">
                          <p className="text-4xl font-bold text-purple">20+</p>
                          <p className="text-sm text-foreground/70 mt-1">Jahre Erfahrung</p>
                        </div>
                        <div className="text-center">
                          <p className="text-4xl font-bold text-green">10+</p>
                          <p className="text-sm text-foreground/70 mt-1">Mitarbeiter</p>
                        </div>
                        <div className="text-center">
                          <p className="text-4xl font-bold text-purple">5+</p>
                          <p className="text-sm text-foreground/70 mt-1">Steuerberater</p>
                        </div>
                        <div className="text-center">
                          <p className="text-4xl font-bold text-green">3+</p>
                          <p className="text-sm text-foreground/70 mt-1">IT-Experten</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {expertise.map((item, index) => (
            <Card 
              key={index} 
              className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow animate-on-scroll"
              ref={addToRefs}
              style={{ transitionDelay: `${(index + 3) * 100}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className="bg-purple/5 w-20 h-20 flex items-center justify-center mx-auto rounded-lg mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-foreground">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
