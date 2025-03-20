
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Über Uns", href: "#about" },
    { name: "Dienstleistungen", href: "#services" },
    { name: "Vorteile", href: "#benefits" },
    { name: "Team", href: "#team" },
    { name: "Kontakt", href: "#contact" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="progress-container">
        <div className="progress-bar" id="progressBar"></div>
      </div>
      <nav 
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-12",
          isScrolled 
            ? "bg-white/80 backdrop-blur-lg shadow-sm" 
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center">
            <span className="logo-text">
              <span className="logo-quo">quo</span>
              <span className="logo-tax">tax</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "font-medium text-sm transition-colors duration-300 hover:text-purple",
                  isScrolled ? "text-gray-800" : "text-gray-800"
                )}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className={cn(
                "font-medium text-sm px-5 py-2 rounded-lg transition-all duration-300",
                isScrolled 
                  ? "bg-purple text-white hover:bg-purple-dark" 
                  : "bg-purple text-white hover:bg-purple-dark"
              )}
            >
              Gespräch vereinbaren
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-800 focus:outline-none" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={cn(
            "md:hidden fixed inset-0 z-50 bg-white pt-24 px-6 transform transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium text-lg text-gray-800 hover:text-purple transition-colors duration-300"
                onClick={closeMenu}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="font-medium text-lg px-5 py-3 bg-purple text-white rounded-lg hover:bg-purple-dark transition-all duration-300 text-center mt-4"
              onClick={closeMenu}
            >
              Gespräch vereinbaren
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
