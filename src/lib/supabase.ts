import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve credentials from Vite env or local storage configuration
const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const storedUrl = typeof window !== 'undefined' ? localStorage.getItem('nh_supabase_url') : null;
const storedKey = typeof window !== 'undefined' ? localStorage.getItem('nh_supabase_anon_key') : null;

export const supabaseUrl = storedUrl || envUrl;
export const supabaseAnonKey = storedKey || envKey;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('your-project')
  );
};

export let supabase: SupabaseClient | null = null;

if (isSupabaseConfigured()) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
  } catch (err) {
    console.warn('Could not initialize Supabase client:', err);
    supabase = null;
  }
}

export const saveSupabaseConfig = (url: string, key: string) => {
  if (url) localStorage.setItem('nh_supabase_url', url.trim());
  else localStorage.removeItem('nh_supabase_url');

  if (key) localStorage.setItem('nh_supabase_anon_key', key.trim());
  else localStorage.removeItem('nh_supabase_anon_key');

  window.location.reload();
};

