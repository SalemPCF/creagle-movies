// Libs
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// Services
import { api } from '../services/api';

// Components
import RemoteContext from './components/RemoteContext';
import ContextMenu from './components/ContextMenu';
import KeyListener from './components/KeyListener';

// Pages
import Movies from './pages/Movies';
import Movie from './pages/Movie';

// Prop types
import { appShape } from './shape';

class App extends Component {
    state = {
        movies: {
            page: 0,
            data: {},
        },
    }

    getMovies = () => {
        const { page } = this.state.movies;

        const nextPage = page + 1;

        api.get(`/movies/${nextPage}`)
            .then(({ data }) => {
                this.setState((current) => {
                    const next = { ...current };

                    next.movies = {
                        page: nextPage,
                        data: {
                            ...current.movies.data,
                            [nextPage]: data,
                        },
                    };

                    return next;
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render () {
        const { movies } = this.state;
        const { remote } = this.props;

        return (
            <RemoteContext.Provider value={remote}>
                <ContextMenu />
                <KeyListener />

                <Router>
                    <Switch>
                        <Route path="/" exact render={() => <Movies getMovies={this.getMovies} movies={movies.data} />} />
                        <Route path="/movie" exact component={Movie} />
                    </Switch>
                </Router>
            </RemoteContext.Provider>
        );
    }
}

App.propTypes = appShape;

export default App;
