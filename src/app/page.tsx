'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar as CalendarIcon, CloudSun, Users, Clock, MapPin, Waves, Thermometer, Wind, ExternalLink, ChevronDown } from 'lucide-react';
import { clubs } from '@/lib/data';
import { format, isFuture, isToday } from 'date-fns';
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, YAxis } from 'recharts';

type RottachseeData = {
  measuredAt: string | null;
  waterTemperature: number;
  lakeLevel: number;
  lakeLevelElevation: number;
  fullLevel: number;
  airTemperature: number | null;
  windSpeed: number | null;
  waterQuality: string | null;
  levelHistory: Array<{
    date: string;
    label: string;
    level: number;
  }>;
  temperatureHistory: Array<{
    date: string;
    label: string;
    temperature: number;
  }>;
  source: {
    name: string;
    url: string;
    historyName: string;
    historyUrl: string;
  };
};

type LakeMetric = 'level' | 'temperature';
type HistoryPeriod = 7 | 30 | 90 | 365;

const historyPeriods: Array<{ days: HistoryPeriod; label: string }> = [
  { days: 7, label: '7 Tage' },
  { days: 30, label: '30 Tage' },
  { days: 90, label: '90 Tage' },
  { days: 365, label: '1 Jahr' },
];

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

function RottachseeWidget() {
  const [lakeData, setLakeData] = React.useState<RottachseeData | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [expandedMetric, setExpandedMetric] = React.useState<LakeMetric | null>(null);
  const [historyPeriod, setHistoryPeriod] = React.useState<HistoryPeriod>(7);

  React.useEffect(() => {
    const controller = new AbortController();

    async function fetchLakeData() {
      try {
        const response = await fetch('/api/rottachsee?v=2', {
          signal: controller.signal,
          cache: 'no-store',
        });
        if (!response.ok) throw new Error('API error');
        const data = await response.json();
        if (
          typeof data.fullLevel !== 'number' ||
          !Array.isArray(data.levelHistory) ||
          !Array.isArray(data.temperatureHistory)
        ) {
          throw new Error('Incomplete API data');
        }
        setLakeData(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError('Messdaten sind gerade nicht erreichbar.');
      }
    }

    fetchLakeData();
    return () => controller.abort();
  }, []);

  const selectedPeriodLabel =
    historyPeriods.find((period) => period.days === historyPeriod)?.label ?? '7 Tage';
  const chartData = lakeData && expandedMetric
    ? (expandedMetric === 'level'
        ? lakeData.levelHistory.slice(-historyPeriod).map((point) => ({
            date: point.date,
            label: point.label,
            value: point.level,
          }))
        : lakeData.temperatureHistory.slice(-historyPeriod).map((point) => ({
            date: point.date,
            label: point.label,
            value: point.temperature,
          })))
    : [];
  const chartChange = chartData.length > 1
    ? chartData.at(-1)!.value - chartData[0].value
    : null;
  const chartUnit = expandedMetric === 'temperature' ? '°C' : 'm';
  const chartLabel = expandedMetric === 'temperature' ? 'Wassertemperatur' : 'Füllhöhe';
  const chartColor = expandedMetric === 'temperature'
    ? 'hsl(24 94% 50%)'
    : 'hsl(199 89% 48%)';
  const fillPercent = lakeData
    ? Math.min(100, Math.max(0, (lakeData.lakeLevel / lakeData.fullLevel) * 100))
    : 0;

  function toggleMetric(metric: LakeMetric) {
    setExpandedMetric((current) => current === metric ? null : metric);
  }

  return (
    <Card className="overflow-hidden border-sky-200/80 bg-gradient-to-br from-white via-sky-50/60 to-emerald-50/70">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Waves className="h-5 w-5 text-sky-600" />
              Rottachsee live
            </CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              {lakeData?.measuredAt ? 'Stand ' + lakeData.measuredAt : 'Aktuelle Messwerte'}
            </p>
          </div>
          <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-sm text-muted-foreground">{error}</p>
        ) : lakeData ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => toggleMetric('temperature')}
                aria-expanded={expandedMetric === 'temperature'}
                aria-controls="rottachsee-history"
                className={
                  'rounded-xl border bg-white/80 p-3 text-left transition hover:border-orange-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ' +
                  (expandedMetric === 'temperature' ? 'border-orange-300 ring-2 ring-orange-100' : 'border-sky-100')
                }
              >
                <div className="flex items-center justify-between gap-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Thermometer className="h-3.5 w-3.5 text-orange-500" />
                    Wassertemperatur
                  </span>
                  <ChevronDown
                    className={
                      'h-3.5 w-3.5 shrink-0 transition-transform ' +
                      (expandedMetric === 'temperature' ? 'rotate-180' : '')
                    }
                  />
                </div>
                <div className="mt-1 text-2xl font-bold tabular-nums">
                  {lakeData.waterTemperature.toLocaleString('de-DE', { maximumFractionDigits: 1 })} °C
                </div>
                <p className="mt-2 text-[11px] font-medium text-orange-700">
                  Verlauf anzeigen
                </p>
              </button>

              <button
                type="button"
                onClick={() => toggleMetric('level')}
                aria-expanded={expandedMetric === 'level'}
                aria-controls="rottachsee-history"
                className={
                  'rounded-xl border bg-white/80 p-3 text-left transition hover:border-sky-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ' +
                  (expandedMetric === 'level' ? 'border-sky-300 ring-2 ring-sky-100' : 'border-sky-100')
                }
              >
                <div className="flex items-center justify-between gap-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Waves className="h-3.5 w-3.5 text-sky-600" />
                    Seestand
                  </span>
                  <ChevronDown
                    className={
                      'h-3.5 w-3.5 shrink-0 transition-transform ' +
                      (expandedMetric === 'level' ? 'rotate-180' : '')
                    }
                  />
                </div>
                <div className="mt-1 text-2xl font-bold tabular-nums">
                  {lakeData.lakeLevel.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m
                </div>
                <div
                  className="mt-2 h-1.5 overflow-hidden rounded-full bg-sky-100"
                  role="progressbar"
                  aria-label="Seestand im Vergleich zum Vollstau"
                  aria-valuemin={0}
                  aria-valuemax={lakeData.fullLevel}
                  aria-valuenow={lakeData.lakeLevel}
                >
                  <div
                    className="h-full rounded-full bg-sky-500"
                    style={{ width: fillPercent + '%' }}
                  />
                </div>
                <p className="mt-2 text-[11px] font-medium text-blue-700">
                  Verlauf anzeigen
                </p>
              </button>
            </div>

            {expandedMetric && (
              <div id="rottachsee-history" className="rounded-xl border border-sky-100 bg-white/75 px-3 pb-2 pt-3">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">
                        {chartLabel} · {selectedPeriodLabel}
                      </p>
                      <p className="text-[11px] text-muted-foreground">Tagesmittelwerte</p>
                    </div>
                    {chartChange !== null && (
                      <span className="text-xs font-medium tabular-nums text-muted-foreground">
                        {chartChange > 0 ? '+' : ''}
                        {chartChange.toLocaleString('de-DE', {
                          minimumFractionDigits: expandedMetric === 'level' ? 2 : 1,
                          maximumFractionDigits: expandedMetric === 'level' ? 2 : 1,
                        })} {chartUnit}
                      </span>
                    )}
                  </div>

                  <div
                    className="grid grid-cols-2 gap-1 rounded-lg bg-sky-50 p-1 sm:grid-cols-4"
                    role="group"
                    aria-label="Zeitraum auswählen"
                  >
                    {historyPeriods.map((period) => (
                      <button
                        key={period.days}
                        type="button"
                        onClick={() => setHistoryPeriod(period.days)}
                        aria-pressed={historyPeriod === period.days}
                        className={
                          'rounded-md px-1.5 py-1.5 text-[11px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ' +
                          (historyPeriod === period.days
                            ? 'bg-white text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground')
                        }
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>
                </div>

                <ChartContainer
                  config={{ value: { label: chartLabel, color: chartColor } }}
                  className="mt-2 h-[140px] w-full"
                >
                  <LineChart accessibilityLayer data={chartData} margin={{ top: 8, right: 5, bottom: 4, left: 5 }}>
                    <YAxis
                      hide
                      domain={
                        expandedMetric === 'level'
                          ? ['dataMin - 0.05', 'dataMax + 0.05']
                          : ['dataMin - 1', 'dataMax + 1']
                      }
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          hideLabel
                          hideIndicator
                          formatter={(value, _name, item) => (
                            <div className="flex min-w-[8.5rem] items-center justify-between gap-3">
                              <span className="text-muted-foreground">{item.payload.label}</span>
                              <span className="font-mono font-medium tabular-nums">
                                {Number(value).toLocaleString('de-DE', {
                                  minimumFractionDigits: expandedMetric === 'level' ? 2 : 1,
                                  maximumFractionDigits: expandedMetric === 'level' ? 2 : 1,
                                })} {chartUnit}
                              </span>
                            </div>
                          )}
                        />
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--color-value)"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 4, fill: 'var(--color-value)', strokeWidth: 0 }}
                    />
                  </LineChart>
                </ChartContainer>

                <div className="flex justify-between text-[10px] leading-none text-muted-foreground">
                  <span>{chartData[0]?.label}</span>
                  <span>{chartData.at(-1)?.label}</span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
              {lakeData.windSpeed !== null && (
                <span className="flex items-center gap-1.5">
                  <Wind className="h-3.5 w-3.5" />
                  Wind {lakeData.windSpeed.toLocaleString('de-DE', { maximumFractionDigits: 1 })} m/s
                </span>
              )}
              <span>{fillPercent.toLocaleString('de-DE', { maximumFractionDigits: 1 })} % von Vollstau (50,00 m)</span>
            </div>

            <a
              href={lakeData.source.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-sky-700 hover:underline"
            >
              Quelle: {lakeData.source.historyName}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ) : (
          <div className="space-y-3" aria-label="Rottachsee-Messdaten werden geladen">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="h-28 animate-pulse rounded-xl bg-sky-100/70" />
              <div className="h-28 animate-pulse rounded-xl bg-sky-100/70" />
            </div>
          </div>
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
            const isTodayEvent = isToday(new Date(event.date));
            return (
              <Card key={event.id} className={isTodayEvent ? "border-green-500 border-2 shadow-[0_0_15px_rgba(34,197,94,0.3)]" : ""}>
                <CardHeader>
                  <CardTitle>
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <Badge variant={isTodayEvent ? "default" : "outline"} className={`flex items-center gap-2 ${isTodayEvent ? "bg-green-600 hover:bg-green-700" : ""}`}>
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

const ROTTACHSEE_LIVE_IMAGE_URL =
  'https://www.wwa-ke.bayern.de/themen/fluesse_seen/gewaesserportraits/rottachsee/webcam/pic/svc_ts.jpg';

const carouselImages = [
  { src: '/images/pthal4.jpg', alt: 'Petersthal', hint: 'traditional festival' },
  {
    src: ROTTACHSEE_LIVE_IMAGE_URL,
    alt: 'Livebild vom Rottachsee',
    hint: 'Rottachsee live webcam',
    live: true,
  },
  { src: '/images/pthal3.png', alt: 'Petersthal', hint: 'hiking trail' },
  { src: '/images/pthal10.jpg', alt: 'Petersthal', hint: 'brass band' },
  { src: '/images/pthal5.png', alt: 'Petersthal', hint: 'brass band' },
  { src: '/images/pthal7.jpg', alt: 'Petersthal', hint: 'lake sailing' },
  { src: '/images/pthal6.png', alt: 'Petersthal', hint: 'mountain landscape' },
  { src: '/images/pthal8.jpg', alt: 'Petersthal', hint: 'village winter' },
];

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  const [liveImageUrl, setLiveImageUrl] = React.useState(ROTTACHSEE_LIVE_IMAGE_URL);
  const [modalImage, setModalImage] = React.useState<{ src: string; alt: string; live?: boolean } | null>(null);

  React.useEffect(() => {
    const refreshLiveImage = () => {
      setLiveImageUrl(ROTTACHSEE_LIVE_IMAGE_URL + '?t=' + Date.now());
    };
    refreshLiveImage();
    const interval = window.setInterval(refreshLiveImage, 10 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  const openModal = (image: { src: string; alt: string; live?: boolean }) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full h-[50vh] min-h-[300px] max-h-[500px] text-center text-white">
        <Image
          src="/images/pthal15.png"
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
            Petersthal ist ein Dorf im östlichen Oberallgäu, idyllisch gelegen am Ufer des Rottachsees.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <section className="text-center">
          <h2 className="text-3xl font-bold">⛰️⛪🏞️</h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            Petersthal ist ein kleines Dorf mit 18 Weilern und rund 800 Einwohnern – gelegen auf etwa 870 Metern Höhe zwischen dem Rottachsee auf nördlicher Seite und dem Petersthaler Hörnle. Obwohl bei der Gebietsreform 1976 der Gemeinde Oy-Mittelberg angeschlossen, pflegt dieser kleine Ort bis heute ein eigenes, reges Vereinsleben.
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
              {carouselImages.map((image, index) => {
                const imageSrc = image.live ? liveImageUrl : image.src;
                return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 cursor-pointer" onClick={() => openModal({ src: imageSrc, alt: image.alt, live: image.live })}>
                    <Card className="overflow-hidden">
                      <CardContent className="relative p-0 flex aspect-[4/3] items-center justify-center">
                        <Image
                          src={imageSrc}
                          alt={image.alt}
                          width={600}
                          height={450}
                          unoptimized={image.live}
                          className="object-cover w-full h-full"
                          data-ai-hint={image.hint}
                        />
                        {image.live && (
                          <span className="absolute left-3 top-3 flex items-center rounded-full bg-black/65 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
                            LIVE · Rottachsee
                          </span>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        <section className="mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(24rem,2fr)]">
            <div className="min-w-0">
              <UpcomingEventsWidget />
            </div>
            <div className="min-w-0 space-y-6">
              <h3 className="text-2xl font-bold">Aktuelles</h3>
              <WeatherWidget />
              <RottachseeWidget />
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
              unoptimized={modalImage.live}
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
