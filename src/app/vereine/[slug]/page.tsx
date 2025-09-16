import Image from 'next/image';
import { clubs } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, User } from 'lucide-react';

export async function generateStaticParams() {
  return clubs.map((club) => ({
    slug: club.slug,
  }));
}

export default function ClubDetailPage({ params }: { params: { slug: string } }) {
  const club = clubs.find((c) => c.slug === params.slug);

  if (!club) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={club.imageUrl}
              alt={`Bild von ${club.name}`}
              fill
              className="object-cover"
              data-ai-hint={club.imageHint}
              priority
            />
          </div>
          <h1 className="text-4xl font-bold font-headline mb-4">{club.name}</h1>
          <div className="prose max-w-none text-foreground/80">
            <p>{club.description}</p>
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Kontakt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-3 text-muted-foreground" />
                <span>{club.contact.name}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                <a href={`mailto:${club.contact.email}`} className="hover:underline">
                  {club.contact.email}
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                <a href={`tel:${club.contact.phone.replace(/\s/g, '')}`} className="hover:underline">
                  {club.contact.phone}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
