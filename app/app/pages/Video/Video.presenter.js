/* eslint-disable no-underscore-dangle */
/* Node */
import RoundArrowBack from 'react-md-icon/dist/RoundArrowBack';
import { Link } from 'react-router-dom';
import { css } from 'aphrodite';
import React from 'react';

/* Relative */
import styles from './Video.styles.js';
import propTypes from './Video.propTypes';

// This needs styling -> look here: https://docs.videojs.com/tutorial-skins.html#customize-styles
const VideoPresenter = ({ movie, cancelDownload, status }) => (
    movie ? (
        <div className={css(styles.container)}>
            <div className={css(styles.overlay)} />

            {movie && movie.images && movie.images.fanart && (
                <img className={css(styles.background)} src={movie.images.fanart} alt="" />
            )}

            <div className={css(styles.videoContainer)}>
                <Link to={`/movies/${movie._id}`} className={css(styles.closeIcon)} onClick={cancelDownload}>
                    <RoundArrowBack />
                </Link>

                <video
                    id="movie-player"
                    className={`${css(styles.video, status === 'Ready' ? styles.ready : null)} video-js`}
                    controls
                    preload="auto"
                    autoPlay
                />

                {status !== 'Ready' ? (
                    <div className={css(styles.statusContainer)}>
                        <p className={css(styles.status)}>{status}</p>
                    </div>
                ) : null}
            </div>
        </div>
    ) : null
);

VideoPresenter.propTypes = propTypes.VideoPresenter;

export default VideoPresenter;
