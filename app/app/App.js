// Libs
import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import RemoteContext from './components/RemoteContext';
import ContextMenu from './components/ContextMenu';
import KeyListener from './components/KeyListener';

// Pages
import Movies from './pages/Movies';
import Movie from './pages/Movie';

// Prop types, schemas etc.
import { appShape } from './shape';

class App extends Component {
    static propTypes = appShape;

    componentDidMount () {
        const { loadMovies } = this.props;

        loadMovies();
    }

    render () {
        const { remote } = this.props;

        return (
            <RemoteContext.Provider value={remote}>
                <ContextMenu />
                <KeyListener />

                <Router>
                    <Switch>
                        <Route exact path="/" component={Movies} />
                        <Route exact path="/movies/:id" component={Movie} />
                    </Switch>
                </Router>
            </RemoteContext.Provider>
        );
    }
}

export default App;
