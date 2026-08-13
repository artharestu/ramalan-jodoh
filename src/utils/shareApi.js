import { supabase } from './supabase';

/**
 * Generate a random 6-character alphanumeric code.
 * Excludes ambiguous characters (0, O, I, l, 1) for readability.
 */
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Create a new share room with a unique code.
 */
export async function createShareRoom(creatorName) {
  if (!supabase) return { data: null, error: 'Supabase not configured' };

  // Try up to 3 times in case of code collision
  for (let attempt = 0; attempt < 3; attempt++) {
    const code = generateCode();

    const { data, error } = await supabase
      .from('share_rooms')
      .insert({ code, creator_name: creatorName })
      .select()
      .single();

    if (!error) {
      return { data, error: null };
    }

    // If it's a unique constraint violation, retry with a new code
    if (error.code === '23505') continue;

    console.error('[ShareAPI] Error creating room:', error);
    return { data: null, error: error.message };
  }

  return { data: null, error: 'Gagal membuat kode unik, coba lagi.' };
}

/**
 * Check if a share room exists by its code.
 */
export async function getShareRoom(code) {
  if (!supabase) return { data: null, error: 'Supabase not configured' };

  const { data, error } = await supabase
    .from('share_rooms')
    .select('*')
    .eq('code', code)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Add a ramalan entry to a share room.
 */
export async function addShareRoomEntry(roomCode, entryData) {
  if (!supabase) return { data: null, error: 'Supabase not configured' };

  const { data, error } = await supabase
    .from('share_room_entries')
    .insert({
      room_code: roomCode,
      user_name: entryData.userName,
      gebetan_1: entryData.gebetan1,
      gebetan_2: entryData.gebetan2,
      gebetan_3: entryData.gebetan3,
      chosen_one: entryData.chosenOne,
      match_percentage: entryData.matchPercentage,
      badge: entryData.badge,
      fortune: entryData.fortune,
    })
    .select()
    .single();

  if (error) {
    console.error('[ShareAPI] Error adding entry:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Fetch all entries for a given share room code.
 */
export async function getShareRoomEntries(code) {
  if (!supabase) return { data: [], error: 'Supabase not configured' };

  const { data, error } = await supabase
    .from('share_room_entries')
    .select('*')
    .eq('room_code', code)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[ShareAPI] Error fetching entries:', error);
    return { data: [], error: error.message };
  }

  return { data: data || [], error: null };
}
