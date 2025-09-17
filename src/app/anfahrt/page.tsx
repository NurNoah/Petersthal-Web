import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { busConnections } from '@/lib/data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
        <div className="flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2688.5173735191183!2d10.383165876701055!3d47.635512135980065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479c7d111d1678b7%3A0xa1e48b04cf72010!2s87466%20Oy-Mittelberg-Petersthal!5e0!3m2!1sde!2sde!4v1758146173184!5m2!1sde!2sde"
            width="1400"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold font-headline mb-4">Busfahrpläne</h2>
        <Accordion type="single" collapsible className="w-full" defaultValue='item-0'>
          {busConnections.map((connection, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-xl font-semibold">{connection.direction}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  {connection.routes.map((route, routeIndex) => (
                    <Card key={routeIndex}>
                      <CardHeader>
                        <CardTitle>{route.line}</CardTitle>
                        {route.note && <p className="text-sm text-muted-foreground">{route.note}</p>}
                      </CardHeader>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Verkehrstage</TableHead>
                              <TableHead>Abfahrtszeiten</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {route.schedules.map((schedule, scheduleIndex) => (
                              <TableRow key={scheduleIndex}>
                                <TableCell className="font-medium">{schedule.days}</TableCell>
                                <TableCell>
                                  <div className="flex flex-wrap gap-2">
                                    {schedule.times.map((time) => (
                                      <span
                                        key={time}
                                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                                      >
                                        {time}
                                      </span>
                                    ))}
                                  </div>
                                   {schedule.note && <p className="text-xs text-muted-foreground mt-2">{schedule.note}</p>}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}