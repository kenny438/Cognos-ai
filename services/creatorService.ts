
const CREATOR_STATUS_KEY = 'cognos_ai_creator_status';

/**
 * Checks if the user is the creator.
 * @returns True if the user is the creator, false otherwise.
 */
export function isCreator(): boolean {
  try {
    const status = localStorage.getItem(CREATOR_STATUS_KEY);
    return status === 'true';
  } catch (error) {
    console.error("Failed to read creator status from localStorage", error);
    return false;
  }
}

/**
 * Grants creator access.
 */
export function grantCreatorAccess(): void {
  try {
    localStorage.setItem(CREATOR_STATUS_KEY, 'true');
  } catch (error) {
    console.error("Failed to save creator status to localStorage", error);
  }
}

/**
 * Revokes creator access.
 */
export function revokeCreatorAccess(): void {
    try {
        localStorage.removeItem(CREATOR_STATUS_KEY);
    } catch (error) {
        console.error("Failed to remove creator status from localStorage", error);
    }
}
