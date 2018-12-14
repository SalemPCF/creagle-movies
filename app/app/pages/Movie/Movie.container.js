/* Node */
import React, { Component } from 'react';

/* Relative */
import RemoteContext from '../../components/RemoteContext';
import MoviePresenter from './Movie.presenter';
import propTypes from './Movie.propTypes';

class MovieContainer extends Component {
    state = {
        quality: '',
    }

    static propTypes = propTypes.container;

    static contextType = RemoteContext;

    componentDidMount () {
        const { loadMovie, match } = this.props;

        loadMovie(match.params.id);
    }

    componentDidUpdate = () => {
        const { quality } = this.state;
        const { movie } = this.props;

        // If we don't have a quality
        if (quality === false) {
            // Get our quality values
            const qualities = Object.keys(movie.torrents.en);

            // Set our the quality state value to the first quality value
            this.setState({ quality: qualities[0] });
        }
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

        if (!movie) { return 0; }

        const torrent = movie.torrents.en['1080p'] || movie.torrents.en['720p'];

        const { peer, seed } = torrent;

        const ratio = (seed / peer).toFixed(2);

        const info = {
            seeds: seed,
            peers: peer,
            ratio,
        };

        return info;
    }

    render () {
        const { movie } = this.props;
        const { quality } = this.state;

        return (
            <MoviePresenter
                movie={movie}
                renderMetaData={this.renderMetaData}
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
