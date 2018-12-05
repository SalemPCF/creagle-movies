import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Movie extends Component {
    state = {
        //
    }

    componentDidMount = () => {
        console.log('yeet');
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
