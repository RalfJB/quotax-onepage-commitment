
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HomeIcon } from "lucide-react";
import GradientBackground from "@/components/GradientBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Update page title
    document.title = "404 - Seite nicht gefunden | quotax";
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <GradientBackground />
      <div className="text-center max-w-lg relative z-10">
        <div className="mb-6 inline-block">
          <span className="logo-text text-4xl">
            <span className="logo-quo">quo</span>
            <span className="logo-tax">tax</span>
          </span>
        </div>
        <h1 className="text-6xl font-display font-bold mb-4 text-purple">404</h1>
        <div className="w-16 h-1 bg-green mx-auto mb-6"></div>
        <p className="text-xl text-gray-700 mb-8">
          Entschuldigung, die gesuchte Seite konnte nicht gefunden werden.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple text-white rounded-lg hover:bg-purple-dark transition-all duration-300 hover:shadow-lg"
        >
          <HomeIcon size={18} />
          Zurück zur Startseite
        </a>
      </div>
    </div>
  );
};

export default NotFound;
