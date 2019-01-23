/* Node */
import { StyleSheet } from 'aphrodite';

/* Relative */
import { perc, rem, combine, depth, second, px, colors, calc } from '../../../styles';

export default StyleSheet.create({
    container: {
        width: perc(100),
        height: perc(100),
        padding: combine(0, rem(1)),
        overflow: 'hidden',
        zIndex: depth.content,
    },

    tracker: {
        width: perc(100),
        height: perc(100),
    },

    grid: {
        paddingTop: rem(1),
        zIndex: depth.content,

        ':focus': {
            outline: 0,
        },

        '::-webkit-scrollbar': {
            display: 'none',
        },

        cursor: 'auto',
    },

    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        zIndex: 20,
        backgroundColor: colors.background.two,
        width: calc(perc(100), '+', rem(2)),
        marginLeft: rem(-1),
        height: px(66),
        transition: 'height 0.3s',
        overflow: 'hidden',
    },

    shown: {
        transition: 'height 0.3s',
        height: px(66),
    },

    collapsed: {
        transition: 'height 0.3s',
        height: 0,
    },

    inputContainer: {
        position: 'relative',
        margin: rem(1),
    },

    input: {
        fontSize: px(16),
        padding: combine(px(10), px(10), px(5), px(5)),
        width: px(300),
        border: 'none',
        borderBottom: combine(px(1), 'solid', colors.text.tertiary),
        backgroundColor: 'transparent',
        color: colors.text.primary,

        ':focus': {
            outline: 'none',
        },

        ':focus ~ label': {
            top: px(-5),
            fontSize: px(12),
            fontFamily: 'Roboto',
            color: colors.text.secondary,
        },
    },

    label: {
        color: colors.text.secondary,
        fontSize: px(16),
        position: 'absolute',
        left: px(5),
        top: px(10),
        fontFamily: 'Roboto',
        transition: combine(second(0.2), 'ease', 'all'),
    },

    labelActive: {
        top: px(-5),
        fontSize: px(12),
        fontFamily: 'Roboto',
        color: colors.text.secondary,
    },
});
