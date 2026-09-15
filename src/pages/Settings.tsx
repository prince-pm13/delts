import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Key, Shield, Bell, AlertTriangle, RotateCcw, Trash2, Copy, Check, Eye, EyeOff, Wifi, WifiOff, Loader2, CheckCircle2, XCircle, Globe } from 'lucide-react';

const Settings: React.FC = () => {
  // Connection state
  const [connected, setConnected] = useState(true);
  const [environment, setEnvironment] = useState<'live' | 'testnet'>('live');
  const [connectKey, setConnectKey] = useState('');
  const [connectSecret, setConnectSecret] = useState('');
  const [connectStatus, setConnectStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [showConnectForm, setShowConnectForm] = useState(false);

  // API Key state
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [revokeConfirm, setRevokeConfirm] = useState(false);
  const [rotateConfirm, setRotateConfirm] = useState(false);

  const handleConnect = async () => {
    if (!connectKey || !connectSecret) return;
    setConnectStatus('verifying');
    // Simulate API verification
    await new Promise(r => setTimeout(r, 2000));
    // Simulate success (random fail 20% of the time for demo)
    if (Math.random() > 0.2) {
      setConnectStatus('success');
      setTimeout(() => {
        setConnected(true);
        setShowConnectForm(false);
        setConnectStatus('idle');
        setConnectKey('');
        setConnectSecret('');
      }, 1500);
    } else {
      setConnectStatus('error');
      setTimeout(() => setConnectStatus('idle'), 3000);
    }
  };

  const handleDisconnect = () => {
    setConnected(false);
    setShowConnectForm(true);
  };

  // Risk limits
  const [maxDailyLoss, setMaxDailyLoss] = useState('500');
  const [maxPositionSize, setMaxPositionSize] = useState('5000');
  const [maxLeverage, setMaxLeverage] = useState('10');

  // Notifications
  const [notifications, setNotifications] = useState({
    orderFilled: true,
    positionLiquidation: true,
    botStartStop: true,
    dailySummary: false,
    priceAlerts: true,
    riskLimitHit: true,
  });

  const mockApiKey = 'dx_live_a3f8k29x7m1nQ4pR';
  const maskedKey = '••••••••••••' + mockApiKey.slice(-4);

  const handleCopy = () => {
    navigator.clipboard.writeText(mockApiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } }
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl mx-auto space-y-6">

      {/* ── Account Connection ── */}
      <motion.section variants={item} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent ${connected ? 'via-[var(--color-bull)]/40' : 'via-yellow-500/40'} to-transparent`} />
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${
              connected ? 'bg-[var(--color-bull)]/10 border border-[var(--color-bull)]/20' : 'bg-yellow-500/10 border border-yellow-500/20'
            }`}>
              {connected ? <Wifi size={18} className="text-[var(--color-bull)]" /> : <WifiOff size={18} className="text-yellow-500" />}
            </div>
            <div>
              <h2 className="text-lg font-bold">Account Connection</h2>
              <p className="text-xs text-[var(--color-text-muted)]">Delta Exchange API integration</p>
            </div>
          </div>

          {/* Environment toggle */}
          <div className="flex items-center gap-1 bg-white/[0.04] rounded-xl p-1 border border-white/[0.06]">
            <button
              onClick={() => setEnvironment('live')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer ${
                environment === 'live'
                  ? 'bg-[var(--color-bull)]/20 text-[var(--color-bull)] shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              Live
            </button>
            <button
              onClick={() => setEnvironment('testnet')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer ${
                environment === 'testnet'
                  ? 'bg-[var(--color-accent)]/20 text-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent-glow)]'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              Testnet
            </button>
          </div>
        </div>

        {/* Connection status card */}
        {connected && !showConnectForm ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-[var(--color-bull)]/5 border border-[var(--color-bull)]/10">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-bull)]/20 flex items-center justify-center">
                    <CheckCircle2 size={20} className="text-[var(--color-bull)]" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--color-bull)] border-2 border-[var(--color-bg)] animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Connected to Delta</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Globe size={12} className="text-[var(--color-text-muted)]" />
                    <span className="text-[10px] sm:text-xs text-[var(--color-text-muted)] font-data truncate max-w-[150px] sm:max-w-none">
                      {environment === 'live' ? 'api.delta.exchange' : 'testnet.delta'}
                    </span>
                    <span className="text-[10px] sm:text-xs text-[var(--color-bull)] font-semibold uppercase tracking-wider">{environment}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleDisconnect}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-[var(--color-text-muted)] hover:text-[var(--color-bear)] hover:bg-[var(--color-bear)]/10 hover:border-[var(--color-bear)]/20 transition-all duration-200 cursor-pointer active:scale-95 text-center"
              >
                Disconnect
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Latency', value: '12ms', color: 'bull' },
                { label: 'Uptime', value: '99.9%', color: 'bull' },
                { label: 'Rate Limit', value: '847/1000', color: 'accent' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className={`font-data text-sm font-semibold text-[var(--color-${stat.color})]`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Connect form */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/10 flex items-start gap-3">
              <Key size={16} className="text-[var(--color-accent)] mt-0.5 shrink-0" />
              <p className="text-xs text-white/60 leading-relaxed">
                Enter your Delta Exchange API credentials. Generate a <strong className="text-white/80">read-only</strong> key from your Delta Exchange account settings. Keys are encrypted and never stored in the browser.
              </p>
            </div>

            <div>
              <label className="text-[11px] text-[var(--color-text-muted)] uppercase tracking-[0.15em] font-medium block mb-2">API Key</label>
              <input
                type="text"
                value={connectKey}
                onChange={e => setConnectKey(e.target.value)}
                placeholder="dx_live_..."
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--color-accent)]/50 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] transition-all duration-300 font-data text-sm"
              />
            </div>
            <div>
              <label className="text-[11px] text-[var(--color-text-muted)] uppercase tracking-[0.15em] font-medium block mb-2">API Secret</label>
              <input
                type="password"
                value={connectSecret}
                onChange={e => setConnectSecret(e.target.value)}
                placeholder="Your API secret"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--color-accent)]/50 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] transition-all duration-300 font-data text-sm"
              />
            </div>

            <button
              onClick={handleConnect}
              disabled={connectStatus === 'verifying' || !connectKey || !connectSecret}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-[var(--color-accent)] to-blue-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_var(--color-accent-glow)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <AnimatePresence mode="wait">
                  {connectStatus === 'idle' && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Wifi size={18} /> Connect Account
                    </motion.span>
                  )}
                  {connectStatus === 'verifying' && (
                    <motion.span key="verify" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Loader2 size={18} className="animate-spin" /> Verifying credentials...
                    </motion.span>
                  )}
                  {connectStatus === 'success' && (
                    <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-[var(--color-bull)]">
                      <CheckCircle2 size={18} /> Connected!
                    </motion.span>
                  )}
                  {connectStatus === 'error' && (
                    <motion.span key="error" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-[var(--color-bear)]">
                      <XCircle size={18} /> Connection failed — check credentials
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </button>
          </div>
        )}
      </motion.section>

      {/* ── Risk Limits ── */}
      <motion.section variants={item} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-bear)]/30 to-transparent" />
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[var(--color-bear)]/10 border border-[var(--color-bear)]/20 flex items-center justify-center">
            <Shield size={18} className="text-[var(--color-bear)]" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Risk Limits</h2>
            <p className="text-xs text-[var(--color-text-muted)]">Auto-stop bots when limits are hit</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Max Daily Loss', value: maxDailyLoss, setter: setMaxDailyLoss, prefix: '$', color: 'bear' },
            { label: 'Max Position Size', value: maxPositionSize, setter: setMaxPositionSize, prefix: '$', color: 'accent' },
            { label: 'Max Leverage', value: maxLeverage, setter: setMaxLeverage, suffix: 'x', color: 'accent' },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-[11px] text-[var(--color-text-muted)] uppercase tracking-[0.15em] font-medium block mb-2">{field.label}</label>
              <div className="relative">
                {field.prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-data text-sm">{field.prefix}</span>}
                <input
                  type="number"
                  value={field.value}
                  onChange={e => field.setter(e.target.value)}
                  className={`w-full bg-white/[0.04] border border-white/[0.08] rounded-xl py-3 font-data text-sm text-white focus:outline-none focus:border-[var(--color-${field.color})]/50 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] transition-all duration-300 ${field.prefix ? 'pl-8 pr-4' : 'pl-4 pr-8'}`}
                />
                {field.suffix && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-data text-sm">{field.suffix}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-xl bg-[var(--color-bear)]/5 border border-[var(--color-bear)]/10 flex items-start gap-3">
          <AlertTriangle size={16} className="text-[var(--color-bear)] mt-0.5 shrink-0" />
          <p className="text-xs text-[var(--color-bear)]/80 leading-relaxed">
            When daily loss exceeds <strong className="text-[var(--color-bear)]">${maxDailyLoss}</strong>, all running bots will be paused and open orders cancelled automatically.
          </p>
        </div>
      </motion.section>

      {/* ── Notifications ── */}
      <motion.section variants={item} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Bell size={18} className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Notifications</h2>
            <p className="text-xs text-[var(--color-text-muted)]">Choose what alerts you receive</p>
          </div>
        </div>

        <div className="space-y-1">
          {([
            { key: 'orderFilled' as const, label: 'Order Filled', desc: 'When a limit or market order is filled' },
            { key: 'positionLiquidation' as const, label: 'Liquidation Warning', desc: 'When a position nears liquidation price' },
            { key: 'botStartStop' as const, label: 'Bot Status Changes', desc: 'When a bot starts, pauses, or stops' },
            { key: 'riskLimitHit' as const, label: 'Risk Limit Triggered', desc: 'When a risk limit threshold is reached' },
            { key: 'priceAlerts' as const, label: 'Price Alerts', desc: 'Custom price level notifications' },
            { key: 'dailySummary' as const, label: 'Daily Summary', desc: 'End-of-day P&L and activity report' },
          ]).map((notif) => (
            <div
              key={notif.key}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-white/90">{notif.label}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{notif.desc}</p>
              </div>
              <button
                onClick={() => toggleNotification(notif.key)}
                className={`w-11 h-6 rounded-full transition-all duration-300 relative cursor-pointer ${
                  notifications[notif.key]
                    ? 'bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent-glow)]'
                    : 'bg-white/10'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-sm ${
                    notifications[notif.key] ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Save button */}
      <motion.div variants={item} className="flex justify-end pb-8">
        <button className="relative group overflow-hidden bg-gradient-to-r from-[var(--color-accent)] to-blue-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_var(--color-accent-glow)] cursor-pointer active:scale-[0.98]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          <span className="relative z-10">Save Changes</span>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
