export const calc = (...args) => `calc(${args.join(' ')})`;

export const combine = (...args) => args.join(' ');

export const radialGradient = (inside, outside) => `radial-gradient(${inside}, ${outside})`;
