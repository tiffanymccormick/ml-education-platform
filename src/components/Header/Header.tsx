import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ModeToggle } from '../mode-toggle';
import { LayoutDashboard, BookOpen, Code, Menu, Award, Layers, AlertTriangle, Shield, Terminal, Database } from 'lucide-react';
import MobileMenu from '../MobileMenu/MobileMenu';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { path: '/dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { path: '/lessons', label: 'TRAINING', icon: Terminal },
    { path: '/lessons-gallery', label: 'MODULES', icon: Database },
    { path: '/playground', label: 'SIMULATION', icon: Code },
    { path: '/achievements', label: 'CLEARANCE', icon: Shield },
  ];

  return (
    <>
      {/* Scanline effect */}
      <div className="scanline"></div>
      
      <header 
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled 
            ? 'border-[#00C3FF]/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' 
            : 'border-transparent bg-background/50 backdrop-blur-sm'
        }`}
      >
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center"
              >
                <span className="font-display text-xl font-bold text-[#00C3FF] mr-2">NERV</span>
                <span className="text-xs font-mono text-foreground/70 border border-[#00C3FF]/30 px-1 py-0.5">ML PLATFORM</span>
              </motion.div>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-mono">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`group flex items-center space-x-2 transition-all duration-300 hover:text-[#00C3FF] ${
                    location.pathname === item.path 
                      ? 'text-[#00C3FF]' 
                      : 'text-foreground/80'
                  }`}
                >
                  <item.icon className={`h-4 w-4 transition-all duration-300 ${
                    location.pathname === item.path 
                      ? 'text-[#00C3FF]' 
                      : 'text-foreground/80 group-hover:text-[#00C3FF]'
                  }`} />
                  <span className="relative text-xs tracking-wider">
                    {item.label}
                    {location.pathname === item.path && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#00C3FF]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <button 
            className="inline-flex items-center justify-center p-2 text-muted-foreground hover:bg-[#00C3FF]/10 hover:text-[#00C3FF] md:hidden mecha-button"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </button>

          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="hidden md:flex items-center mr-4 text-xs font-mono text-foreground/50">
              <span className="mr-2">SECURITY LEVEL:</span>
              <span className="text-[#FFC700] border border-[#FFC700]/30 px-1">B</span>
            </div>
            
            <nav className="flex items-center space-x-2">
              <ModeToggle />
              <div className="hidden items-center space-x-2 md:flex">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="h-8 w-8 overflow-hidden border-2 border-[#00C3FF]/50 mecha-border relative"
                >
                  <img 
                    src="/avatar.png" 
                    alt="User avatar" 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Ccircle cx="12" cy="8" r="5"/%3E%3Cpath d="M20 21a8 8 0 0 0-16 0"/%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-[#00C3FF] animate-pulse"></div>
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-foreground/90">OPERATOR</span>
                  <span className="text-[10px] font-mono text-[#00C3FF]">AUTHORIZED</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
        
        {/* Technical details bar */}
        <div className="hidden md:flex h-6 border-t border-[#00C3FF]/10 bg-background/80 text-[10px] font-mono text-foreground/50 items-center px-4 justify-between">
          <div className="flex items-center">
            <span className="mr-4">SYSTEM: ACTIVE</span>
            <span className="mr-4">TIMESTAMP: {new Date().toISOString()}</span>
            <span>NEURAL INTERFACE v2.5</span>
          </div>
          <div className="flex items-center">
            <AlertTriangle size={10} className="text-[#FF0012] mr-1" />
            <span className="text-[#FF0012]">UNAUTHORIZED ACCESS WILL BE TRACED AND PROSECUTED</span>
          </div>
        </div>
      </header>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};

export default Header; 