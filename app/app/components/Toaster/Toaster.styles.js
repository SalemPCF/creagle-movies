/* Node */
import { StyleSheet } from 'aphrodite';

/* Relative */
import { rem, colors, px, second, translateY, fonts, shadows } from '../../../styles';

const slideKeyframes = {
    from: {
        opacity: 0,
        transform: translateY(rem(1)),
    },

    to: {
        opacity: 1,
        transform: translateY(0),
    },
};

export default StyleSheet.create({
    toaster: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
    },

    toast: {
        padding: rem(1),
        fontSize: rem(0.875),
        fontFamily: fonts.primary,
        background: colors.background.two,
        color: colors.text.primary,
        borderRadius: rem(0.25),
        height: px(48),
        marginBottom: rem(0.5),
        width: 'auto',
        minWidth: px(344),
        animationName: slideKeyframes,
        animationDuration: second(0.5),
        boxShadow: shadows.one,
    },

    toast_disappearing: {
        animationName: slideKeyframes,
        animationDuration: second(0.2),
        animationFillMode: 'forwards',
        animationDirection: 'reverse',
    },
});
