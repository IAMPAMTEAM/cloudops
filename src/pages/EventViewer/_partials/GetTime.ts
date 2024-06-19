interface KoreaTime {
  date: string;
  time: string;
}

export default function GetTime(): KoreaTime {
  const today = new Date();

  const date = today
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\./g, '')
    .split(' ')
    .join('-')
    .trim();

  const time = today
    .toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/:/g, ':')
    .trim();

  return { date, time };
}
