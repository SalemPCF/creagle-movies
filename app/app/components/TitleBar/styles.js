/* Node */
import { StyleSheet } from 'aphrodite';

/* Relative */
import { perc, rem, combine, calc, colors, depth, linearGradient } from '../../../styles';

export default StyleSheet.create({
    titleBar: {
        position: 'relative',
        marginLeft: rem(-1),
        backgroundColor: colors.background.one,
        width: calc(perc(100), '+', rem(2)),
        padding: combine(rem(1.5), rem(1), rem(0.5), rem(1.5)),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: depth.header,

        ':after': {
            display: 'block',
            content: '""',
            position: 'absolute',
            top: perc(100),
            left: 0,
            right: 0,
            height: rem(0.5),
            background: linearGradient(
                'to bottom',
                colors.background.one,
                'transparent',
            ),
        },
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
