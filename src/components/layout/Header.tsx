'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Mountain } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { NavLink } from '@/lib/types';
import { buttonVariants } from '@/components/ui/button';

const navLinks: NavLink[] = [
  { href: '/veranstaltungen', label: 'Veranstaltungen' },
  { href: '/anfahrt', label: 'Anfahrt' },
  { href: '/gastronomie', label: 'Gastronomie' },
  { href: '/unterkuenfte', label: 'Unterkünfte' },
  { href: '/vereine', label: 'Vereine' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-8 flex items-center space-x-2">
            <Mountain className="h-8 w-8" />
            <span className="text-xl font-bold">
              Petersthal
            </span>
          </Link>
          <nav className="flex items-center space-x-1 text-lg font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'lg' }),
                  'transition-colors relative text-base',
                  pathname === href
                    ? 'text-foreground font-semibold'
                    : 'text-foreground/60'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menü öffnen</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                    <Mountain className="h-8 w-8" />
                    <span className="text-xl font-bold">Petersthal</span>
                </Link>
                <nav className="grid gap-2">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                'flex items-center py-2 text-xl font-semibold',
                                pathname === href ? 'text-foreground' : 'text-muted-foreground'
                            )}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/" className="flex items-center space-x-2 md:hidden">
            <Mountain className="h-8 w-8" />
            <span className="text-xl font-bold">Petersthal</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
