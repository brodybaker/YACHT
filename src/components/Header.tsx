
'use client';
import Link from 'next/link';
import { Anchor, Heart, MessageSquare, Menu, HomeIcon, PlusSquare, CircleUserRound, Info, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mainNavItems = [
  { href: '/', label: 'Discover', icon: HomeIcon },
  { href: '/add-listing', label: 'Add Listing', icon: PlusSquare },
];

const accountNavItems = [
  { href: '/liked', label: 'Liked', icon: Heart },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
];

export default function Header() {
  const allNavItemsForMobile = [
    ...mainNavItems,
    { type: 'separator', key: 'sep1' },
    ...accountNavItems,
     { type: 'separator', key: 'sep2' },
    { href: '/about', label: 'About NauticalMatch', icon: Info },
    { href: '/about-yachtrow', label: 'About YachtRow', icon: Building },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between relative">
        <Link href="/" className="flex items-center gap-2" aria-label="NauticalMatch Home">
          <Anchor className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">NauticalMatch</span>
        </Link>

        <nav className="hidden md:inline-flex items-center gap-1">
          {mainNavItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild>
              <Link href={item.href} className="flex items-center gap-2 text-foreground hover:text-primary px-3 py-2">
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          ))}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-foreground hover:text-primary px-3 py-2">
                <CircleUserRound className="h-5 w-5" />
                Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {accountNavItems.map((item) => (
                 <DropdownMenuItem key={item.label} asChild>
                    <Link href={item.href} className="flex items-center gap-2 w-full">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-6">
              <nav className="flex flex-col gap-2">
                <Link href="/" className="flex items-center gap-2 mb-4" aria-label="NauticalMatch Home">
                  <Anchor className="h-7 w-7 text-primary" />
                  <span className="font-headline text-xl font-bold text-primary">NauticalMatch</span>
                </Link>
                
                {allNavItemsForMobile.map((item) => {
                  if (item.type === 'separator') {
                    return <DropdownMenuSeparator key={item.key} className="my-2"/>;
                  }
                  // Quick fix for item.icon being undefined for separator, though it shouldn't reach here.
                  const IconComponent = item.icon || Info; 
                  return (
                    <Button key={item.label} variant="ghost" className="w-full justify-start" asChild>
                      <Link href={item.href} className="flex items-center gap-3 text-lg py-3">
                        <IconComponent className="h-5 w-5" />
                        {item.label}
                      </Link>
                    </Button>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
