/* Node */
import React, { Component, createRef } from 'react';

/* Relative */
import MoviesPresenter from './Movies.presenter';
import propTypes from './Movies.propTypes';

class MoviesContainer extends Component {
    static propTypes = propTypes.container;

    scrollTop = 0;

    scroller = createRef();

    handleBottomReached = (event) => {
        const { loadMovies } = this.props;

        const { scrollHeight, scrollTop, clientHeight } = event.target;

        const distanceToBottom = scrollHeight - scrollTop;

        // Store our scroll value
        this.scrollTop = scrollTop;

        // If we're close to the bottom of the page, send out another request and get more content!
        if (distanceToBottom <= (clientHeight + 250)) {
            loadMovies();
        }
    }

    componentDidMount = () => {
        const { scrollPosition } = this.props;

        // If our scrollPosition > 0, we've scrolled down the page.
        // Let's set the page scroll position back to the preserved
        if (scrollPosition > 0) {
            this.scroller.current.scrollTop = scrollPosition;
        }
    }

    render () {
        const { movies, preserveScroll } = this.props;

        return (
            <MoviesPresenter
                movies={movies}
                onBottomReached={this.handleBottomReached}
                preserveScroll={preserveScroll}
                // This is very nearly done. Everything is handled except how the scrolltop is passed down.
                // Instead of being passed as props, it needs to be passed as context so when we click something
                // we have the most updated value of scrollTop and can then preserve it in our store.
                scrollTop={this.scrollTop}
                scroller={this.scroller}
            />
        );
    }
}

export default MoviesContainer;
