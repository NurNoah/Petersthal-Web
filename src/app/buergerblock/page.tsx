import { candidates } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function CandidatePage() {
    return (
        <div className="container py-12 max-w-7xl mx-auto space-y-12">
            {/* Header Section */}
            <div className="text-center space-y-6 max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Bürgerblock Petersthal</h1>
                <p className="text-xl text-muted-foreground">
                    Wir stellen uns vor – Lernen Sie unsere Kandidaten für die Gemeinderatswahl kennen.
                </p>
                <div className="pt-2">
                    <Link
                        href="https://www.buergerblockpetersthal.de/"
                        target="_blank"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 shadow-md"
                    >
                        Zur offiziellen Webseite
                    </Link>
                </div>
            </div>

            {/* Candidates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {candidates.map((candidate) => (
                    <Link
                        key={candidate.id}
                        href={`https://www.buergerblockpetersthal.de/kandidaten/${candidate.id}`}
                        target="_blank"
                        className="group block h-full outline-none"
                    >
                        <Card className="h-full overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-muted">
                            <div className="aspect-[3/4] relative bg-muted overflow-hidden">
                                <img
                                    src={candidate.portraitUrl}
                                    alt={`${candidate.vorname} ${candidate.nachname}`}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-3 left-3">
                                    <Badge variant="secondary" className="text-base font-bold shadow-sm backdrop-blur-sm bg-background/80">
                                        Platz {candidate.listennummer}
                                    </Badge>
                                </div>
                            </div>
                            <CardHeader className="pb-2 space-y-1">
                                <CardTitle className="text-xl">{candidate.vorname} {candidate.nachname}</CardTitle>
                                <CardDescription className="font-medium text-primary">{candidate.beruf}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow pt-2">
                                {candidate.kurzerText && candidate.kurzerText !== '/' && (
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        "{candidate.kurzerText}"
                                    </p>
                                )}
                                <div className="mt-4 flex flex-wrap gap-1">
                                    {candidate.themen.map((thema, idx) => (
                                        <Badge key={idx} variant="outline" className="text-xs text-muted-foreground bg-muted/50 border-none">
                                            {thema}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
