/* Node */
import { StyleSheet } from 'aphrodite';

/* Relative */
import { perc, rem, combine } from '../../../styles';

export default StyleSheet.create({
    container: {
        width: perc(100),
        height: perc(100),
        padding: combine(0, rem(1)),
        overflow: 'hidden',
    },

    tracker: {
        width: perc(100),
        height: perc(100),
    },

    grid: {
        paddingTop: rem(1),

        ':focus': {
            outline: 0,
        },

        '::-webkit-scrollbar': {
            display: 'none',
        },
    },
});
