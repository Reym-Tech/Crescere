// utils/dateHelpers.ts

/**
 * Returns today's date as YYYY-MM-DD in local time.
 */
export function todayString(): string {
  const d = new Date();
  return toDateString(d);
}

/**
 * Converts a Date to YYYY-MM-DD in local time.
 */
export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Returns the Monday of the week containing the given date string.
 */
export function getWeekStart(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  const day  = date.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return toDateString(date);
}

/**
 * Returns YYYY-MM for a given date string.
 */
export function getMonthString(dateString: string): string {
  return dateString.slice(0, 7);
}

/**
 * Returns an array of 7 date strings (Mon–Sun) for the week
 * containing the given date.
 */
export function getWeekDays(dateString: string): string[] {
  const start = new Date(getWeekStart(dateString) + 'T00:00:00');
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return toDateString(d);
  });
}

/**
 * Returns a human-readable label: "Today", "Yesterday", or "Mon 19 May".
 */
export function formatDateLabel(dateString: string): string {
  const today     = todayString();
  const yesterday = toDateString(
    new Date(new Date().setDate(new Date().getDate() - 1))
  );

  if (dateString === today)     return 'Today';
  if (dateString === yesterday) return 'Yesterday';

  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day:     'numeric',
    month:   'short',
  });
}
