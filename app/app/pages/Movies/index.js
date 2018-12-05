import React, { Component } from 'react';

import { Movie } from './components/Movie';

class Movies extends Component {
    componentDidMount = () => {
        const { loadMovies } = this.props;

        loadMovies();
    }

    handleBottomReached = (event) => {
        const { loadMovies } = this.props;

        const { scrollHeight, scrollTop, clientHeight } = event.target;

        const distanceToBottom = scrollHeight - scrollTop;

        // If we're at the bottom of the page, send out another request and get more content!
        if (distanceToBottom === clientHeight) {
            loadMovies();
        }
    }

    // TODO: cleanup...
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
