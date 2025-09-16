import { MapPlaceholder } from '@/components/shared/MapPlaceholder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { busSchedules } from '@/lib/data';

export default function AnfahrtPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Anfahrt & Busverbindungen</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Finden Sie den besten Weg nach Petersthal. Hier finden Sie Informationen zur Anreise und die aktuellen Busfahrpläne.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold font-headline mb-4">Karte</h2>
        <MapPlaceholder />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold font-headline mb-4">Busfahrpläne</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Linie</TableHead>
                  <TableHead>Abfahrtszeiten ab Petersthal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {busSchedules.map((schedule) => (
                  <TableRow key={schedule.route}>
                    <TableCell className="font-medium">{schedule.route}</TableCell>
                    <TableCell>
                        <div className="flex flex-wrap gap-2">
                            {schedule.times.map((time) => (
                                <span key={time} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
                                    {time}
                                </span>
                            ))}
                        </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
