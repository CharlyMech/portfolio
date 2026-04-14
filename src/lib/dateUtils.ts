export type DateOrder = 'DMY' | 'MDY' | 'YMD';

/**
 * Derives date-part order from a BCP-47 locale tag.
 * Probes Intl.DateTimeFormat with a known date (2013-11-25) and reads
 * back the numeric positions of day/month/year parts.
 * Falls back to YMD (ISO) when the API is unavailable.
 */
export function deriveDateOrder(locale: string): { order: DateOrder; separator: '/' | '-' } {
  if (typeof Intl === 'undefined' || !Intl.DateTimeFormat) {
    return { order: 'YMD', separator: '-' };
  }

  const probe = new Date(2013, 10, 25); // 25 Nov 2013
  const parts = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).formatToParts(probe);

  const positions: Record<string, number> = {};
  parts.forEach((p, i) => {
    if (p.type === 'day' || p.type === 'month' || p.type === 'year') {
      positions[p.type] = i;
    }
  });

  const { day = 0, month = 1, year = 2 } = positions;

  let order: DateOrder;
  if (year < month && year < day) order = 'YMD';
  else if (month < day) order = 'MDY';
  else order = 'DMY';

  const separator = order === 'YMD' ? '-' : '/';

  return { order, separator };
}

export function formatDate(
  input: Date | number | string,
  order: DateOrder,
  separator: '/' | '-',
): string {
  const d = new Date(input);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear());

  const parts: Record<DateOrder, string[]> = {
    DMY: [day, month, year],
    MDY: [month, day, year],
    YMD: [year, month, day],
  };

  return parts[order].join(separator);
}

export function formatTime(input: Date | number | string, locale: string): string {
  return new Date(input).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}
