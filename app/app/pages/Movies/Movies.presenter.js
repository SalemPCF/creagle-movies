/* eslint-disable no-underscore-dangle */
/* Node */
import React, { forwardRef } from 'react';
import { css } from 'aphrodite';

/* Relative */
import propTypes from './Movies.propTypes';
import styles from './Movies.styles';
import Movie from './components/Movie';

const MoviesPresenter = forwardRef(({
    movies, onBottomReached, saveScrollPosition, getScrollPosition,
}, ref) => (
    <div ref={ref} className={css(styles.container)} onScroll={onBottomReached}>
        <div className={css(styles.movies)}>
            {movies.length >= 0 && movies.map(movie => (
                <Movie
                    key={movie._id}
                    movie={movie}
                    getScrollPosition={getScrollPosition}
                    saveScrollPosition={saveScrollPosition}
                />
            ))}
        </div>
    </div>
));

MoviesPresenter.propTypes = propTypes.presenter;

export default MoviesPresenter;
