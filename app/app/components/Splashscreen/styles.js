/* Node */
import { StyleSheet } from 'aphrodite';

/* Relative */
import { perc, px } from '../../../styles';

export default StyleSheet.create({
    splashscreen: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: perc(100),
        width: perc(100),
    },

    logo: {
        width: perc(80),
        maxWidth: px(300),
    },
});
