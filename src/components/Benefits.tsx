
import { useEffect, useRef } from 'react';
import { Clock, Banknote, BarChart, Shield, CheckCircle2 } from 'lucide-react';

const Benefits = () => {
  const animatedElements = useRef<HTMLDivElement[]>([]);
  const counterElements = useRef<HTMLSpanElement[]>([]);
  
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
  
  useEffect(() => {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const countTo = parseInt(target.getAttribute('data-count') || '0', 10);
          
          let count = 0;
          const updateCount = () => {
            if (count < countTo) {
              count += Math.ceil(countTo / 20);
              if (count > countTo) count = countTo;
              target.textContent = count.toString();
              requestAnimationFrame(updateCount);
            }
          };
          
          updateCount();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    const currentCounters = counterElements.current;
    currentCounters.forEach(el => counterObserver.observe(el));
    
    return () => {
      currentCounters.forEach(el => counterObserver.unobserve(el));
    };
  }, []);
  
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !animatedElements.current.includes(el)) {
      animatedElements.current.push(el);
    }
  };
  
  const addToCounterRefs = (el: HTMLSpanElement) => {
    if (el && !counterElements.current.includes(el)) {
      counterElements.current.push(el);
    }
  };

  const benefits = [
    {
      icon: <Clock className="h-8 w-8 text-purple" />,
      title: "Zeitersparnis",
      description: "Durch digitale Prozesse und automatisierte Abläufe reduzieren wir Ihren administrativen Aufwand erheblich."
    },
    {
      icon: <Banknote className="h-8 w-8 text-green" />,
      title: "Kosteneffizienz",
      description: "Optimierte Prozesse und digitale Lösungen sparen nicht nur Zeit, sondern auch bares Geld."
    },
    {
      icon: <BarChart className="h-8 w-8 text-purple" />,
      title: "Transparenz",
      description: "Mit unseren digitalen Tools haben Sie jederzeit Einblick in Ihre aktuellen Finanzdaten und Steuerangelegenheiten."
    },
    {
      icon: <Shield className="h-8 w-8 text-green" />,
      title: "Rechtssicherheit",
      description: "Wir sorgen dafür, dass alle steuerlichen Anforderungen erfüllt werden und Ihr Unternehmen rechtssicher aufgestellt ist."
    }
  ];

  const testimonials = [
    {
      quote: "Die Zusammenarbeit mit quotax hat unsere Finanzprozesse komplett revolutioniert. Endlich haben wir volle Transparenz und sparen dabei noch Zeit und Geld.",
      author: "Max Mustermann",
      company: "Technik GmbH"
    },
    {
      quote: "Als Gründer war ich anfangs mit den steuerlichen Anforderungen überfordert. quotax hat mir nicht nur bei der Steuerberatung geholfen, sondern mich auch bei der digitalen Transformation unterstützt.",
      author: "Erika Musterfrau",
      company: "Design & Marketing"
    }
  ];

  return (
    <section id="benefits" className="quotax-section bg-black text-white relative">
      {/* Background accent */}
      <div className="absolute right-0 top-20 w-96 h-96 bg-purple/5 rounded-full -z-10 blur-3xl"></div>
      <div className="absolute left-20 bottom-20 w-80 h-80 bg-green/5 rounded-full -z-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center" ref={addToRefs}>
          <div className="quotax-badge bg-purple/10 text-purple mb-6 animate-on-scroll">
            Ihre Vorteile
          </div>
          <h2 className="section-title animate-on-scroll delay-100 text-white">
            Warum Sie mit <span className="text-purple">quo</span><span className="text-green">tax</span> erfolgreich sind
          </h2>
          <p className="section-subtitle animate-on-scroll delay-200 text-gray-300">
            Durch unsere digitale Ausrichtung und langjährige Expertise schaffen wir messbare Mehrwerte für Ihr Unternehmen. Erfahren Sie, wie wir Ihnen Zeit, Geld und Nerven sparen können.
          </p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="glass-card p-6 text-center animate-on-scroll hover-lift bg-gray-800/90" 
              ref={addToRefs}
              style={{ transitionDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-display font-semibold mb-3 text-white">{benefit.title}</h3>
              <p className="text-gray-200 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 animate-on-scroll" ref={addToRefs}>
          <div className="glass-card p-8 text-center bg-gray-800/90">
            <span 
              ref={addToCounterRefs} 
              data-count="60" 
              className="text-5xl font-bold text-purple block mb-2"
            >
              0
            </span>
            <p className="text-gray-200">% weniger Papierkram</p>
          </div>
          <div className="glass-card p-8 text-center bg-gray-800/90">
            <span 
              ref={addToCounterRefs} 
              data-count="40" 
              className="text-5xl font-bold text-green block mb-2"
            >
              0
            </span>
            <p className="text-gray-200">% Zeitersparnis</p>
          </div>
          <div className="glass-card p-8 text-center bg-gray-800/90">
            <span 
              ref={addToCounterRefs} 
              data-count="95" 
              className="text-5xl font-bold text-purple block mb-2"
            >
              0
            </span>
            <p className="text-gray-200">% Kundenzufriedenheit</p>
          </div>
        </div>
        
        <div className="mt-20" ref={addToRefs}>
          <h3 className="text-2xl font-display font-semibold text-center mb-10 animate-on-scroll text-white">
            Das sagen unsere Kunden
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="glass-card p-8 animate-on-scroll hover-lift bg-gray-800/90"
                ref={addToRefs}
                style={{ transitionDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6 text-purple">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-purple inline-block mr-1">★</span>
                    ))}
                  </div>
                  <p className="text-gray-200 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                  <div className="mt-auto">
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-300">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-20 glass-card p-8 md:p-10 bg-gray-800/95 shadow-lg animate-on-scroll" ref={addToRefs}>
          <div className="flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl font-display font-semibold mb-6 text-white">
              Bereit für den digitalen Wandel?
            </h3>
            <p className="text-gray-200 mb-8 max-w-2xl">
              Lassen Sie uns gemeinsam Ihr Unternehmen zukunftsfähig machen. Unsere digitalen Lösungen und unsere Expertise in der Steuerberatung sind der Schlüssel zu Ihrem Erfolg.
            </p>
            <ul className="text-left mb-10 space-y-3 max-w-md text-gray-200">
              {[
                "Vollständig digitale Prozesse",
                "Echtzeit-Zugriff auf Ihre Finanzdaten",
                "Persönliche Betreuung trotz Digitalisierung",
                "Steuerliche Optimierung und Planungssicherheit"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a 
              href="#contact" 
              className="px-8 py-4 bg-purple text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:bg-purple-dark hover:-translate-y-1"
            >
              Jetzt Beratungsgespräch vereinbaren
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
