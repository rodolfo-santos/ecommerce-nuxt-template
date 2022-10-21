export function objectToQuery(obj: object): string {
  let queryString: string = '?';

  for (const key in obj) if (key && obj[key]) queryString += `${key}=${obj[key]}&`;
  queryString = queryString.slice(0, -1);

  return queryString;
}
