import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PieChart, History, Settings, Bot, ArrowLeftRight, X, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logout, userId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Track screen size reactively
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    if (isMobile) setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Overview', path: '/', icon: LayoutDashboard },
    { name: 'Positions', path: '/positions', icon: PieChart },
    { name: 'Orders', path: '/orders', icon: ArrowLeftRight },
    { name: 'History', path: '/history', icon: History },
    { name: 'Strategies', path: '/bots', icon: Bot },
  ];

  const showLabels = isMobile || !collapsed;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`flex items-center border-b border-white/[0.06] h-20 shrink-0 transition-all duration-300 ${showLabels ? 'justify-between p-5' : 'justify-center p-2'}`}>
        <div className={`flex items-center gap-2.5 overflow-hidden transition-all duration-300 ${showLabels ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-purple-600 shadow-[0_0_20px_var(--color-accent-glow)] shrink-0" />
          <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 whitespace-nowrap">DELTA</span>
        </div>
        
        {isMobile ? (
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-white/5 rounded-lg text-[var(--color-text-muted)] hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        ) : (
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className={`p-2 hover:bg-white/5 rounded-lg text-[var(--color-text-muted)] hover:text-white transition-colors ${collapsed ? 'mx-auto' : ''}`}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav className={`flex-1 py-4 flex flex-col gap-1 overflow-y-auto transition-all duration-300 ${showLabels ? 'px-3' : 'px-2'}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              title={!showLabels ? item.name : undefined}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl transition-all duration-200 overflow-hidden ${
                  showLabels ? 'px-4 py-3' : 'px-0 py-3 justify-center'
                } ${
                  isActive
                    ? 'text-white'
                    : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/[0.04]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-white/[0.08] rounded-xl border-l-2 border-[var(--color-accent)]"
                      style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon size={20} className="relative z-10 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <span className={`relative z-10 font-medium whitespace-nowrap transition-all duration-300 ${showLabels ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Settings & Logout */}
      <div className={`border-t border-white/[0.06] shrink-0 transition-all duration-300 flex flex-col gap-1 ${showLabels ? 'p-3' : 'p-2'}`}>
        <NavLink
          to="/settings"
          title={!showLabels ? "Settings" : undefined}
          className={({ isActive }) =>
            `group relative flex items-center gap-3 rounded-xl transition-all duration-200 overflow-hidden ${
              showLabels ? 'px-4 py-3' : 'px-0 py-3 justify-center'
            } ${
              isActive ? 'text-white bg-white/[0.08]' : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/[0.04]'
            }`
          }
        >
          <Settings size={20} className="relative z-10 shrink-0 group-hover:rotate-90 transition-transform duration-500" />
          <span className={`relative z-10 font-medium whitespace-nowrap transition-all duration-300 ${showLabels ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
            Settings
          </span>
        </NavLink>

        {/* User info + Logout */}
        {showLabels && (
          <div className="flex items-center gap-3 px-4 py-2 mt-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent)]/30 to-purple-600/30 border border-white/10 flex items-center justify-center text-xs font-bold text-white/70 shrink-0 uppercase">
              {userId?.[0] || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white/80 truncate">{userId}</p>
              <p className="text-[10px] text-white/30">Active</p>
            </div>
          </div>
        )}

        <button
          onClick={() => { logout(); navigate('/login'); }}
          title={!showLabels ? "Logout" : undefined}
          className={`group flex items-center gap-3 rounded-xl transition-all duration-200 text-[var(--color-text-muted)] hover:text-[var(--color-bear)] hover:bg-[var(--color-bear)]/10 cursor-pointer ${
            showLabels ? 'px-4 py-3' : 'px-0 py-3 justify-center'
          }`}
        >
          <LogOut size={20} className="shrink-0 group-hover:translate-x-0.5 transition-transform duration-200" />
          <span className={`font-medium whitespace-nowrap transition-all duration-300 ${showLabels ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );

  // ─── MOBILE: Animated drawer ───
  if (isMobile) {
    return (
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-72 z-50 glass-panel"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  // ─── DESKTOP: Collapsible rail (pure CSS transition, no Framer fighting) ───
  return (
    <aside
      className="glass-panel rounded-2xl flex flex-col shrink-0 overflow-hidden"
      style={{
        width: collapsed ? 72 : 256,
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {sidebarContent}
    </aside>
  );
};

export default Sidebar;
