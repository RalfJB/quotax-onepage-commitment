
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserPlus, GraduationCap, Briefcase, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { NavigationMenu } from '@/components/ui/navigation-menu';

const Careers = () => {
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-black text-white pt-32 pb-24 px-6 md:px-12 relative">
          {/* Background accent */}
          <div className="absolute left-0 top-40 w-80 h-80 bg-green/10 rounded-full -z-10 blur-3xl"></div>
          <div className="absolute right-0 bottom-20 w-96 h-96 bg-purple/5 rounded-full -z-10 blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center" ref={addToRefs}>
              <div className="quotax-badge bg-purple/10 text-purple mb-6 animate-on-scroll">
                Karriere
              </div>
              <h2 className="section-title animate-on-scroll delay-100 text-white">
                Werden Sie Teil unseres <span className="text-purple">innovativen</span> Teams
              </h2>
              <p className="section-subtitle animate-on-scroll delay-200 text-gray-300 max-w-3xl mx-auto">
                Wir sind immer auf der Suche nach qualifizierten, engagierten Mitarbeitern und AI-Talenten, die mit uns gemeinsam die Zukunft der Steuerberatung gestalten möchten.
              </p>
            </div>
          </div>
        </section>
        
        {/* Careers Section */}
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
                <Card 
                  key={index} 
                  className="hover:shadow-lg transition-shadow border-gray-100 overflow-hidden"
                  ref={addToRefs}
                >
                  <CardContent className="p-8">
                    <div className="bg-gray-50 p-3 w-fit rounded-full mb-6">
                      {career.icon}
                    </div>
                    <h3 className="text-2xl font-display font-semibold mb-3 text-gray-800">{career.title}</h3>
                    <p className="text-gray-600 mb-6">{career.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-800 mb-3">Anforderungen:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {career.skills.map((skill, skillIndex) => (
                          <div key={skillIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-purple rounded-full"></div>
                            <span className="text-sm text-gray-600">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <a href="#contact">
                      <Button className="bg-purple hover:bg-purple-dark text-white w-full">
                        Jetzt bewerben
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Join Us Section */}
        <section className="py-20 px-6 md:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16" ref={addToRefs}>
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4 text-gray-800 animate-on-scroll">
                Warum <span className="text-purple">quotax</span>?
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto animate-on-scroll delay-100">
                Bei quotax bieten wir mehr als nur einen Arbeitsplatz. Entdecken Sie, was uns als Arbeitgeber auszeichnet.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow" ref={addToRefs}>
                <h3 className="text-xl font-display font-semibold mb-4 text-gray-800">Innovation & Digitalisierung</h3>
                <p className="text-gray-600">
                  Arbeiten Sie mit modernsten Technologien und tragen Sie zur digitalen Transformation der Steuerberatung bei.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow" ref={addToRefs}>
                <h3 className="text-xl font-display font-semibold mb-4 text-gray-800">Flexible Arbeitszeiten</h3>
                <p className="text-gray-600">
                  Wir bieten flexible Arbeitszeiten und die Möglichkeit zum mobilen Arbeiten, um Beruf und Privatleben in Einklang zu bringen.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow" ref={addToRefs}>
                <h3 className="text-xl font-display font-semibold mb-4 text-gray-800">Persönliche Entwicklung</h3>
                <p className="text-gray-600">
                  Kontinuierliche Weiterbildung und individuelle Entwicklungsmöglichkeiten sind uns wichtig.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow" ref={addToRefs}>
                <h3 className="text-xl font-display font-semibold mb-4 text-gray-800">Kollegiales Arbeitsumfeld</h3>
                <p className="text-gray-600">
                  Ein freundliches, unterstützendes Team und eine offene Kommunikationskultur prägen unseren Arbeitsalltag.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow" ref={addToRefs}>
                <h3 className="text-xl font-display font-semibold mb-4 text-gray-800">Zukunftssicherheit</h3>
                <p className="text-gray-600">
                  Als wachsendes Unternehmen bieten wir langfristige Perspektiven und Sicherheit in einer zukunftsorientierten Branche.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow" ref={addToRefs}>
                <h3 className="text-xl font-display font-semibold mb-4 text-gray-800">Faire Vergütung</h3>
                <p className="text-gray-600">
                  Wir bieten eine leistungsgerechte Vergütung und zusätzliche Benefits wie betriebliche Altersvorsorge.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Application Process */}
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
              <div className="bg-gray-50 p-8 rounded-xl w-full md:w-1/3 text-center" ref={addToRefs}>
                <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center text-purple font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-display font-semibold mb-2 text-gray-800">Kontaktaufnahme</h3>
                <p className="text-gray-600">
                  Nutzen Sie unser Kontaktformular und teilen Sie uns Ihr Interesse mit.
                </p>
              </div>
              
              <div className="hidden md:block w-20 h-0.5 bg-gray-200"></div>
              
              <div className="bg-gray-50 p-8 rounded-xl w-full md:w-1/3 text-center" ref={addToRefs}>
                <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center text-purple font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-display font-semibold mb-2 text-gray-800">Gespräch</h3>
                <p className="text-gray-600">
                  Wir laden Sie zu einem persönlichen oder virtuellen Gespräch ein.
                </p>
              </div>
              
              <div className="hidden md:block w-20 h-0.5 bg-gray-200"></div>
              
              <div className="bg-gray-50 p-8 rounded-xl w-full md:w-1/3 text-center" ref={addToRefs}>
                <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center text-purple font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-display font-semibold mb-2 text-gray-800">Willkommen im Team</h3>
                <p className="text-gray-600">
                  Nach positiver Entscheidung begrüßen wir Sie in unserem Team.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-6 md:px-12 bg-purple/10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 text-gray-800" ref={addToRefs}>
              Bereit, Teil unseres Teams zu werden?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8" ref={addToRefs}>
              Wir freuen uns über Ihre Kontaktaufnahme und darauf, Sie kennen zu lernen!
            </p>
            <a href="#contact">
              <Button className="bg-purple hover:bg-purple-dark text-white px-8 py-6 text-lg">
                Jetzt bewerben
              </Button>
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
