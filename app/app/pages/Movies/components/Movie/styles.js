import { StyleSheet } from 'aphrodite';
import {
    colors, shadows, fonts,
    rgba, calc,
    rem, perc, second, px,
    combineTransforms, translateY, translate, scale,
} from '../../../../../styles';

const rippleKeyframes = {
    '0%': {
        transform: combineTransforms(
            translate(perc(-50), perc(-50)),
            scale(0.1),
        ),
    },

    '90%': {
        transform: combineTransforms(
            translate(perc(-50), perc(-50)),
            scale(1),
        ),
    },

    '100%': {
        transform: combineTransforms(
            translate(perc(-50), perc(-50)),
            scale(1),
        ),
        opacity: 0,
    },
};

export default StyleSheet.create({
    movie: {
        background: colors.background.two,
        borderRadius: rem(0.25),
        boxShadow: shadows.one,
        transition: 'all .3s cubic-bezier(.25, .8, .25, 1)',
        cursor: 'pointer',
        margin: rem(0.25),
        overflow: 'hidden',
        textDecoration: 'none',
        position: 'relative',

        ':hover': {
            boxShadow: shadows.two,
            transform: translateY(rem(-0.25)),
        },

        '@media (max-width: 525px)': {
            width: calc(perc(50), '-', rem(0.5)),
        },

        '@media (min-width: 525px) and (max-width: 960px)': {
            width: calc(perc(25), '-', rem(0.5)),
        },

        '@media (min-width: 961px) and (max-width: 1392px)': {
            width: calc(perc(20), '-', rem(0.5)),
        },

        '@media (min-width: 1397px)': {
            width: calc(perc(10), '-', rem(0.5)),
        },
    },

    poster: {
        width: '100%',
        display: 'block',
        minHeight: px(273),
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    },

    hdIcon: {
        position: 'absolute',
        top: rem(0.5),
        right: rem(0.5),
        color: colors.hdColor,
        textShadow: '0 2px 5px rgba(0, 0, 0, 0.12)',
        fontSize: px(24),
    },

    info: {
        padding: rem(0.5),
    },

    infoText: {
        fontFamily: fonts.primary,
        fontSize: rem(1),
        userSelect: 'none',
        cursor: 'pointer',
    },

    infoText_primary: {
        color: colors.text.secondary,
        fontWeight: fonts.weights.primary.bold,
    },

    infoText_secondary: {
        color: colors.text.tertiary,
    },

    ripple: {
        position: 'absolute',
        // 'top' and 'left' are provided from component
        width: perc(300),
        paddingBottom: perc(300),
        transformOrigin: 'center',
        animationName: rippleKeyframes,
        animationDuration: second(1),
        animationFillMode: 'forwards',
    },

    rippleInner: {
        width: perc(100),
        height: perc(100),
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: perc(50),
        background: rgba(255, 255, 255, 0.3),
    },
});
