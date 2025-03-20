
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Shield, User, Home, LayoutDashboard, Info, Star, Search, ShoppingBag } from 'lucide-react';

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
          className="text-xl font-display font-semibold tracking-tight text-primary animate-fade-in flex items-center"
        >
          <Shield className="mr-2 h-6 w-6" />
          <span className="relative">
            Trust Trend
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/20 rounded-full"></span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" label="Home" icon={<Home className="h-4 w-4" />} />
          <NavLink to="/dashboard" label="Dashboard" icon={<LayoutDashboard className="h-4 w-4" />} />
          <NavLink to="/analyzer" label="Analyzer" icon={<Search className="h-4 w-4" />} />
          <NavLink to="/about" label="About" icon={<Info className="h-4 w-4" />} />
          <NavLink to="/features" label="Features" />
          <NavLink to="/shop" label="Shop" icon={<ShoppingBag className="h-4 w-4" />} />
          <NavLink to="/reviews" label="Reviews" icon={<Star className="h-4 w-4" />} />
        </nav>
        
        <div className="flex items-center space-x-3 animate-fade-in">
          {isAuthenticated ? (
            <>
              <Button 
                asChild 
                variant="ghost"
                className="text-sm font-medium"
              >
                <Link to="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
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

const NavLink = ({ to, label, icon }: { to: string; label: string; icon?: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to}
      className={cn(
        "text-sm font-medium transition-colors duration-200 hover:text-primary flex items-center relative py-1",
        isActive ? "text-primary" : "text-foreground/80"
      )}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
      )}
    </Link>
  );
};

export default Navbar;
