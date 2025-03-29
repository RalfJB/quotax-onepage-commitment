
import { useEffect, useRef } from 'react';
import { Shield, Clock, Lightbulb, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const AboutUs = () => {
  const animatedElements = useRef<HTMLDivElement[]>([]);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Intersection Observer für Animationen
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
      icon: <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-purple" />,
      title: "Zuverlässigkeit",
      description: "Wir stehen jederzeit an Ihrer Seite mit verlässlicher Expertise und termintreuer Bearbeitung."
    },
    {
      icon: <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-purple" />,
      title: "Erfahrung",
      description: "Unser Team bringt über 20+ Jahre Berufserfahrung und fundiertes Fachwissen mit."
    },
    {
      icon: <Lightbulb className="h-10 w-10 sm:h-12 sm:w-12 text-purple" />,
      title: "Innovation",
      description: "Wir nutzen digitale Technologien, um Ihre Steuerprozesse effizienter und transparenter zu gestalten."
    },
    {
      icon: <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 text-purple" />,
      title: "Persönlichkeit",
      description: "Trotz digitaler Ausrichtung bleiben wir persönlich – Sie haben immer Ihren direkten Ansprechpartner."
    }
  ];

  return (
    <section id="about" className="quotax-section bg-background text-foreground relative pt-0 pb-16 sm:py-12">
      {/* Hintergrundakzent */}
      <div className="absolute left-0 top-40 w-80 h-80 bg-green/10 rounded-full -z-10 blur-3xl"></div>
      <div className="absolute right-0 bottom-20 w-96 h-96 bg-purple/5 rounded-full -z-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center" ref={addToAnimatedRefs}>
          <div className="quotax-badge bg-purple/10 text-purple mb-6 animate-on-scroll">
            Über Uns
          </div>
          <h2 className="section-title animate-on-scroll delay-100 text-foreground text-3xl sm:text-4xl lg:text-5xl">
            Digitale Steuerberatung mit <span className="modern-gradient-purple">Herz</span> und <span className="text-green-dark">Verstand</span>
          </h2>
          <p className="section-subtitle animate-on-scroll delay-200 text-foreground/80 px-4 sm:px-0">
            quotax ist eine vollständig digitale Steuerberatungsgesellschaft in Weinheim, die sich auf kleine und mittlere Unternehmen, Gründer und Unternehmer spezialisiert hat. Wir vereinen langjährige Expertise mit innovativen digitalen Prozessen.
          </p>
        </div>
        
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6 md:px-0">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="bg-card/80 p-5 sm:p-6 shadow-md border border-border rounded-xl text-foreground animate-on-scroll" 
              ref={addToAnimatedRefs}
              style={{ transitionDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="flex flex-row items-start gap-4 sm:gap-6">
                <div className="bg-purple/20 p-3 sm:p-4 rounded-xl shrink-0">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-semibold mb-2 text-foreground">{value.title}</h3>
                  <p className="text-sm sm:text-base text-foreground/80">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div 
          className="mt-16 sm:mt-20 bg-card/90 p-6 sm:p-8 md:p-12 rounded-xl border border-border shadow-lg animate-on-scroll mx-4 sm:mx-6 md:mx-0" 
          ref={addToAnimatedRefs}
        >
          <div className="md:flex items-center gap-8 sm:gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold mb-4 text-foreground">
                Warum <span className="modern-gradient-purple">quo</span><span className="text-green-dark">tax</span>?
              </h3>
              <div className="divider ml-0 bg-purple/30"></div>
              <p className="text-sm sm:text-base text-foreground/80 mb-4 sm:mb-6">
                Als moderne Steuerberatungsgesellschaft ist uns bewusst, dass die Digitalisierung der Schlüssel zu effizienter und erfolgreicher Zusammenarbeit ist. Wir kombinieren unsere jahrzehntelange Erfahrung mit modernsten digitalen Lösungen, um Ihnen einen reibungslosen und transparenten Service zu bieten.
              </p>
              <p className="text-sm sm:text-base text-foreground/80">
                Bei quotax steht nicht nur Ihre steuerliche Optimierung im Fokus, sondern auch Ihre langfristige unternehmerische Entwicklung. Wir verstehen uns als strategischer Partner für Ihren nachhaltigen Erfolg.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-card p-4 sm:p-6 rounded-xl text-center border border-border">
                  <span className="text-3xl sm:text-4xl font-bold text-purple">20+</span>
                  <p className="text-xs sm:text-sm text-foreground/80 mt-2">Jahre Berufserfahrung</p>
                </div>
                <div className="bg-card p-4 sm:p-6 rounded-xl text-center border border-border">
                  <span className="text-3xl sm:text-4xl font-bold text-green-dark">100%</span>
                  <p className="text-xs sm:text-sm text-foreground/80 mt-2">Digitale Prozesse</p>
                </div>
                <div className="bg-card p-4 sm:p-6 rounded-xl text-center border border-border">
                  <span className="text-3xl sm:text-4xl font-bold text-green-dark">24/7</span>
                  <p className="text-xs sm:text-sm text-foreground/80 mt-2">Datenzugriff</p>
                </div>
                <div className="bg-card p-4 sm:p-6 rounded-xl text-center border border-border">
                  <span className="text-3xl sm:text-4xl font-bold text-purple">∞</span>
                  <p className="text-xs sm:text-sm text-foreground/80 mt-2">Persönlicher Service</p>
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
