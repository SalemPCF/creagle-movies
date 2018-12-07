/* Node */
import { Link } from 'react-router-dom';
import { css } from 'aphrodite';
import React from 'react';

/* Relative */
import { Spinner } from '../../components/Spinner';
import propTypes from './Movie.propTypes';
import styles from './Movie.styles';

const MoviePresenter = ({ movie, startDownload, stars }) => (
    <div className={css(styles.container)}>
        {movie && movie.images && movie.images.fanart && (
            <img className={css(styles.background)} src={movie.images.fanart} alt="" />
        )}

        <div className={css(styles.overlay)} />

        <Link to="/" className={css(styles.closeIcon)}>
            <i className="material-icons">close</i>
        </Link>

        {movie ? (
            <div className={css(styles.innerContainer)}>
                <h1 className={css(styles.title)}>{movie.title}</h1>

                <div className={css(styles.metadata)}>
                    <p className={css(styles.metadataText)}>{movie.year}</p>
                    <p className={css(styles.metadataText)}>&#8226;</p>
                    <p className={css(styles.metadataText)}>{`${movie.runtime} mins`}</p>
                    <p className={css(styles.metadataText)}>&#8226;</p>
                    <p className={css(styles.metadataText)}>{Object.keys(movie.torrents.en).includes('1080p') ? 'HD' : 'SD'}</p>
                    <p className={css(styles.metadataText)}>&#8226;</p>
                    <p className={css(styles.metadataText)}>{movie.certification}</p>
                    <p className={css(styles.metadataText)}>&#8226;</p>

                    <div className={css(styles.metadataText)}>
                        {stars.filledStars.map(num => (
                            <i key={num} className={`${css(styles.starIcon)} material-icons`}>star</i>
                        ))}

                        {stars.hasHalfStar
                            ? <i className={`${css(styles.starIcon)} material-icons`}>star_half</i>
                            : null}

                        {stars.emptyStars.map(num => (
                            <i key={num} className={`${css(styles.starIcon)} material-icons`}>star_border</i>
                        ))}
                    </div>
                </div>

                <p className={css(styles.synopsis)}>{movie.synopsis}</p>

                <div className={css(styles.buttonContainer)}>
                    <button className={css(styles.button)} type="button" onClick={startDownload}>Watch Now</button>
                </div>
            </div>
        ) : (
            <Spinner />
        )}
    </div>
);

MoviePresenter.propTypes = propTypes.presenter;

export default MoviePresenter;
