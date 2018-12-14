export const getScrollbarWidth = () => {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.overflow = 'scroll';

    const inner = document.createElement('div');
    inner.style.width = '100%';

    document.body.appendChild(outer);
    outer.appendChild(inner);

    const withoutScroll = outer.offsetWidth;
    const withScroll = inner.offsetWidth;

    document.body.removeChild(outer);

    return withoutScroll - withScroll;
};
