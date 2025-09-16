import { ClubCard } from '@/components/shared/ClubCard';
import { clubs } from '@/lib/data';

export default function VereinePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Das Vereinsleben in Petersthal</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Unsere Vereine sind das Herzstück der Dorfgemeinschaft. Entdecken Sie die Vielfalt und finden Sie vielleicht Ihr neues Hobby.
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
