import Image from 'next/image';
import { MapPin } from 'lucide-react';

export function MapPlaceholder() {
  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg border">
      <Image
        src="https://picsum.photos/seed/map/1200/500"
        alt="Platzhalter für eine Karte der Umgebung"
        fill
        className="object-cover"
        data-ai-hint="town map"
      />
      <div className="absolute inset-0 bg-background/70 flex flex-col justify-center items-center">
        <MapPin className="h-12 w-12 text-primary" />
        <p className="mt-4 font-semibold text-foreground">Interaktive Karte wird hier angezeigt</p>
      </div>
    </div>
  );
}
