const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const UNITS = [
  ['year', 365 * DAY],
  ['month', 30 * DAY],
  ['day', DAY],
  ['hour', HOUR],
  ['minute', MINUTE],
];

const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export const formatRelativeTime = (date) => {
  const difference = new Date(date).getTime() - Date.now();

  for (const [unit, size] of UNITS) {
    if (Math.abs(difference) >= size) {
      return formatter.format(Math.round(difference / size), unit);
    }
  }

  return 'just now';
};