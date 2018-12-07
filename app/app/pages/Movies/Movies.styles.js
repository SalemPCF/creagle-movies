import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        overflowY: 'scroll',
    },

    movies: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'start',
    },
});
