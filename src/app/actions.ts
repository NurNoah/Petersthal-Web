'use server';

import {
  generateEventDescription,
  type GenerateEventDescriptionInput,
} from '@/ai/flows/generate-event-description';
import { events } from '@/lib/data';
import type { Event } from '@/lib/types';
import { z } from 'zod';

const formSchema = z.object({
    eventName: z.string().min(1, 'Eventname ist erforderlich.'),
    eventDate: z.string().min(1, 'Datum ist erforderlich.'),
    eventTime: z.string().min(1, 'Uhrzeit ist erforderlich.'),
    eventLocation: z.string().min(1, 'Ort ist erforderlich.'),
    eventDescriptionContext: z.string().optional(),
    generatedDescription: z.string().optional(),
  });
  
export interface FormState {
    message: string;
    fields?: Record<string, string>;
    issues?: string[];
    generatedDescription?: string;
  }
  

export async function generateEventDescriptionAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: 'Ungültige Formulardaten.',
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
  
  try {
    const result = await generateEventDescription(parsed.data as GenerateEventDescriptionInput);
    return {
        message: "Beschreibung erfolgreich generiert!",
        generatedDescription: result.eventDescription,
    }
  } catch (error) {
    return {
      message: 'Fehler bei der Generierung der Beschreibung. Bitte versuchen Sie es erneut.',
    };
  }
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
        description: parsed.data.generatedDescription || parsed.data.eventDescriptionContext || 'Keine Beschreibung vorhanden.',
    };
    
    console.log('Neues Event wird gespeichert:', newEvent);
    events.push(newEvent);

    return {
        message: `Veranstaltung "${newEvent.title}" erfolgreich gespeichert!`,
    }
}
