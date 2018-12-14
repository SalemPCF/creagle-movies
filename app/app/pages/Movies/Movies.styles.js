import { StyleSheet } from 'aphrodite';

import { perc, rem } from '../../../styles';

export default StyleSheet.create({
    container: {
        width: perc(100),
        height: perc(100),
        padding: rem(1),
    },

    tracker: {
        width: perc(100),
        height: perc(100),
        // display: 'block',
    },
});
