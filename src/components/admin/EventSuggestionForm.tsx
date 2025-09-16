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
import { generateEventDescriptionAction, saveEventAction, type FormState } from '@/app/actions';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Save } from 'lucide-react';

const initialState: FormState = {
  message: '',
};

function SubmitButtons({ generatedDescription }: { generatedDescription?: string }) {
  const { pending } = useFormStatus();
  return (
    <>
      <Button type="submit" name="action" value="generate" disabled={pending}>
        <Wand2 className="mr-2 h-4 w-4" />
        {pending ? 'Generiere...' : 'Beschreibung generieren'}
      </Button>
      {generatedDescription && (
        <Button type="submit" name="action" value="save" disabled={pending}>
          <Save className="mr-2 h-4 w-4" />
          {pending ? 'Speichere...' : 'Veranstaltung speichern'}
        </Button>
      )}
    </>
  );
}

export function EventSuggestionForm() {
  const [state, formAction] = useFormState(
    (prevState: FormState, formData: FormData) => {
      const action = formData.get('action');
      if (action === 'save') {
        return saveEventAction(prevState, formData);
      }
      return generateEventDescriptionAction(prevState, formData);
    },
    initialState
  );
  
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [generatedDescription, setGeneratedDescription] = useState<string | undefined>();

  useEffect(() => {
    if (state.message) {
      if (state.issues || state.message.includes('Fehler')) {
        toast({
            title: "Fehler",
            description: state.message,
            variant: "destructive",
        });
      } else {
        toast({
            title: "Erfolg",
            description: state.message,
        });
      }
    }
    if (state.generatedDescription) {
      setGeneratedDescription(state.generatedDescription);
    }
    if(state.message.includes('gespeichert')) {
        setGeneratedDescription(undefined);
        formRef.current?.reset();
    }
  }, [state, toast]);


  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Neue Veranstaltung erstellen</CardTitle>
        <CardDescription>
          Geben Sie die Eckdaten ein, generieren Sie eine Beschreibung und speichern Sie die Veranstaltung.
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
          {generatedDescription && (
             <div className="space-y-2">
                <Label htmlFor="generatedDescription">Generierte Beschreibung</Label>
                <Textarea id="generatedDescription" name="generatedDescription" rows={5} value={generatedDescription} readOnly />
             </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <SubmitButtons generatedDescription={generatedDescription} />
        </CardFooter>
      </form>
    </Card>
  );
}
