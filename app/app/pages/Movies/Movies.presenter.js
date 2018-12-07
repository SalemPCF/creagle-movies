/* Node */
import React from 'react';
import { css } from 'aphrodite';

/* Relative */
import propTypes from './Movies.propTypes';
import styles from './Movies.styles';
import Movie from './components/Movie';

const MoviesPresenter = ({ movies, onBottomReached }) => (
    <div className={css(styles.container)} onScroll={onBottomReached}>
        <div className={css(styles.movies)}>
            {movies.length >= 0 && movies.map(movie => (
                <Movie
                    // eslint-disable-next-line no-underscore-dangle
                    key={movie._id}
                    movie={movie}
                />
            ))}
        </div>
    </div>
);

MoviesPresenter.propTypes = propTypes.presenter;

export default MoviesPresenter;
