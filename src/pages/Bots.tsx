import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Bot, Play, Pause, Square, Plus, ArrowLeft } from 'lucide-react';

interface BotConfig {
  id: number;
  name: string;
  strategy: string;
  symbol: string;
  status: 'running' | 'paused' | 'stopped';
  pnl: number;
  trades: number;
  runtime: string;
  maxLoss: number;
  positionSize: number;
  entryRule: string;
  exitRule: string;
  logs: { time: string; action: string; detail: string }[];
}

const mockBots: BotConfig[] = [
  {
    id: 1, name: 'BTC Scalper', strategy: 'Mean Reversion', symbol: 'BTC-PERP', status: 'running',
    pnl: 1240.50, trades: 84, runtime: '3d 14h', maxLoss: 500, positionSize: 0.1,
    entryRule: 'RSI < 30 & Price above 200 EMA', exitRule: 'RSI > 70 or P&L > 2%',
    logs: [
      { time: '14:32:01', action: 'BUY', detail: 'Opened 0.1 BTC @ $63,100' },
      { time: '14:28:45', action: 'SELL', detail: 'Closed 0.1 BTC @ $63,280 (+$18.00)' },
      { time: '13:55:12', action: 'BUY', detail: 'Opened 0.1 BTC @ $62,950' },
      { time: '13:40:33', action: 'SELL', detail: 'Closed 0.1 BTC @ $63,100 (+$15.00)' },
    ]
  },
  {
    id: 2, name: 'ETH Grid', strategy: 'Grid Trading', symbol: 'ETH-PERP', status: 'paused',
    pnl: -85.20, trades: 32, runtime: '1d 8h', maxLoss: 300, positionSize: 2.0,
    entryRule: 'Grid levels every $25 from $2,300 to $2,600', exitRule: 'Close at opposite grid level',
    logs: [
      { time: '11:42:19', action: 'PAUSED', detail: 'Bot paused by user' },
      { time: '11:30:00', action: 'SELL', detail: 'Grid sell 2.0 ETH @ $2,475' },
      { time: '10:15:44', action: 'BUY', detail: 'Grid buy 2.0 ETH @ $2,450' },
    ]
  },
  {
    id: 3, name: 'SOL Momentum', strategy: 'Trend Following', symbol: 'SOL-PERP', status: 'stopped',
    pnl: 560.00, trades: 18, runtime: '5d 2h', maxLoss: 400, positionSize: 50,
    entryRule: 'MACD crossover & volume spike > 2x avg', exitRule: 'Trailing stop 3%',
    logs: [
      { time: '09:18:41', action: 'STOPPED', detail: 'Bot stopped — target reached' },
      { time: '09:00:00', action: 'SELL', detail: 'Closed 50 SOL @ $148.50 (+$310)' },
    ]
  },
];

const Bots: React.FC = () => {
  const [selectedBot, setSelectedBot] = useState<BotConfig | null>(null);

  const container: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const item: Variants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } } };

  const statusStyles = (s: string) => {
    if (s === 'running') return { dot: 'bg-[var(--color-bull)] shadow-[0_0_8px_var(--color-bull)]', text: 'text-[var(--color-bull)]', bg: 'bg-[var(--color-bull)]/10 border-[var(--color-bull)]/20' };
    if (s === 'paused') return { dot: 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]', text: 'text-yellow-500', bg: 'bg-yellow-500/10 border-yellow-500/20' };
    return { dot: 'bg-white/30', text: 'text-white/40', bg: 'bg-white/5 border-white/5' };
  };

  if (selectedBot) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <button onClick={() => setSelectedBot(null)} className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-white transition-colors text-sm cursor-pointer">
          <ArrowLeft size={16} /> Back to Strategies
        </button>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{selectedBot.name}</h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">{selectedBot.strategy} · {selectedBot.symbol}</p>
          </div>
          <div className="flex items-center gap-3">
            {selectedBot.status !== 'running' && (
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-bull)]/10 border border-[var(--color-bull)]/20 text-sm text-[var(--color-bull)] hover:bg-[var(--color-bull)] hover:text-white transition-all duration-200 cursor-pointer active:scale-95">
                <Play size={16} /> Start
              </button>
            )}
            {selectedBot.status === 'running' && (
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-sm text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all duration-200 cursor-pointer active:scale-95">
                <Pause size={16} /> Pause
              </button>
            )}
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-bear)]/10 border border-[var(--color-bear)]/20 text-sm text-[var(--color-bear)] hover:bg-[var(--color-bear)] hover:text-white transition-all duration-200 cursor-pointer active:scale-95">
              <Square size={16} /> Stop
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Parameters */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold mb-2">Parameters</h2>
            <div className="space-y-3">
              {[
                { label: 'Entry Rule', value: selectedBot.entryRule },
                { label: 'Exit Rule', value: selectedBot.exitRule },
                { label: 'Position Size', value: `${selectedBot.positionSize} ${selectedBot.symbol.split('-')[0]}` },
                { label: 'Max Daily Loss', value: `$${selectedBot.maxLoss}` },
              ].map(p => (
                <div key={p.label}>
                  <label className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest block mb-1">{p.label}</label>
                  <p className="text-sm text-white/90 font-data bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5">{p.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Activity Log</h2>
            <div className="space-y-3">
              {selectedBot.logs.map((log, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.03]">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${log.action === 'BUY' ? 'bg-[var(--color-bull)]' : log.action === 'SELL' ? 'bg-[var(--color-bear)]' : 'bg-yellow-500'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold uppercase tracking-wider ${log.action === 'BUY' ? 'text-[var(--color-bull)]' : log.action === 'SELL' ? 'text-[var(--color-bear)]' : 'text-yellow-500'}`}>{log.action}</span>
                      <span className="text-[10px] text-white/30 font-data">{log.time}</span>
                    </div>
                    <p className="text-xs text-white/60 mt-1">{log.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Strategies</h1>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[var(--color-accent)] to-blue-600 text-white text-sm font-semibold hover:shadow-[0_0_20px_var(--color-accent-glow)] transition-all duration-200 cursor-pointer active:scale-95">
          <Plus size={16} /> New Strategy
        </button>
      </motion.div>

      {mockBots.length === 0 ? (
        <motion.div variants={item} className="bg-white/[0.02] border border-white/5 rounded-2xl p-16 text-center">
          <Bot size={48} className="mx-auto text-white/10 mb-4" />
          <h2 className="text-lg font-bold text-white/80">No bots yet</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-2">Create your first strategy to start automated trading</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockBots.map((bot) => {
            const st = statusStyles(bot.status);
            return (
              <motion.div
                key={bot.id}
                variants={item}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedBot(bot)}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 cursor-pointer hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${st.dot}`} />
                    <span className={`text-xs font-semibold uppercase tracking-wider ${st.text}`}>{bot.status}</span>
                  </div>
                  <span className="text-xs text-white/30 font-data">{bot.symbol}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{bot.name}</h3>
                <p className="text-xs text-[var(--color-text-muted)] mb-4">{bot.strategy}</p>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="text-center">
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest mb-1">PnL</p>
                    <p className={`font-data text-sm font-semibold ${bot.pnl >= 0 ? 'text-[var(--color-bull)]' : 'text-[var(--color-bear)]'}`}>
                      {bot.pnl >= 0 ? '+' : ''}${bot.pnl.toFixed(0)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Trades</p>
                    <p className="font-data text-sm text-white">{bot.trades}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest mb-1">Uptime</p>
                    <p className="font-data text-sm text-white">{bot.runtime}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default Bots;
