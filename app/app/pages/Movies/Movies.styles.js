/* Node */
import { StyleSheet } from 'aphrodite';

/* Relative */
import { perc, rem, combine, depth } from '../../../styles';

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
    },
});
