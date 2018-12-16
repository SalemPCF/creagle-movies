/* Relative */
import { StyleSheet } from 'aphrodite';
import { perc } from '../../../styles';

export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: perc(100),
    },

    row: {
        flexDirection: 'row',
    },

    column: {
        flexDirection: 'column',
    },
});
