import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { mockOrders } from '../data/mockData';

const Orders: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'Open' | 'Filled' | 'Cancelled'>('all');

  const filtered = filter === 'all' ? mockOrders : mockOrders.filter(o => o.status === filter);

  const container: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
  const item: Variants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 20 } } };

  const statusColor = (s: string) => {
    if (s === 'Open') return 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20';
    if (s === 'Filled') return 'bg-[var(--color-bull)]/10 text-[var(--color-bull)] border-[var(--color-bull)]/20';
    return 'bg-white/5 text-white/40 border-white/5';
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <div className="flex items-center gap-1 bg-white/[0.04] rounded-xl p-1 border border-white/[0.06]">
          {(['all', 'Open', 'Filled', 'Cancelled'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer capitalize ${
                filter === f
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-accent)]/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left text-sm border-collapse min-w-[900px]">
            <thead>
              <tr className="text-[var(--color-text-muted)] border-b border-white/5">
                <th className="pb-4 font-semibold uppercase text-[11px] tracking-wider">Order ID</th>
                <th className="pb-4 font-semibold uppercase text-[11px] tracking-wider">Time</th>
                <th className="pb-4 font-semibold uppercase text-[11px] tracking-wider">Symbol</th>
                <th className="pb-4 font-semibold uppercase text-[11px] tracking-wider">Side</th>
                <th className="pb-4 font-semibold uppercase text-[11px] tracking-wider">Type</th>
                <th className="pb-4 font-semibold uppercase text-[11px] tracking-wider">Price</th>
                <th className="pb-4 font-semibold uppercase text-[11px] tracking-wider">Size</th>
                <th className="pb-4 font-semibold uppercase text-[11px] tracking-wider">Filled</th>
                <th className="pb-4 font-semibold uppercase text-[11px] tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 font-data text-white/60 text-xs">{order.id}</td>
                  <td className="py-4 font-data text-white/50 text-xs">{order.time}</td>
                  <td className="py-4 font-medium text-white">{order.symbol}</td>
                  <td className="py-4">
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${order.side === 'Buy' ? 'text-[var(--color-bull)]' : 'text-[var(--color-bear)]'}`}>
                      {order.side}
                    </span>
                  </td>
                  <td className="py-4 text-white/60">{order.type}</td>
                  <td className="py-4 font-data text-white/80">${order.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="py-4 font-data text-white/80">{order.size.toLocaleString()}</td>
                  <td className="py-4 font-data text-white/80">{order.filled.toLocaleString()}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${statusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[var(--color-text-muted)]">
            <p className="text-lg font-medium">No {filter} orders</p>
            <p className="text-sm mt-1 opacity-60">Try changing the filter above</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Orders;
