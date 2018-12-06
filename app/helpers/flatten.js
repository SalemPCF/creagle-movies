/**
 * Flattens an array
 * @param {Array} array - The Array
 * Usage: flatten(['item1', ['item2']])
 */
export const flatten = array => array.reduce((acc, item) => (Array.isArray(item)
    ? [...acc, ...item]
    : [...acc, item]
), []);
