import { supabase } from './supabase';

/**
 * Fetches all ramalan entries from Supabase.
 * Returns { data, error, count }.
 */
export async function fetchRamalanEntries() {
  if (!supabase) {
    return { data: [], error: 'Supabase not configured', count: 0 };
  }

  try {
    const { data, error, count } = await supabase
      .from('ramalan_entries')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (error) {
      return { data: [], error: error.message, count: 0 };
    }

    return { data: data || [], error: null, count: count || (data ? data.length : 0) };
  } catch (err) {
    return { data: [], error: err.message, count: 0 };
  }
}
