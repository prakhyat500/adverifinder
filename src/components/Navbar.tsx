
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10",
        isScrolled || !isHomePage ? 
          "bg-white/80 backdrop-blur-md shadow-sm" : 
          "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-display font-semibold tracking-tight text-primary animate-fade-in"
        >
          <span className="relative">
            AdVeriFinder
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/20 rounded-full"></span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" label="Home" />
          <NavLink to="/features" label="Features" />
          <NavLink to="/about" label="About" />
        </nav>
        
        <div className="flex items-center space-x-3 animate-fade-in">
          {isAuthenticated ? (
            <>
              <Button 
                asChild 
                variant="ghost"
                className="text-sm font-medium"
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button 
                variant="outline"
                className="text-sm font-medium"
                onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  window.location.href = '/';
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                asChild 
                variant="ghost"
                className="text-sm font-medium"
              >
                <Link to="/login">Log In</Link>
              </Button>
              <Button 
                asChild 
                variant="default"
                className="text-sm font-medium"
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, label }: { to: string; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to}
      className={cn(
        "text-sm font-medium transition-colors duration-200 hover:text-primary relative py-1",
        isActive ? "text-primary" : "text-foreground/80"
      )}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
      )}
    </Link>
  );
};

export default Navbar;
