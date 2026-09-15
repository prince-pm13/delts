import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { mockPositions } from '../data/mockData';

const Positions: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<string>('pnl');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const sorted = [...mockPositions].sort((a, b) => {
    const av = (a as any)[sortKey];
    const bv = (b as any)[sortKey];
    if (typeof av === 'number') return sortDir === 'asc' ? av - bv : bv - av;
    return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
  });

  const container: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
  const item: Variants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 20 } } };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortKey !== col) return null;
    return sortDir === 'asc' ? <ChevronUp size={14} className="inline ml-1" /> : <ChevronDown size={14} className="inline ml-1" />;
  };

  const thClass = "pb-4 font-semibold uppercase text-[11px] tracking-wider cursor-pointer hover:text-white transition-colors select-none";

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Positions</h1>
        <span className="text-sm text-[var(--color-text-muted)]">{mockPositions.length} open</span>
      </motion.div>

      <motion.div variants={item} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-bull)]/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left text-sm border-collapse min-w-[800px]">
            <thead>
              <tr className="text-[var(--color-text-muted)] border-b border-white/5">
                <th className={thClass} onClick={() => handleSort('symbol')}>Asset <SortIcon col="symbol" /></th>
                <th className={thClass} onClick={() => handleSort('side')}>Side <SortIcon col="side" /></th>
                <th className={thClass} onClick={() => handleSort('size')}>Size <SortIcon col="size" /></th>
                <th className={thClass} onClick={() => handleSort('entryPrice')}>Entry <SortIcon col="entryPrice" /></th>
                <th className={thClass} onClick={() => handleSort('markPrice')}>Mark <SortIcon col="markPrice" /></th>
                <th className={thClass} onClick={() => handleSort('liqPrice')}>Liq. Price <SortIcon col="liqPrice" /></th>
                <th className={`${thClass} text-right`} onClick={() => handleSort('pnl')}>PnL (ROE) <SortIcon col="pnl" /></th>
                <th className="pb-4 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((pos) => (
                <React.Fragment key={pos.id}>
                  <tr
                    className="group border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer"
                    onClick={() => setExpandedId(expandedId === pos.id ? null : pos.id)}
                  >
                    <td className="py-4 font-medium">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${pos.side === 'Long' ? 'bg-[var(--color-bull)]' : 'bg-[var(--color-bear)]'}`} />
                        <span className="text-white">{pos.symbol}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`text-[11px] font-bold uppercase tracking-widest ${pos.side === 'Long' ? 'text-[var(--color-bull)]' : 'text-[var(--color-bear)]'}`}>
                        {pos.side} {pos.leverage}
                      </span>
                    </td>
                    <td className="py-4 font-data text-white/80">{pos.size.toLocaleString()}</td>
                    <td className="py-4 font-data text-white/80">${pos.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="py-4 font-data text-white">${pos.markPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="py-4 font-data text-yellow-500/80">${pos.liqPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="py-4 font-data text-right">
                      <div className={`font-semibold ${pos.pnl >= 0 ? 'text-[var(--color-bull)]' : 'text-[var(--color-bear)]'}`}>
                        {pos.pnl >= 0 ? '+' : ''}${Math.abs(pos.pnl).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className={`text-[11px] mt-0.5 ${pos.roe >= 0 ? 'text-[var(--color-bull)]/70' : 'text-[var(--color-bear)]/70'}`}>
                        {pos.roe >= 0 ? '+' : ''}{pos.roe}%
                      </div>
                    </td>
                    <td className="py-4 text-center text-white/30 group-hover:text-white/60 transition-colors">
                      {expandedId === pos.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </td>
                  </tr>
                  {expandedId === pos.id && (
                    <tr>
                      <td colSpan={8} className="pb-4 pt-1">
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                        >
                          <div>
                            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Margin Used</p>
                            <p className="font-data text-sm text-white">${pos.margin.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Leverage</p>
                            <p className="font-data text-sm text-white">{pos.leverage}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Funding Paid</p>
                            <p className="font-data text-sm text-[var(--color-bear)]">${Math.abs(pos.funding).toFixed(2)}</p>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Positions;
