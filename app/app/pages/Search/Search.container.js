/* eslint-disable react/destructuring-assignment */

/* Node */
import React, { Component } from 'react';

/* Relative */
import SearchPresenter from './Search.presenter';
import propTypes from './Search.propTypes';

class SearchContainer extends Component {
    /**
     * Our initial state
     *
     */
    state = {
        ...this.props.params,
    }

    /**
     * Typechecks our props
     *
     */
    static propTypes = propTypes.container;

    /**
     * Handles saving our params in our redux store,
     * getting movies with our params and
     * redirecting us to our next route
     *
     */
    handleSubmit = (shouldReset) => {
        const {
            match,
            saveMoviesSearch,
            resetMoviesSearch,
            saveShowsSearch,
            resetShowsSearch,
            loadMovies,
            loadShows,
            history,
        } = this.props;

        const { type } = match.params;

        switch (type) {
            case ('shows'):
                if (shouldReset) {
                    resetShowsSearch();
                } else {
                    saveShowsSearch(this.state);
                }

                loadShows();

                history.push('/shows');
                break;
            case ('movies'):
            default:
                if (shouldReset) {
                    resetMoviesSearch();
                } else {
                    saveMoviesSearch(this.state);
                }

                loadMovies();

                history.push('/');
        }
    }

    /**
     * Handles a generic state change
     *
     */
    handleGeneric = (type, event) => {
        console.log(event);

        this.setState({ [type]: event.target.value });
    }

    /**
     * Renders our component
     *
     */
    render () {
        const { match } = this.props;
        const { keywords } = this.state;

        return (
            <SearchPresenter
                handleGeneric={this.handleGeneric}
                keywords={keywords}
                handleSubmit={this.handleSubmit}
                type={match.params.type}
            />
        );
    }
}

export default SearchContainer;
