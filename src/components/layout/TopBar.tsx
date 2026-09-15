import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

interface TopBarProps {
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopBar: React.FC<TopBarProps> = ({ setMobileMenuOpen }) => {
  const [equity, setEquity] = useState(12450.50);
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const prevEquity = useRef(equity);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 45;
      setEquity(prev => {
        const next = prev + change;
        prevEquity.current = prev;
        return next;
      });
      const dir = change >= 0 ? 'up' : 'down';
      setFlash(dir);
      setTimeout(() => setFlash(null), 600);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const formatted = equity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <motion.header 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="h-20 shrink-0 border-b border-white/[0.06] flex items-center justify-between px-4 md:px-8"
    >
      <div className="flex items-center gap-4 md:gap-10">
        {/* Mobile menu toggle */}
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 md:hidden text-[var(--color-text-muted)] hover:text-white transition-colors active:scale-95"
        >
          <Menu size={22} />
        </button>
        
        {/* Equity */}
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[10px] md:text-[11px] text-[var(--color-text-muted)] uppercase tracking-[0.15em] font-medium">Net Equity</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-bull)] shadow-[0_0_6px_var(--color-bull)] animate-pulse" />
          </div>
          <div 
            className="text-xl md:text-2xl font-data font-semibold transition-all duration-500"
            style={{
              color: flash === 'up' ? 'var(--color-bull)' : flash === 'down' ? 'var(--color-bear)' : 'white',
              textShadow: flash ? `0 0 16px ${flash === 'up' ? 'rgba(16,185,129,0.5)' : 'rgba(239,68,68,0.5)'}` : 'none',
            }}
          >
            ${formatted}
          </div>
        </div>
        
        <div className="h-10 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />
        
        <div className="hidden lg:flex flex-col gap-0.5">
          <span className="text-[11px] text-[var(--color-text-muted)] uppercase tracking-[0.15em] font-medium">Daily P&L</span>
          <span className="font-data text-[var(--color-bull)] text-base">
            +$342.10 <span className="text-xs opacity-60">(+2.8%)</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Testnet badge */}
        <button className="hidden sm:flex relative group items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2 rounded-xl text-sm transition-all duration-200 border border-white/[0.06] hover:border-white/[0.12] cursor-pointer">
          <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
          <span className="text-[var(--color-text-muted)] group-hover:text-white transition-colors font-medium">Live</span>
        </button>
        
        {/* Kill switch */}
        <button className="relative group bg-[var(--color-bear)]/10 text-[var(--color-bear)] px-3 py-2 md:px-5 md:py-2.5 rounded-xl font-bold text-xs md:text-sm tracking-wide transition-all duration-200 border border-[var(--color-bear)]/20 hover:bg-[var(--color-bear)] hover:text-white hover:shadow-[0_0_24px_rgba(239,68,68,0.35)] hover:border-transparent cursor-pointer active:scale-95 flex items-center justify-center">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-current block" />
            <span className="hidden sm:inline-block">KILL ALL</span>
          </span>
        </button>
      </div>
    </motion.header>
  );
};

export default TopBar;
