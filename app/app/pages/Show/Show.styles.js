import { StyleSheet } from 'aphrodite';

import {
    colors, fonts,
    perc, px, rem,
    combine, second,
    shadows,
    depth,
} from '../../../styles';

export default StyleSheet.create({
    container: {
        background: colors.background.two,
        width: perc(100),
        height: perc(100),
        position: 'relative',
        padding: combine(rem(1.25), rem(4), 0, rem(4)),
        overflowY: 'hidden',
    },

    closeIcon: {
        position: 'absolute',
        top: rem(1.6),
        left: rem(1),
        zIndex: 4,
        color: colors.text.primary,
        filter: 'drop-shadow(1px 1px 10px black)',
        fontSize: px(24),
    },

    innerContainer: {
        position: 'relative',
        zIndex: 3,
        width: perc(100),
        height: perc(100),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },

    breakout: {
        flexGrow: 1,
        margin: combine(0, rem(-4)),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },

    title: {
        color: colors.text.primary,
        fontFamily: fonts.primary,
        fontWeight: fonts.weights.primary.bold,
        marginBottom: rem(0.5),
    },

    synopsis: {
        fontFamily: fonts.primary,
        color: colors.text.secondary,
        width: perc(100),
        maxWidth: px(800),
        fontSize: rem(0.875),
        lineHeight: 1.6,
        marginBottom: rem(1),
        transition: combine('all', second(0.2)),
    },

    synopsis_collapsed: {
        // We can't change height to 0, as it
        // won't animate because the default
        // height is 'auto', so we set font-size
        // to 0, hiding the text.
        fontSize: 0,
    },

    metadata: {
        display: 'flex',
        marginBottom: rem(0.5),
    },

    metadataText: {
        fontFamily: fonts.primary,
        color: colors.text.secondary,
        marginRight: rem(0.75),
        fontWeight: fonts.weights.primary.bold,
        fontSize: rem(0.95),
    },

    metadataStars: {
        marginTop: px(-5),
    },

    metadataRatio: {
        display: 'flex',
        marginTop: px(-4),
    },

    torrentRatio: {
        marginTop: px(2),
        marginLeft: px(5),
    },

    starIcon: {
        textShadow: '0 2px 5px rgba(0, 0, 0, 0.12)',
        color: colors.yellow,
        cursor: 'default',
        fontSize: px(24),
    },

    tabs: {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'scroll',
        boxShadow: shadows.four,
        zIndex: depth.content + 1,

        '::-webkit-scrollbar': {
            display: 'none',
        },
    },

    tab: {
        flex: '0 0 auto',
        cursor: 'pointer',
        minWidth: px(90),
    },

    tab_selected: {
        borderBottom: combine(px(2), 'solid', colors.primary),
    },

    tabText: {
        fontFamily: fonts.primary,
        color: colors.text.tertiary,
        whiteSpace: 'nowrap',
        lineHeight: px(48),
        padding: combine(0, rem(1)),
    },

    tabText_selected: {
        color: colors.primary,
    },

    gridContainer: {
        flexGrow: 1,
        background: colors.background.one,
        padding: combine(0, rem(1)),
        display: 'flex',
    },

    tracker: {
        flex: 1,
    },

    grid: {
        padding: combine(rem(1), 0),

        ':focus': {
            outline: 0,
        },

        '::-webkit-scrollbar': {
            display: 'none',
        },
    },
});
