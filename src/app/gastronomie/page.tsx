import { InfoCard } from '@/components/shared/InfoCard';
import { MapPlaceholder } from '@/components/shared/MapPlaceholder';
import { restaurants } from '@/lib/data';

export default function GastronomiePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Wirtschaften in Petersthal</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          🍕🥨🍖
        </p>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold font-headline mb-4"></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <InfoCard
              key={restaurant.id}
              title={restaurant.name}
              description={restaurant.description}
              imageUrl={restaurant.imageUrl}
              imageAlt={`Bild von ${restaurant.name}`}
              imageHint={restaurant.imageHint}
            >
                <p className="text-sm text-muted-foreground mt-4">{restaurant.address}</p>
            </InfoCard>
          ))}
        </div>
      </section>
    </div>
  );
}
