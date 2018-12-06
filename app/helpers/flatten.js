export const flatten = arr => arr.reduce((acc, item) => (Array.isArray(item)
    ? [...acc, ...item]
    : [...acc, item]
), []);
