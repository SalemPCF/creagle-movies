/* Node */
import { StyleSheet } from 'aphrodite';

/* Relative */
import { perc, rem, combine, px, rgb } from '../../../styles';

export default StyleSheet.create({
    container: {
        width: perc(100),
        height: perc(100),
        padding: combine(rem(1), rem(1)),
    },

    inputContainer: {
        position: 'relative',
        marginBottom: px(45),
    },

    input: {
        fontSize: px(16),
        padding: combine(px(10), px(10), px(10), px(5)),
        width: px(300),
        border: 'none',
        borderBottom: '1px solid rgb(66, 66, 66)',
        backgroundColor: 'transparent',

        ':focus': {
            outline: 'none',
        },

        ':focus ~ label': {
            top: px(-15),
            fontSize: px(14),
            color: rgb(66, 66, 66),
        },
    },

    label: {
        color: rgb(66, 66, 66),
        fontSize: px(16),
        position: 'absolute',
        left: px(5),
        top: px(10),
        transition: '0.2s ease all',
    },

    header: {
        color: 'white',
    },
});
