/* Node */
import React, { Component } from 'react';

/* Relative */
import MoviePresenter from './Movie.presenter';
import propTypes from './Movie.propTypes';

class MovieContainer extends Component {
    state = {
        quality: '',
    }

    static propTypes = propTypes.container;

    componentDidMount () {
        const { loadMovie, match } = this.props;

        loadMovie(match.params.id);
    }

    componentDidUpdate = () => {
        const { quality } = this.state;
        const { movie } = this.props;

        // If we don't have a quality
        if (quality === '') {
            // Get our quality values
            const qualities = Object.keys(movie.torrents.en);

            // Set our the quality state value to the first quality value
            this.setState({ quality: qualities[0] });
        }
    }

    componentWillUnmount = () => {
        const { unloadMovie } = this.props;

        // Clear the loaded movie from our redux store
        unloadMovie();
    }

    getStars = () => {
        const { movie } = this.props;

        // Make sure we've got an object to destructure
        if (!movie) { return {}; }

        // Get our number of stars to the nearest 0.5
        const numOfFilledStars = Math.round((movie.rating.percentage / 20) * 2) / 2;

        return {
            // Check if we should show a half star
            hasHalfStar: numOfFilledStars % 1 === 0.5,
            // Create an array with sizeof(numOfFilledStars)
            filledStars: [...Array(Math.floor(numOfFilledStars)).keys()],
            // Create an array with sizeof(5 - numOfFilledStars)
            emptyStars: [...Array(Math.floor(5 - numOfFilledStars)).keys()],
        };
    }

    isHD = () => {
        const { movie } = this.props;

        if (!movie) { return false; }

        return Object.keys(movie.torrents.en).includes('1080p');
    }

    getRuntime = () => {
        const { movie } = this.props;

        if (!movie) { return '0 mins'; }

        const runtime = parseInt(movie.runtime, 10);

        const hours = Math.floor(runtime / 60);
        const mins = (runtime % 60);

        return hours ? `${hours}h ${mins}m` : `${mins}m`;
    }

    getTorrentInfo = () => {
        const { movie } = this.props;
        const { quality } = this.state;

        if (!movie || !quality) { return {}; }

        const torrent = movie.torrents.en[quality];

        const { peer, seed } = torrent;

        return {
            seeds: seed,
            peers: peer,
            ratio: (seed / peer).toFixed(2),
        };
    }

    render () {
        const { movie } = this.props;
        const { quality } = this.state;

        return (
            <MoviePresenter
                movie={movie}
                stars={this.getStars()}
                isHD={this.isHD()}
                runtime={this.getRuntime()}
                quality={quality}
                torrentInfo={this.getTorrentInfo()}
            />
        );
    }
}

export default MovieContainer;
