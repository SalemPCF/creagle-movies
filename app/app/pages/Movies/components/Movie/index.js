/* Node */
import TruncateMarkup from 'react-truncate-markup';
import RoundHd from 'react-md-icon/dist/RoundHd';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { css } from 'aphrodite';

/* Relative */
import { movieShape } from './shape';
import styles from './styles';
import Poster from '../Poster';

class Movie extends Component {
    static propTypes = movieShape;

    state = { ripple: null }

    timeouts = [];

    componentWillUnmount () {
        this.timeouts.forEach(timeout => clearTimeout(timeout));
    }

    getTimestamp = () => (+new Date());

    handleMouseDown = (e) => {
        const { pageX, pageY, currentTarget } = e;
        const { ripple } = this.state;
        const { getScrollPosition } = this.props;

        // If our window event has been triggered by a right click, prevent the redirect
        if (window.event.which !== 1) { return; }

        // We determine the coordinates to render our ripple at
        const x = pageX - currentTarget.offsetLeft;
        const y = (pageY - currentTarget.offsetTop) + getScrollPosition();

        // Get a timestamp for when this ripple was created
        const timestamp = this.getTimestamp();

        // If there's no existing ripple,
        // add it into the state.
        if (!ripple) {
            this.setState({
                ripple: {
                    x,
                    y,
                    started: timestamp,
                },
            });
        }

        // We always want to clean up the ripple, even if the mouse up event
        // wasn't triggered. We do so by waiting 1 second, then if there is
        // a ripple in state that has the same timestamp as the timestamp we
        // have already (the ripple in state is definitely the one we just
        // created), then we remove it.
        this.timeouts.push(setTimeout(() => {
            this.setState((prev) => {
                if (prev.ripple && prev.ripple.started === timestamp) {
                    return { ripple: null };
                }

                return null;
            });
        }, 1000));
    }

    handleMouseUp = () => {
        const { ripple } = this.state;

        if (ripple) {
            const timestamp = this.getTimestamp();

            const difference = timestamp - ripple.started;

            if (difference < 1000) {
                // We want to wait for the difference, so that the animation has time to complete.
                // However, waiting the entire second feels sluggish, so we start at 600ms not
                // 1000ms, just so everything feels a little more fluid.
                const timeout = setTimeout(this.afterRipple, 600 - difference);
                this.timeouts.push(timeout);
            } else {
                // The difference is greater than 1000ms, so there's no need for a timeout,
                // just clean up.
                this.afterRipple();
            }
        }
    }

    afterRipple = () => {
        const {
            history,
            movie: { _id: id },
            saveScrollPosition,
        } = this.props;

        // Remove the ripple
        this.setState({ ripple: null });

        // Save the scroll position
        saveScrollPosition();

        // Go to the next page
        // history.push(`/movies/${id}`);
    }

    handleImageError = (e) => {
        e.target.src = 'resources/no-image-available.png';
    }

    render () {
        const {
            movie: {
                _id: id,
                title,
                year,
                images,
                torrents,
            },
            style,
        } = this.props;

        const { ripple } = this.state;

        const qualities = Object.keys((torrents || {}).en);

        if (qualities.length < 0) { return null; }

        return (
            <div style={style} className={css(styles.movieContainer)}>
                <div
                    className={css(styles.movie)}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                >
                    {qualities.includes('1080p') && (
                        <RoundHd className={css(styles.hdIcon)} />
                    )}

                    <Poster
                        movieId={id}
                        image={images.poster}
                    />

                    <div className={css(styles.info)}>
                        <TruncateMarkup lines={1}>
                            <p className={css(styles.infoText, styles.infoText_primary)}>
                                {title}
                            </p>
                        </TruncateMarkup>

                        <p className={css(styles.infoText, styles.infoText_secondary)}>
                            {year}
                        </p>
                    </div>

                    {ripple && (
                        <div className={css(styles.ripple)} style={{ left: ripple.x, top: ripple.y }}>
                            <div className={css(styles.rippleInner)} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(Movie);
