// utils/formatDate.ts

/**
 * Formats an ISO datetime string into a short time label, e.g. "9:41 AM".
 */
export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour:   'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Formats a YYYY-MM-DD string into a long date label, e.g. "Monday, 19 May".
 */
export function formatLongDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day:     'numeric',
    month:   'long',
  });
}

/**
 * Formats a completion ratio (0–1) as a percentage string, e.g. "75%".
 */
export function formatPercent(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}
