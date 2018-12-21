/* eslint-disable react/destructuring-assignment */
/* Node */
import React, { Component, createRef } from 'react';

/* Relative */
import MoviesPresenter from './Movies.presenter';
import propTypes from './Movies.propTypes';

class MoviesContainer extends Component {
    /**
     * Our initial state
     *
     */
    state = {
        params: {
            ...this.props.params,
        },
        isSearching: false,
    }

    /**
     * Typechecking our props
     *
     */
    static propTypes = propTypes.container;

    scroller = createRef();

    currentScroll = null;

    initialScrollCompleted = false;

    /**
     * Handles the initialization of our component
     *
     */
    componentDidMount () {
        const { scrollPosition } = this.props;

        // Initialize our scrollPosition
        this.currentScroll = scrollPosition;

        // If our currentScroll > 0, we've scrolled down the page.
        // Let's set the page scroll position back to the preserved value.
        if (this.currentScroll > 0 && this.scroller.current) {
            this.scroller.current.scrollTo(this.currentScroll);
        }
    }

    /**
     * Fires a redux action to save the latest scroll position before our component unmounts.
     *
     */
    componentWillUnmount () {
        this.saveScrollPosition();
    }

    /**
     * Handles each scroll event by saving the current scroll value.
     *
     * @param {mixed} event - The scroll event
     */
    handleScroll = (event) => {
        const { scrollTop } = event;

        if (this.initialScrollCompleted) {
            this.currentScroll = scrollTop;
        }

        this.initialScrollCompleted = true;
    }

    /**
     * Fires a redux action to save the latest scroll position.
     *
     */
    saveScrollPosition = () => {
        const { preserveScroll } = this.props;

        preserveScroll(this.currentScroll);
    }

    /**
     * Handles a generic param state change
     *
     */
    handleParams = (type, value) => this.setState((current) => {
        const next = { ...current };

        next.params[type] = value;

        return next;
    });

    /**
     * Handles saving our params in our redux store then getting our movies
     *
     */
    handleSubmit = (shouldReset) => {
        const {
            saveMoviesSearch,
            resetMoviesSearch,
            loadMovies,
            loadSearchedMovies,
            params,
        } = this.props;

        if (shouldReset) {
            // Clear our search params and pages from our redux store
            resetMoviesSearch();

            // Tell our component we're no longer searching and we've reset our params
            // Then show our original movies (loaded without custom params)
            this.setState({ isSearching: false, params: { ...params } }, () => loadMovies());
        } else {
            // Save our search params to our redux store
            saveMoviesSearch(this.state.params);

            // Tell our component we're currently searching
            // Then show our movie results with our search params
            this.setState({ isSearching: true }, () => loadSearchedMovies());
        }
    }

    /**
     * Renders the component.
     *
     * @returns {mixed}
     */
    render () {
        const { movies, searchedMovies, loadMovies, loadSearchedMovies } = this.props;
        const { params, isSearching } = this.state;

        return (
            <MoviesPresenter
                ref={this.scroller}
                movies={isSearching ? searchedMovies : movies}
                loadMore={isSearching ? loadSearchedMovies : loadMovies}
                onScroll={this.handleScroll}
                handleParams={this.handleParams}
                keywords={params.keywords}
                handleSubmit={this.handleSubmit}
                isSearching={isSearching}
            />
        );
    }
}

export default MoviesContainer;
