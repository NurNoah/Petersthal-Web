'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { generateEventDescriptionAction, type FormState } from '@/app/actions';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Wand2 } from 'lucide-react';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      <Wand2 className="mr-2 h-4 w-4" />
      {pending ? 'Generiere...' : 'Beschreibung generieren'}
    </Button>
  );
}

export function EventSuggestionForm() {
  const [state, formAction] = useFormState(generateEventDescriptionAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && !state.generatedDescription) {
        toast({
            title: "Fehler",
            description: state.message,
            variant: "destructive",
        });
    }
    if (state.message && state.generatedDescription) {
        toast({
            title: "Erfolg",
            description: state.message,
        });
    }
  }, [state, toast]);


  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>KI-gestützte Veranstaltungsbeschreibung</CardTitle>
        <CardDescription>
          Geben Sie die Eckdaten Ihrer Veranstaltung ein und lassen Sie eine ansprechende Beschreibung von der KI erstellen.
        </CardDescription>
      </CardHeader>
      <form ref={formRef} action={formAction}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventName">Eventname</Label>
              <Input id="eventName" name="eventName" placeholder="z.B. Dorffest" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventLocation">Ort</Label>
              <Input id="eventLocation" name="eventLocation" placeholder="z.B. Dorfplatz" required />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventDate">Datum</Label>
              <Input id="eventDate" name="eventDate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventTime">Uhrzeit</Label>
              <Input id="eventTime" name="eventTime" type="time" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventDescriptionContext">Zusätzlicher Kontext (optional)</Label>
            <Textarea
              id="eventDescriptionContext"
              name="eventDescriptionContext"
              placeholder="z.B. Mit Live-Musik von der Musikkapelle, für das leibliche Wohl ist gesorgt."
            />
          </div>
          {state.generatedDescription && (
             <div className="space-y-2">
                <Label htmlFor="generatedDescription">Generierte Beschreibung</Label>
                <Textarea id="generatedDescription" name="generatedDescription" rows={5} defaultValue={state.generatedDescription} />
             </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <SubmitButton />
          {state.generatedDescription && <Button variant="secondary">Veranstaltung speichern</Button>}
        </CardFooter>
      </form>
    </Card>
  );
}
