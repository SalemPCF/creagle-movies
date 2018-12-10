export const translateY = arg => `translateY(${arg})`;

export const translateX = arg => `translateX(${arg})`;

export const translate = (x, y) => `translate(${x}, ${y})`;

export const scale = n => `scale(${n})`;

export const combineTransforms = (...args) => args.join(' ');
