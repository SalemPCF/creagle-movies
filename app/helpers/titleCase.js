/* Relative */
import { capitalize } from './capitalize';

/**
 * Converts a string to title case
 * @param {string} string - The String
 */
export const titleCase = string => string.split(' ').map(capitalize).join(' ');
