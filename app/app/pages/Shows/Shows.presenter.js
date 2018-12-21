/* Node */
import React, { forwardRef } from 'react';
import { css } from 'aphrodite';

/* Relative */
import SizeTracker from '../../components/SizeTracker';
import propTypes from './Shows.propTypes';
import Grid from '../../components/Grid';
import Show from './components/Show';
import styles from './Shows.styles';
import TitleBar from '../../components/TitleBar';

const ShowsPresenter = forwardRef(({
    shows,
    loadMore,
    onScroll,
}, ref) => (
    <div className={css(styles.container)}>
        <TitleBar title="TV Shows" type="show" />

        <SizeTracker className={css(styles.tracker)}>
            {({ width, height }) => (
                <Grid
                    className={css(styles.grid)}
                    ref={ref}
                    width={width}
                    height={height}
                    items={shows}
                    loadMore={loadMore}
                    onScroll={onScroll}
                    overscan={2}
                    renderItem={show => (
                        <Show show={show} />
                    )}
                />
            )}
        </SizeTracker>
    </div>
));

ShowsPresenter.propTypes = propTypes.presenter;

export default ShowsPresenter;
