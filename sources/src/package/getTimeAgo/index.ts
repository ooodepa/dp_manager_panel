function declOfNum(n: number, titles: [string, string, string]) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[n % 100 > 4 && n % 100 < 20 ? 2 : cases[Math.min(n % 10, 5)]];
}

export default function getTimeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const intervals = {
    год: 31536000,
    месяц: 2592000,
    день: 86400,
    час: 3600,
    минута: 60,
    секунда: 1,
  };
  for (const [intervalName, intervalSeconds] of Object.entries(intervals)) {
    const intervalCount = Math.floor(seconds / intervalSeconds);
    if (intervalCount >= 1) {
      switch (intervalName) {
        case 'год':
          return `${intervalCount} ${declOfNum(intervalCount, [
            'год',
            'года',
            'лет',
          ])} назад`;
        case 'месяц':
          return `${intervalCount} ${declOfNum(intervalCount, [
            'месяц',
            'месяца',
            'месяцев',
          ])} назад`;
        case 'день':
          return `${intervalCount} ${declOfNum(intervalCount, [
            'день',
            'дня',
            'дней',
          ])} назад`;
        case 'час':
          return `${intervalCount} ${declOfNum(intervalCount, [
            'час',
            'часа',
            'часов',
          ])} назад`;
        case 'минута':
          return `${intervalCount} ${declOfNum(intervalCount, [
            'минута',
            'минуты',
            'минут',
          ])} назад`;
        case 'секунда':
          return `${intervalCount} ${declOfNum(intervalCount, [
            'секунда',
            'секунды',
            'секунд',
          ])} назад`;
      }
    }
  }
  return 'только что';
}
