/* Node */
import React, { Component } from 'react';

/* Relative */
import { makeCancellable } from '../../../../helpers';
import { api } from '../../../../services/api';
import { withDatabase } from './withDatabase';

export const withPosterDatabase = Comp => withDatabase(class extends Component {
    static displayName = `withPosterDatabase(${Component.displayName || Component.name})`;

    // Store the image in our database
    storeImage = async (movieId, base64) => {
        const { getStore } = this.props;

        const store = await getStore('posters_b64');

        // Store the specified blob for this movieID
        store.put(base64, movieId);
    }

    // Load our image and save it
    loadImage = (movieId, image) => new Promise(async (resolve) => {
        // Load the image from the server
        const res = await api.get(image, { responseType: 'blob' });

        const reader = new FileReader();
        reader.readAsDataURL(res.data);

        reader.onloadend = () => {
            const base64 = reader.result;

            // Store the retrieved image for next time
            this.storeImage(movieId, base64);

            resolve(base64);
        };
    })

    // Get the image from our database or load it
    getImage = async (movieId) => {
        const { getStore, image } = this.props;

        const store = await getStore('posters_b64');

        // Get an image from the store for the specified movieID
        const img = await store.get(movieId);

        // If we got an image, return it. If we didn't, load it.
        return img || (image ? this.loadImage(movieId, image) : 'resources/no-image-available.png');
    }

    // Wrap the getImage function to allow us to cancel the promise
    getImageCancellable = movieId => makeCancellable(this.getImage(movieId))

    render () {
        const { getStore, ...props } = this.props;

        return (
            <Comp
                getImage={this.getImageCancellable}
                {...props}
            />
        );
    }
});
