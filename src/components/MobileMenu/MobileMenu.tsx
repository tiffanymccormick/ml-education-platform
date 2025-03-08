import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { X, LayoutDashboard, Terminal, Database, Code, Shield, AlertTriangle } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'HOME', icon: AlertTriangle },
    { path: '/dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { path: '/lessons', label: 'TRAINING', icon: Terminal },
    { path: '/lessons-gallery', label: 'MODULES', icon: Database },
    { path: '/playground', label: 'SIMULATION', icon: Code },
    { path: '/achievements', label: 'CLEARANCE', icon: Shield },
  ];
  
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#00C3FF]/20">
            <div className="flex items-center">
              <span className="font-display text-xl font-bold text-[#00C3FF] mr-2">NERV</span>
              <span className="text-xs font-mono text-foreground/70 border border-[#00C3FF]/30 px-1 py-0.5">ML PLATFORM</span>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center border border-[#00C3FF]/20 text-[#00C3FF] mecha-button"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* System status */}
          <div className="bg-background/80 p-4 border-b border-[#00C3FF]/20">
            <div className="mecha-panel">
              <div className="mecha-panel-header">
                <span className="mecha-panel-title">System Status</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#00C3FF] animate-pulse mr-2"></div>
                  <span className="text-xs font-mono text-[#00C3FF]">ONLINE</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 text-xs font-mono">
                <div>
                  <div className="text-foreground/50 mb-1">SECURITY LEVEL</div>
                  <div className="text-[#FFC700] border border-[#FFC700]/30 px-1 inline-block">B</div>
                </div>
                <div>
                  <div className="text-foreground/50 mb-1">USER STATUS</div>
                  <div className="text-[#00C3FF]">AUTHORIZED</div>
                </div>
                <div>
                  <div className="text-foreground/50 mb-1">TIMESTAMP</div>
                  <div className="text-foreground/80">{new Date().toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-foreground/50 mb-1">VERSION</div>
                  <div className="text-foreground/80">v2.5.0</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex-1 overflow-auto p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <motion.div key={item.path} variants={itemVariants}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center p-3 border ${
                      location.pathname === item.path 
                        ? 'border-[#00C3FF] text-[#00C3FF]' 
                        : 'border-foreground/10 text-foreground/80 hover:border-[#00C3FF]/50 hover:text-[#00C3FF]'
                    } transition-all duration-300`}
                    onClick={onClose}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="font-mono text-sm tracking-wider">{item.label}</span>
                    {location.pathname === item.path && (
                      <div className="ml-auto w-1 h-6 bg-[#00C3FF]"></div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-[#00C3FF]/20 text-[10px] font-mono text-foreground/50">
            <div className="flex items-center">
              <AlertTriangle size={10} className="text-[#FF0012] mr-1" />
              <span className="text-[#FF0012]">UNAUTHORIZED ACCESS WILL BE TRACED AND PROSECUTED</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 