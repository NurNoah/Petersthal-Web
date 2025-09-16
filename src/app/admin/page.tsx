import { EventSuggestionForm } from '@/components/admin/EventSuggestionForm';

export default function AdminPage() {
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
    </div>
  );
}
