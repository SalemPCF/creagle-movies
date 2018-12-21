/* Node */
import { StyleSheet } from 'aphrodite';

/* Relative */
import { perc } from '../../../../../styles';

export default StyleSheet.create({
    poster: {
        width: perc(100),
        height: perc(100),
        display: 'block',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    },
});
