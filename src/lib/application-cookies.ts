// Cookie utilities for tracking SinkSync application completion

const COOKIE_NAME = 'sinksync_application_completed';
const COOKIE_EXPIRY_DAYS = 365; // 1 year

/**
 * Sets a cookie to indicate the user has completed their application
 */
export function setApplicationCompletedCookie(): void {
  const expires = new Date();
  expires.setDate(expires.getDate() + COOKIE_EXPIRY_DAYS);

  document.cookie = `${COOKIE_NAME}=true; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
}

/**
 * Checks if the user has already completed their application
 */
export function hasCompletedApplication(): boolean {
  if (typeof document === 'undefined') return false; // SSR safety

  const cookies = document.cookie.split(';');
  return cookies.some((cookie) => {
    const [name, value] = cookie.trim().split('=');
    return name === COOKIE_NAME && value === 'true';
  });
}

/**
 * Clears the application completed cookie (for testing purposes)
 */
export function clearApplicationCompletedCookie(): void {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
