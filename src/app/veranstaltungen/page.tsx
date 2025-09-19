'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { events, clubs } from '@/lib/data';
import type { Event } from '@/lib/types';
import { format, isPast, isFuture, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button';


function EventCard({ event }: { event: Event }) {
    const hasPassed = isPast(new Date(event.date));
    const club = clubs.find(c => c.slug === event.organizerClubSlug);
    return (
        <Card className={cn(hasPassed ? 'bg-muted/50 text-muted-foreground' : '')}>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className={cn(hasPassed ? 'text-muted-foreground' : '')}>{event.title}</CardTitle>
                        <CardDescription>
                            {format(new Date(event.date), "EEEE, dd. MMMM yyyy", { locale: de })} um {event.time} Uhr - {event.location}
                        </CardDescription>
                    </div>
                    {club && (
                        <Badge variant={hasPassed ? "outline" : "secondary"} asChild>
                            <Link href={`/vereine/${club.slug}`}>{club.name}</Link>
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <p>{event.description}</p>
            </CardContent>
        </Card>
    )
}

function EventList({ eventsToShow }: { eventsToShow: Event[] }) {
  if (eventsToShow.length === 0) {
    return <p className="text-muted-foreground mt-4">Keine Veranstaltungen an diesem Tag.</p>;
  }

  return (
    <div className="space-y-4 mt-4">
      {eventsToShow.map((event) => <EventCard key={event.id} event={event} />)}
    </div>
  );
}

export default function VeranstaltungenPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const eventDates = events.map(event => new Date(event.date).toDateString());
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = new Date(event.date).toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  const selectedDateString = date?.toDateString();
  const eventsForSelectedDay = selectedDateString ? eventsByDate[selectedDateString] || [] : [];
  
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const upcomingEvents = sortedEvents.filter(e => isFuture(new Date(e.date)) || new Date(e.date).toDateString() === new Date().toDateString());
  const pastEvents = sortedEvents.filter(e => isPast(new Date(e.date)) && new Date(e.date).toDateString() !== new Date().toDateString()).reverse();


  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-headline mb-8 text-center">Veranstaltungen in Petersthal</h1>
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Listenansicht</TabsTrigger>
          <TabsTrigger value="month">Monatsansicht</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
            <div className="mt-6 space-y-4">
                <h2 className="text-2xl font-bold font-headline">Kommende Veranstaltungen</h2>
                {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)
                ) : (
                    <p className="text-muted-foreground">Derzeit sind keine bevorstehenden Veranstaltungen geplant.</p>
                )}
            </div>
            
            {pastEvents.length > 0 && (
                <div className="mt-12">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="past-events">
                            <AccordionTrigger className="text-2xl font-bold font-headline">
                                Vergangene Veranstaltungen
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4 mt-4">
                                    {pastEvents.map(event => <EventCard key={event.id} event={event} />)}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            )}
        </TabsContent>
        <TabsContent value="month">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div className="md:col-span-1 flex flex-col items-center gap-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                locale={de}
                modifiers={{
                  hasEvent: (day) => eventDates.includes(day.toDateString()),
                }}
                modifiersStyles={{
                  hasEvent: {
                    fontWeight: 'bold',
                    color: 'hsl(var(--primary))',
                  },
                }}
              />
              <Button variant="outline" onClick={() => setDate(new Date())}>Heute</Button>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold font-headline">
                Veranstaltungen am {date ? format(date, "d. MMMM yyyy", { locale: de }) : 'ausgewählten Tag'}
              </h2>
              <EventList eventsToShow={eventsForSelectedDay} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
