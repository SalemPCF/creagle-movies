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

    componentDidMount () {
        // If our currentScroll > 0, we've scrolled down the page.
        // Let's set the page scroll position back to the preserved value.
        if (this.currentScroll > 0 && this.scroller.current) {
            this.scroller.current.scrollTop = this.currentScroll;
        }
    }

    handleBottomReached = (event) => {
        const { loadMovies } = this.props;

        const { scrollHeight, scrollTop, clientHeight } = event.target;

        const distanceToBottom = scrollHeight - scrollTop;

        this.currentScroll = scrollTop;

        // If we're close to the bottom of the page, send out another request and get more content!
        if (distanceToBottom <= (clientHeight + 250)) {
            loadMovies();
        }
    }

    saveScrollPosition = () => {
        const { preserveScroll } = this.props;

        preserveScroll(this.currentScroll);
    }

    getScrollPosition = () => this.currentScroll;

    render () {
        const { movies } = this.props;

        return (
            <MoviesPresenter
                ref={this.scroller}
                movies={movies}
                onBottomReached={this.handleBottomReached}
                saveScrollPosition={this.saveScrollPosition}
                getScrollPosition={this.getScrollPosition}
            />
        );
    }
}

export default MoviesContainer;
