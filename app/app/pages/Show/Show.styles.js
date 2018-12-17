import { StyleSheet } from 'aphrodite';

import {
    colors, rgba, fonts,
    perc, px, rem, radialGradient,
    blur, scale,
} from '../../../styles';

export default StyleSheet.create({
    container: {
        background: colors.background.two,
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
        background: radialGradient(
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.75),
        ),
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
        top: rem(5),
        left: rem(7),
        bottom: 0,
        right: 0,
        zIndex: 3,
        width: perc(100),
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
        cursor: 'default',
        fontSize: px(24),
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
});
