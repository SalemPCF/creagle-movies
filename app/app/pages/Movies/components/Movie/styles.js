import { StyleSheet } from 'aphrodite';
import {
    colors, shadows, fonts,
    rgba, combine, linearGradient,
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
    movieContainer: {
        padding: rem(0.25),
    },

    movie: {
        background: colors.background.two,
        borderRadius: rem(0.25),
        boxShadow: shadows.one,
        transition: 'all .3s cubic-bezier(.25, .8, .25, 1)',
        cursor: 'pointer',
        // margin: rem(0.25),
        overflow: 'hidden',
        textDecoration: 'none',
        position: 'relative',
        width: perc(100),
        height: perc(100),

        ':hover': {
            boxShadow: shadows.two,
            transform: translateY(rem(-0.25)),
        },
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
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: perc(100),
        background: linearGradient(
            'to top',
            combine(rgba(0, 0, 0, 0.4), perc(70)),
            combine(rgba(0, 0, 0, 0.2), perc(80)),
            'transparent',
        ),
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
