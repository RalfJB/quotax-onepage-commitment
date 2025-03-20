
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
    { name: "Karriere", href: "/careers" },
    { name: "Kontakt", href: "#contact" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith('#')) return false;
    return location.pathname === href;
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="progress-container">
        <div className="progress-bar" id="progressBar"></div>
      </div>
      <nav 
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-4 md:px-8",
          isScrolled 
            ? "bg-black/80 backdrop-blur-lg shadow-md" 
            : "bg-black/40 backdrop-blur-md"
        )}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="logo-text text-2xl md:text-3xl">
              <span className="logo-quo text-shiny-purple">quo</span>
              <span className="logo-tax">tax</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-medium text-sm transition-colors duration-300 hover:text-green relative",
                    isScrolled ? "text-white" : "text-white",
                    isActive(link.href) && "text-green"
                  )}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-green shadow-[0_0_10px_2px_rgba(124,252,0,0.7)] rounded-full"></span>
                  )}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "font-medium text-sm transition-colors duration-300 hover:text-green relative",
                    isScrolled ? "text-white" : "text-white",
                    isActive(link.href) && "text-green"
                  )}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-green shadow-[0_0_10px_2px_rgba(124,252,0,0.7)] rounded-full"></span>
                  )}
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <a
              href="#contact"
              className={cn(
                "font-medium text-sm px-3 py-1.5 rounded-lg transition-all duration-300",
                isScrolled 
                  ? "bg-green text-white hover:bg-green-dark" 
                  : "bg-green text-white hover:bg-green-dark"
              )}
            >
              Gespräch
            </a>
            <button 
              className="text-white focus:outline-none" 
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={cn(
            "md:hidden fixed inset-0 z-50 bg-black/90 pt-24 px-6 transform transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-medium text-lg transition-colors duration-300 hover:text-green relative",
                    "text-white",
                    isActive(link.href) && "text-green"
                  )}
                  onClick={closeMenu}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-green shadow-[0_0_10px_2px_rgba(124,252,0,0.7)] rounded-full"></span>
                  )}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "font-medium text-lg transition-colors duration-300 hover:text-green relative",
                    "text-white",
                    isActive(link.href) && "text-green"
                  )}
                  onClick={closeMenu}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-green shadow-[0_0_10px_2px_rgba(124,252,0,0.7)] rounded-full"></span>
                  )}
                </Link>
              )
            ))}
            <a
              href="#contact"
              className="font-medium text-lg px-5 py-3 bg-green text-white rounded-lg hover:bg-green-dark transition-all duration-300 text-center mt-4"
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
