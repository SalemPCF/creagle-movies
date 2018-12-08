/* Node */
import RoundStarBorder from 'react-md-icon/dist/RoundStarBorder';
import RoundStarHalf from 'react-md-icon/dist/RoundStarHalf';
import RoundClose from 'react-md-icon/dist/RoundClose';
import RoundStar from 'react-md-icon/dist/RoundStar';
import { Link } from 'react-router-dom';
import { css } from 'aphrodite';
import React from 'react';

/* Relative */
import { Spinner } from '../../components/Spinner';
import propTypes from './Movie.propTypes';
import styles from './Movie.styles';

const MoviePresenter = ({
    movie, startDownload, cancelDownload, stars, isHD,
}) => (
    <div className={css(styles.container)}>
        {movie && movie.images && movie.images.fanart && (
            <img className={css(styles.background)} src={movie.images.fanart} alt="" />
        )}

        <div className={css(styles.overlay)} />

        <Link to="/" className={css(styles.closeIcon)}>
            <RoundClose onClick={cancelDownload} onKeyDown={cancelDownload} />
        </Link>

        {movie ? (
            <div className={css(styles.innerContainer)}>
                <h1 className={css(styles.title)}>{movie.title}</h1>

                <div className={css(styles.metadata)}>
                    <p className={css(styles.metadataText)}>{movie.year}</p>
                    <p className={css(styles.metadataText)}>&#8226;</p>
                    <p className={css(styles.metadataText)}>{`${movie.runtime} mins`}</p>
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
                </div>

                <p className={css(styles.synopsis)}>{movie.synopsis}</p>

                <div className={css(styles.buttonContainer)}>
                    <button className={css(styles.button)} type="button" onClick={startDownload}>Watch Now</button>
                </div>

                {/* TODO: Move this to a seperate page, perhaps screen?
                    This also needs styling -> look here: https://docs.videojs.com/tutorial-skins.html#customize-styles
                 */}

                {/* eslint-disable-next-line */}
                <video
                    id="movie-player"
                    className="video-js"
                    controls
                    preload="auto"
                    style={{ width: '70%', height: 'auto' }}
                >
                </video>
            </div>
        ) : (
            <Spinner />
        )}
    </div>
);

MoviePresenter.propTypes = propTypes.presenter;

export default MoviePresenter;
