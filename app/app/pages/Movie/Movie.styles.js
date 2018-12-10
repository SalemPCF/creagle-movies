import { StyleSheet } from 'aphrodite';

import {
    colors, rgba, fonts, shadows,
    perc, px, rem, second,
    blur, combine, scale, translateX,
} from '../../../styles';

export default StyleSheet.create({
    container: {
        background: 'black',
        width: perc(100),
        height: perc(100),
        position: 'relative',
    },

    background: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
        width: perc(100),
        height: perc(100),
        filter: blur(px(8)),
        transform: scale(1.2),
        transformOrigin: 'center',
    },

    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 2,
        width: perc(100),
        height: perc(100),
        background: rgba(0, 0, 0, 0.75),
    },

    closeIcon: {
        position: 'absolute',
        top: rem(1),
        left: rem(1),
        zIndex: 4,
        color: colors.text.primary,
        textShadow: '0 2px 5px rgba(0, 0, 0, 0.12)',
        fontSize: px(24),
    },

    innerContainer: {
        position: 'fixed',
        top: 0,
        left: perc(50),
        bottom: 0,
        right: 0,
        zIndex: 3,
        padding: rem(5),
        width: perc(100),
        maxWidth: px(800),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        transform: translateX(perc(-50)),
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
        marginRight: rem(0.75),
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
        color: colors.starColor,
        cursor: 'context-menu',
        fontSize: px(24),
    },

    arrowsIcon: {
        textShadow: '0 2px 5px rgba(0, 0, 0, 0.12)',
        color: colors.text.secondary,
        cursor: 'context-menu',
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

    buttonContainer: {
        fontFamily: 'Roboto',
        width: perc(100),
    },

    button: {
        width: perc(100),
        padding: combine(rem(0.25), rem(2), rem(0.1)),
        borderWidth: 0,
        outline: 'none',
        borderRadius: rem(0.25),
        boxShadow: shadows.one,
        background: colors.primary,
        color: colors.text.primary,
        transition: combine('background-color', second(0.3)),
        cursor: 'pointer',

        ':hover': {
            background: colors.primaryAccent,
        },
    },
});
