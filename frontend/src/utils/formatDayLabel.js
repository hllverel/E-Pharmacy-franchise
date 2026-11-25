const DAY = 24 * 60 * 60 * 1000;

const toDayKey = (date) => new Date(date).toISOString().slice(0, 10);

export const formatDayLabel = (date) => {
  const key = toDayKey(date);

  if (key === toDayKey(Date.now())) return 'Today';
  if (key === toDayKey(Date.now() - DAY)) return 'Yesterday';

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
};