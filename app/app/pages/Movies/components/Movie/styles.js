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
        height: perc(100),
        width: perc(100),
    },

    movie: {
        background: colors.background.two,
        borderRadius: rem(0.25),
        boxShadow: shadows.one,
        transition: 'all .3s cubic-bezier(.25, .8, .25, 1)',

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
        top: 0,
        left: 0,
        width: perc(100),
        height: perc(100),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        background: linearGradient(
            'to top',
            combine(rgba(0, 0, 0, 0.6), perc(0)),
            combine(rgba(0, 0, 0, 0.3), perc(60)),
            combine(rgba(0, 0, 0, 0), perc(100)),
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
});
