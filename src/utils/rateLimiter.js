/**
 * Rate Limiter — Anti-Spam untuk Ramalan Jodoh
 *
 * Menggunakan localStorage untuk membatasi frekuensi submit:
 * - Cooldown 30 detik antar setiap submit
 * - Maksimal 20 submit per jam (rolling window)
 */

const STORAGE_KEY = 'ramalan_jodoh_rate_limit';
const COOLDOWN_SECONDS = 30;
const MAX_PER_HOUR = 20;
const HOUR_MS = 60 * 60 * 1000;

/**
 * Ambil data rate limit dari localStorage.
 * @returns {{ lastSubmit: number, submissions: number[] }}
 */
function getData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lastSubmit: 0, submissions: [] };
    return JSON.parse(raw);
  } catch {
    return { lastSubmit: 0, submissions: [] };
  }
}

/**
 * Simpan data rate limit ke localStorage.
 * @param {{ lastSubmit: number, submissions: number[] }} data
 */
function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

/**
 * Bersihkan timestamps submission yang sudah lewat 1 jam.
 * @param {number[]} submissions
 * @returns {number[]}
 */
function pruneOldSubmissions(submissions) {
  const cutoff = Date.now() - HOUR_MS;
  return submissions.filter(ts => ts > cutoff);
}

/**
 * Cek apakah pengguna diizinkan submit ramalan.
 * @returns {{ allowed: boolean, reason: string | null }}
 */
export function canSubmitRamalan() {
  const data = getData();
  const now = Date.now();

  // Cek cooldown
  const elapsed = (now - data.lastSubmit) / 1000;
  if (elapsed < COOLDOWN_SECONDS) {
    return {
      allowed: false,
      reason: 'cooldown',
    };
  }

  // Cek hourly limit
  const recent = pruneOldSubmissions(data.submissions);
  if (recent.length >= MAX_PER_HOUR) {
    return {
      allowed: false,
      reason: 'hourly_limit',
    };
  }

  return { allowed: true, reason: null };
}

/**
 * Catat waktu submit baru ke localStorage.
 */
export function recordSubmission() {
  const data = getData();
  const now = Date.now();

  data.lastSubmit = now;
  data.submissions = [...pruneOldSubmissions(data.submissions), now];

  saveData(data);
}

/**
 * Dapatkan sisa detik cooldown (0 jika sudah expired).
 * @returns {number}
 */
export function getRemainingCooldown() {
  const data = getData();
  const elapsed = (Date.now() - data.lastSubmit) / 1000;
  const remaining = COOLDOWN_SECONDS - elapsed;
  return remaining > 0 ? Math.ceil(remaining) : 0;
}

/**
 * Dapatkan sisa kuota per jam.
 * @returns {number}
 */
export function getRemainingQuota() {
  const data = getData();
  const recent = pruneOldSubmissions(data.submissions);
  return Math.max(0, MAX_PER_HOUR - recent.length);
}

export { COOLDOWN_SECONDS, MAX_PER_HOUR };
