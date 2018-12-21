import { StyleSheet } from 'aphrodite';
import { colors, rem, shadows, fonts, px } from '../../../../../styles';

export default StyleSheet.create({
    card: {
        display: 'flex',
        borderRadius: rem(0.25),
        overflow: 'hidden',
        boxShadow: shadows.one,
        background: colors.background.two,
    },

    image: {
        display: 'block',
        flexGrow: 0,
    },

    content: {
        flexGrow: 1,
        padding: rem(0.5),
    },

    title: {
        fontFamily: fonts.primary,
        fontWeight: fonts.weights.primary.bold,
        fontSize: rem(1),
        color: colors.text.primary,
        marginBottom: rem(0.75),
    },

    torrent: {
        marginBottom: rem(1.25),
    },

    torrentHeader: {
        fontFamily: fonts.primary,
        color: colors.text.secondary,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: rem(0.875),
    },

    ratio: {
        display: 'flex',
        alignItems: 'center',
    },

    ratioIcon: {
        fontSize: px(24),
        marginRight: rem(0.25),
    },
});
