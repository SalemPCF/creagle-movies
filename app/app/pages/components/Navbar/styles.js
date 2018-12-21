/* Node */
import { StyleSheet } from 'aphrodite';

/* Relative */
import { perc, rem, combine, calc, colors, rgba, px, depth } from '../../../../styles';

export default StyleSheet.create({
    topNav: {
        marginLeft: rem(-1),
        backgroundColor: colors.background.two,
        width: calc(perc(100), '+', rem(2)),
        padding: combine(rem(1), rem(1), rem(0.5), rem(1.5)),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        boxShadow: combine(rgba(0, 0, 0, 0.19), px(0), px(10), px(20)),
        zIndex: depth.header,
    },

    right: {
        display: 'flex',
        flexDirection: 'row',
    },

    title: {
        color: colors.text.primary,
        fontFamily: 'Roboto',
    },
});
