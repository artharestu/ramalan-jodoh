import { supabase } from './supabase';

/**
 * Silently logs ramalan result to Supabase.
 * Fire-and-forget — no awaiting, no UI feedback, errors fully suppressed.
 */
export function logRamalanResult({
  userName,
  gebetan1,
  gebetan2,
  gebetan3,
  chosenOne,
  matchPercentage
}) {
  if (!supabase) return;

  supabase
    .from('ramalan_entries')
    .insert({
      user_name: userName,
      gebetan_1: gebetan1,
      gebetan_2: gebetan2,
      gebetan_3: gebetan3,
      chosen_one: chosenOne,
      match_percentage: matchPercentage
    })
    .then(() => {})
    .catch(() => {});
}
