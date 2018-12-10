import { StyleSheet } from 'aphrodite';

import {
    colors,
    px, rem,
    perc, blur, scale, rgba,
} from '../../../styles';

export default StyleSheet.create({
    container: {
        background: 'black',
        width: perc(100),
        height: perc(100),
        position: 'relative',
    },

    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 2,
        width: perc(100),
        height: perc(100),
        background: rgba(0, 0, 0, 0.75),
    },

    closeIcon: {
        position: 'absolute',
        top: rem(1),
        left: rem(1),
        zIndex: 4,
        color: colors.text.primary,
        textShadow: '0 2px 5px rgba(0, 0, 0, 0.12)',
        fontSize: px(24),
    },

    background: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
        width: perc(100),
        height: perc(100),
        filter: blur(px(8)),
        transform: scale(1.2),
        transformOrigin: 'center',
    },

    videoContainer: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
    },

    statusContainer: {
        zIndex: 2,
    },

    status: {
        fontSize: px(20),
        color: 'white',
        fontFamily: 'Roboto',
    },

    video: {
        display: 'none',
        width: '100%',
        height: 'auto',
        zIndex: 3,
        maxWidth: '100vw',
        maxHeight: '100vh',
    },

    ready: {
        display: 'block',
    },
});
