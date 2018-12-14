/* Node */
import React, { Component } from 'react';

/* Relative */
import { DatabaseContext } from '../index';

export const withDatabase = Comp => class extends Component {
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

    render () {
        return (
            <Comp
                getStore={this.getStore}
                {...this.props}
            />
        );
    }
};
