export function formatTimestamp(
  input: Date | string | number | null | undefined
): string {
  if (!input) return "날짜 없음";

  const d = input instanceof Date ? input : new Date(input);
  if (isNaN(d.getTime())) return "유효하지 않음";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}
