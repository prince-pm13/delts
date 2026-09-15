import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const AppLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[var(--color-bg)] text-[var(--color-text-main)] overflow-hidden relative selection:bg-[var(--color-accent)]/30">
      
      {/* Hyper-modern animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] md:w-[50%] md:h-[50%] rounded-full bg-[var(--color-accent)]/10 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[60%] -right-[10%] w-[60%] h-[60%] md:w-[40%] md:h-[60%] rounded-full bg-[var(--color-bull)]/5 blur-[120px] mix-blend-screen" />
        <div className="absolute -bottom-[20%] left-[20%] w-[80%] h-[40%] md:w-[60%] md:h-[40%] rounded-full bg-[var(--color-bear)]/5 blur-[120px] mix-blend-screen" />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="flex w-full h-full relative z-10 p-0 md:p-4 gap-4">
        {/* Dock Sidebar */}
        <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        
        {/* Main Content Area */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden md:glass-panel md:rounded-2xl relative w-full">
          <TopBar setMobileMenuOpen={setMobileMenuOpen} />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth pb-24 md:pb-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
