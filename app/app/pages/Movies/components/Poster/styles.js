import { StyleSheet } from 'aphrodite';
import { perc, px } from '../../../../../styles';

export default StyleSheet.create({
    poster: {
        width: perc(100),
        height: perc(100),
        display: 'block',
        // minHeight: px(273),
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    },
});
