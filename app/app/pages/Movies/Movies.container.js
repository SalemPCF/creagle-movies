import React, { Component } from 'react';

import MoviesPresenter from './Movies.presenter';
import propTypes from './Movies.propTypes';

class MoviesContainer extends Component {
    static propTypes = propTypes.container;

    handleBottomReached = (event) => {
        const { loadMovies } = this.props;

        const { scrollHeight, scrollTop, clientHeight } = event.target;

        const distanceToBottom = scrollHeight - scrollTop;

        // If we're close to the bottom of the page, send out another request and get more content!
        if (distanceToBottom <= (clientHeight + 250)) {
            loadMovies();
        }
    }

    render () {
        const { movies } = this.props;

        return (
            <MoviesPresenter
                movies={movies}
                onBottomReached={this.handleBottomReached}
            />
        );
    }
}

export default MoviesContainer;
