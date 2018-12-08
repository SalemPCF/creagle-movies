/* Node */
import React, { Component } from 'react';
import WebTorrent from 'webtorrent';

/* Relative */
import RemoteContext from '../../components/RemoteContext';
import { logError, logInfo } from '../../../helpers';
import MoviePresenter from './Movie.presenter';
import propTypes from './Movie.propTypes';
import { logSuccess } from '../../../helpers/log';

class MovieContainer extends Component {
    state = {
        quality: false,
    }

    interval = null;

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

    // This method is always called at some point after the component mounts
    // That's because when the component mounts, it queries our store and retreives the movie.
    // In the event this isn't called, there will be no content on the screen
    componentWillReceiveProps = (nextProps) => {
        const { quality } = this.state;
        const { movie } = nextProps;

        // If we don't have a quality
        if (quality === false) {
            // Get our quality values
            const qualities = Object.keys(movie.torrents.en);

            // Set our the quality state value to the first quality value
            this.setState({ quality: qualities[0] });
        }
    }

    startDownload = (e) => {
        e.preventDefault();

        const { movie } = this.props;
        const { quality } = this.state;

        const remote = this.context;

        this.client.add(movie.torrents.en[quality].url, { path: `${remote.app.getPath('temp')}/Creagle Movies` }, (torrent) => {
            const file = torrent.files.find(f => f.name.endsWith('.mp4'));

            file.renderTo('video#movie-player', {}, (error) => {
                if (error) {
                    logError('An error occured while attempting to use the file.renderTo method.');
                }
            });

            this.interval = setInterval(() => {
                logInfo(`Torrent Progress: ${(torrent.progress * 100).toFixed(1)}%`);
            }, 1000);

            torrent.on('error', () => {
                logError('There was an error with this torrent.');

                clearInterval(this.interval);
            });

            torrent.on('done', () => {
                clearInterval(this.interval);
            });
        });
    }

    cancelDownload = () => {
        const { movie } = this.props;
        const { quality } = this.state;

        if (!quality) { return; }

        const magnetUrl = movie.torrents.en[quality].url;
        const torrentExists = !!this.client.get(magnetUrl);

        if (torrentExists) {
            this.client.remove(magnetUrl, (err) => {
                if (err) {
                    logError('There was an error while attempting to remove this torrent.');
                } else {
                    logSuccess('Removed torrent.');
                }

                clearInterval(this.interval);
            });
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

    getQuality = () => {
        const { movie } = this.props;

        if (!movie) { return false; }

        return Object.keys(movie.torrents.en).includes('1080p');
    }

    render () {
        const { movie } = this.props;

        return (
            <MoviePresenter
                movie={movie}
                startDownload={this.startDownload}
                cancelDownload={this.cancelDownload}
                renderMetaData={this.renderMetaData}
                stars={this.getStars()}
                isHD={this.getQuality()}
            />
        );
    }
}

export default MovieContainer;
