import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-white/5 rounded-xl ${className}`} />
);

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Simulate network request
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8"
    >
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Available Margin', value: '$8,240.00', change: null, color: 'text-white' },
          { label: 'Unrealized P&L', value: '+$450.20', change: 'up', color: 'text-[var(--color-bull)]' },
          { label: 'Account Leverage', value: '3.4x', change: null, color: 'text-white' },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            variants={item}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden group cursor-pointer transition-all duration-500 hover:bg-white/[0.04] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] hover:border-white/10"
          >
            {/* Animated hover glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-accent)]/10 blur-[50px] rounded-full group-hover:bg-[var(--color-accent)]/20 transition-all duration-500" />
            
            <h3 className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest font-semibold mb-3 relative z-10">{stat.label}</h3>
            <p className={`text-4xl font-data font-light tracking-tight ${stat.color} relative z-10 drop-shadow-md`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Positions Panel */}
        <motion.div variants={item} className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-bull)]/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="text-xl font-bold tracking-tight">Active Positions</h2>
            <button className="text-[13px] text-[var(--color-accent)] hover:text-white transition-colors bg-[var(--color-accent)]/10 px-3 py-1.5 rounded-lg border border-[var(--color-accent)]/20">View All</button>
          </div>
          
          <div className="overflow-x-auto relative z-10">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="text-[var(--color-text-muted)] border-b border-white/5">
                  <th className="pb-4 font-semibold uppercase text-xs tracking-wider">Asset</th>
                  <th className="pb-4 font-semibold uppercase text-xs tracking-wider">Size</th>
                  <th className="pb-4 font-semibold uppercase text-xs tracking-wider">Entry</th>
                  <th className="pb-4 font-semibold uppercase text-xs tracking-wider">Mark</th>
                  <th className="pb-4 font-semibold uppercase text-xs tracking-wider text-right">PnL (ROE)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="group border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors cursor-pointer">
                  <td className="py-5 font-medium flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.94 1.13c-.23 0-.42.19-.42.42v3.66c-2.3.26-4.15 1.54-4.8 3.52-.1.29.13.56.43.56h1.76c.21 0 .38-.15.42-.35.38-1.54 2.22-2.14 3.73-1.89V10h-.63c-2.6 0-4.66 1.4-4.66 3.96 0 2.45 1.83 3.65 4.18 3.84v3.66c0 .23.19.42.42.42h1.5c.23 0 .42-.19.42-.42v-3.66c2.4-.28 4.29-1.66 4.9-3.79.08-.28-.14-.54-.42-.54h-1.8c-.2 0-.37.14-.41.33-.42 1.6-2.3 2.22-3.83 1.95V12.7h1c2.5 0 4.54-1.37 4.54-3.87 0-2.4-1.83-3.6-4.22-3.8V1.55c0-.23-.19-.42-.42-.42h-1.5z"/></svg>
                    </div>
                    <div>
                      <div className="text-white">BTC-PERP</div>
                      <div className="text-[10px] text-[var(--color-bull)] font-bold tracking-widest mt-0.5">LONG 10x</div>
                    </div>
                  </td>
                  <td className="py-5 font-data text-white/80">0.45</td>
                  <td className="py-5 font-data text-white/80">$62,100.50</td>
                  <td className="py-5 font-data text-white">$63,240.10</td>
                  <td className="py-5 font-data text-right">
                    <div className="text-[var(--color-bull)] font-semibold drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">+$512.82</div>
                    <div className="text-[11px] text-[var(--color-bull)]/70 mt-1">18.35%</div>
                  </td>
                </tr>
                <tr className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                  <td className="py-5 font-medium flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM11.943 0L4.57 12.224l7.373 4.37 7.37-4.37L11.944 0z"/></svg>
                    </div>
                    <div>
                      <div className="text-white">ETH-PERP</div>
                      <div className="text-[10px] text-[var(--color-bear)] font-bold tracking-widest mt-0.5">SHORT 5x</div>
                    </div>
                  </td>
                  <td className="py-5 font-data text-white/80">4.20</td>
                  <td className="py-5 font-data text-white/80">$2,450.00</td>
                  <td className="py-5 font-data text-white">$2,435.20</td>
                  <td className="py-5 font-data text-right">
                    <div className="text-[var(--color-bear)] font-semibold drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]">-$62.16</div>
                    <div className="text-[11px] text-[var(--color-bear)]/70 mt-1">-5.10%</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Recent Activity Panel */}
        <motion.div variants={item} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col">
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-[var(--color-accent)]/5 blur-[60px] rounded-full pointer-events-none" />
          
          <h2 className="text-xl font-bold tracking-tight mb-6 relative z-10">Trade Feed</h2>
          <div className="flex flex-col gap-1 relative z-10 flex-1 overflow-y-auto pr-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-[var(--color-bear)] shadow-[0_0_8px_var(--color-bear)]' : 'bg-[var(--color-bull)] shadow-[0_0_8px_var(--color-bull)]'}`} />
                  <div>
                    <p className="font-semibold text-sm text-white group-hover:text-[var(--color-accent)] transition-colors">
                      {i % 2 === 0 ? 'Short' : 'Long'} BTC
                    </p>
                    <p className="text-[var(--color-text-muted)] text-[10px] mt-0.5 font-data tracking-wider uppercase">Today 14:32:0{i}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-data text-sm text-white/90">0.{i}5</p>
                  <p className="text-[var(--color-text-muted)] text-xs mt-0.5 font-data">@ $62,{100 + i * 10}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
