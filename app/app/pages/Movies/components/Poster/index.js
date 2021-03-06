import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import React from 'react';

import { withPosterDatabase } from '../../../../components/Database';

import styles from './styles';

class Poster extends React.PureComponent {
    state = { url: null };

    static propTypes = {
        getImage: PropTypes.func.isRequired,
        movieId: PropTypes.string.isRequired,
    }

    cancelPromise = () => null;

    componentDidMount () {
        const { getImage, movieId } = this.props;

        // Get the promise and the cancel parts of our created promise
        const { promise, cancel } = getImage(movieId);

        // Create a reference to our cancel promise function
        this.cancelPromise = cancel;

        // Initiate the image get process
        promise
            // We successfully got an image URL we want to use
            .then(url => this.setState({ url }))
            // We didn't get an image URL - show the fallback
            .catch((err) => {
                // If we cancelled the promise, don't update the state
                if (err.isCanceled) { return; }

                // Set the state to an image not available image
                this.setState({ url: 'resources/no-image-available.png' });
            });
    }

    componentWillUnmount = () => this.cancelPromise();

    render () {
        const { url } = this.state;

        return url && (
            <img
                className={css(styles.poster)}
                src={url}
                alt="Movie"
            />
        );
    }
}

export default withPosterDatabase(Poster);
