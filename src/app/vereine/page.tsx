import type { Metadata } from 'next';
import { ClubCard } from '@/components/shared/ClubCard';
import { clubs } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Vereine',
  description: 'Das Vereinsleben in Petersthal: Sport, Musik, Tradition, Feuerwehr und mehr.',
};

export default function VereinePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-balance">Das Vereinsleben in Petersthal</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Unsere Vereine
        </p>
      </div>

      <section className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </section>
    </div>
  );
}
