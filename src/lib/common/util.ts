/**
 * Extracts the username part from an email address
 * @param email Email address to extract username from
 * @returns The part of the email before the @ symbol
 */
export function extractUsername(email: string): string {
  if (!email) return '';
  return email.split('@')[0];
}
