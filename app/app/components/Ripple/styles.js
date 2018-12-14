import { StyleSheet } from 'aphrodite';
import { perc, second, rgba, combine, translate, scale } from '../../../styles';

const rippleKeyframes = {
    '0%': {
        transform: combine(
            translate(perc(-50), perc(-50)),
            scale(0.1),
        ),
    },

    '90%': {
        transform: combine(
            translate(perc(-50), perc(-50)),
            scale(1),
        ),
    },

    '100%': {
        transform: combine(
            translate(perc(-50), perc(-50)),
            scale(1),
        ),
        opacity: 0,
    },
};

export default StyleSheet.create({
    container: {
        width: perc(100),
        height: perc(100),
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
    },

    ripple: {
        position: 'absolute',
        // 'top' and 'left' are provided by the component
        width: perc(300),
        paddingBottom: perc(300),
        transformOrigin: 'center',
        animationName: rippleKeyframes,
        animationDuration: second(1),
        animationFillMode: 'forwards',
    },

    rippleInner: {
        width: perc(100),
        height: perc(100),
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: perc(50),
        background: rgba(255, 255, 255, 0.3),
    },
});
