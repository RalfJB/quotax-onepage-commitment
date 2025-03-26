
import { useEffect, useRef } from 'react';
import { Shield, Clock, Lightbulb, Sparkles } from 'lucide-react';

const AboutUs = () => {
  const animatedElements = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    // Intersection Observer for animations
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
  
  const addToAnimatedRefs = (el: HTMLDivElement) => {
    if (el && !animatedElements.current.includes(el)) {
      animatedElements.current.push(el);
    }
  };

  const values = [
    {
      icon: <Shield className="h-12 w-12 text-purple" />,
      title: "Zuverlässigkeit",
      description: "Wir stehen jederzeit an Ihrer Seite mit verlässlicher Expertise und termintreuer Bearbeitung."
    },
    {
      icon: <Clock className="h-12 w-12 text-purple" />,
      title: "Erfahrung",
      description: "Unser Team bringt über 20+ Jahre Berufserfahrung und fundiertes Fachwissen mit."
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-purple" />,
      title: "Innovation",
      description: "Wir nutzen digitale Technologien, um Ihre Steuerprozesse effizienter und transparenter zu gestalten."
    },
    {
      icon: <Sparkles className="h-12 w-12 text-purple" />,
      title: "Persönlichkeit",
      description: "Trotz digitaler Ausrichtung bleiben wir persönlich – Sie haben immer Ihren direkten Ansprechpartner."
    }
  ];

  return (
    <section id="about" className="quotax-section bg-background text-foreground relative">
      {/* Background accent */}
      <div className="absolute left-0 top-40 w-80 h-80 bg-green/10 rounded-full -z-10 blur-3xl"></div>
      <div className="absolute right-0 bottom-20 w-96 h-96 bg-purple/5 rounded-full -z-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center" ref={addToAnimatedRefs}>
          <div className="quotax-badge bg-purple/10 text-purple mb-6 animate-on-scroll">
            Über Uns
          </div>
          <h2 className="section-title animate-on-scroll delay-100 text-foreground">
            Digitale Steuerberatung mit <span className="modern-gradient-purple">Herz</span> und <span className="text-green">Verstand</span>
          </h2>
          <p className="section-subtitle animate-on-scroll delay-200 text-foreground/70">
            quotax ist eine vollständig digitale Steuerberatungsgesellschaft in Weinheim, die sich auf kleine und mittlere Unternehmen, Gründer und Unternehmer spezialisiert hat. Wir vereinen langjährige Expertise mit innovativen digitalen Prozessen.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="bg-card/80 p-6 shadow-md border border-border rounded-xl text-foreground animate-on-scroll" 
              ref={addToAnimatedRefs}
              style={{ transitionDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-purple/20 p-4 rounded-xl">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-2 text-foreground">{value.title}</h3>
                  <p className="text-foreground/70">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div 
          className="mt-20 bg-card/90 p-8 md:p-12 rounded-xl border border-border shadow-lg animate-on-scroll" 
          ref={addToAnimatedRefs}
        >
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4 text-foreground">
                Warum <span className="modern-gradient-purple">quo</span><span className="text-green">tax</span>?
              </h3>
              <div className="divider ml-0 bg-purple/30"></div>
              <p className="text-foreground/70 mb-6">
                Als moderne Steuerberatungsgesellschaft ist uns bewusst, dass die Digitalisierung der Schlüssel zu effizienter und erfolgreicher Zusammenarbeit ist. Wir kombinieren unsere jahrzehntelange Erfahrung mit modernsten digitalen Lösungen, um Ihnen einen reibungslosen und transparenten Service zu bieten.
              </p>
              <p className="text-foreground/70">
                Bei quotax steht nicht nur Ihre steuerliche Optimierung im Fokus, sondern auch Ihre langfristige unternehmerische Entwicklung. Wir verstehen uns als strategischer Partner für Ihren nachhaltigen Erfolg.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-6 rounded-xl text-center border border-border">
                  <span className="text-4xl font-bold text-purple">20+</span>
                  <p className="text-sm text-foreground/70 mt-2">Jahre Berufserfahrung</p>
                </div>
                <div className="bg-card p-6 rounded-xl text-center border border-border">
                  <span className="text-4xl font-bold text-green">100%</span>
                  <p className="text-sm text-foreground/70 mt-2">Digitale Prozesse</p>
                </div>
                <div className="bg-card p-6 rounded-xl text-center border border-border">
                  <span className="text-4xl font-bold text-green">24/7</span>
                  <p className="text-sm text-foreground/70 mt-2">Datenzugriff</p>
                </div>
                <div className="bg-card p-6 rounded-xl text-center border border-border">
                  <span className="text-4xl font-bold text-purple">∞</span>
                  <p className="text-sm text-foreground/70 mt-2">Persönlicher Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
