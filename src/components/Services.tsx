
import { useEffect, useRef } from 'react';
import { FileText, BarChart2, LineChart, PiggyBank, Building, ChevronRight, ArrowUpRight } from 'lucide-react';

const Services = () => {
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

  const services = [
    {
      icon: <FileText className="h-10 w-10" />,
      title: "Steuer & Recht",
      description: "Professionelle steuerliche Beratung und Optimierung für Ihr Unternehmen.",
      items: ["Jahresabschluss", "Steuererklärungen", "Steuergestaltung", "Unternehmensgründung"]
    },
    {
      icon: <BarChart2 className="h-10 w-10" />,
      title: "Buchhaltung",
      description: "Digitale Finanzbuchhaltung mit Echtzeit-Einblick in Ihre Zahlen.",
      items: ["Digitale Buchhaltung", "Lohnbuchhaltung", "Reporting", "Controlling"]
    },
    {
      icon: <LineChart className="h-10 w-10" />,
      title: "Unternehmensberatung",
      description: "Strategische Beratung für nachhaltiges Wachstum und Erfolg.",
      items: ["Businessplanung", "Finanzierungsberatung", "Liquiditätsplanung", "Rentabilitätsanalyse"]
    },
    {
      icon: <PiggyBank className="h-10 w-10" />,
      title: "Vermögensplanung",
      description: "Ganzheitliche Betrachtung Ihrer finanziellen Situation und Ziele.",
      items: ["Altersvorsorge", "Nachfolgeplanung", "Vermögensaufbau", "Steueroptimierung"]
    }
  ];

  return (
    <section id="services" className="quotax-section bg-gray-50 relative">
      {/* Background accent */}
      <div className="absolute left-0 top-40 w-72 h-72 bg-purple/10 rounded-full -z-10 blur-3xl"></div>
      <div className="absolute right-20 bottom-40 w-80 h-80 bg-green/10 rounded-full -z-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center" ref={addToRefs}>
          <div className="quotax-badge bg-purple/10 text-purple mb-6 animate-on-scroll">
            Unsere Dienstleistungen
          </div>
          <h2 className="section-title animate-on-scroll delay-100">
            Maßgeschneiderte <span className="text-purple">Lösungen</span> für Ihren Erfolg
          </h2>
          <p className="section-subtitle animate-on-scroll delay-200">
            Wir bieten ein umfassendes Portfolio an Dienstleistungen, die speziell auf die Bedürfnisse von kleinen und mittleren Unternehmen, Gründern und Unternehmern zugeschnitten sind.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="feature-card animate-on-scroll"
              ref={addToRefs}
              style={{ transitionDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className="bg-purple/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 text-purple">
                  {service.icon}
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <ChevronRight className="h-4 w-4 text-green mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="inline-flex items-center text-purple hover:underline mt-auto">
                  Mehr erfahren
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 glass-card p-8 md:p-12 bg-white/90 shadow-lg animate-on-scroll" ref={addToRefs}>
          <div className="flex flex-col md:flex-row md:items-center gap-10">
            <div className="md:w-1/2">
              <Building className="h-16 w-16 text-purple mb-6" />
              <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4">
                Digitale Transformationsberatung für KMU
              </h3>
              <div className="divider ml-0"></div>
            </div>
            <div className="md:w-1/2">
              <p className="text-gray-600 mb-6">
                Ein besonderer Schwerpunkt unserer Beratung liegt auf der digitalen Transformation Ihres Unternehmens. Wir unterstützen Sie dabei, Ihre Geschäftsprozesse zu digitalisieren und zu optimieren, um Zeit und Kosten zu sparen und Ihre Wettbewerbsfähigkeit zu steigern.
              </p>
              <p className="text-gray-600 mb-8">
                Von der Einführung digitaler Buchhaltungssysteme bis hin zur Implementierung cloudbasierter Lösungen – wir begleiten Sie auf dem Weg in die digitale Zukunft und helfen Ihnen, die Potenziale der Digitalisierung voll auszuschöpfen.
              </p>
              <a 
                href="#contact" 
                className="px-6 py-3 bg-purple text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:bg-purple-dark inline-flex items-center gap-2"
              >
                Beratungsgespräch vereinbaren
                <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
