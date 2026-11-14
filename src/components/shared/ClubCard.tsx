import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Club } from '@/lib/types';

interface ClubCardProps {
  club: Club;
}

export function ClubCard({ club }: ClubCardProps) {
  return (
    <Card className="group overflow-hidden h-full flex flex-col text-left transition-shadow hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={club.imageUrl}
          alt={`Bild von ${club.name}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 80vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={club.imageHint}
        />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl leading-tight [overflow-wrap:anywhere]">{club.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <CardDescription className="flex-grow line-clamp-3">{club.description}</CardDescription>
        <Button asChild className="mt-4 w-full">
            <Link href={`/vereine/${club.slug}`}>
                Mehr erfahren <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
