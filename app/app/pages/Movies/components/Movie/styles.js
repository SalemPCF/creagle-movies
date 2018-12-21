import { StyleSheet } from 'aphrodite';
import {
    colors, shadows, fonts,
    rgba, combine, linearGradient,
    rem, perc, px,
    translateY,
    depth,
} from '../../../../../styles';

export default StyleSheet.create({
    container: {
        padding: rem(0.25),
        height: perc(100),
        width: perc(100),
    },

    movie: {
        background: colors.background.two,
        borderRadius: rem(0.25),
        boxShadow: shadows.one,
        transition: 'all .3s cubic-bezier(.25, .8, .25, 1)',
        zIndex: depth.content,

        ':hover': {
            boxShadow: shadows.two,
            transform: translateY(rem(-0.25)),
        },
    },

    hdIcon: {
        position: 'absolute',
        top: rem(0.5),
        right: rem(0.5),
        color: colors.text.tertiary,
        filter: 'drop-shadow(1px 1px 10px black)',
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
