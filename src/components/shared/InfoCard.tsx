import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  imageHint: string;
  children?: React.ReactNode;
}

export function InfoCard({ title, description, imageUrl, imageAlt, imageHint, children }: InfoCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          data-ai-hint={imageHint}
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{description}</CardDescription>
        {children}
      </CardContent>
    </Card>
  );
}
