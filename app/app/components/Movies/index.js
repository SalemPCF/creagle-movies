import React, { Component } from 'react';

import { Card } from './components/Card';

class Movies extends Component {
    componentDidMount = () => {
        const { getMovies } = this.props;

        getMovies();
    }

    handleBottomReached = (event) => {
        const { getMovies } = this.props;

        const { scrollHeight, scrollTop, clientHeight } = event.target;

        const distanceToBottom = scrollHeight - scrollTop;

        // If we're at the bottom of the page, send out another request and get more content!
        if (distanceToBottom === clientHeight) {
            getMovies();
        }
    }

    // TODO: cleanup...
    render () {
        const { movies } = this.props;

        const moviesArr = Object.values(movies)
            .reduce((acc, movieSet) => [
                ...acc,
                ...movieSet,
            ], []);

        return (
            <div className="list" onScroll={this.handleBottomReached}>
                <div className="items">
                    {moviesArr.length ? moviesArr.map(Card) : null}
                </div>
            </div>
        );
    }
}

export default Movies;
