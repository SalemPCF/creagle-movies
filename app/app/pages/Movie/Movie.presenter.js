/* Node */
import { Link } from 'react-router-dom';
import React from 'react';

/* Relative */
import { Spinner } from '../../components/Spinner';
import propTypes from './Movie.propTypes';

const MoviePresenter = ({ movie, startDownload, stars }) => (
    <div className="movie-container">
        <img className="movie-background" src={movie ? movie.images.fanart : null} alt="" />

        <div className="movie-background-overlay" />

        <Link to="/" className="close-icon">
            <i className="material-icons">close</i>
        </Link>

        {movie ? (
            <div className="movie-inner-container">
                <h1 className="movie-title">{movie.title}</h1>

                <div className="movie-metadata-container">
                    <p className="movie-metadata-text">{movie.year}</p>
                    <p className="movie-metadata-text">&#8226;</p>
                    <p className="movie-metadata-text">{`${movie.runtime} mins`}</p>
                    <p className="movie-metadata-text">&#8226;</p>
                    <p className="movie-metadata-text">{Object.keys(movie.torrents.en).includes('1080p') ? 'HD' : 'SD'}</p>
                    <p className="movie-metadata-text">&#8226;</p>
                    <p className="movie-metadata-text">{movie.certification}</p>
                    <p className="movie-metadata-text">&#8226;</p>

                    <div className="movie-metadata-text stars">
                        {stars.filledStars.map(num => (
                            <i key={num} className="material-icons star-icon">star</i>
                        ))}

                        {stars.hasHalfStar
                            ? <i className="material-icons star-icon">star_half</i>
                            : null}

                        {stars.emptyStars.map(num => (
                            <i key={num} className="material-icons star-icon">star_border</i>
                        ))}
                    </div>
                </div>

                <p className="movie-synopsis">{movie.synopsis}</p>

                <div className="button-container">
                    <button className="button" type="button" onClick={startDownload}>Watch Now</button>
                </div>
            </div>
        ) : (
            <Spinner />
        )}
    </div>
);

MoviePresenter.propTypes = propTypes.presenter;

export default MoviePresenter;
