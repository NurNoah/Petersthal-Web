import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { Club } from '@/lib/types';

interface ClubCardProps {
  club: Club;
}

export function ClubCard({ club }: ClubCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={club.imageUrl}
          alt={`Bild von ${club.name}`}
          fill
          className="object-cover"
          data-ai-hint={club.imageHint}
        />
      </div>
      <CardHeader>
        <CardTitle>{club.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        <Button asChild className="mt-auto w-full">
            <Link href={`/vereine/${club.slug}`}>
                Mehr erfahren <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
