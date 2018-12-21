import { StyleSheet } from 'aphrodite';

import {
    colors, rgba, fonts, shadows,
    perc, px, rem, second, radialGradient,
    blur, combine, scale, translateX, depth,
} from '../../../styles';

export default StyleSheet.create({
    container: {
        background: colors.background.one,
        width: perc(100),
        height: perc(100),
        position: 'relative',
        padding: combine(rem(1.25), rem(4), 0, rem(4)),
    },

    closeIcon: {
        position: 'absolute',
        top: rem(1.6),
        left: rem(1),
        zIndex: 4,
        color: colors.text.primary,
        filter: 'drop-shadow(1px 1px 10px black)',
        fontSize: px(24),
    },

    innerContainer: {
        position: 'relative',
        zIndex: depth.content,
        width: perc(100),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },

    title: {
        color: colors.text.primary,
        fontFamily: fonts.primary,
        fontWeight: fonts.weights.primary.bold,
        marginBottom: rem(0.5),
    },

    metadata: {
        display: 'flex',
        marginBottom: rem(0.5),
    },

    metadataText: {
        fontFamily: fonts.primary,
        color: colors.text.secondary,
        marginRight: rem(1),
        fontWeight: fonts.weights.primary.bold,
        fontSize: rem(0.95),
    },

    metadataStars: {
        marginTop: px(-5),
    },

    metadataRatio: {
        display: 'flex',
        marginTop: px(-4),
    },

    torrentRatio: {
        marginTop: px(2),
        marginLeft: px(5),
    },

    starIcon: {
        textShadow: '0 2px 5px rgba(0, 0, 0, 0.12)',
        color: colors.yellow,
        cursor: 'default',
        fontSize: px(24),
    },

    arrowsIcon: {
        textShadow: '0 2px 5px rgba(0, 0, 0, 0.12)',
        cursor: 'default',
        color: colors.text.secondary,
        fontSize: px(24),
    },

    playIcon: {
        textShadow: '0 2px 5px rgba(0, 0, 0, 0.12)',
        fontSize: px(28),
        color: 'white',
    },

    synopsis: {
        fontFamily: fonts.primary,
        color: colors.text.secondary,
        width: perc(100),
        maxWidth: px(800),
        fontSize: rem(0.875),
        lineHeight: 1.6,
        marginBottom: rem(1),
    },

    button: {
        fontFamily: 'Roboto',
        fontSize: rem(0.875),
        textDecoration: 'none',
        color: colors.text.primary,
        background: colors.primary,
        width: perc(100),
        padding: rem(0.25, 2, 0.1),
        borderWidth: 0,
        borderRadius: rem(0.25),
        boxShadow: shadows.one,
        transition: combine('background-color', second(0.3)),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        ':hover': {
            background: colors.primaryAccent,
        },
    },
});
