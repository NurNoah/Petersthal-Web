'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Image as ImageIcon, ZoomIn } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { clubs } from '@/lib/data';
import type { Event } from '@/lib/types';
import { format, isPast, isFuture, isToday } from 'date-fns';
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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';


function EventCard({ event }: { event: Event }) {
  const eventDate = new Date(event.date);
  const isTodayEvent = isToday(eventDate);
  const hasPassed = isPast(eventDate) && !isTodayEvent;
  const club = clubs.find(c => c.slug === event.organizer_club_slug);

  // Format time to HH:mm
  const formattedTime = event.time ? event.time.substring(0, 5) : 'N/A';

  return (
    <Dialog>
      <Card className={cn(
        hasPassed ? 'bg-muted/50' : '',
        isTodayEvent ? 'border-green-500 border-2 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : '',
        "overflow-hidden transition-all hover:shadow-md"
      )}>
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1">
            <CardHeader>
              <div className="flex flex-col gap-2">
                <CardTitle className={cn(hasPassed ? 'text-muted-foreground' : '')}>
                  {event.title}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <Badge variant={isTodayEvent ? "default" : "outline"} className={cn("flex items-center gap-2", isTodayEvent ? "bg-green-600 hover:bg-green-700" : "")}>
                    <CalendarIcon className="h-4 w-4" />
                    {format(eventDate, "dd. MMMM yyyy", { locale: de })}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {formattedTime} Uhr
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </Badge>
                  {club && (
                    <Badge variant={hasPassed ? "outline" : "secondary"} asChild>
                      <Link href={`/vereine/${club.slug}`}>{club.name}</Link>
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            {event.description && (
              <CardContent>
                <p className={cn('text-sm', hasPassed ? 'text-muted-foreground' : 'text-foreground')}>{event.description}</p>
              </CardContent>
            )}
          </div>

          {event.flyerUrl && (
            <div className="sm:w-48 bg-muted/5 flex flex-col items-center justify-center p-4 gap-3">
              <DialogTrigger asChild>
                <div className="relative group cursor-pointer overflow-hidden rounded-md shadow-sm border hover:shadow-lg transition-all hover:scale-105 bg-white">
                  <div className="w-24 h-32 relative overflow-hidden">
                    <img
                      src={event.flyerUrl}
                      alt="Flyer Preview"
                      className="w-full h-full object-cover blur-[0.5px] group-hover:blur-0 transition-all duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-transparent transition-colors">
                      <ZoomIn className="text-white drop-shadow-md w-8 h-8 opacity-70 group-hover:opacity-0 transition-opacity transform group-hover:scale-150" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-primary-foreground text-[10px] font-bold text-center py-1 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    VERGRÖSSERN
                  </div>
                </div>
              </DialogTrigger>
            </div>
          )}
        </div>
      </Card>

      {event.flyerUrl && (
        <DialogContent className="max-w-5xl max-h-[95vh] w-auto h-auto p-0 overflow-hidden bg-transparent border-none shadow-none flex items-center justify-center">
          <div className="relative">
            <img
              src={event.flyerUrl}
              alt={`Flyer für ${event.title}`}
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl object-contain bg-black/50 backdrop-blur-sm"
            />
          </div>
        </DialogContent>
      )}
    </Dialog>
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
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (error) {
        console.error('Error fetching events:', error);
      } else {
        // DEMO: Inject example flyer into the next 3 upcoming events
        let allEvents = data as Event[];

        // Sort to find upcoming
        const sorted = [...allEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        // Find next 3 upcoming events (today or future)
        const upcomingIds = sorted
          .filter(e => isFuture(new Date(e.date)) || isToday(new Date(e.date)))
          .slice(0, 3)
          .map(e => e.id);

        const eventsWithFlyer = allEvents.map((event) => {
          if (upcomingIds.includes(event.id)) {
            return { ...event, flyerUrl: '/images/pthal4.jpg' };
          }
          return event;
        });
        setEvents(eventsWithFlyer);
      }
    };
    fetchEvents();
  }, []);

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
                modifiersClassNames={{
                  hasEvent: 'has-event',
                }}
              />
              <style>{`
                .has-event:not([aria-selected="true"]) {
                  font-weight: bold;
                }
                .has-event {
                  position: relative;
                }
                .has-event::after {
                  content: '';
                  position: absolute;
                  bottom: 4px;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 4px;
                  height: 4px;
                  border-radius: 50%;
                  background-color: hsl(var(--primary));
                }
                .rdp-day_selected.has-event::after {
                  background-color: hsl(var(--primary-foreground));
                }
              `}</style>
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
