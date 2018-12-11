import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import React from 'react';

import { withDatabase } from '../../../../components/Database';

import styles from './styles';

class Poster extends React.PureComponent {
    state = { url: null };

    static propTypes = {
        getImage: PropTypes.func.isRequired,
        movieId: PropTypes.string.isRequired,
    }

    componentDidMount () {
        const { getImage, movieId } = this.props;

        // Initiate the image get process
        getImage(movieId)
            // We successfully got an image URL we want to use
            .then(url => this.setState({ url }))
            // We didn't get an image URL - show the fallback
            .catch(() => this.setState({ url: 'resources/no-image-available.png' }));
    }

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

export default withDatabase(Poster);
