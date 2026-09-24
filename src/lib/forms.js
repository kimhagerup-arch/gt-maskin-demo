/**
 * Skjemainnsending. UI-only i demoen: ingen nettverkskall.
 * Klargjort for Resend: bytt kroppen til `fetch("/api/contact", ...)`
 * når serverless-funksjonen er på plass. Signaturen beholdes.
 *
 * @param {"booking"|"contact"|"checkout"} kind
 * @param {Record<string, unknown>} payload
 * @returns {Promise<{ ok: boolean }>}
 */
export async function submitForm(kind, payload) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  if (import.meta.env.DEV) {
    console.info(`[demo] skjema «${kind}» sendt (ingen nettverkskall)`, payload);
  }
  return { ok: true };
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isBlank(value) {
  return !value || String(value).trim().length === 0;
}
