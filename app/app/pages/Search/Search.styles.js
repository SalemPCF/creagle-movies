/* Node */
import { StyleSheet } from 'aphrodite';

/* Relative */
import { perc, rem, combine, px, colors, second } from '../../../styles';

export default StyleSheet.create({
    container: {
        width: perc(100),
        height: perc(100),
        padding: combine(rem(1), rem(1)),
    },

    inputContainer: {
        position: 'relative',
        marginBottom: px(45),
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
});
