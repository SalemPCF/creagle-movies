/* Node */
import React, { Component, createContext } from 'react';
import idb from 'idb';

/* Relative */
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
        movie_posters: {},
        show_posters: {},
        episode_posters: {},
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

export { Database, DatabaseContext };
