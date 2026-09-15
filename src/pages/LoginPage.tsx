import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, ArrowRight, Shield, Lock, TrendingUp, Zap, BarChart3, Activity } from 'lucide-react';

// Animated particle dots for background
const FloatingDots = () => {
  const dots = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map(dot => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-white/[0.04]"
          style={{ left: `${dot.x}%`, top: `${dot.y}%`, width: dot.size, height: dot.size }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: dot.duration, repeat: Infinity, delay: dot.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

// Animated counter for stats
const AnimCounter = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = end / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [end]);
  return <span>{count.toLocaleString()}{suffix}</span>;
};

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const success = login(userId, password);
    if (!success) {
      setError('Invalid credentials');
      setShakeKey(prev => prev + 1);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex relative overflow-hidden selection:bg-[var(--color-accent)]/30">
      
      {/* ─── LEFT: Branding Panel ─── */}
      <div className="hidden lg:flex lg:w-[55%] relative items-center justify-center p-16">
        {/* Deep animated gradients */}
        <div className="absolute inset-0">
          <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-[var(--color-accent)]/15 blur-[120px]" />
          <motion.div animate={{ scale: [1, 1.3, 1], x: [0, -20, 0], y: [0, 30, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[120px]" />
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[var(--color-bull)]/5 blur-[100px]" />
        </div>
        <FloatingDots />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Content */}
        <div className="relative z-10 max-w-lg">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 12, stiffness: 150, delay: 0.3 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] via-blue-500 to-purple-600 shadow-[0_0_50px_var(--color-accent-glow)] flex items-center justify-center"
              >
                <Activity size={28} className="text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Delta Pro</h1>
                <p className="text-xs text-white/30 tracking-widest uppercase mt-0.5">Trading Terminal</p>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-5xl font-bold leading-[1.1] tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40">Trade smarter.</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent)] to-purple-400">Execute faster.</span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-12 max-w-md">
              Professional-grade derivatives dashboard with real-time data, automated strategies, and institutional-level risk management.
            </p>

            {/* Live Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Avg Latency', value: 12, suffix: 'ms', icon: Zap },
                { label: 'Markets', value: 150, suffix: '+', icon: BarChart3 },
                { label: 'Uptime', value: 99.9, suffix: '%', icon: TrendingUp },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon size={14} className="text-white/20 group-hover:text-[var(--color-accent)] transition-colors duration-500" />
                    <span className="text-[10px] text-white/20 uppercase tracking-widest font-medium">{stat.label}</span>
                  </div>
                  <p className="text-2xl font-data font-bold text-white/80">
                    {mounted && <AnimCounter end={stat.value} suffix={stat.suffix} />}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Right edge gradient fade into login panel */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[var(--color-bg)] to-transparent z-20" />
      </div>

      {/* ─── RIGHT: Login Form ─── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        {/* Mobile background (shows only on small screens) */}
        <div className="absolute inset-0 lg:hidden">
          <div className="absolute top-[20%] left-[30%] w-[300px] h-[300px] rounded-full bg-[var(--color-accent)]/10 blur-[100px]" />
          <div className="absolute bottom-[20%] right-[20%] w-[250px] h-[250px] rounded-full bg-purple-600/8 blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 100, delay: 0.1 }}
          className="relative z-10 w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-purple-600 shadow-[0_0_30px_var(--color-accent-glow)] flex items-center justify-center">
                <Activity size={22} className="text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Delta Pro</h1>
          </div>

          {/* Form header */}
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-white tracking-tight">Welcome back</h2>
            <p className="text-sm text-white/30 mt-1">Sign in to your trading account</p>
          </div>

          {/* Login Card */}
          <motion.div
            key={shakeKey}
            animate={shakeKey > 0 ? { x: [0, -14, 14, -10, 10, -4, 4, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* User ID */}
              <div>
                <label className="text-[11px] text-white/40 uppercase tracking-[0.15em] font-medium block mb-2">User ID</label>
                <div className="relative group">
                  <input
                    type="text"
                    value={userId}
                    onChange={e => { setUserId(e.target.value); setError(''); }}
                    placeholder="Enter your user ID"
                    className="w-full bg-blue-500/10 border border-white/[0.1] rounded-xl px-4 py-3.5 text-white placeholder:text-white/25 focus:outline-none focus:border-[var(--color-accent)]/50 focus:bg-blue-500/20 transition-all duration-300 text-sm focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                    autoComplete="username"
                    autoFocus
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-[11px] text-white/40 uppercase tracking-[0.15em] font-medium block mb-2">Password</label>
                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(''); }}
                    placeholder="Enter your password"
                    className="w-full bg-blue-500/10 border border-white/[0.1] rounded-xl px-4 py-3.5 pr-12 text-white placeholder:text-white/25 focus:outline-none focus:border-[var(--color-accent)]/50 focus:bg-blue-500/20 transition-all duration-300 text-sm focus:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-2 text-[var(--color-bear)] text-sm bg-[var(--color-bear)]/8 border border-[var(--color-bear)]/15 rounded-xl px-4 py-3">
                      <Shield size={15} />
                      <span className="font-medium">{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !userId || !password}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-[var(--color-accent)] via-blue-500 to-purple-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_4px_30px_var(--color-accent-glow)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98] mt-2"
              >
                {/* Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>
            </form>
          </motion.div>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-white/15">
            <Lock size={11} />
            <span>256-bit encrypted · Server-side key storage</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
