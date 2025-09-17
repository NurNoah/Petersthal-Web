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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2688.5173735191183!2d10.383165876701055!3d47.635512135980065!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x479c7d111d1678b7%3A0xa1e48b04cf72010!2s87466%20Oy-Mittelberg-Petersthal!5e0!3m2!1sde!2sde!4v1758146173184!5m2!1sde!2sde"
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

      <section className="mt-12">
        <h2 className="text-2xl font-bold font-headline mb-4">Bushaltestellen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Haltestelle Petersthal Ortsmitte</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d935.9523451376562!2d10.386875576916081!3d47.63573912975594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479c7d1116c1d7f5%3A0x2778ffdd5f58de93!2sPetersthal%2C%20Ortsmitte!5e1!3m2!1sde!2sde!4v1758147579293!5m2!1sde!2sde"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Haltestelle Petersthal Kirche</h3>
             <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d952.916891021943!2d10.385860414060469!3d47.63483903926697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479c7d11851f5a6d%3A0x64984efd1259d5a0!2sParkplatz!5e1!3m2!1sde!2sde!4v1758147623829!5m2!1sde!2sde"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
