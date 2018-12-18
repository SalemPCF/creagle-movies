import { StyleSheet } from 'aphrodite';
import { rem, colors, px, second, translateY, fonts, shadows } from '../../../styles';

const slideInKeyframes = {
    from: {
        opacity: 0,
        transform: translateY(rem(1)),
    },

    to: {
        opacity: 1,
        transform: translateY(0),
    },
};

const fadeOutKeyframes = {
    from: {
        opacity: 1,
        transform: translateY(rem(0)),
    },

    to: {
        opacity: 0,
        transform: translateY(rem(1)),
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
        animationName: slideInKeyframes,
        animationDuration: second(0.5),
        boxShadow: shadows.one,
    },

    toast_disappearing: {
        animationName: fadeOutKeyframes,
        animationDuration: second(0.2),
        animationFillMode: 'forwards',
    },
});
