'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Mountain } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { NavLink } from '@/lib/types';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { clubs } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const navLinks: NavLink[] = [
  { href: '/veranstaltungen', label: 'Veranstaltungen' },
  { href: '/anfahrt', label: 'Anfahrt' },
  { href: '/gastronomie', label: 'Gastronomie' },
  { href: '/unterkuenfte', label: 'Unterkünfte' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

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
                  buttonVariants({ variant: 'ghost' }),
                  'transition-colors relative text-base py-2 px-3',
                  pathname === href
                    ? 'text-foreground font-semibold'
                    : 'text-foreground'
                )}
              >
                <span className={cn(pathname === href ? 'underline decoration-primary decoration-2 underline-offset-4' : '')}>
                    {label}
                </span>
              </Link>
            ))}
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <div
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <DropdownMenuTrigger asChild>
                  <Link
                    href="/vereine"
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'transition-colors relative text-base py-2 px-3 flex items-center gap-1',
                      pathname?.startsWith('/vereine')
                        ? 'text-foreground font-semibold'
                        : 'text-foreground'
                    )}
                  >
                    <span
                      className={cn(
                        pathname?.startsWith('/vereine')
                          ? 'underline decoration-primary decoration-2 underline-offset-4'
                          : ''
                      )}
                    >
                      Vereine
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {clubs.map((club) => (
                    <DropdownMenuItem key={club.id} asChild>
                      <Link href={`/vereine/${club.slug}`}>{club.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </div>
            </DropdownMenu>
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
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="vereine" className="border-b-0">
                        <AccordionTrigger className={cn(
                          'flex items-center py-2 text-xl font-semibold hover:no-underline',
                          pathname?.startsWith('/vereine') ? 'text-foreground' : 'text-muted-foreground'
                        )}>
                          Vereine
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col space-y-2 pl-4">
                            <Link href="/vereine" className={cn(
                                'py-2 text-lg',
                                pathname === '/vereine' ? 'text-foreground font-semibold' : 'text-muted-foreground'
                            )}>
                                Alle Vereine
                            </Link>
                            {clubs.map((club) => (
                              <Link
                                key={club.id}
                                href={`/vereine/${club.slug}`}
                                className={cn(
                                  'py-2 text-lg',
                                  pathname === `/vereine/${club.slug}` ? 'text-foreground font-semibold' : 'text-muted-foreground'
                                )}
                              >
                                {club.name}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
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
