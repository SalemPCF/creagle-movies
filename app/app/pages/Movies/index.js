import React, { Component } from 'react';

import Movie from './components/Movie';

class Movies extends Component {
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
            <div className="list" onScroll={this.handleBottomReached}>
                <div className="items">
                    {movies.length ? movies.map(movie => (
                        <Movie key={movie._id} {...movie} />
                    )) : null}
                </div>
            </div>
        );
    }
}

export default Movies;
