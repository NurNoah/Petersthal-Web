'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { events } from '@/lib/data';
import type { Event } from '@/lib/types';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

function EventList({ eventsToShow }: { eventsToShow: Event[] }) {
  if (eventsToShow.length === 0) {
    return <p className="text-muted-foreground mt-4">Keine Veranstaltungen an diesem Tag.</p>;
  }

  return (
    <div className="space-y-4 mt-4">
      {eventsToShow.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>
              {format(new Date(event.date), "EEEE, dd. MMMM yyyy", { locale: de })} um {event.time} Uhr - {event.location}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{event.description}</p>
          </CardContent>
        </Card>
      ))}
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

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-headline mb-8 text-center">Veranstaltungen in Petersthal</h1>
      
      <Tabs defaultValue="month" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="month">Monatsansicht</TabsTrigger>
          <TabsTrigger value="list">Listenansicht</TabsTrigger>
        </TabsList>
        <TabsContent value="month">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div className="md:col-span-1 flex justify-center">
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
            </div>
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold font-headline">
                Veranstaltungen am {date ? format(date, "d. MMMM yyyy", { locale: de }) : 'ausgewählten Tag'}
              </h2>
              <EventList eventsToShow={eventsForSelectedDay} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="list">
            <div className="mt-6 space-y-4">
               {sortedEvents.map((event) => (
                    <Card key={event.id}>
                    <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>
                        {format(new Date(event.date), "EEEE, dd. MMMM yyyy", { locale: de })} um {event.time} Uhr - {event.location}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{event.description}</p>
                    </CardContent>
                    </Card>
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
