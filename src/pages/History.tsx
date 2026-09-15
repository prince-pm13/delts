import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Search } from 'lucide-react';
import { mockTradeHistory } from '../data/mockData';

const History: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = mockTradeHistory.filter(t =>
    t.symbol.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    const headers = 'ID,Symbol,Side,Price,Size,Fee,PnL,Time\n';
    const csv = headers + mockTradeHistory.map(t =>
      `${t.id},${t.symbol},${t.side},${t.price},${t.size},${t.fee},${t.pnl ?? ''},${t.time}`
    ).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'trade_history.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
  const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 20 } } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Trade History</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search trades..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--color-accent)]/50 transition-all duration-300 w-48 font-data"
            />
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-[var(--color-text-muted)] hover:text-white hover:bg-white/[0.08] transition-all duration-200 cursor-pointer active:scale-95"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </motion.div>

      <motion.div variants={item} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left text-sm border-collapse min-w-[800px]">
            <thead>
              <tr className="text-[var(--color-text-muted)] border-b border-white/5">
                <th className="pb-4 font-semibold uppercase text-[11px] tracking-wider">Trade ID</th>
                <th className="pb-4 font-semibold uppercase text-[11px] tracking-wider">Time</th>
                <th className="pb-4 font-semibold uppercase text-[11px] tracking-wider">Symbol</th>
                <th className="pb-4 font-semibold uppercase text-[11px] tracking-wider">Side</th>
                <th className="pb-4 font-semibold uppercase text-[11px] tracking-wider">Price</th>
                <th className="pb-4 font-semibold uppercase text-[11px] tracking-wider">Size</th>
                <th className="pb-4 font-semibold uppercase text-[11px] tracking-wider">Fee</th>
                <th className="pb-4 font-semibold uppercase text-[11px] tracking-wider text-right">Realized PnL</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((trade, i) => (
                <motion.tr
                  key={trade.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 font-data text-white/60 text-xs">{trade.id}</td>
                  <td className="py-4 font-data text-white/50 text-xs">{trade.time}</td>
                  <td className="py-4 font-medium text-white">{trade.symbol}</td>
                  <td className="py-4">
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${trade.side === 'Buy' ? 'text-[var(--color-bull)]' : 'text-[var(--color-bear)]'}`}>
                      {trade.side}
                    </span>
                  </td>
                  <td className="py-4 font-data text-white/80">${trade.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="py-4 font-data text-white/80">{trade.size.toLocaleString()}</td>
                  <td className="py-4 font-data text-yellow-500/70">${trade.fee.toFixed(2)}</td>
                  <td className="py-4 font-data text-right">
                    {trade.pnl !== null ? (
                      <span className={`font-semibold ${trade.pnl >= 0 ? 'text-[var(--color-bull)]' : 'text-[var(--color-bear)]'}`}>
                        {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-white/20">—</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[var(--color-text-muted)]">
            <p className="text-lg font-medium">No trades found</p>
            <p className="text-sm mt-1 opacity-60">Try a different search term</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default History;
