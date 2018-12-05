import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Movie extends Component {
    componentDidMount () {
        const { loadMovie, id } = this.props;

        loadMovie(id);
    }

    render () {
        const { movie } = this.props;

        return (
            <div>
                <Link to="/">Back</Link>
                {movie ? (
                    <pre>{JSON.stringify(movie, null, 4)}</pre>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        );
    }
}

export default Movie;
