/* Node */
import React, { Component, createRef } from 'react';

/* Relative */
import MoviesPresenter from './Movies.presenter';
import propTypes from './Movies.propTypes';

class MoviesContainer extends Component {
    static propTypes = propTypes.container;

    scroller = createRef();

    // eslint-disable-next-line react/destructuring-assignment
    currentScroll = this.props.scrollPosition;

    initialScrollCompleted = false;

    componentDidMount () {
        // If our currentScroll > 0, we've scrolled down the page.
        // Let's set the page scroll position back to the preserved value.
        if (this.currentScroll > 0 && this.scroller.current) {
            this.scroller.current.scrollTo(this.currentScroll);
        }
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
     * Fires a redux action save the latest scroll position.
     */
    saveScrollPosition = () => {
        const { preserveScroll } = this.props;

        preserveScroll(this.currentScroll);
    }

    /**
     * Renders the component.
     *
     * @returns {mixed}
     */
    render () {
        const { movies, loadMovies } = this.props;

        return (
            <MoviesPresenter
                ref={this.scroller}
                movies={movies}
                loadMore={loadMovies}
                saveScrollPosition={this.saveScrollPosition}
                onScroll={this.handleScroll}
            />
        );
    }
}

export default MoviesContainer;
