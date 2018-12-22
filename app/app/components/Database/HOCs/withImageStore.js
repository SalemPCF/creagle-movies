/* Node */
import React, { Component } from 'react';

/* Relative */
import { makeCancellable, logError } from '../../../../helpers';
import { api } from '../../../../services/api';
import { withDatabase } from './withDatabase';

export const withImageStore = (Comp, storeName) => withDatabase(class extends Component {
    static displayName = `withImageStore(${Comp.displayName || Comp.name})`;

    static defaultProps = {
        defaultImage: 'resources/no-image-available@3-2.png',
    }

    // Store the image in our database
    storeImage = async (id, base64) => {
        const { getStore } = this.props;

        const store = await getStore(storeName);

        // Store the specified blob for this id
        store.put(base64, id);
    }

    // Load our image and save it
    loadImage = (id, image) => new Promise(async (resolve) => {
        const { defaultImage } = this.props;

        let res = {};

        // Attempt to load our image from the server.
        try {
            res = await api.get(image, { responseType: 'blob' });
        } catch (error) {
            // If we catch an error, fall back to using the defaultImage
            logError('An error occured while loading this image, falling back to defaultImage...');

            resolve(defaultImage);

            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(res.data);

        reader.onloadend = () => {
            const base64 = reader.result;

            // Store the retrieved image for next time
            this.storeImage(id, base64);

            resolve(base64);
        };
    })

    // Get the image from our database or load it
    getImage = async (id) => {
        const { getStore, image, defaultImage } = this.props;

        const store = await getStore(storeName);

        // Get an image from the store for the specified id
        const img = await store.get(id);

        // If we got an image, return it. If we didn't, load it.
        return img || (image ? this.loadImage(id, image) : defaultImage);
    }

    // Wrap the getImage function to allow us to cancel the promise
    getImageCancellable = id => makeCancellable(this.getImage(id))

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
