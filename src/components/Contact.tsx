import { useEffect, useRef, useState } from 'react';
import { MapPin, Mail, Phone, Send, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="quotax-section bg-white relative">
      {/* Background accent */}
      <div className="absolute right-0 top-20 w-96 h-96 bg-purple/5 rounded-full -z-10 blur-3xl"></div>
      <div className="absolute left-20 bottom-10 w-80 h-80 bg-green/5 rounded-full -z-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center" ref={addToRefs}>
          <div className="quotax-badge bg-purple/10 text-purple mb-6 animate-on-scroll">
            Kontakt
          </div>
          <h2 className="section-title animate-on-scroll delay-100 text-gray-800">
            Starten Sie Ihre <span className="text-purple">digitale</span> Steuerreise mit uns
          </h2>
          <p className="section-subtitle animate-on-scroll delay-200 text-gray-700">
            Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Kontaktieren Sie uns noch heute, um von unserer Expertise zu profitieren und Ihre steuerlichen Angelegenheiten zu optimieren.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="glass-card bg-white/90 shadow-lg p-8 animate-on-scroll" ref={addToRefs}>
            <h3 className="text-2xl font-display font-semibold mb-6 text-gray-800">Schreiben Sie uns</h3>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-gray-800">Nachricht gesendet!</h4>
                <p className="text-gray-600">
                  Vielen Dank für Ihre Nachricht. Wir werden uns schnellstmöglich bei Ihnen melden.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple transition-colors"
                    placeholder="Ihr Name"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple transition-colors"
                      placeholder="ihre@email.de"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple transition-colors"
                      placeholder="Ihre Telefonnummer"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Nachricht</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple focus:border-purple transition-colors"
                    placeholder="Wie können wir Ihnen helfen?"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full px-6 py-4 bg-purple text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2",
                    isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-dark hover:shadow-lg"
                  )}
                >
                  {isSubmitting ? (
                    <>Wird gesendet...</>
                  ) : (
                    <>
                      Nachricht senden
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          
          <div className="animate-on-scroll" ref={addToRefs}>
            <div className="glass-card bg-white/90 shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-display font-semibold mb-6 text-gray-800">Kontaktinformationen</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-gray-800">Adresse</h4>
                    <p className="text-gray-600">69469 Weinheim</p>
                    <p className="text-gray-500 text-sm italic mt-1">Büro in Planung</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-gray-800">E-Mail</h4>
                    <a href="mailto:office@quotax.de" className="text-gray-600 hover:text-purple transition-colors">
                      office@quotax.de
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-gray-800">Telefon</h4>
                    <p className="text-gray-600">Noch nicht verfügbar</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card overflow-hidden rounded-xl h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20750.698656291277!2d8.643712430078133!3d49.54560610000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4797c6e0c1c15e27%3A0x41ffd3c8d098b10!2sWeinheim!5e0!3m2!1sen!2sde!4v1687872611025!5m2!1sen!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="quotax Standort"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
