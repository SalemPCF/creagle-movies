import { StyleSheet } from 'aphrodite';
import { perc, rem, fonts, colors } from '../../../../../styles';

export default StyleSheet.create({
    episode: {
        width: perc(100),
        height: perc(100),
        padding: rem(0.25),
    },

    posterContainer: {
        width: perc(100),
        borderRadius: rem(0.25),
        overflow: 'hidden',
        marginBottom: rem(0.125),
    },

    secondaryTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        fontSize: rem(0.875),
    },
});
