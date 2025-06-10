import type React from 'react';
import Header from '@/components/Header';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        {children}
      </main>
      <footer className="py-6 text-center text-muted-foreground text-sm border-t">
        <p>&copy; {new Date().getFullYear()} NauticalMatch. All rights reserved.</p>
      </footer>
    </div>
  );
}
