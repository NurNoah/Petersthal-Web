import { EventSuggestionForm } from '@/components/admin/EventSuggestionForm';
import { supabase } from '@/lib/supabaseClient';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { DeleteEventButton } from '@/components/admin/DeleteEventButton';
import type { Event } from '@/lib/types';

async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching events for admin page:', error);
    return [];
  }
  return data;
}

export default async function AdminPage() {
  const events: Event[] = await getEvents();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline">Admin-Bereich</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Hier können Sie neue Veranstaltungen erstellen und verwalten.
        </p>
      </div>

      <section className="mt-12">
        <EventSuggestionForm />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold font-headline mb-4">
          Bestehende Veranstaltungen
        </h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titel</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Ort</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length > 0 ? (
                events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>
                      {format(new Date(event.date), 'dd.MM.yyyy', {
                        locale: de,
                      })}{' '}
                      um {event.time} Uhr
                    </TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell className="text-right">
                      <DeleteEventButton eventId={event.id} eventName={event.title} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Keine Veranstaltungen gefunden.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
