export default function getStringTime(d = new Date(), secondsUse = false) {
  const ye = d.getFullYear();

  const tmo = d.getMonth() + 1;
  const mo: string = tmo < 10 ? `0${tmo}` : `${tmo}`;

  const tda = d.getDate();
  const da = tda < 10 ? `0${tda}` : `${tda}`;

  const tho = d.getHours();
  const ho = tho < 10 ? `0${tho}` : `${tho}`;

  const tmi = d.getMinutes();
  const mi = tmi < 10 ? `0${tmi}` : `${tmi}`;

  const tms = d.getSeconds();
  const ms = tms < 10 ? `0${tms}` : `${tms}`;
  const txt = secondsUse ? `:${ms}` : '';

  return `${ye}-${mo}-${da} ${ho}:${mi}${txt}`;
}
