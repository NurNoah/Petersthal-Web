
'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
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
import { saveEventAction, type FormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { clubs } from '@/lib/data';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      <Save className="mr-2 h-4 w-4" />
      {pending ? 'Speichere...' : 'Veranstaltung speichern'}
    </Button>
  );
}

export function EventSuggestionForm() {
  const [state, formAction] = useActionState(saveEventAction, initialState);
  const [selectKey, setSelectKey] = useState(Date.now());
  
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

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
        formRef.current?.reset();
        setSelectKey(Date.now()); // Reset the Select component
      }
    }
  }, [state, toast]);


  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Neue Veranstaltung erstellen</CardTitle>
        <CardDescription>
          Geben Sie die Eckdaten ein und speichern Sie die Veranstaltung. Felder mit * sind erforderlich.
        </CardDescription>
      </CardHeader>
      <form ref={formRef} action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="eventName">Eventname *</Label>
            <Input id="eventName" name="eventName" placeholder="z.B. Dorffest" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventLocation">Ort *</Label>
              <Input id="eventLocation" name="eventLocation" placeholder="z.B. Dorfplatz" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organizerClubSlug">Veranstalter (Verein)</Label>
               <Select name="organizerClubSlug" key={selectKey}>
                <SelectTrigger>
                  <SelectValue placeholder="Verein auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Kein Verein</SelectItem>
                  {clubs.map(club => (
                    <SelectItem key={club.slug} value={club.slug}>
                      {club.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventDate">Datum *</Label>
              <Input id="eventDate" name="eventDate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventTime">Uhrzeit *</Label>
              <Input id="eventTime" name="eventTime" type="time" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventDescription">Beschreibung</Label>
            <Textarea
              id="eventDescription"
              name="eventDescription"
              placeholder="Beschreiben Sie die Veranstaltung..."
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
