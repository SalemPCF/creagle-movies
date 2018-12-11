/* Node */
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import GoogleFontLoader from 'react-google-font-loader';
import React, { Component } from 'react';

/* Relative Components */
import RemoteContext from './components/RemoteContext';
import Splashscreen from './components/Splashscreen';
import ContextMenu from './components/ContextMenu';
import KeyListener from './components/KeyListener';

/* Relative Pages */
import Movies from './pages/Movies';
import Movie from './pages/Movie';
import Video from './pages/Video';

/* Relative PropTypes, Schemas */
import propTypes from './App.propTypes';

/* Relative Variables */
import fonts from '../config/fonts';

class App extends Component {
    static propTypes = propTypes;

    componentDidMount () {
        const { loadMovies } = this.props;

        loadMovies();

        const dbVersion = 1;
        const request = window.indexedDB.open('creagleMovies', dbVersion);

        request.onsuccess = () => {
            console.log('success');

            const db = request.result;

            db.onerror = () => {
                console.log('a problem occured while creating/accessing the database');
            };

            request.onupgradeneeded = (event) => {
                db.createObjectStore(event.target.result);
            };

            let blob = null;

            const xhr = new XMLHttpRequest();

            xhr.open('GET', 'https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/ce2ece60-9b32-11e6-95ab-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg', true);

            xhr.responseType = 'blob';

            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    console.log('imaged retrieved');

                    blob = xhr.response;
                }
            });
        };
    }

    render () {
        const { remote, initiating } = this.props;

        return (
            <RemoteContext.Provider value={remote}>
                <ContextMenu />
                <KeyListener />
                <GoogleFontLoader fonts={fonts} />

                <Splashscreen delay={1500} ready={!initiating}>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Movies} />
                            <Route exact path="/movies/:id" component={Movie} />
                            <Route exact path="/movies/:id/watch" component={Video} />
                        </Switch>
                    </Router>
                </Splashscreen>
            </RemoteContext.Provider>
        );
    }
}

export default App;
