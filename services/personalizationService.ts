
import { type PersonalizationData } from '../types';

const PERSONALIZATION_KEY = 'cognos_ai_personalization';

/**
 * Retrieves personalization data from local storage.
 * @returns A PersonalizationData object or null if not found.
 */
export function getPersonalizationData(): PersonalizationData | null {
  try {
    const saved = localStorage.getItem(PERSONALIZATION_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as PersonalizationData;
  } catch (error) {
    console.error("Failed to parse personalization data from localStorage", error);
    // Clear corrupted data
    localStorage.removeItem(PERSONALIZATION_KEY);
    return null;
  }
}

/**
 * Saves personalization data to local storage.
 * @param data A PersonalizationData object to save.
 */
export function savePersonalizationData(data: PersonalizationData): void {
  try {
    const dataToSave = JSON.stringify(data);
    localStorage.setItem(PERSONALIZATION_KEY, dataToSave);
  } catch (error) {
    console.error("Failed to save personalization data to localStorage", error);
  }
}
