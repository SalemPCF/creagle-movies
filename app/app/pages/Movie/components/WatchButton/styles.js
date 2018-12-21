import { StyleSheet } from 'aphrodite';
import { perc, rgba, colors, rem, combine, px, fonts } from '../../../../../styles';

export default StyleSheet.create({
    container: {
        width: perc(100),
        background: rgba(255, 255, 255, 0.25),
        borderRadius: rem(0.25),
        display: 'flex',
    },

    container_primary: {
        background: colors.primary,
    },

    button: {
        flexGrow: 1,
        color: colors.text.secondary,
        textDecoration: 'none',
        fontFamily: fonts.primary,
        fontSize: rem(0.875),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: combine(rem(0.25), 0),
    },

    dropDownContainer: {
        borderLeft: combine(px(1), 'solid', rgba(0, 0, 0, 0.14)),
        width: rem(1.25),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    dropDown: {
        color: colors.text.secondary,
    },
});
