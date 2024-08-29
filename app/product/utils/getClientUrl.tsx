export function getClientUrl() {
  return window.location.host.startsWith("www.")
    ? window.location.host.slice(4)
    : window.location.host;
}
