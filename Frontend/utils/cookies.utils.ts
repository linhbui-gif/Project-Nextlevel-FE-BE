/* eslint-disable eqeqeq */
export const createCookie = (
  name: string,
  value: string,
  days: number
): void => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = days ? `; expires=${date.toUTCString()}` : "";
  document.cookie = `${name}=${value}${expires}; path=/`;
};

export const readCookieValue = (cookie: string, name: string): string => {
  const nameEQ = `${name}=`;
  if (!cookie) {
    return null;
  }
  const ca = cookie.split(";");
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
};

export const readCookie = (name: string): string =>
  readCookieValue(document.cookie, name);

export const eraseCookie = (name: string): void => {
  createCookie(name, "", -1);
};
