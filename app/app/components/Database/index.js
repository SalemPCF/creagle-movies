/* eslint-disable react/no-multi-comp */

import React, { Component, createContext } from 'react';
import idb from 'idb';

import propTypes from './propTypes';

const DatabaseContext = createContext();

class Database extends Component {
    static propTypes = propTypes;

    static VERSION = 1;

    db = idb.open('creagle-movies', Database.VERSION, (upgradeDb) => {
        Object.entries(this.getObjectStores()).forEach(([store, options]) => {
            if (!upgradeDb.objectStoreNames.contains(store)) {
                upgradeDb.createObjectStore(store, options);
            }
        });
    });

    getObjectStores = () => ({
        posters: {},
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

    getDb = () => this.context;

    render () {
        return (
            <Comp
                getDb={this.getDb}
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
