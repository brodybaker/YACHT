
import type React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Megaphone, Info, Building, Newspaper } from 'lucide-react';

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
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} YachtMob. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/about">
                <Info className="mr-2 h-4 w-4" />
                About YachtMob
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/about-yachtrow">
                <Building className="mr-2 h-4 w-4" />
                About YachtRow
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/advertise">
                <Megaphone className="mr-2 h-4 w-4" />
                Advertise With Us
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/blog">
                <Newspaper className="mr-2 h-4 w-4" />
                Blog
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
