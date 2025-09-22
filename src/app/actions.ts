'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getSupabaseClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase URL or service key is not set. Please check your .env file.');
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}

const formSchema = z.object({
  eventName: z.string().min(1, 'Eventname ist erforderlich.'),
  eventDate: z.string().min(1, 'Datum ist erforderlich.'),
  eventTime: z.string().min(1, 'Uhrzeit ist erforderlich.'),
  eventLocation: z.string().min(1, 'Ort ist erforderlich.'),
  eventDescription: z.string().optional(),
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
  try {
    const supabase = getSupabaseClient();
    const formData = Object.fromEntries(data);
    const parsed = formSchema.safeParse(formData);

    if (!parsed.success) {
      return {
        message: 'Ungültige Formulardaten zum Speichern.',
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }

    const { error } = await supabase.from('events').insert([
      {
        title: parsed.data.eventName,
        date: parsed.data.eventDate,
        time: parsed.data.eventTime,
        location: parsed.data.eventLocation,
        description: parsed.data.eventDescription,
        organizer_club_slug:
          parsed.data.organizerClubSlug === 'none'
            ? null
            : parsed.data.organizerClubSlug,
      },
    ]);

    if (error) {
      return {
        message: 'Fehler beim Speichern der Veranstaltung.',
        issues: [error.message],
      };
    }

    revalidatePath('/veranstaltungen');
    revalidatePath('/admin');
    if (parsed.data.organizerClubSlug) {
      revalidatePath(`/vereine/${parsed.data.organizerClubSlug}`);
    }

    return {
      message: `Veranstaltung "${parsed.data.eventName}" erfolgreich gespeichert!`,
    };
  } catch (e: unknown) {
    return {
      message: e instanceof Error ? e.message : 'Ein unerwarteter Serverfehler ist aufgetreten.',
      issues: [],
    };
  }
}

const deleteSchema = z.object({
  eventId: z.string(),
});

export async function deleteEventAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  try {
    const supabase = getSupabaseClient();
    const formData = Object.fromEntries(data);
    const parsed = deleteSchema.safeParse(formData);

    if (!parsed.success) {
      return {
        message: 'Ungültige Daten zum Löschen.',
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', parsed.data.eventId);

    if (error) {
      return {
        message: 'Fehler beim Löschen der Veranstaltung.',
        issues: [error.message],
      };
    }

    revalidatePath('/veranstaltungen');
    revalidatePath('/admin');
    // We don't know the club slug here, so we can't revalidate the club page specifically.
    // A broader revalidation might be needed if this becomes an issue.

    return {
      message: 'Veranstaltung erfolgreich gelöscht!',
    };
  } catch (e: unknown) {
     return {
      message: e instanceof Error ? e.message : 'Ein unerwarteter Serverfehler ist aufgetreten.',
      issues: [],
    };
  }
}
