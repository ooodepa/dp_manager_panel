export default function objectToQueryString(obj: any) {
  let queryString = '';

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (queryString.length > 0) {
        queryString += '&';
      }
      queryString +=
        encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }
  }

  return '?' + queryString;
}
