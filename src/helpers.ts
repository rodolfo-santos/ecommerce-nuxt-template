export function serialize(obj: object): string {
  let queryString: string = '';
  for ( const key in obj ) {
    if (key !== null) { queryString += `&${key}=${obj[key]}`; }
  }
  return queryString;
}
