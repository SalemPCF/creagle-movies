import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Movie extends Component {
    componentDidMount () {
        const { loadMovie, id } = this.props;

        loadMovie(id);
    }

    render () {
        return (
            <div>
                <Link to="/">Back</Link>
                <p>
                    hello
                </p>
            </div>
        );
    }
}

export default Movie;
