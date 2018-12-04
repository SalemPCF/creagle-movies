import React, { Component } from 'react';

import RemoteContext from './components/RemoteContext';
import ContextMenu from './components/ContextMenu';
import KeyListener from './components/KeyListener';
import Movies from './components/Movies';

class App extends Component {
    render () {
        const { remote } = this.props;

        return (
            <RemoteContext.Provider value={remote}>
                <ContextMenu />
                <KeyListener />

                <Movies />
            </RemoteContext.Provider>
        );
    }
}

export default App;
