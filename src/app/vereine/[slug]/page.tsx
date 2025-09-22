import Image from 'next/image';
import { clubs } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone, User, Calendar } from 'lucide-react';
import type { Event } from '@/lib/types';
import { format, isPast, isFuture } from 'date-fns';
import { de } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { createClient } from '@supabase/supabase-js';

// Use a server-only Supabase client for data fetching
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateStaticParams() {
  return clubs.map((club) => ({
    slug: club.slug,
  }));
}

function EventCard({ event }: { event: Event }) {
    const hasPassed = isPast(new Date(event.date));
    return (
        <Card className={cn(hasPassed ? 'bg-muted/50 text-muted-foreground' : '')}>
            <CardHeader>
                <CardTitle className={cn(hasPassed ? 'text-muted-foreground' : '')}>{event.title}</CardTitle>
                <CardDescription>
                    {format(new Date(event.date), "EEEE, dd. MMMM yyyy", { locale: de })} um {event.time} Uhr - {event.location}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{event.description}</p>
            </CardContent>
        </Card>
    )
}

export default async function ClubDetailPage({ params }: { params: { slug: string } }) {
  const club = clubs.find((c) => c.slug === params.slug);

  if (!club) {
    notFound();
  }
  
  const { data: clubEvents, error } = await supabase
    .from('events')
    .select('*')
    .eq('organizer_club_slug', club.slug)
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching club events:', error);
  }

  const upcomingEvents = (clubEvents || []).filter(e => isFuture(new Date(e.date)) || new Date(e.date).toDateString() === new Date().toDateString());
  const pastEvents = (clubEvents || []).filter(e => isPast(new Date(e.date)) && new Date(e.date).toDateString() !== new Date().toDateString()).reverse();


  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={club.imageUrl}
              alt={`Bild von ${club.name}`}
              fill
              className="object-cover"
              data-ai-hint={club.imageHint}
              priority
            />
          </div>
          <h1 className="text-4xl font-bold font-headline mb-4">{club.name}</h1>
          <div className="prose max-w-none text-foreground/80">
            <p>{club.description}</p>
          </div>
            {clubEvents && clubEvents.length > 0 && (
                 <section className="mt-12">
                    <h2 className="text-3xl font-bold font-headline mb-6 flex items-center">
                        <Calendar className="mr-3 h-6 w-6" /> Veranstaltungen
                    </h2>
                     {upcomingEvents.length > 0 && (
                        <>
                            <h3 className="text-xl font-semibold mb-4">Kommende Veranstaltungen</h3>
                            <div className="space-y-4">
                                {upcomingEvents.map(event => <EventCard key={event.id} event={event} />)}
                            </div>
                        </>
                    )}

                    {pastEvents.length > 0 && (
                        <div className="mt-8">
                            <Accordion type="single" collapsible>
                                <AccordionItem value="past-events">
                                    <AccordionTrigger className="text-xl font-semibold">
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
                 </section>
            )}

        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Kontakt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-3 text-muted-foreground" />
                <span>{club.contact.name}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                <a href={`mailto:${club.contact.email}`} className="hover:underline">
                  {club.contact.email}
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                <a href={`tel:${club.contact.phone.replace(/\s/g, '')}`} className="hover:underline">
                  {club.contact.phone}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
