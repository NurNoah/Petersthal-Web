'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { deleteEventAction, type FormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

interface DeleteEventButtonProps {
  eventId: string;
  eventName: string;
}

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <AlertDialogAction type="submit" disabled={pending}>
      {pending ? 'Lösche...' : 'Endgültig löschen'}
    </AlertDialogAction>
  );
}

export function DeleteEventButton({ eventId, eventName }: DeleteEventButtonProps) {
  const [state, formAction] = useActionState(deleteEventAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.issues || state.message.includes('Fehler')) {
        toast({
          title: 'Fehler',
          description: state.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Erfolg',
          description: state.message,
        });
      }
    }
  }, [state, toast]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="mr-2 h-4 w-4" />
          Löschen
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form action={formAction}>
          <input type="hidden" name="eventId" value={eventId} />
          <AlertDialogHeader>
            <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird die
              Veranstaltung &quot;<strong>{eventName}</strong>&quot; dauerhaft
              gelöscht.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <SubmitButton />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
