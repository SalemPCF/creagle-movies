/* Node */
import { StyleSheet } from 'aphrodite';

/* Relative */
import {
    colors,
    px,
} from '../../../styles';

export default StyleSheet.create({
    container: {
        height: '100vh',
        width: px(75),
        left: px(0),
        top: px(0),
        display: 'flex',
        backgroundColor: colors.navbar,
        flexDirection: 'column',
        alignItems: 'center',
    },
    icon: {
        marginTop: px(30),
        fontSize: px(30),
        color: 'white',
        cursor: 'pointer',
    },
    bottom: {
        marginTop: 'auto',
        marginBottom: px(30),
    },
});
