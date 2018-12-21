/* Node */
import { StyleSheet } from 'aphrodite';

/* Relative */
import {
    colors,
    px, rem,
} from '../../../../../styles';

export default StyleSheet.create({
    icon: {
        fontSize: px(24),
        color: colors.text.primary,
        cursor: 'pointer',
        marginTop: px(5),
        marginRight: rem(0.75),
    },

    search: {
        marginRight: rem(2.25),
    },
});
