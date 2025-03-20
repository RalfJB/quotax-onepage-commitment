
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-50 py-16 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-10 md:mb-0">
            <div className="logo-text mb-4">
              <span className="logo-quo">quo</span>
              <span className="logo-tax">tax</span>
            </div>
            <p className="text-gray-600 max-w-md">
              Die digitale Steuerberatungsgesellschaft für kleine und mittlere Unternehmen, Gründer und Unternehmer.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-display font-semibold mb-4">Dienstleistungen</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="text-gray-600 hover:text-purple transition-colors">Steuer & Recht</a></li>
                <li><a href="#services" className="text-gray-600 hover:text-purple transition-colors">Buchhaltung</a></li>
                <li><a href="#services" className="text-gray-600 hover:text-purple transition-colors">Unternehmensberatung</a></li>
                <li><a href="#services" className="text-gray-600 hover:text-purple transition-colors">Vermögensplanung</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display font-semibold mb-4">Informationen</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-600 hover:text-purple transition-colors">Über Uns</a></li>
                <li><a href="#team" className="text-gray-600 hover:text-purple transition-colors">Team</a></li>
                <li><a href="#benefits" className="text-gray-600 hover:text-purple transition-colors">Vorteile</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display font-semibold mb-4">Kontakt</h4>
              <ul className="space-y-2">
                <li><a href="#contact" className="text-gray-600 hover:text-purple transition-colors">Kontaktformular</a></li>
                <li><a href="mailto:office@quotax.de" className="text-gray-600 hover:text-purple transition-colors">office@quotax.de</a></li>
                <li><span className="text-gray-600">69469 Weinheim</span></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-gray-500 text-sm">
            © {new Date().getFullYear()} quotax Steuerberatungsgesellschaft. Alle Rechte vorbehalten.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-purple transition-colors">Impressum</a>
            <a href="#" className="text-gray-500 hover:text-purple transition-colors">Datenschutz</a>
            <a href="#" className="text-gray-500 hover:text-purple transition-colors">AGB</a>
          </div>
        </div>
      </div>
      
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-purple text-white rounded-full shadow-lg hover:bg-purple-dark transition-colors z-20"
        aria-label="Nach oben scrollen"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
