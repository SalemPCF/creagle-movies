// Libs
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { normalize, denormalize } from 'normalizr';

// Services
import { api } from '../services/api';

// Components
import RemoteContext from './components/RemoteContext';
import ContextMenu from './components/ContextMenu';
import KeyListener from './components/KeyListener';

// Pages
import Movies from './pages/Movies';
import Movie from './pages/Movie';

// Prop types, schemas etc.
import { appShape } from './shape';
import movieSchema from '../schemas/movie';

class App extends Component {
    state = {
        // All entities live in here
        entities: {
            movies: {},
        },

        // All Movies-page related data goes in here
        movies: {
            loading: false,
            page: 0,
            pages: {},
        },

        // All Movie-page related data goes in here
        movie: {
            id: null,
        },
    }

    loadMovies = () => {
        const { movies, loading } = this.state;
        const { page } = movies;

        // Prevent us sending requests if we're waiting for a response
        if (loading) { return; }

        const nextPage = page + 1;

        this.setState({ loading: true });

        api.get(`/movies/${nextPage}`)
            .then(res => res.data)
            .then((data) => {
                const normalized = normalize(data, [movieSchema]);

                this.setState(({ entities, movies }) => ({
                    // Add new movie entities into entities
                    entities: {
                        ...entities,
                        movies: {
                            ...entities.movies,
                            ...normalized.entities.movies,
                        },
                    },

                    // Add new page into state
                    movies: {
                        ...movies,
                        page: nextPage,
                        pages: {
                            ...movies.pages,
                            [nextPage]: normalized.result,
                        },
                    },
                }));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                this.setState({ loading: false });
            })
    }

    getMovies = () => {
        const { entities, movies } = this.state;

        const ids = Object.values(movies.pages).reduce((acc, idSet) => [
            ...acc,
            ...idSet,
        ], []);

        return denormalize(ids, [movieSchema], entities);
    }

    loadMovie = (id) => {
        const { entities } = this.state;

        // We already have the requested entity loaded,
        // so dont load it again, just update state so
        // that we know which movie we're viewing.
        if (entities.movies[id]) {
            this.setState({ movie: { id } });
        } else {
            // We didn't have it, so we need to load it
            api.get(`/movie/${id}`)
                .then(res => res.data)
                .then((data) => {
                    // Normalize the response
                    const normalized = normalize(data, movieSchema);

                    this.setState(({ entities }) => ({
                        // Add the entities into state
                        entities: {
                            ...entities,
                            movies: {
                                ...normalized.entities.movies,
                            },
                        },

                        // And set the ID of the movie we're viewing
                        movie: {
                            id: normalized.result,
                        },
                    }));
                })
                .catch((err) => {
                    console.dir(err);
                });
        }
    }

    getMovie = () => {
        const { id } = this.state.movie;

        // We don't know which movie to show yet, so return null
        if (!id) return null;

        // We have an ID, so let's get the corresponding movie
        return denormalize(id, movieSchema, this.state.entities);
    }

    render () {
        return (
            <RemoteContext.Provider value={this.props.remote}>
                <ContextMenu />
                <KeyListener />

                <Router>
                    <Switch>
                        <Route exact path="/" render={() => (
                            <Movies
                                loadMovies={this.loadMovies}
                                movies={this.getMovies()}
                            />
                        )} />
                        <Route exact path="/movies/:id" render={({ match }) => (
                            <Movie
                                id={match.params.id}
                                loadMovie={this.loadMovie}
                                movie={this.getMovie()}
                            />
                        )} />
                    </Switch>
                </Router>
            </RemoteContext.Provider>
        );
    }
}

App.propTypes = appShape;

export default App;
