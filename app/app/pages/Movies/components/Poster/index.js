import React from 'react';
import { css } from 'aphrodite';

import { withDatabase } from '../../../../components/Database';
import { colors } from '../../../../../styles';
import { api } from '../../../../../services/api';

import styles from './styles';

class Poster extends React.Component {
    state = { url: null };

    getStore = async () => {
        const { getDb } = this.props;

        const db = await getDb();
        const transaction = db.transaction('posters', 'readwrite');
        const store = transaction.objectStore('posters');

        return store;
    }

    storeImage = async (blob) => {
        const { movieId } = this.props;
        const store = await this.getStore();

        // Store the specified blob for this movieID
        store.put(blob, movieId);
    }

    loadImage = async () => {
        const { image } = this.props;

        // Load the image from the server
        const res = await api.get(image, { responseType: 'blob' });

        // Store the retrieved image for next time
        this.storeImage(res.data);

        // Return the object URL of the image
        return window.URL.createObjectURL(res.data);
    }

    getImage = async () => {
        const { movieId } = this.props;
        const store = await this.getStore();

        // Get an image from the store for the specified movieID
        const img = await store.get(movieId);

        // If we got an image, return it as an object URL,
        // else load the image
        return img
            ? window.URL.createObjectURL(img)
            : this.loadImage();
    }

    componentDidMount () {
        // Initiate the image get process
        this.getImage()
            // We successfully got an image URL we want to use
            .then((url) => {
                this.setState({ url });
            })
            // We didn't get an image URL - show the fallback
            .catch(() => {
                const url = 'resources/no-image-available.png';
                this.setState({ url });
            });
    }

    render () {
        const { url } = this.state;
        return (
            <div
                className={css(styles.poster)}
                style={{
                    background: url
                        ? `url(${url})`
                        : colors.background.two,
                }}
            />
        );
    }
}

export default withDatabase(Poster);
