import { InfoCard } from '@/components/shared/InfoCard';
import { accommodations } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export default function UnterkuenftePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Unterkünfte in Petersthal</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Finden Sie die perfekte Unterkunft für Ihren Aufenthalt. Ob Hotel, Ferienwohnung oder Pension – bei uns werden Sie fündig.
        </p>
      </div>

      <section className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accommodations.map((acc) => (
            <InfoCard
              key={acc.id}
              title={acc.name}
              description={acc.description}
              imageUrl={acc.imageUrl}
              imageAlt={`Bild von ${acc.name}`}
              imageHint={acc.imageHint}
            >
              <div className="flex flex-col flex-grow justify-between">
                <Badge variant="secondary" className="mt-4 w-fit">{acc.type}</Badge>
                {acc.bookingUrl && (
                  <Button asChild className="mt-4 w-full">
                    <a href={acc.bookingUrl} target="_blank" rel="noopener noreferrer">
                      Jetzt Buchen <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </InfoCard>
          ))}
        </div>
      </section>
    </div>
  );
}
