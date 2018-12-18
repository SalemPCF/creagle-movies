const queryString = require('query-string');

const setVar = (el, key, val) => el.style.setProperty(`--${key}`, val);

process.once('loaded', () => {
    const query = queryString.parse(window.location.search);
    const colors = JSON.parse(query.colors);

    window.addEventListener('load', () => {
        const el = document.documentElement;

        setVar(el, 'bgColor', colors.background.one);
        setVar(el, 'selectionColor', colors.primary);
    });
});
