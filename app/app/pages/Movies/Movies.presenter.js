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
    getScrollPosition,
    saveScrollPosition,
    loadMore,
}, ref) => (
    <div className={css(styles.container)}>
        <SizeTracker className={css(styles.tracker)}>
            {({ width, height }) => (
                <Grid
                    ref={ref}
                    width={width}
                    height={height}
                    items={movies}
                    loadMore={loadMore}
                    renderItem={movie => (
                        <Movie
                            movie={movie}
                            getScrollPosition={getScrollPosition}
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
