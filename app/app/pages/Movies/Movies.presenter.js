/* Node */
import React, { forwardRef } from 'react';
import { css } from 'aphrodite';

import Grid from '../../components/Grid';
import SizeTracker from '../../components/SizeTracker';

/* Relative */
import propTypes from './Movies.propTypes';
import styles from './Movies.styles';
import Movie from './components/Movie';

const MoviesPresenter = forwardRef(({
    movies,
    saveScrollPosition,
    loadMore,
    onScroll,
}, ref) => (
    <div className={css(styles.container)}>
        <SizeTracker className={css(styles.tracker)}>
            {({ width, height }) => (
                <Grid
                    className={css(styles.grid)}
                    ref={ref}
                    width={width}
                    height={height}
                    items={movies}
                    loadMore={loadMore}
                    onScroll={onScroll}
                    overscan={2}
                    renderItem={movie => (
                        <Movie
                            movie={movie}
                            saveScrollPosition={saveScrollPosition}
                        />
                    )}
                />
            )}
        </SizeTracker>
    </div>
));

MoviesPresenter.propTypes = propTypes.presenter;

export default MoviesPresenter;
