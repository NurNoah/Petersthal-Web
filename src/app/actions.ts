'use server';

import { events } from '@/lib/data';
import type { Event } from '@/lib/types';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const formSchema = z.object({
    eventName: z.string().min(1, 'Eventname ist erforderlich.'),
    eventDate: z.string().min(1, 'Datum ist erforderlich.'),
    eventTime: z.string().min(1, 'Uhrzeit ist erforderlich.'),
    eventLocation: z.string().min(1, 'Ort ist erforderlich.'),
    eventDescription: z.string().min(1, 'Beschreibung ist erforderlich.'),
    organizerClubSlug: z.string().optional(),
  });
  
export interface FormState {
    message: string;
    fields?: Record<string, string>;
    issues?: string[];
  }
  

export async function saveEventAction(
    prevState: FormState,
    data: FormData
): Promise<FormState> {
    const formData = Object.fromEntries(data);
    const parsed = formSchema.safeParse(formData);

    if (!parsed.success) {
        return {
          message: 'Ungültige Formulardaten zum Speichern.',
          issues: parsed.error.issues.map((issue) => issue.message),
        };
    }
    
    // In einer echten Anwendung würden Sie dies in einer Datenbank speichern.
    // Hier fügen wir es zur In-Memory-Liste hinzu.
    const newEvent: Event = {
        id: (events.length + 1).toString(),
        title: parsed.data.eventName,
        date: parsed.data.eventDate,
        time: parsed.data.eventTime,
        location: parsed.data.eventLocation,
        description: parsed.data.eventDescription,
        organizerClubSlug: parsed.data.organizerClubSlug === 'none' ? undefined : parsed.data.organizerClubSlug,
    };
    
    console.log('Neues Event wird gespeichert:', newEvent);
    events.push(newEvent);

    revalidatePath('/veranstaltungen');
    if (newEvent.organizerClubSlug) {
      revalidatePath(`/vereine/${newEvent.organizerClubSlug}`);
    }


    return {
        message: `Veranstaltung "${newEvent.title}" erfolgreich gespeichert!`,
    }
}
