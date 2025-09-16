'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, CloudSun, Users } from 'lucide-react';
import { events, clubs } from '@/lib/data';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ClubCard } from '@/components/shared/ClubCard';

const upcomingEvents = events
  .filter(event => new Date(event.date) >= new Date())
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .slice(0, 3);

function WeatherWidget() {
  return (
    <Card className="bg-secondary/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Wetter in Petersthal</CardTitle>
        <CloudSun className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">18°C Sonnig</div>
        <p className="text-xs text-muted-foreground">Vorhersage für heute</p>
      </CardContent>
    </Card>
  );
}

const carouselImages = [
  { src: 'https://picsum.photos/seed/carousel1/600/400', alt: 'Alpenpanorama bei Petersthal', hint: 'mountain landscape' },
  { src: 'https://picsum.photos/seed/carousel2/600/400', alt: 'Traditioneller Trachtenumzug', hint: 'traditional festival' },
  { src: 'https://picsum.photos/seed/carousel3/600/400', alt: 'Segelboote auf dem See', hint: 'lake sailing' },
  { src: 'https://picsum.photos/seed/carousel4/600/400', alt: 'Wanderweg im Sommer', hint: 'hiking trail' },
  { src: 'https://picsum.photos/seed/carousel5/600/400', alt: 'Dorfansicht im Winter', hint: 'village winter' },
  { src: 'https://picsum.photos/seed/carousel6/600/400', alt: 'Musikkapelle beim Dorffest', hint: 'brass band' },
];

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full h-[50vh] min-h-[300px] max-h-[500px] text-center text-white">
        <Image
          src="https://picsum.photos/seed/petersthal-village/1600/600"
          alt="Panorama von Petersthal"
          fill
          priority
          className="object-cover"
          data-ai-hint="village landscape"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
            Willkommen in Petersthal
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow-md">
            Das Herz des Allgäus entdecken.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <section className="text-center">
          <h2 className="text-3xl font-bold">Ein Dorf voller Leben</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            Eingebettet in die malerische Landschaft des Allgäus, bietet Petersthal eine einzigartige Mischung aus Tradition und modernem Dorfleben. Entdecken Sie unsere aktiven Vereine, genießen Sie die lokale Gastronomie und erleben Sie unvergessliche Veranstaltungen.
          </p>
        </section>
        
        <section className="w-full max-w-6xl mx-auto mt-16">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden">
                      <CardContent className="p-0 flex aspect-video items-center justify-center">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={600}
                          height={400}
                          className="object-cover w-full h-full"
                          data-ai-hint={image.hint}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        <section className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold flex items-center mb-4">
                <Calendar className="mr-2" /> Nächste Termine
              </h3>
              <div className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map(event => (
                    <Card key={event.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(event.date), "EEEE, dd. MMMM yyyy", { locale: de })} - {event.time} Uhr
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/veranstaltungen">Details</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p>Derzeit sind keine bevorstehenden Veranstaltungen geplant.</p>
                )}
              </div>
              <Button className="mt-6" asChild>
                <Link href="/veranstaltungen">
                  Alle Veranstaltungen <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Aktuelles</h3>
              <WeatherWidget />
              <Card>
                <CardHeader>
                  <CardTitle>Entdecken Sie unsere Vereine</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Vom Sportverein bis zur Musikkapelle – lernen Sie das vielfältige Vereinsleben in Petersthal kennen.
                  </p>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href="/vereine">
                      Zu den Vereinen
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="mt-24 text-center">
            <h2 className="text-3xl font-bold flex items-center justify-center mb-8">
                <Users className="mr-3" /> Unser Vereinsleben
            </h2>
            <Carousel
              className="w-full max-w-4xl mx-auto"
              opts={{
                align: 'start',
                loop: true,
              }}
            >
              <CarouselContent>
                {clubs.map((club) => (
                  <CarouselItem key={club.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2 h-full">
                      <ClubCard club={club} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <Button className="mt-12" asChild size="lg">
                <Link href="/vereine">
                    Alle Vereine entdecken <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </section>

      </div>
    </div>
  );
}
