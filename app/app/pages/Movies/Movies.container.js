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

    static propTypes = propTypes.container;

    scroller = createRef();

    currentScroll = null;

    initialScrollCompleted = false;

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
    componentWillUnmount = () => this.saveScrollPosition();

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
        const { saveMoviesSearch, resetMoviesSearch, loadMovies, loadSearchedMovies } = this.props;

        if (shouldReset) {
            resetMoviesSearch();

            this.setState({ isSearching: false }, () => loadMovies());
        } else {
            saveMoviesSearch(this.state.params);

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
        const { keywords, isSearching } = this.state;

        return (
            <MoviesPresenter
                ref={this.scroller}
                movies={isSearching ? searchedMovies : movies}
                loadMore={isSearching ? loadSearchedMovies : loadMovies}
                onScroll={this.handleScroll}
                handleParams={this.handleParams}
                keywords={keywords}
                handleSubmit={this.handleSubmit}
                isSearching={isSearching}
            />
        );
    }
}

export default MoviesContainer;
