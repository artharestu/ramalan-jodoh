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
    const response = await supabase
      .from('ramalan_entries')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Debug: lihat response lengkap di browser DevTools (Console)
    console.log('[AdminAPI] Supabase response:', response);

    const { data, error, count, status, statusText } = response;

    if (error) {
      console.error('[AdminAPI] Supabase error:', error);
      return { data: [], error: `${error.message} (${status} ${statusText})`, count: 0 };
    }

    console.log(`[AdminAPI] Fetched ${data?.length} rows, count=${count}`);
    return { data: data || [], error: null, count: count || (data ? data.length : 0) };
  } catch (err) {
    console.error('[AdminAPI] Exception:', err);
    return { data: [], error: err.message, count: 0 };
  }
}
