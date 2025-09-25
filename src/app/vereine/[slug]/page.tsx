import Image from 'next/image';
import { clubs } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, User, Calendar as CalendarIcon, Clock, MapPin, Globe, Building } from 'lucide-react';
import type { Event } from '@/lib/types';
import { format, isPast, isFuture } from 'date-fns';
import { de } from 'date-fns/locale';
import { Metadata } from 'next';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { createClient } from '@supabase/supabase-js';
import { Badge } from '@/components/ui/badge';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const club = clubs.find((c) => c.slug === params.slug);

  if (!club) {
    return {
      title: 'Verein nicht gefunden',
    };
  }

  return {
    title: club.name,
    description: `Informationen über den Verein ${club.name} in Petersthal. ${club.description.substring(0, 150)}...`,
    openGraph: {
      title: club.name,
      description: `Informationen über den Verein ${club.name} in Petersthal.`,
      images: [
        {
          url: `https://www.petersthal.info${club.imageUrl}`,
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

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
    const formattedTime = event.time ? event.time.substring(0, 5) : 'N/A';
    return (
        <Card className={cn(hasPassed ? 'bg-muted/50' : '')}>
            <CardHeader>
                <CardTitle className={cn(hasPassed ? 'text-muted-foreground' : '')}>{event.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm">
                    <Badge variant="outline" className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        {format(new Date(event.date), "dd. MMMM yyyy", { locale: de })}
                    </Badge>
                        <Badge variant="outline" className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {formattedTime} Uhr
                    </Badge>
                        <Badge variant="outline" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                    </Badge>
                </div>
            </CardHeader>
            {event.description && (
                <CardContent>
                    <p className={cn('text-sm', hasPassed ? 'text-muted-foreground' : 'text-foreground')}>{event.description}</p>
                </CardContent>
            )}
        </Card>
    )
}

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );

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
                        <CalendarIcon className="mr-3 h-6 w-6" /> Veranstaltungen
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
              {club.contact.name && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span>{club.contact.name}</span>
                </div>
              )}
               {club.contact.address && (
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-3 text-muted-foreground" />
                  <span>{club.contact.address}</span>
                </div>
              )}
              {club.contact.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                  <a href={`mailto:${club.contact.email}`} className="hover:underline break-all">
                    {club.contact.email}
                  </a>
                </div>
              )}
              {club.contact.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                  <a href={`tel:${club.contact.phone.replace(/\s/g, '')}`} className="hover:underline">
                    {club.contact.phone}
                  </a>
                </div>
              )}
               {club.contact.website && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-3 text-muted-foreground" />
                  <a href={club.contact.website} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">
                    Webseite besuchen
                  </a>
                </div>
              )}
              {club.contact.instagram && (
                 <div className="flex items-center">
                    <InstagramIcon className="h-4 w-4 mr-3 text-muted-foreground" />
                    <a href={`https://instagram.com/${club.contact.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">
                        @{club.contact.instagram}
                    </a>
                 </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
