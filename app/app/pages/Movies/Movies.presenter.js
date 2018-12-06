import React from 'react';

import propTypes from './Movies.propTypes';

import Movie from './components/Movie';

const MoviesPresenter = ({ movies, onBottomReached }) => (
    <div className="list" onScroll={onBottomReached}>
        <div className="items">
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
