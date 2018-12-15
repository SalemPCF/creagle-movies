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
        minWidth: px(75),
        left: px(0),
        top: px(0),
        display: 'flex',
        backgroundColor: colors.navbar,
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
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
