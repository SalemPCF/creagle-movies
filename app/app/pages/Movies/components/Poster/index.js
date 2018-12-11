import React from 'react';
import { css } from 'aphrodite';

import { withDatabase } from '../../../../components/Database';
import { colors } from '../../../../../styles';
import { api } from '../../../../../services/api';

import styles from './styles';

class Poster extends React.PureComponent {
    state = { url: null };

    getStore = async (storeName) => {
        const { getDb } = this.props;

        const db = await getDb();
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        return store;
    }

    storeImage = async (base64) => {
        const { movieId } = this.props;
        const store = await this.getStore('posters_b64');

        // Store the specified blob for this movieID
        store.put(base64, movieId);
    }

    loadImage = () => new Promise(async (resolve) => {
        const { image } = this.props;

        // Load the image from the server
        const res = await api.get(image, { responseType: 'blob' });

        const reader = new FileReader();
        reader.readAsDataURL(res.data);

        reader.onloadend = () => {
            const base64 = reader.result;

            // Store the retrieved image for next time
            this.storeImage(base64);

            resolve(base64);
        };
    })

    getImage = async () => {
        const { movieId } = this.props;
        const store = await this.getStore('posters_b64');

        // Get an image from the store for the specified movieID
        const img = await store.get(movieId);

        // If we got an image, return it,
        // else load the image
        return img
            ? img
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
