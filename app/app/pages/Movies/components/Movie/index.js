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
import Ripple from '../../../../components/Ripple';

class Movie extends Component {
    static propTypes = movieShape;

    handleRippleEnd = () => {
        const { history, movie, saveScrollPosition } = this.props;

        // Save the scroll position
        saveScrollPosition();

        // Go to the next page
        history.push(`/movies/${movie._id}`);
    }

    render () {
        const { movie } = this.props;

        const qualities = Object.keys(movie.torrents.en);

        return (
            <div className={css(styles.movieContainer)}>
                <Ripple styles={styles.movie} onRippleEnd={this.handleRippleEnd}>
                    {qualities.includes('1080p') && (
                        <RoundHd className={css(styles.hdIcon)} />
                    )}

                    <Poster
                        movieId={movie._id}
                        image={movie.images.poster}
                    />

                    <div className={css(styles.info)}>
                        <TruncateMarkup lines={1}>
                            <p className={css(styles.infoText, styles.infoText_primary)}>
                                {movie.title}
                            </p>
                        </TruncateMarkup>

                        <p className={css(styles.infoText, styles.infoText_secondary)}>
                            {movie.year}
                        </p>
                    </div>
                </Ripple>
            </div>
        );
    }
}

export default withRouter(Movie);
