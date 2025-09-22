import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let supabase: SupabaseClient;

// Überprüfen, ob die Umgebungsvariablen gültig sind
if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase URL or Anon Key is not set or invalid. Supabase client not initialized.');
  // Erstellen eines Mock-Clients, um Fehler in der App zu vermeiden
  supabase = {
    from: () => ({
      select: async () => ({ data: [], error: { message: 'Supabase not configured', details: '', hint: '', code: '' } }),
      insert: async () => ({ error: { message: 'Supabase not configured', details: '', hint: '', code: '' } }),
      delete: async () => ({ error: { message: 'Supabase not configured', details: '', hint: '', code: '' } }),
    }),
  } as any;
}

export { supabase };
