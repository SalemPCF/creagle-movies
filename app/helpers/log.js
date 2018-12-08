/* Relative */
import { DEBUG } from '../config/globals';

/**
 * Prints a colored message to the console
 * @param {String} message - The message
 * @param {String} color - The color
 * Usage: logMessage('Hello, world!', 'green')
 */
export const logMessage = (message, color = '#ffffff') => {
    // If we're debugging, log all the messages
    // If we're not, this function won't do anything
    if (DEBUG) {
        // eslint-disable-next-line no-console
        console.log(`%c${message}`, `color: ${color}`);
    }
};

/**
 * Prints a warning message to the console
 * @param {String} message - The message
 * Usage: logWarning('Hello, world! This is a warning!')
 */
export const logWarning = (message) => {
    logMessage(`WARNING: ${message}`, '#e29225');
};

/**
 * Prints a success message to the console
 * @param {String} message - The message
 * Usage: logWarning('Hello, world! This is a success!')
 */
export const logSuccess = (message) => {
    logMessage(`SUCCESS: ${message}`, '#57e836');
};

/**
 * Prints an error message to the console
 * @param {String} message - The message
 * Usage: logError('Hello, world! An error has occured!')
 */
export const logError = (message) => {
    logMessage(`ERROR: ${message}`, '#e22525');
};

/**
 * Prints an info message to the console
 * @param {String} message - The message
 * Usage: logError('Hello, world! This is some info!')
 */
export const logInfo = (message) => {
    logMessage(`INFO: ${message}`, '#25e2e2');
};
