export const debounce = (func, wait) => {
    let timeout;

    return (...args) => {
        const funcCall = () => func.apply(this, args);

        clearTimeout(timeout);
        timeout = setTimeout(funcCall, wait);
    };
};
