export function formatDateTimeToMinute(
  value: string | null | undefined,
): string {
  if (!value) return '';

  const matched = value.match(
    /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/,
  );

  if (!matched) return '';

  const [, year, month, day, hour, minute] = matched;

  return `${year.slice(-2)}.${month}.${day} ${hour}:${minute}`;
}
