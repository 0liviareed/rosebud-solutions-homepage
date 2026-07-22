// Tolerant phone validation for UK + US/North-American numbers. Accepts common
// formatting (spaces, dashes, parens, leading + or 00 international prefix) and
// checks the digit count matches a plausible UK or US number. Not a deliverability
// check — just "is this a real-shaped UK/US number" for the checkout form.
// Shared by the client form and the /api/signup route so the two never diverge.

export function normalisePhone(raw: string): string | null {
  if (!raw) return null;
  // Drop everything but digits and a leading +, then strip 00/+ international prefix.
  const trimmed = raw.replace(/[^\d+]/g, "").replace(/^00/, "").replace(/^\+/, "");
  const digits = trimmed.replace(/\D/g, "");

  // US / North America: 10-digit national, or 11 digits with the leading 1.
  if (digits.length === 10) return digits;
  if (digits.length === 11 && digits.startsWith("1")) return digits;

  // UK national: leading 0 + 10 digits = 11 (e.g. 07700 900123, 020 7946 0000).
  if (digits.length === 11 && digits.startsWith("0")) return digits;
  // UK international: 44 + 10 national-without-0 = 12 (e.g. +44 7700 900123).
  if (digits.length === 12 && digits.startsWith("44")) return digits;

  return null;
}

export const isValidPhone = (raw: string): boolean => normalisePhone(raw) !== null;
