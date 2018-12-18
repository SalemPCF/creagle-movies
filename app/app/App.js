/* Node */
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import GoogleFontLoader from 'react-google-font-loader';
import React, { Component } from 'react';

/* Relative Components */
import RemoteContext from './components/RemoteContext';
import Splashscreen from './components/Splashscreen';
import ContextMenu from './components/ContextMenu';
import KeyListener from './components/KeyListener';
import SideNavbar from './components/Navbar/Side';
import { Database } from './components/Database';
import { Toaster } from './components/Toaster';
import Container from './components/Container';

/* Relative Pages */
import Movies from './pages/Movies';
import Search from './pages/Search';
import Movie from './pages/Movie';
import Video from './pages/Video';
import Shows from './pages/Shows';
import Show from './pages/Show';

/* Relative PropTypes, Schemas */
import propTypes from './App.propTypes';

/* Relative Variables */
import fonts from '../config/fonts';

class App extends Component {
    static propTypes = propTypes;

    componentDidMount () {
        const { loadMovies, loadShows } = this.props;

        loadMovies();
        loadShows();
    }

    render () {
        const { remote, initiating, toastRoot } = this.props;

        return (
            <RemoteContext.Provider value={remote}>
                <Toaster renderTo={toastRoot}>
                    <Database>
                        <ContextMenu />
                        <KeyListener />
                        <GoogleFontLoader fonts={fonts} />

                        <Splashscreen delay={1500} ready={!initiating}>
                            <Router>
                                <Container>
                                    <SideNavbar />

                                    <Switch>
                                        <Route exact path="/" component={Movies} />
                                        <Route exact path="/movies/:id" component={Movie} />

                                        <Route exact path="/shows" component={Shows} />
                                        <Route exact path="/shows/:id" component={Show} />

                                        <Route exact path="/search/:type" component={Search} />

                                        <Route exact path="/movies/:id/watch/:quality" component={Video} />
                                    </Switch>
                                </Container>
                            </Router>
                        </Splashscreen>
                    </Database>
                </Toaster>
            </RemoteContext.Provider>
        );
    }
}

export default App;
