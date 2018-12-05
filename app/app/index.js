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
                this.setState(({ movies }) => ({
                    movies: {
                        ...movies,
                        page: nextPage,
                        data: {
                            ...movies.data,
                            [nextPage]: data,
                        },
                    },
                }));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getMovie = (id) => {
        console.log('getting movie ', id);
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
                        <Route exact path="/" render={() => (
                            <Movies getMovies={this.getMovies} movies={movies.data} />
                        )} />
                        <Route exact path="/movies/:id" render={({ match }) => (
                            <Movie id={match.params.id} loadMovie={this.getMovie} />
                        )} />
                    </Switch>
                </Router>
            </RemoteContext.Provider>
        );
    }
}

App.propTypes = appShape;

export default App;
