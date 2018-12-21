/* Node */
import { StyleSheet } from 'aphrodite';

/* Relative */
import {
    colors,
    px,
    shadows,
    perc,
    depth,
} from '../../../../styles';

export default StyleSheet.create({
    container: {
        height: perc(100),
        width: px(75),
        minWidth: px(75),
        left: px(0),
        top: px(0),
        display: 'flex',
        backgroundColor: colors.background.two,
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: shadows.three,
        zIndex: depth.sidebar,
    },
    icon: {
        marginTop: px(30),
        fontSize: px(30),
        color: colors.text.primary,
        cursor: 'pointer',
    },
    bottom: {
        marginTop: 'auto',
        marginBottom: px(30),
    },
});
