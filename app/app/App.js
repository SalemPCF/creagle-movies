/* Node */
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import GoogleFontLoader from 'react-google-font-loader';
import React, { Component } from 'react';

/* Relative Components */
import RemoteContext from './components/RemoteContext';
import Splashscreen from './components/Splashscreen';
import ContextMenu from './components/ContextMenu';
import KeyListener from './components/KeyListener';
import { Database } from './components/Database';
import Container from './components/Container';
import Navbar from './components/Navbar';

/* Relative Pages */
import Movies from './pages/Movies';
import Movie from './pages/Movie';
import Video from './pages/Video';
import Shows from './pages/Shows';

/* Relative PropTypes, Schemas */
import propTypes from './App.propTypes';

/* Relative Variables */
import fonts from '../config/fonts';

class App extends Component {
    static propTypes = propTypes;

    componentDidMount () {
        const { loadMovies } = this.props;

        loadMovies();
    }

    render () {
        const { remote, initiating } = this.props;

        return (
            <RemoteContext.Provider value={remote}>
                <Database>
                    <ContextMenu />
                    <KeyListener />
                    <GoogleFontLoader fonts={fonts} />

                    <Splashscreen delay={1500} ready={!initiating}>
                        <Router>
                            <Container>
                                <Navbar />

                                <Switch>
                                    <Route exact path="/" component={Movies} />
                                    <Route exact path="/movies/:id" component={Movie} />

                                    <Route exact path="/movies/:id/watch/:quality" component={Video} />

                                    <Route exact path="/shows" component={Shows} />
                                </Switch>
                            </Container>
                        </Router>
                    </Splashscreen>
                </Database>
            </RemoteContext.Provider>
        );
    }
}

export default App;
