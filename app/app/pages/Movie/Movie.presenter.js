/* Node */
import BaselineTrendingUp from 'react-md-icon/dist/BaselineTrendingUp';
import RoundStarBorder from 'react-md-icon/dist/RoundStarBorder';
import RoundArrowBack from 'react-md-icon/dist/RoundArrowBack';
import RoundPlayArrow from 'react-md-icon/dist/RoundPlayArrow';
import RoundStarHalf from 'react-md-icon/dist/RoundStarHalf';
import RoundStar from 'react-md-icon/dist/RoundStar';
import { Link } from 'react-router-dom';
import { css } from 'aphrodite';
import React from 'react';

/* Relative */
import { Spinner } from '../../components/Spinner';
import propTypes from './Movie.propTypes';
import styles from './Movie.styles';

const MoviePresenter = ({
    movie, stars, isHD, runtime, torrentInfo,
}) => (
    <div className={css(styles.container)}>
        {movie && movie.images && movie.images.fanart && (
            <img className={css(styles.background)} src={movie.images.fanart} alt="" />
        )}

        <div className={css(styles.overlay)} />

        <Link to="/" className={css(styles.closeIcon)}>
            <RoundArrowBack />
        </Link>

        {movie ? (
            <div className={css(styles.innerContainer)}>
                <h1 className={css(styles.title)}>{movie.title}</h1>

                <div className={css(styles.metadata)}>
                    <p className={css(styles.metadataText)}>{movie.year}</p>
                    <p className={css(styles.metadataText)}>&#8226;</p>
                    <p className={css(styles.metadataText)}>{runtime}</p>
                    <p className={css(styles.metadataText)}>&#8226;</p>
                    <p className={css(styles.metadataText)}>{isHD ? 'HD' : 'SD'}</p>
                    <p className={css(styles.metadataText)}>&#8226;</p>
                    <p className={css(styles.metadataText)}>{movie.certification}</p>
                    <p className={css(styles.metadataText)}>&#8226;</p>

                    <div className={css(styles.metadataText, styles.metadataStars)}>
                        {stars.filledStars.map(num => (
                            <RoundStar key={num} className={css(styles.starIcon)} />
                        ))}

                        {stars.hasHalfStar
                            ? <RoundStarHalf className={css(styles.starIcon)} />
                            : null}

                        {stars.emptyStars.map(num => (
                            <RoundStarBorder key={num} className={css(styles.starIcon)} />
                        ))}
                    </div>

                    <p className={css(styles.metadataText)}>&#8226;</p>

                    <div className={css(styles.metadataText, styles.metadataRatio)}>
                        <BaselineTrendingUp className={css(styles.arrowsIcon)} />
                        <div className={css(styles.torrentRatio)}>
                            {torrentInfo.ratio}
                        </div>
                    </div>
                </div>

                <p className={css(styles.synopsis)}>{movie.synopsis}</p>

                <Link to={`/movies/${movie._id}/watch/${isHD ? '1080p' : '720p'}`} className={css(styles.button)}>
                    <RoundPlayArrow className={css(styles.playIcon)} />
                    <span>Watch Now</span>
                </Link>
            </div>
        ) : (
            <Spinner />
        )}
    </div>
);

MoviePresenter.propTypes = propTypes.presenter;

export default MoviePresenter;
