'use server';

import {
  generateEventDescription,
  type GenerateEventDescriptionInput,
} from '@/ai/flows/generate-event-description';
import { z } from 'zod';

const GenerateEventDescriptionInputSchema = z.object({
    eventName: z.string().min(1, 'Eventname ist erforderlich.'),
    eventDate: z.string().min(1, 'Datum ist erforderlich.'),
    eventTime: z.string().min(1, 'Uhrzeit ist erforderlich.'),
    eventLocation: z.string().min(1, 'Ort ist erforderlich.'),
    eventDescriptionContext: z.string().optional(),
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
  const parsed = GenerateEventDescriptionInputSchema.safeParse(formData);

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
