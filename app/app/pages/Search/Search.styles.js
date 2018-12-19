/* Node */
import { StyleSheet } from 'aphrodite';

/* Relative */
import { perc, rem, combine, px, colors, second, shadows } from '../../../styles';

export default StyleSheet.create({
    container: {
        background: colors.background.two,
        width: perc(100),
        height: perc(100),
        position: 'relative',
        padding: combine(rem(5), rem(7)),
    },

    title: {
        color: colors.text.primary,
    },

    inputContainer: {
        position: 'relative',
        marginTop: px(20),
    },

    innerContainer: {
        zIndex: 3,
        width: perc(100),
        height: perc(100),
    },

    closeIcon: {
        position: 'absolute',
        top: rem(1),
        left: rem(1),
        zIndex: 4,
        color: colors.text.primary,
        filter: 'drop-shadow(1px 1px 10px black)',
        fontSize: px(24),
    },

    input: {
        fontSize: px(16),
        padding: combine(px(10), px(10), px(10), px(5)),
        width: px(300),
        border: 'none',
        borderBottom: combine(px(1), 'solid', colors.text.tertiary),
        backgroundColor: 'transparent',
        color: colors.text.primary,

        ':focus': {
            outline: 'none',
        },

        ':focus ~ label': {
            top: px(-15),
            fontSize: px(14),
            color: colors.text.secondary,
        },
    },

    label: {
        color: colors.text.secondary,
        fontSize: px(16),
        position: 'absolute',
        left: px(5),
        top: px(10),
        transition: combine(second(0.2), 'ease', 'all'),
    },

    labelActive: {
        top: px(-15),
        fontSize: px(14),
        color: colors.text.secondary,
    },

    button: {
        fontFamily: 'Roboto',
        fontSize: rem(0.875),
        textDecoration: 'none',
        color: colors.text.primary,
        background: colors.primary,
        width: px(300),
        height: 'auto',
        padding: rem(0.5, 2),
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
