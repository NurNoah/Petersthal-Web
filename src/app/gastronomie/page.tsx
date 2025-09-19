"use client";
import { useRef } from 'react';
import { restaurants } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function GastronomiePage() {
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Gastro in Petersthal</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          🍕🥨🍖
        </p>
      </div>

      <section className="mt-12">
        <div className="space-y-8">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} ref={el => { cardRefs.current[restaurant.id] = el; }}>
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={restaurant.imageUrl}
                      alt={`Bild von ${restaurant.name}`}
                      fill
                      className="object-cover"
                      data-ai-hint={restaurant.imageHint}
                    />
                  </div>
                  <div>
                    <CardHeader>
                      <CardTitle>{restaurant.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{restaurant.description}</CardDescription>
                      <p className="text-sm text-muted-foreground mt-4">{restaurant.address}</p>
                      {restaurant.website && (
                        <Button asChild variant="link" className="px-0">
                          <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
                            Zur Webseite <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      <Accordion type="single" collapsible className="w-full mt-4">
                        <AccordionItem value="item-1">
                          <AccordionTrigger
                            onClick={() =>
                              setTimeout(() => {
                                cardRefs.current[restaurant.id]?.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'start',
                                });
                              }, 200)
                            }
                          >
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4" /> Karte anzeigen
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            {restaurant.mapEmbed ? (
                              <div className="aspect-video overflow-hidden rounded-md border mt-2">
                                <iframe
                                  src={restaurant.mapEmbed}
                                  width="100%"
                                  height="100%"
                                  style={{ border: 0 }}
                                  allowFullScreen
                                  loading="lazy"
                                  referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                              </div>
                            ) : (
                              <p className="text-muted-foreground">Keine Karte verfügbar.</p>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
