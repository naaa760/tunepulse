export function getProxiedUrl(url: string): string {
  if (process.env.NODE_ENV === "development") {
    return `https://cors-anywhere.herokuapp.com/${url}`;
  }
  return url;
}
