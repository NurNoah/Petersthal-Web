'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar as CalendarIcon, CloudSun, Users, Clock, MapPin } from 'lucide-react';
import { clubs } from '@/lib/data';
import { format, isFuture } from 'date-fns';
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
import type { Event } from '@/lib/types';
import { supabase } from '@/lib/supabaseClient';
import { Badge } from '@/components/ui/badge';

function getWeatherDescription(weathercode: number): string {
    if (weathercode === 0) return "Klarer Himmel";
    if ([1, 2, 3].includes(weathercode)) return "Teilweise bewölkt";
    if ([45, 48].includes(weathercode)) return "Nebel";
    if ([51, 53, 55].includes(weathercode)) return "Nieselregen";
    if ([56, 57].includes(weathercode)) return "Gefrierender Nieselregen";
    if ([61, 63, 65].includes(weathercode)) return "Regen";
    if ([66, 67].includes(weathercode)) return "Gefrierender Regen";
    if ([71, 73, 75].includes(weathercode)) return "Schnee";
    if (weathercode === 77) return "Schneekörner";
    if ([80, 81, 82].includes(weathercode)) return "Regenschauer";
    if ([85, 86].includes(weathercode)) return "Schneeregen";
    if ([95, 96, 99].includes(weathercode)) return "Gewitter";
    return "Unbekannt";
}

function WeatherWidget() {
  const [weather, setWeather] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchWeather() {
      try {
        // Open-Meteo API (no key required)
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=47.45&longitude=10.1167&current_weather=true&timezone=Europe/Berlin`
        );
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        setWeather(data.current_weather);
      } catch (err) {
        setError("Konnte Wetterdaten nicht laden");
      }
    }
    fetchWeather();
  }, []);

  return (
    <Card className="bg-secondary/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Wetter in Petersthal</CardTitle>
        <CloudSun className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-xs text-muted-foreground">{error}</p>
        ) : weather ? (
          <>
            <div className="text-2xl font-bold">
              {Math.round(weather.temperature)}°C
            </div>
            <p className="text-xs text-muted-foreground">
              {getWeatherDescription(weather.weathercode)}
            </p>
          </>
        ) : (
          <p className="text-xs text-muted-foreground">Lade Wetterdaten...</p>
        )}
      </CardContent>
    </Card>
  );
}

function UpcomingEventsWidget() {
  const [upcomingEvents, setUpcomingEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    const fetchUpcomingEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        const futureEvents = data
          .filter(event => isFuture(new Date(event.date)) || new Date(event.date).toDateString() === new Date().toDateString())
          .slice(0, 3);
        setUpcomingEvents(futureEvents);
      }
    };
    fetchUpcomingEvents();
  }, []);

  return (
    <div>
      <h3 className="text-2xl font-bold flex items-center mb-4">
        <CalendarIcon className="mr-2" /> Nächste Termine
      </h3>
      <div className="space-y-4">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map(event => {
            const formattedTime = event.time ? event.time.substring(0, 5) : 'N/A';
            return (
              <Card key={event.id}>
                <CardHeader>
                   <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
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
                </CardContent>
              </Card>
            )
          })
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
  );
}

const carouselImages = [
  { src: '/images/Pthal4.jpg', alt: 'Petersthal', hint: 'traditional festival' },
  { src: '/images/Pthal3.png', alt: 'Petersthal', hint: 'hiking trail' },
  { src: '/images/Pthal10.jpg', alt: 'Petersthal', hint: 'brass band' },
  { src: '/images/Pthal5.png', alt: 'Petersthal', hint: 'brass band' },
  { src: '/images/Pthal7.jpg', alt: 'Petersthal', hint: 'lake sailing' },
  { src: '/images/Pthal6.png', alt: 'Petersthal', hint: 'mountain landscape' },
  { src: '/images/Pthal8.jpg', alt: 'Petersthal', hint: 'village winter' },
];

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  // Neues State für Modal
  const [modalImage, setModalImage] = React.useState<{ src: string; alt: string } | null>(null);

  const openModal = (image: { src: string; alt: string }) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full h-[50vh] min-h-[300px] max-h-[500px] text-center text-white">
        <Image
          src="/images/Pthal15.png"
          alt="Panorama von Petersthal"
          fill
          priority
          className="object-cover"
          data-ai-hint="village landscape"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
            Willkommen in Petersthal
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow-md">
            Petersthal ist ein Pfarrdorf im Landkreis Oberallgäu, idyllisch gelegen im Tal der Rottach auf etwa 870 Metern Höhe.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <section className="text-center">
          <h2 className="text-3xl font-bold">⛰️⛪🏞️</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            Das Pfarrdorf Petersthal liegt auf einer Höhe von 872 m ü. NHN im Tal der Rottach, zwischen dem Rottachsee auf nördlicher Seite und dem Petersthaler Hörnle – geprägt vom markanten Zwiebelturm der Pfarrkirche St. Peter und Paul.
          </p>
        </section>
        
        <section className="w-full max-w-screen-xl mx-auto mt-16">
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
                  <div className="p-1 cursor-pointer" onClick={() => openModal({ src: image.src, alt: image.alt })}>
                    <Card className="overflow-hidden">
                      <CardContent className="p-0 flex aspect-[4/3] items-center justify-center">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={600}
                          height={450}
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
              <UpcomingEventsWidget />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Aktuelles</h3>
              <WeatherWidget />
              <Card>
                <CardHeader>
                  <CardTitle>Entdecken Sie unsere Gastro</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Entdecken Sie die kulinarische Vielfalt unseres Dorfes. Von traditionell bayerischer Küche bis hin zu internationalen Spezialitäten.
                  </p>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href="/gastronomie">
                      Zur Gastro
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
            plugins={[plugin.current]}
            className="w-full max-w-screen-xl mx-auto"
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent>
              {clubs.map((club) => (
                <CarouselItem key={club.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="p-1 h-full">
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

      {/* Modal zur Großansicht */}
      {modalImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <Image
              src={modalImage.src}
              alt={modalImage.alt}
              width={1000}
              height={750}
              className="object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
