
const PRO_STATUS_KEY = 'cognos_ai_pro_status';

/**
 * Checks if the user has Pro status.
 * @returns True if the user is a Pro user, false otherwise.
 */
export function isProUser(): boolean {
  try {
    const status = localStorage.getItem(PRO_STATUS_KEY);
    return status === 'true';
  } catch (error) {
    console.error("Failed to read pro status from localStorage", error);
    return false;
  }
}

/**
 * Grants Pro access to the user.
 */
export function grantProAccess(): void {
  try {
    localStorage.setItem(PRO_STATUS_KEY, 'true');
  } catch (error) {
    console.error("Failed to save pro status to localStorage", error);
  }
}

/**
 * Revokes Pro access from the user.
 */
export function revokeProAccess(): void {
    try {
        localStorage.removeItem(PRO_STATUS_KEY);
    } catch (error) {
        console.error("Failed to remove pro status from localStorage", error);
    }
}
