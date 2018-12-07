import { StyleSheet } from 'aphrodite';

import {
    perc, px, calc,
    second,
    scale, translate,
} from '../../../styles';

const createEllipsesKeyframe = (smallestVal, biggestVal) => ({
    '0%': {
        transform: smallestVal,
    },

    '100%': {
        transform: biggestVal,
    },
});

export default StyleSheet.create({
    spinnerContainer: {
        position: 'fixed',
        top: calc(perc(50), '-', px(16)),
        left: calc(perc(50), '-', px(42)),
        zIndex: 2,
    },

    spinner: {
        zIndex: 2,
        width: px(200),
        height: px(200),
        position: 'fixed',
        right: 0,
        top: 0,
        maxWidth: perc(100),
        maxHeight: perc(100),
    },

    spinnerEllipsis: {
        display: 'inline-block',
        position: 'relative',
        width: px(64),
        height: px(64),
        transitionTimingFunction: 'cubic-bezier(0, 1, 1, 0)',

        ':nth-child(1n) > div': {
            position: 'absolute',
            top: px(27),
            width: px(11),
            height: px(11),
            borderRadius: perc(50),
            background: '#2196F3',

            ':nth-child(1)': {
                left: px(6),
                animationName: createEllipsesKeyframe(scale(0), scale(1)),
                animationDuration: second(0.6),
                animationIterationCount: 'infinite',
                background: '#1E88E5',
            },

            ':nth-child(2)': {
                left: px(6),
                animationName: createEllipsesKeyframe(translate(0, 0), translate(px(19), 0)),
                animationDuration: second(0.6),
                animationIterationCount: 'infinite',
                background: '#2196F3',
            },

            ':nth-child(3)': {
                left: px(26),
                animationName: createEllipsesKeyframe(translate(0, 0), translate(px(19), 0)),
                animationDuration: second(0.6),
                animationIterationCount: 'infinite',
                background: '#1976D2',
            },

            ':nth-child(4)': {
                left: px(45),
                animationName: createEllipsesKeyframe(scale(1), scale(0)),
                animationDuration: second(0.6),
                animationIterationCount: 'infinite',
                background: '#1E88E5',
            },
        },
    },
});
