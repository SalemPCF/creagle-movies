/* Node */
import RoundArrowBack from 'react-md-icon/dist/RoundArrowBack';
import { withRouter } from 'react-router-dom';
import { css } from 'aphrodite';
import React from 'react';

/* Relative */
import styles from './Video.styles.js';
import propTypes from './Video.propTypes';

// This needs styling -> look here: https://docs.videojs.com/tutorial-skins.html#customize-styles
const VideoPresenter = ({ background, status, history, togglePlay }) => (
    <div className={css(styles.container)}>
        <div className={css(styles.overlay)} />

        <img className={css(styles.background)} src={background} alt="" />

        <div className={css(styles.videoContainer)}>
            <a href="#" onClick={history.goBack} className={css(styles.closeIcon)}>
                <RoundArrowBack />
            </a>

            <video
                id="movie-player"
                className={`${css(styles.video, status === 'Ready' && styles.ready)} video-js`}
                controls
                preload="auto"
                autoPlay
                onClick={togglePlay}
            />

            {status !== 'Ready' ? (
                <div className={css(styles.statusContainer)}>
                    <p className={css(styles.status)}>{status}</p>
                </div>
            ) : null}
        </div>
    </div>
);

VideoPresenter.propTypes = propTypes.VideoPresenter;

export default withRouter(VideoPresenter);
