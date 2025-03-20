
import { useEffect, useRef } from 'react';
import { Clock, Banknote, BarChart, Shield, CheckCircle2, PiggyBank, TrendingUp, LineChart, PercentSquare } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Benefits = () => {
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
  
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !animatedElements.current.includes(el)) {
      animatedElements.current.push(el);
    }
  };

  // Sample placeholder data for the chart
  const sampleChartData = [
    { name: 'Jan', value: 45 },
    { name: 'Feb', value: 52 },
    { name: 'Mär', value: 49 },
    { name: 'Apr', value: 63 },
    { name: 'Mai', value: 59 },
    { name: 'Jun', value: 78 },
  ];

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

  // Placeholder testimonials
  const testimonials = [
    {
      icon: <LineChart className="h-10 w-10 text-purple" />,
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis erat in justo tempor convallis.",
      author: "Platzhalter",
      company: "Unternehmen GmbH"
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-green" />,
      quote: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      author: "Platzhalter",
      company: "Example & Co."
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
        
        {/* Analytics displays with placeholder values */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 animate-on-scroll" ref={addToRefs}>
          <div className="glass-card p-8 text-center bg-gray-800/90 relative overflow-hidden">
            <div className="relative z-10">
              <PercentSquare className="h-12 w-12 text-purple mx-auto mb-4" />
              <div className="text-3xl font-bold text-purple mb-2">XX<span className="text-sm">%</span></div>
              <p className="text-gray-200">weniger Papierkram</p>
            </div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -bottom-2 right-0 w-24 h-24 rounded-tl-3xl bg-purple"></div>
            </div>
          </div>
          
          <div className="glass-card p-8 text-center bg-gray-800/90 relative overflow-hidden">
            <div className="relative z-10">
              <Clock className="h-12 w-12 text-green mx-auto mb-4" />
              <div className="text-3xl font-bold text-green mb-2">XX<span className="text-sm">%</span></div>
              <p className="text-gray-200">Zeitersparnis</p>
            </div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -bottom-2 right-0 w-24 h-24 rounded-tl-3xl bg-green"></div>
            </div>
          </div>
          
          <div className="glass-card p-8 text-center bg-gray-800/90 relative overflow-hidden">
            <div className="relative z-10">
              <PiggyBank className="h-12 w-12 text-purple mx-auto mb-4" />
              <div className="text-3xl font-bold text-purple mb-2">XX<span className="text-sm">%</span></div>
              <p className="text-gray-200">Kundenzufriedenheit</p>
            </div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -bottom-2 right-0 w-24 h-24 rounded-tl-3xl bg-purple"></div>
            </div>
          </div>
        </div>
        
        {/* Placeholder chart to illustrate potential data visualization */}
        <div className="mt-16 glass-card p-8 bg-gray-800/90 animate-on-scroll" ref={addToRefs}>
          <h3 className="text-xl font-display font-semibold mb-6 text-white text-center">
            Beispielhafte Effizienzsteigerung durch Digitalisierung
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={sampleChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#8E9196" />
                <YAxis stroke="#8E9196" />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-900 p-2 rounded border border-gray-700">
                          <p className="text-purple font-semibold">{`${payload[0].payload.name}: ${payload[0].value}%`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {sampleChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#9b87f5" : "#F2FCE2"} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-gray-400 text-sm mt-4 italic">
            * Beispielhafte Darstellung - Ihre individuellen Ergebnisse können variieren
          </p>
        </div>
        
        <div className="mt-20" ref={addToRefs}>
          <h3 className="text-2xl font-display font-semibold text-center mb-10 animate-on-scroll text-white">
            Das sagen unsere Kunden
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="glass-card p-8 animate-on-scroll hover-lift bg-gray-800/90 relative overflow-hidden"
                ref={addToRefs}
                style={{ transitionDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="flex flex-col h-full relative z-10">
                  <div className="mb-6 flex justify-between items-center">
                    {testimonial.icon}
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-purple inline-block">★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-200 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                  <div className="mt-auto border-t border-gray-700 pt-4">
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-300">{testimonial.company}</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-b from-purple/10 to-transparent rounded-bl-3xl"></div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-6 italic">
            * Platzhaltertexte für Kundenreferenzen - Wird mit echten Kundenbewertungen ersetzt
          </p>
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
