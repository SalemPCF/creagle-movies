/* eslint-disable react/no-multi-comp */

import React, { Component, createContext } from 'react';
import idb from 'idb';

import { api } from '../../../services/api';
import propTypes from './propTypes';

const DatabaseContext = createContext();

class Database extends Component {
    static propTypes = propTypes;

    static VERSION = 1;

    // Open a handle to our IndexedDB
    db = idb.open('creagle-movies', Database.VERSION, (upgradeDb) => {
        Object.entries(this.getObjectStores()).forEach(([store, options]) => {
            if (!upgradeDb.objectStoreNames.contains(store)) {
                upgradeDb.createObjectStore(store, options);
            }
        });
    });

    getObjectStores = () => ({
        posters: {},
        posters_b64: {},
    });

    render () {
        const { children } = this.props;

        return (
            <DatabaseContext.Provider value={this.db}>
                {children}
            </DatabaseContext.Provider>
        );
    }
}

const withDatabase = Comp => class extends Component {
    static contextType = DatabaseContext;

    static displayName = `withDatabase(${Component.displayName || Component.name})`;

    // Get our IndexedDB handle
    getDb = () => this.context;

    // Get a reference to allow us to store stuff with IndexedDB
    getStore = async (storeName) => {
        const db = await this.getDb();
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        return store;
    }

    // Store the image in our database
    storeImage = async (movieId, base64) => {
        const store = await this.getStore('posters_b64');

        // Store the specified blob for this movieID
        store.put(base64, movieId);
    }

    // Load our image and save it
    loadImage = movieId => new Promise(async (resolve) => {
        const { image } = this.props;

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
        const store = await this.getStore('posters_b64');

        // Get an image from the store for the specified movieID
        const img = await store.get(movieId);

        // If we got an image, return it. If we didn't, load it.
        return img || this.loadImage(movieId);
    }

    render () {
        return (
            <Comp
                getImage={this.getImage}
                {...this.props}
            />
        );
    }
};

export {
    DatabaseContext,
    Database,
    withDatabase,
};
