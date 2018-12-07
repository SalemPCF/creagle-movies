/* Node */
import React, { Component } from 'react';
import WebTorrent from 'webtorrent';

/* Relative */
import RemoteContext from '../../components/RemoteContext';
import { logError, logInfo } from '../../../helpers';
import MoviePresenter from './Movie.presenter';
import propTypes from './Movie.propTypes';

class MovieContainer extends Component {
    static propTypes = propTypes.container;

    static contextType = RemoteContext;

    client = new WebTorrent();

    componentDidMount () {
        const { loadMovie, match } = this.props;

        loadMovie(match.params.id);

        this.client.on('error', () => {
            logError('There was an error with WebTorrent.');
        });
    }

    startDownload = (e) => {
        e.preventDefault();

        const { movie } = this.props;

        const remote = this.context;

        // TODO: Change the .en key to be either of the options provided under the torrent list.
        this.client.add(movie.torrents.en['1080p'].url, { path: `${remote.app.getPath('temp')}/Creagle Movies` }, (torrent) => {
            const interval = setInterval(() => {
                logInfo(`Torrent Progress: ${(torrent.progress * 100).toFixed(1)}%`);
            }, 1000);

            torrent.on('error', () => {
                logError('There was an error with this torrent.');

                clearInterval(interval);
            });

            torrent.on('done', () => {
                clearInterval(interval);
            });
        });
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

    render () {
        const { movie } = this.props;

        return (
            <MoviePresenter
                movie={movie}
                startDownload={this.startDownload}
                renderMetaData={this.renderMetaData}
                stars={this.getStars()}
            />
        );
    }
}

export default MovieContainer;
