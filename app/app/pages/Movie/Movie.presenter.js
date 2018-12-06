/* Node */
import { Link } from 'react-router-dom';
import React from 'react';

/* Relative */
import propTypes from './Movie.propTypes';

const MoviePresenter = ({ movie, startDownload }) => (
    <div className="movie-container">
        <img className="movie-background" src={movie ? movie.images.fanart : null} alt="" />

        <div className="movie-background-overlay" />

        <div className="movie-inner-container">
            <pre style={{ color: 'red' }}>{JSON.stringify(movie)}</pre>
            <Link to="/" style={{ color: 'white', margin: '5px', lineHeight: '25px' }}>Go Back</Link>

            <button type="submit" onClick={startDownload}>press me</button>

            {movie ? (
                <div className="movie-inner-container" />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    </div>
);

MoviePresenter.propTypes = propTypes.presenter;

export default MoviePresenter;
