import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Dock } from './Dock';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent/30 selection:text-primary">
      <main className="max-w-3xl mx-auto px-6 pb-40 pt-16 md:pt-32 flex flex-col gap-24">
        {children}
      </main>
      <Dock />
      <ThemeToggle />
    </div>
  );
};

export default Layout;