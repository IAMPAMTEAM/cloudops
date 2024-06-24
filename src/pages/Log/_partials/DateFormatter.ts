export default function DateFormatter(params) {
  const date = new Date(params.value);

  const offsetDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const year = offsetDate.getUTCFullYear();
  const month = (offsetDate.getUTCMonth() + 1).toString();
  const day = offsetDate.getUTCDate().toString().padStart(2, '0');
  const hours = offsetDate.getUTCHours().toString().padStart(2, '0');
  const minutes = offsetDate.getUTCMinutes().toString().padStart(2, '0');
  const seconds = offsetDate.getUTCSeconds().toString().padStart(2, '0');

  const formattedDate = `${month}월 ${day}, ${year}, ${hours}:${minutes}:${seconds} (UTC+09:00)`;

  return formattedDate;
}
