import { StyleSheet } from 'aphrodite';

import {
    colors, rgba, fonts, shadows,
    perc, px, rem, second,
    blur, combine, scale,
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
    },

    innerContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 3,
        overflowY: 'scroll',
        padding: rem(5),
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
        fontSize: rem(1),
    },

    starIcon: {
        textShadow: '0 2px 5px rgba(0, 0, 0, 0.12)',
        fontSize: rem(1),
        color: colors.starColor,
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
        position: 'absolute',
        bottom: rem(5),
        left: rem(5),
    },

    button: {
        padding: combine(rem(0.75), rem(1.5)),
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
