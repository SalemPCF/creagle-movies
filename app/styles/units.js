const uniter = unit => (...args) => args.map(arg => `${arg}${unit}`).join(' ');

export const rem = uniter('rem');

export const perc = uniter('%');

export const second = uniter('s');

export const px = uniter('px');
