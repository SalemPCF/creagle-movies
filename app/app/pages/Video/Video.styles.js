import { StyleSheet } from 'aphrodite';

import {
    colors,
    px, rem,
} from '../../../styles';

export default StyleSheet.create({
    closeIcon: {
        position: 'absolute',
        top: rem(1),
        left: rem(1),
        zIndex: 4,
        color: colors.text.primary,
        textShadow: '0 2px 5px rgba(0, 0, 0, 0.12)',
        fontSize: px(24),
    },
});
