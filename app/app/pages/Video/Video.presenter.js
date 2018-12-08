/* Node */
import RoundClose from 'react-md-icon/dist/RoundClose';
import { Link } from 'react-router-dom';
import { css } from 'aphrodite';
import React from 'react';

/* Relative */
import styles from './Video.styles.js';

// This needs styling -> look here: https://docs.videojs.com/tutorial-skins.html#customize-styles
const VideoPresenter = ({ movie }) => (
    movie ? (
        <div>
            <Link to={`/movies/${movie._id}`} className={css(styles.closeIcon)}>
                <RoundClose />
            </Link>

            <video
                id="movie-player"
                className="video-js"
                controls
                preload="auto"
                style={{ width: '70%', height: 'auto' }}
                autoPlay
            />
        </div>
    ) : null
);

export default VideoPresenter;
