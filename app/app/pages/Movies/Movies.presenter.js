/* Node */
import React, { forwardRef } from 'react';
import { css } from 'aphrodite';

/* Relative */
import SizeTracker from '../../components/SizeTracker';
import propTypes from './Movies.propTypes';
import Navbar from '../components/Navbar';
import Grid from '../../components/Grid';
import Movie from './components/Movie';
import styles from './Movies.styles';

const MoviesPresenter = forwardRef(({
    movies,
    loadMore,
    onScroll,
}, ref) => (
    <div className={css(styles.container)}>
        <Navbar title="Movies" type="movie" />

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
                        <Movie movie={movie} />
                    )}
                />
            )}
        </SizeTracker>
    </div>
));

MoviesPresenter.propTypes = propTypes.presenter;

export default MoviesPresenter;
